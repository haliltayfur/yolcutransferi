import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import nodemailer from "nodemailer";

export async function POST(req) {
  const { email } = await req.json();
  const db = await connectToDatabase();

  const uye = await db.collection("uyeler").findOne({ eposta: email, tip: "admin" });
  if (!uye) {
    return NextResponse.json({ ok: false, error: "Yetkili admin değil." }, { status: 403 });
  }

  // 6 haneli random kod
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  // 5 dakika geçerli
  const expiresAt = Date.now() + 5 * 60 * 1000;

  await db.collection("uyeler").updateOne(
    { _id: uye._id },
    { $set: { kod: code, kodExpire: expiresAt } }
  );

  // MAIL GÖNDER (örnek transporter)
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "seninmail@gmail.com",
      pass: "app-password"
    }
  });

  await transporter.sendMail({
    from: '"Admin Güvenlik" <seninmail@gmail.com>',
    to: email,
    subject: "YolcuTransferi.com Admin Giriş Kodu",
    text: `Giriş kodunuz: ${code}\nKod 5 dakika geçerlidir.`
  });

  return NextResponse.json({ ok: true });
}
