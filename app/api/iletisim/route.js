import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();

    // Gerekli alanlar:
    const { ad, soyad, telefon, email, neden, mesaj, iletisimTercihi, kvkkOnay } = body;
    if (!ad || !soyad || !telefon || !email || !neden || !mesaj || !iletisimTercihi || !kvkkOnay)
      return NextResponse.json({ error: "Eksik alanlar var." }, { status: 400 });

    // Kayıt no üret
    const now = new Date();
    const dateStr = `${String(now.getDate()).padStart(2, "0")}${String(now.getMonth() + 1).padStart(2, "0")}${now.getFullYear()}`;
    const db = await connectToDatabase();
    const countToday = await db.collection("iletisimForms").countDocuments({
      createdAt: { $gte: new Date(now.getFullYear(), now.getMonth(), now.getDate()) }
    });
    const kayitNo = `iletisim${dateStr}_${String(countToday + 1).padStart(5, "0")}`;

    // DB'ye yaz
    const yeniKayit = {
      ad,
      soyad,
      telefon,
      email,
      neden,
      mesaj,
      iletisimTercihi,
      kvkkOnay: !!kvkkOnay,
      kayitNo,
      kaldirildi: false,
      createdAt: new Date()
    };
    await db.collection("iletisimForms").insertOne(yeniKayit);

    // Adminlere mail
    await resend.emails.send({
      from: "YolcuTransferi <info@yolcutransferi.com>",
      to: ["info@yolcutransferi.com", "byhaliltayfur@hotmail.com"],
      subject: "Yeni İletişim Mesajı",
      html: `<b>Ad Soyad:</b> ${ad} ${soyad}<br/>
        <b>Telefon:</b> ${telefon}<br/>
        <b>E-posta:</b> ${email}<br/>
        <b>Mesaj:</b> ${mesaj}<br/>
        <b>İletişim Nedeni:</b> <b>${neden}</b><br/>
        <b>Tercih:</b> <b>${iletisimTercihi}</b><br/>
        <b>KVKK Onay:</b> ${kvkkOnay ? "Evet" : "Hayır"}<br/>
        <b>Kayıt No:</b> ${kayitNo}`
    });

    // Müşteriye otomatik cevap
    await resend.emails.send({
      from: "YolcuTransferi <info@yolcutransferi.com>",
      to: [email],
      subject: "Yolcu Transferi İletişim",
      html: `<b>${neden}</b> konulu mesajınızı ekibimize ilettik.<br/>
        Tercih ettiğiniz gibi size <b>${iletisimTercihi}</b> üzerinden ulaşacağız.<br/>
        <br/>
        <b>Kayıt No:</b> ${kayitNo}<br/>
        <b>Mesajınız:</b><br/>
        <div style="background:#f7f3e4;padding:8px 12px;border-radius:10px;border:1px solid #ede5bb;color:#3d3621;">${mesaj}</div>
        <br/>
        7/24 VIP Yolcu Transferi için YolcuTransferi.com olarak her zaman yanınızdayız.`
    });

    return NextResponse.json({ success: true, kayitNo });
  } catch (err) {
    console.error("Kayıt eklenirken hata:", err);
    return NextResponse.json({ error: err.toString() }, { status: 500 });
  }
}
