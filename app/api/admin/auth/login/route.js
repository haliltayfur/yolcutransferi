// PATH: app/api/admin/auth/login/route.js

import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { eposta, sifre } = await req.json();
  const db = await connectToDatabase();

  // Admin arıyoruz
  const uye = await db.collection("uyeler").findOne({
    eposta,
    tip: "admin"
  });

  if (!uye) {
    return NextResponse.json({ ok: false, error: "Kullanıcı bulunamadı!" }, { status: 401 });
  }

  const passwordMatch = await bcrypt.compare(sifre, uye.sifre);

  if (!passwordMatch) {
    return NextResponse.json({ ok: false, error: "Şifre hatalı!" }, { status: 401 });
  }

  // Giriş başarılı
  // Burada JWT veya session set edebilirsin, basit json döndürelim
  return NextResponse.json({
    ok: true,
    user: {
      eposta: uye.eposta,
      adsoyad: uye.adsoyad,
      rol: uye.tip,
    }
  });
}
