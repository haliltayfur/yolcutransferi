import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(req) {
  try {
    const { email, code } = await req.json();
    const db = await connectToDatabase();
    const kayit = await db.collection("admin_auth_codes").findOne({
      email,
      code,
      used: false,
      expiresAt: { $gte: new Date() }
    });

    if (!kayit) return NextResponse.json({ error: "Kod geçersiz veya süresi dolmuş." }, { status: 401 });

    // Kodu kullanılmış olarak işaretle
    await db.collection("admin_auth_codes").updateOne({ _id: kayit._id }, { $set: { used: true } });

    // JWT veya Cookie (basit örnek, gerçek projede httpOnly cookie önerilir)
    // Şimdilik basit token dönüyorum:
    return NextResponse.json({ success: true, token: "admin-girisi-dogrulandi" });
  } catch (err) {
    return NextResponse.json({ error: err.toString() }, { status: 500 });
  }
}
