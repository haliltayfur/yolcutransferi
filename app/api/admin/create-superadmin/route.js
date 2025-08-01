// PATH: app/api/admin/create-superadmin/route.js

import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function GET() {
  const db = await connectToDatabase();

  const email = "byhaliltayfur@hotmail.com";
  const plainPassword = "Marmara1*!";
  const passwordHash = await bcrypt.hash(plainPassword, 10);

  // Eski kayıtları sil
  await db.collection("admin_users").deleteMany({ email });

  // Yeni admin oluştur
  const result = await db.collection("admin_users").insertOne({
    email,
    passwordHash,
    createdAt: new Date()
  });

  return NextResponse.json({ ok: true, id: result.insertedId });
}
