import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req) {
  // DİKKAT: "eposta" ve "sifre" olarak alıyoruz!
  const { eposta, sifre } = await req.json();
  const db = await connectToDatabase();

  const admins = await db.collection("admin_users").find({}).toArray();
  const admin = admins.find(a => (a.email || "").toLowerCase().trim() === eposta.toLowerCase().trim());

  if (!admin) {
    return NextResponse.json({ error: "Kullanıcı bulunamadı!", admins: admins.map(a => a.email) }, { status: 401 });
  }

  const match = await bcrypt.compare(sifre, admin.passwordHash);
  if (!match) {
    return NextResponse.json({ error: "Şifre hatalı!", admin: admin.email }, { status: 401 });
  }

  return NextResponse.json({ ok: true, user: { email: admin.email } });
}
