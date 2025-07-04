import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { email, password } = await req.json();
  const db = await connectToDatabase();

  const uye = await db.collection("uyeler").findOne({ eposta: email, tip: "admin" });
  if (!uye) {
    return NextResponse.json({ ok: false, error: "Kullanıcı bulunamadı!" }, { status: 401 });
  }

  // (Opsiyonel: kod onaylandıktan sonra işaret koyup burada kontrol edebilirsin)
  // Eğer kod onaylama sonrası '2faDone' gibi bir field set ediyorsan onu kontrol et

  const match = await bcrypt.compare(password, uye.sifre);

  if (!match) {
    return NextResponse.json({ ok: false, error: "Şifre hatalı!" }, { status: 401 });
  }

  // Giriş başarılı
  return NextResponse.json({ ok: true });
}
