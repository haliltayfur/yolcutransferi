// PATH: app/api/uyelikler/login/route.js

import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { email, sifre } = await req.json();
  const db = await connectToDatabase();

  // "uyeler" koleksiyonunda email ile kullanıcı ara
  const uye = await db.collection("uyeler").findOne({ email });

  if (!uye) {
    return NextResponse.json({ error: "Kullanıcı yok" }, { status: 401 });
  }

  const match = await bcrypt.compare(sifre, uye.sifre);
  if (!match) {
    return NextResponse.json({ error: "Şifre hatalı" }, { status: 401 });
  }

  return NextResponse.json({ ok: true, user: { email: uye.email, tip: uye.tip } });
}
