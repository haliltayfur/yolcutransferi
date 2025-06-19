import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const body = await request.json();
    const { adsoyad, telefon, eposta, talep, aciklama } = body;

    if (!adsoyad || !eposta || !talep) {
      return NextResponse.json({ error: "Eksik bilgi" }, { status: 400 });
    }

    // MongoDB'ye kayıt
    const db = await connectToDatabase();
    await db.collection("kvkkForms").insertOne({
      adsoyad,
      telefon,
      eposta,
      talep,
      aciklama,
      createdAt: new Date(),
    });

    // Mail ayarı
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // Alıcıları burada açıkça belirtiyoruz
    const mailRecipients = [
      "info@yolcutransferi.com",
      "byhaliltayfur@hotmail.com"
    ];

    await transporter.sendMail({
      from: `"YolcuTransferi KVKK" <${process.env.MAIL_USER}>`,
      to: mailRecipients,
      subject: "Yeni KVKK Başvurusu",
      html: `
        <div style="font-family:sans-serif; font-size:15px;">
          <p><strong>Ad Soyad:</strong> ${adsoyad}</p>
          <p><strong>Telefon:</strong> ${telefon || '-'}</p>
          <p><strong>E-posta:</strong> ${eposta}</p>
          <p><strong>Talep Türü:</strong> ${talep}</p>
          <p><strong>Açıklama:</strong><br/>${aciklama || '-'}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("KVKK POST HATASI:", err);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
