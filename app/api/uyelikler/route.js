//app/api/uyelikler/route.js
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

// Tüm üyeler (list/get)
export async function GET() {
  const db = await connectToDatabase();
  const items = await db.collection("uyelikler").find({}).toArray();
  return NextResponse.json({ items });
}

// Yeni üye (register)
export async function POST(req) {
  const body = await req.json();
  // Şifreyi hashle
  const passwordHash = await bcrypt.hash(body.sifre, 10);
  const user = {
    tip: body.tip || "musteri",
    ad: body.ad || "",
    soyad: body.soyad || "",
    email: body.email,
    passwordHash,
    il: body.il || "",
    telefon: body.telefon || "",
    createdAt: new Date(),
  };
  const db = await connectToDatabase();
  await db.collection("uyelikler").insertOne(user);
  return NextResponse.json({ success: true });
}
//app/api/uyelikler/route.js
