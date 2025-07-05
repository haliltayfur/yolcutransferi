// PATH: app/api/uyelikler/sifre-degis/route.js
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { sendResetPasswordMail } from "@/lib/mailUtils";
import crypto from "crypto";

export async function POST(req) {
  const { email, sifre } = await req.json();
  if (!email) return NextResponse.json({ success: false, error: "E-posta zorunlu!" });
  const db = await connectToDatabase();
  let newPass = sifre;
  if (!sifre) newPass = crypto.randomBytes(4).toString("hex");
  const result = await db.collection("uyeler").updateOne(
    { email },
    { $set: { sifre: newPass } }
  );
  if (result.matchedCount > 0) {
    // Elle girilmiş şifre ise mail gönderme!
    if (!sifre) await sendResetPasswordMail(email, newPass);
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ success: false, error: "Kullanıcı bulunamadı" });
}
// PATH: app/api/uyelikler/sifre-degis/route.js
