// PATH: app/api/admin/create-superadmin/route.js

import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function GET() {
  const db = await connectToDatabase();

  // Varsayılan admin
  const email = "byhaliltayfur@hotmail.com";
  const plainPassword = "Marmara1*!";
  const password = await bcrypt.hash(plainPassword, 10);

  // Eskiyi sil, yeni admin ekle (güvenli)
  await db.collection("uyeler").deleteMany({ eposta: email, tip: "admin" });

  const result = await db.collection("uyeler").insertOne({
    eposta: email,
    adsoyad: "Halil Tayfur",
    tip: "admin",
    telefon: "",
    createdAt: new Date().toISOString(),
    aktif: true,
    sifre: password
  });

  return NextResponse.json({ ok: true, id: result.insertedId });
}
