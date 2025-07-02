import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();

    const db = await connectToDatabase();
    const now = new Date();
    const dateStr = `${String(now.getDate()).padStart(2,"0")}${String(now.getMonth()+1).padStart(2,"0")}${now.getFullYear()}`;
    const countToday = await db.collection("iletisimForms").countDocuments({
      createdAt: { $gte: new Date(now.getFullYear(), now.getMonth(), now.getDate()) }
    });
    const kayitNo = `iletisim${dateStr}_${String(countToday+1).padStart(5,"0")}`;

    const yeniKayit = {
      ...body,
      createdAt: new Date(),
      kaldirildi: false,
      kayitNo,
      kvkkOnay: body.kvkkOnay === "true" || body.kvkkOnay === true
    };

    await db.collection("iletisimForms").insertOne(yeniKayit);

    // Mail gönder
    await resend.emails.send({
      from: "YolcuTransferi <info@yolcutransferi.com>",
      to: [
        "info@yolcutransferi.com",
        "byhaliltayfur@hotmail.com",
        body.email
      ],
      subject: "YolcuTransferi.com İletişim Mesajı Alındı",
      html: `
        <b>Sayın ${body.ad} ${body.soyad || ""},</b><br>
        YolcuTransferi.com iletişim sayfasından gönderdiğiniz mesaj alınmıştır.<br>
        En kısa sürede tercihinize uygun kanaldan dönüş sağlanacaktır.<br><br>
        <b>Mesajınız:</b><br>${body.mesaj}<br><hr>
        <b>Kayıt No:</b> ${kayitNo}<br>
        <b>Telefon:</b> ${body.telefon}<br>
        <b>E-posta:</b> ${body.email}<br>
        <b>İletişim Nedeni:</b> ${body.neden}<br>
        <b>Tercih:</b> ${body.iletisimTercihi}<br>
        <b>KVKK Onay:</b> ${yeniKayit.kvkkOnay ? "Evet" : "Hayır"}<br>
        <br>YolcuTransferi.com ekibi
      `
    });

    return NextResponse.json({ success: true, kayitNo });
  } catch (err) {
    return NextResponse.json({ error: err.toString() }, { status: 500 });
  }
}
