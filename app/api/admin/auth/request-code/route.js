//app/api/admin/auth/request-code/route.js
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { connectToDatabase } from "@/lib/mongodb"; // kendi connection fonksiyonunu kullan!

const allowedEmails = [
  "info@yolcutransferi.com",
  "byhaliltayfur@hotmail.com"
];
const CODE_TIMEOUT = 5 * 60 * 1000; // 5 dakika

export async function POST(req) {
  const { email } = await req.json();
  if (!allowedEmails.includes(email)) {
    return NextResponse.json({ success: false, error: "Bu email yetkili değil." }, { status: 403 });
  }
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  // Kod veritabanına yazılıyor
  const db = await connectToDatabase();
  await db.collection("admin_codes").updateOne(
    { email },
    { $set: { code, expires: Date.now() + CODE_TIMEOUT } },
    { upsert: true }
  );

  // Mail gönder
  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: "YolcuTransferi Admin <info@yolcutransferi.com>",
    to: [email],
    subject: "Admin Panel Giriş Kodu",
    html: `<div style="font-size:18px;font-family:Arial">
      Admin giriş kodunuz: <b style="font-size:22px">${code}</b>
      <br><br>Kod <b>5 dakika</b> geçerlidir.
    </div>`
  });

  return NextResponse.json({ success: true });
}
//app/api/admin/auth/request-code/route.js
