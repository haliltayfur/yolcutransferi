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

    const db = await connectToDatabase();

    await db.collection("kvkkForms").insertOne({
      adsoyad,
      telefon,
      eposta,
      talep,
      aciklama,
      createdAt: new Date(),
      okundu: false,
    });

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: process.env.MAIL_USER,
      subject: "Yeni KVKK Başvurusu",
      html: `
        <p><strong>Ad Soyad:</strong> ${adsoyad}</p>
        <p><strong>Telefon:</strong> ${telefon}</p>
        <p><strong>Eposta:</strong> ${eposta}</p>
        <p><strong>Talep:</strong> ${talep}</p>
        <p><strong>Açıklama:</strong> ${aciklama}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("KVKK API hatası:", err);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
