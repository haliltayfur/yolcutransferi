// PATH: app/api/uyelikler/route.js

import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

// Üyeleri listele (GET)
export async function GET() {
  const db = await connectToDatabase();
  const items = await db.collection("uyeler").find({}).toArray();
  return NextResponse.json({ items });
}

// Üye kayıt (POST)
export async function POST(req) {
  const { tip, ad, soyad, email, sifre, telefon, il } = await req.json();
  const db = await connectToDatabase();

  if (!email || !sifre) {
    return NextResponse.json({ success: false, error: "E-posta ve şifre zorunlu!" }, { status: 400 });
  }

  // Daha önce kayıtlı mı?
  const exists = await db.collection("uyeler").findOne({ email });
  if (exists) {
    return NextResponse.json({ success: false, error: "Bu e-posta ile daha önce kayıt olunmuş!" }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(sifre, 10);

  const result = await db.collection("uyeler").insertOne({
    tip,
    ad,
    soyad,
    email,
    sifre: passwordHash,
    telefon,
    il,
    createdAt: new Date()
  });

  return NextResponse.json({ success: true, id: result.insertedId });
}
