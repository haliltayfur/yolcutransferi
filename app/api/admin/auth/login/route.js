import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { email, password } = await req.json();
  const db = await connectToDatabase();

  // Bütün adminleri çek
  const admins = await db.collection("admin_users").find({}).toArray();

  // Debug için response olarak dönelim
  // NOT: Canlıda bırakma! Sadece test için!
  if (!admins.length) {
    return NextResponse.json({ debug: true, error: "No admins in DB", admins }, { status: 401 });
  }

  // Büyük/küçük harf farkını ignore et
  const admin = admins.find(a => (a.email || "").toLowerCase().trim() === email.toLowerCase().trim());

  if (!admin) {
    return NextResponse.json({ debug: true, error: "Kullanıcı bulunamadı!", email, admins: admins.map(a => a.email) }, { status: 401 });
  }

  const match = await bcrypt.compare(password, admin.passwordHash);
  if (!match) {
    return NextResponse.json({ debug: true, error: "Şifre hatalı!", email, admin: admin.email }, { status: 401 });
  }

  return NextResponse.json({ ok: true, user: { email: admin.email } });
}
