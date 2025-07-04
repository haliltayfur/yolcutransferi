// PATH: app/api/admin/auth/login/route.js

import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { email, password } = await req.json();
  const db = await connectToDatabase();

  // admin_users koleksiyonunda email ile admin ara
  const admin = await db.collection("admin_users").findOne({ email });

  if (!admin) {
    return NextResponse.json({ ok: false, error: "Kullanıcı bulunamadı!" }, { status: 401 });
  }

  const match = await bcrypt.compare(password, admin.passwordHash);
  if (!match) {
    return NextResponse.json({ ok: false, error: "Şifre hatalı!" }, { status: 401 });
  }

  // Giriş başarılı
  return NextResponse.json({ ok: true, user: { email: admin.email } });
}
