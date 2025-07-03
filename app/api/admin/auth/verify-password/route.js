import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// (Gerçekte DB'de olmalı! Şimdilik basit demo için dosya içi hash)
const ADMIN_EMAIL = "info@yolcutransferi.com";
// Senin belirlediğin şifreyi bcrypt ile hashleyip şuraya ekle.
// ÖRNEK ŞİFRE: "Halil123!"
const ADMIN_HASH = "$2a$10$8FMwB2XSh2cYos0XeUYsKOJk1J1N50zsl2ZkyR1bFZolF0txBhZ8u"; // 

export async function POST(req) {
  const { email, password } = await req.json();
  if (email !== ADMIN_EMAIL) {
    return NextResponse.json({ success: false, error: "Yetkisiz." }, { status: 401 });
  }
  const isValid = await bcrypt.compare(password, ADMIN_HASH);
  if (!isValid) {
    return NextResponse.json({ success: false, error: "Şifre hatalı." }, { status: 401 });
  }
  return NextResponse.json({ success: true });
}
