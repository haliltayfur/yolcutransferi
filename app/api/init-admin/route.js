// PATH: app/api/init-admin/route.js
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function GET() {
  const db = await connectToDatabase();

  const passwordHash = await bcrypt.hash("Marmara1*!", 10);
  
  const admins = [
    { email: "info@yolcutransferi.com", passwordHash, createdAt: new Date() },
    { email: "byhaliltayfur@hotmail.com", passwordHash, createdAt: new Date() }
  ];

  try {
    await db.collection("admin_users").deleteMany({
      email: { $in: ["info@yolcutransferi.com", "byhaliltayfur@hotmail.com"] }
    });

    await db.collection("admin_users").insertMany(admins);

    return NextResponse.json({ success: true, message: "Admin kullanıcılar başarıyla oluşturuldu." });
  } catch (e) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}
// PATH: app/api/init-admin/route.js
