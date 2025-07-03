// PATH: app/api/admin/auth/verify-password/route.js
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { email, password } = await req.json();
  const db = await connectToDatabase();
  const admin = await db.collection("admin_users").findOne({ email });

  if (!admin) return NextResponse.json({ success: false, error: "Yetkisiz." }, { status: 401 });

  const isValid = await bcrypt.compare(password, admin.passwordHash);
  if (!isValid) return NextResponse.json({ success: false, error: "Şifre yanlış." }, { status: 401 });

  return NextResponse.json({ success: true });
}
// PATH: app/api/admin/auth/verify-password/route.js
