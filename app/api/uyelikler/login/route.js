//app/api/uyelikler/login/route.js
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { email, sifre } = await req.json();
  const db = await connectToDatabase();
  const user = await db.collection("uyelikler").findOne({ email });
  if (!user) return NextResponse.json({ success: false, error: "Kullanıcı yok." }, { status: 401 });
  const ok = await bcrypt.compare(sifre, user.passwordHash);
  if (!ok) return NextResponse.json({ success: false, error: "Şifre hatalı." }, { status: 401 });
  // Mailine kod gönder (simulate)
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  await db.collection("uyelik_kodlari").updateOne(
    { email },
    { $set: { code, expires: Date.now() + 5 * 60 * 1000 } },
    { upsert: true }
  );
  // Mail gönderimini ekleyebilirsin (opsiyon)
  return NextResponse.json({ success: true, kod: code }); // prod için kodu gönderme!
}
//app/api/uyelikler/login/route.js
