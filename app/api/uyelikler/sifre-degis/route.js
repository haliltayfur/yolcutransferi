// PATH: app/api/uyelikler/sifre-degis/route.js
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { sendResetPasswordMail } from "@/lib/mailUtils";
import crypto from "crypto";

export async function POST(req) {
  const { email } = await req.json();
  if (!email) return NextResponse.json({ success: false, error: "E-posta zorunlu!" });
  const db = await connectToDatabase();
  // Random şifre
  const newPass = crypto.randomBytes(4).toString("hex");
  const result = await db.collection("uyeler").updateOne(
    { email },
    { $set: { sifre: newPass } }
  );
  if (result.matchedCount > 0) {
    await sendResetPasswordMail(email, newPass);
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ success: false, error: "Kullanıcı bulunamadı" });
}
// PATH: app/api/uyelikler/sifre-degis/route.js
