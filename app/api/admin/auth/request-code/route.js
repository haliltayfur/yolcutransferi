import { NextResponse } from "next/server";
import { Resend } from "resend";

// Yalnızca bu mailler giriş yapabilir!
const allowedEmails = [
  "info@yolcutransferi.com",
  "byhaliltayfur@hotmail.com"
];

const CODE_TIMEOUT = 5 * 60 * 1000; // 5 dakika

// Kodu geçici saklamak için (gerçek projede DB ya da cache kullanılır)
const codes = {};

export async function POST(req) {
  const { email } = await req.json();
  if (!allowedEmails.includes(email)) {
    return NextResponse.json({ success: false, error: "Bu email yetkili değil." }, { status: 403 });
  }
  // Kod oluştur
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  codes[email] = { code, expires: Date.now() + CODE_TIMEOUT };
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

// Export kodları testte görmek için (prod'da silin!)
export { codes };
