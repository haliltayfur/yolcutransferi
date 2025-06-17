// ✅ Dosya: app/api/kvkk/route.js
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

    const { db } = await connectToDatabase();

    const kvkkData = {
      adsoyad,
      telefon,
      eposta,
      talep,
      aciklama,
      okundu: false,
      createdAt: new Date()
    };

    await db.collection("kvkkForms").insertOne(kvkkData);

    // ✅ E-Posta bildirimi (gerekirse SMTP bilgileri .env'den alınmalı)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER, // örn: info@yolcutransferi.com
        pass: process.env.MAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: process.env.MAIL_USER,
      subject: "Yeni KVKK Başvurusu",
      html: `
        <p><strong>Ad Soyad:</strong> ${adsoyad}</p>
        <p><strong>Telefon:</strong> ${telefon || "-"}</p>
        <p><strong>E-posta:</strong> ${eposta}</p>
        <p><strong>Talep:</strong> ${talep}</p>
        <p><strong>Açıklama:</strong> ${aciklama || "-"}</p>
      `
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("KVKK kayıt hatası:", error);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
