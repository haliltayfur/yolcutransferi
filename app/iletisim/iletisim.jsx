// app/api/iletisim/route.js
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    // Formdan geleni yakala
    const body = await req.json();

    // Validasyon (Frontend'de de olduğu için burada kısaca, istersen detay ekle)
    const { ad, soyad, email, telefon, neden, mesaj, iletisimTercihi, kvkkOnay } = body;
    if (!ad || !soyad || !email || !telefon || !neden || !mesaj || !iletisimTercihi || !kvkkOnay)
      return NextResponse.json({ error: "Eksik alan var" }, { status: 400 });

    // DB'ye yaz
    const db = await connectToDatabase();
    const createdAt = new Date();
    // Kayıt no üretimi
    const now = createdAt;
    const dateCode = `${now.getFullYear()}${String(now.getMonth()+1).padStart(2,"0")}${String(now.getDate()).padStart(2,"0")}`;
    const countToday = await db.collection("iletisimForms").countDocuments({
      createdAt: { $gte: new Date(now.getFullYear(), now.getMonth(), now.getDate()) }
    });
    const kayitNo = `iletisim${dateCode}_${String(countToday+1).padStart(5,"0")}`;

    const formData = {
      ad, soyad, email, telefon, neden, mesaj, iletisimTercihi, kvkkOnay,
      createdAt,
      kaldirildi: false,
      kayitNo,
    };

    const result = await db.collection("iletisimForms").insertOne(formData);

    // Eğer DB'ye yazıldıysa MAİL GÖNDER (hem sana hem müşteriye)
    if (!result.insertedId) throw new Error("Veritabanına kayıt eklenemedi");

    // --- Sana ve ekibe giden mail ---
    await resend.emails.send({
      from: "YolcuTransferi <info@yolcutransferi.com>",
      to: ["info@yolcutransferi.com", "byhaliltayfur@hotmail.com"],
      subject: `Yeni İletişim Mesajı [${kayitNo}]`,
      html: `
        <b>Kayıt No:</b> ${kayitNo}<br/>
        <b>Ad Soyad:</b> ${ad} ${soyad}<br/>
        <b>Telefon:</b> ${telefon}<br/>
        <b>E-posta:</b> ${email}<br/>
        <b>İletişim Nedeni:</b> <b>${neden}</b><br/>
        <b>Tercih Edilen Kanal:</b> <b>${iletisimTercihi}</b><br/>
        <b>Mesaj:</b><br/><div style="margin:10px 0 14px 0; padding:10px 15px; background:#f4f4f4; border-radius:10px;">${mesaj}</div>
        <b>Tarih:</b> ${createdAt.toLocaleString("tr-TR")}
      `,
    });

    // --- Müşteriye cevap maili (kurumsal ve düzgün dil) ---
    await resend.emails.send({
      from: "YolcuTransferi <info@yolcutransferi.com>",
      to: [email],
      subject: "YolcuTransferi İletişim - Mesajınız Alındı",
      html: `
        <div style="font-size:16px;">
          <b>Sayın ${ad} ${soyad},</b><br/><br/>
          <b>${neden}</b> konulu mesajınızı uzman ekibimize ilettik.<br/>
          Tercih ettiğiniz gibi size <b>${iletisimTercihi}</b> üzerinden ulaşacağız.<br/><br/>
          <b>Kayıt No:</b> ${kayitNo}<br/>
          <b>Mesajınız:</b><br/>
          <div style="margin:10px 0 14px 0; padding:10px 15px; background:#f4f4f4; border-radius:10px;">${mesaj}</div>
          <hr style="border:0; border-top:1px solid #bfa658; margin:16px 0"/>
          7/24 VIP Yolcu Transferi için <b>YolcuTransferi.com</b> olarak her zaman yanınızdayız.<br/><br/>
          <small style="font-size:13px; color:#888;">Bu mesajı bilgi amaçlı gönderiyoruz; lütfen cevap vermeyiniz.</small>
        </div>
      `
    });

    return NextResponse.json({ success: true, kayitNo });

  } catch (err) {
    console.error("İletişim API Hatası:", err);
    return NextResponse.json({ error: err.message || "Bilinmeyen hata" }, { status: 500 });
  }
}
