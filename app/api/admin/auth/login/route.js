import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { email, password } = await req.json();
  const db = await connectToDatabase();

  // Debug için loglar
  const admins = await db.collection("admin_users").find({}).toArray();
  console.log("TUM ADMINLER:", admins.map(a => a.email));
  console.log("GELEN EMAIL:", email);

  // Büyük/küçük harf ve gizli karakter uyumsuzluğunu engelle!
  const admin = await db.collection("admin_users").findOne({
    email: { $regex: new RegExp(`^${email}$`, "i") }
  });

  if (!admin) {
    console.log("ADMIN YOK!!!", email);
    return NextResponse.json({ ok: false, error: "Kullanıcı bulunamadı!" }, { status: 401 });
  }

  const match = await bcrypt.compare(password, admin.passwordHash);
  if (!match) {
    console.log("SIFRE HATALI!!!", password);
    return NextResponse.json({ ok: false, error: "Şifre hatalı!" }, { status: 401 });
  }

  console.log("GIRIS BASARILI!!!", email);
  return NextResponse.json({ ok: true, user: { email: admin.email } });
}
