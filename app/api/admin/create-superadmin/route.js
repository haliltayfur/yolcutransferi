// PATH: app/api/admin/create-superadmin/route.js

import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function GET() {
  const db = await connectToDatabase();

  const eposta = "byhaliltayfur@hotmail.com";
  const plainPassword = "Marmara1*!";
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  // Önce aynı email ile tüm adminleri sil
  await db.collection("uyeler").deleteMany({ eposta, tip: "admin" });

  // Sonra yeni admin kaydı ekle
  const result = await db.collection("uyeler").insertOne({
    eposta,
    adsoyad: "Halil Tayfur",
    tip: "admin",
    telefon: "",
    createdAt: new Date().toISOString(),
    aktif: true,
    sifre: hashedPassword
  });

  return NextResponse.json({ ok: true, id: result.insertedId });
}
