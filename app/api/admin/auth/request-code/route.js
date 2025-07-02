import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Resend } from "resend";

const ADMIN_MAIL = "byhaliltayfur@hotmail.com"; // admin mail adresini buraya yaz

export async function POST(req) {
  try {
    const { email } = await req.json();
    if (email !== ADMIN_MAIL) return NextResponse.json({ error: "Bu email yetkili değil." }, { status: 401 });

    // 6 haneli random kod üret
    const code = String(Math.floor(100000 + Math.random() * 900000));
    const expiresAt = new Date(Date.now() + 1000 * 60 * 3); // 3 dakika geçerli

    // Veritabanına kaydet (email, kod, süre)
    const db = await connectToDatabase();
    await db.collection("admin_auth_codes").insertOne({
      email, code, expiresAt, used: false,
    });

    // Mail ile gönder
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "YolcuTransferi <info@yolcutransferi.com>",
      to: [email],
      subject: "YolcuTransferi Admin Giriş Kodu",
      html: `<div style="font-size:18px;">
        Giriş kodunuz: <b style="font-size:22px;letter-spacing:3px">${code}</b><br/>
        Bu kod 3 dakika geçerlidir. Kod ile admin paneline giriş yapabilirsiniz.
      </div>`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.toString() }, { status: 500 });
  }
}
