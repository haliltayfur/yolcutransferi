//app/api/admin/auth/change-password/route.js
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { oldPassword, newPassword } = await req.json();
  // Giriş yapan kullanıcının e-mailini localStorage'dan çekebilirsin (gelişmiş için JWT ile)
  // Basitlik için ilk admin'i kullanalım:
  const email = "info@yolcutransferi.com";

  const db = await connectToDatabase();
  const admin = await db.collection("admin_users").findOne({ email });

  if (!admin) {
    return NextResponse.json({ success: false, error: "Kullanıcı yok." }, { status: 401 });
  }
  const isValid = await bcrypt.compare(oldPassword, admin.passwordHash);
  if (!isValid) {
    return NextResponse.json({ success: false, error: "Mevcut şifre hatalı." }, { status: 401 });
  }

  const newHash = await bcrypt.hash(newPassword, 10);
  await db.collection("admin_users").updateOne({ email }, { $set: { passwordHash: newHash } });

  return NextResponse.json({ success: true });
}
//app/api/admin/auth/change-password/route.js
