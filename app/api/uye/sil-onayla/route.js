// /app/api/uye/sil-onayla/route.js
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import nodemailer from "nodemailer";

function randomCode(len = 6) {
  return String(Math.floor(100000 + Math.random() * 900000)).substring(0, len);
}

export async function POST(req) {
  const body = await req.json();
  const { uyeNo, ad, email, tip, telefon } = body;
  const code = randomCode();
  const db = await connectToDatabase();

  // Kodları DB'ye kaydet, 10dk geçerli olacak şekilde.
  await db.collection("silme_kodlari").insertOne({
    uyeNo,
    code,
    email,
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 10 * 60000),
  });

  // Mail gönderilecek adresler
  const to = ["info@yolcutransferi.com", "byhaliltayfur@hotmail.com"];

  // Basit SMTP transporter (Gmail veya başka SMTP'ye göre ayarla)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER, // .env'den çek!
      pass: process.env.SMTP_PASS,
    },
  });

  const subject = `YolcuTransferi.com Üye Silme Onay Kodu (${uyeNo})`;
  const html = `
    <b>Üye Silme Talebi</b><br/>
    <b>Üye No:</b> ${uyeNo}<br/>
    <b>Ad:</b> ${ad}<br/>
    <b>E-posta:</b> ${email}<br/>
    <b>Tip:</b> ${tip}<br/>
    <b>Telefon:</b> ${telefon}<br/>
    <br/>
    <b>Doğrulama Kodu:</b> <span style="font-size:1.6em;letter-spacing:0.15em">${code}</span><br/>
    <small>Kod 10 dakika geçerlidir.</small>
  `;
  try {
    await transporter.sendMail({
      from: `"YolcuTransferi.com" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });
  } catch (e) {
    return NextResponse.json({ success: false, error: "Mail gönderilemedi." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
// /app/api/uye/sil-onayla/route.js
