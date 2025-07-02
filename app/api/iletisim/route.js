import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const db = await connectToDatabase();

    // Kayıt No üret
    const now = new Date();
    const dateStr = `${String(now.getDate()).padStart(2,"0")}${String(now.getMonth()+1).padStart(2,"0")}${now.getFullYear()}`;
    const countToday = await db.collection("iletisimForms").countDocuments({
      createdAt: { $gte: new Date(now.getFullYear(), now.getMonth(), now.getDate()) }
    });
    const kayitNo = `iletisim${dateStr}_${String(countToday+1).padStart(5,"0")}`;

    // DB'ye kaydet
    const yeniKayit = {
      ...body,
      createdAt: new Date(),
      kaldirildi: false,
      kayitNo,
      kvkkOnay: body.kvkkOnay === "true" || body.kvkkOnay === true
    };
    const dbResult = await db.collection("iletisimForms").insertOne(yeniKayit);

    if (!dbResult.insertedId) throw new Error("DB yazılamadı");

    // Önce info ve byhalil adresine mail at!
    await resend.emails.send({
      from: "YolcuTransferi <info@yolcutransferi.com>",
      to: ["info@yolcutransferi.com", "byhaliltayfur@hotmail.com"],
      subject: "Yeni İletişim Mesajı",
      html: `<b>Ad Soyad:</b> ${yeniKayit.ad} ${yeniKayit.soyad || ""}<br/>
             <b>Telefon:</b> ${yeniKayit.telefon}<br/>
             <b>E-posta:</b> ${yeniKayit.email}<br/>
             <b>Mesaj:</b> ${yeniKayit.mesaj}<br/>
             <b>İletişim Nedeni:</b> ${yeniKayit.neden}<br/>
             <b>Tercih:</b> ${yeniKayit.iletisimTercihi}<br/>
             <b>KVKK Onay:</b> ${yeniKayit.kvkkOnay ? "Evet" : "Hayır"}<br/>
             <b>Kayıt No:</b> ${yeniKayit.kayitNo}`
    });

    // Sonra müşteriye mail at
    await resend.emails.send({
      from: "YolcuTransferi <info@yolcutransferi.com>",
      to: [yeniKayit.email],
      subject: "Yolcu Transferi İletişim",
      html: `
      Merhaba ${yeniKayit.ad} ${yeniKayit.soyad || ""},
      <br><br>
      <b>${yeniKayit.neden}</b> konulu mesajınızı uzman ekibimize ilettik.<br>
      Tercih ettiğiniz gibi size <b>${yeniKayit.iletisimTercihi}</b> üzerinden ulaşacağız.<br><br>
      Kayıt Numaranız: <b>${yeniKayit.kayitNo}</b>
      <br><br>
      <b>Mesajınız:</b><br>
      -----------
      <br>
      ${yeniKayit.mesaj}
      <br><br>
      7/24 VIP Yolcu Transferi için Yolcutransferi.com olarak her zaman yanınızdayız.
      `
    });

    return NextResponse.json({ success: true, kayitNo });
  } catch (err) {
    console.error("Kayıt eklenirken hata:", err);
    return NextResponse.json({ error: err.toString() }, { status: 500 });
  }
}
