// /app/api/uye/sil-dogrula/route.js
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req) {
  const body = await req.json();
  const { uyeNo, kod, email } = body;
  const db = await connectToDatabase();

  // Kodun geçerliliğini kontrol et
  const kayit = await db.collection("silme_kodlari").findOne({
    uyeNo,
    code: kod,
    expiresAt: { $gt: new Date() },
  });

  if (!kayit) {
    return NextResponse.json({ success: false, error: "Kod geçersiz veya süresi doldu." });
  }

  // Üyeyi sil
  await db.collection("uyeler").deleteOne({ uyeNo });

  // Kod kaydını da sil (güvenlik için)
  await db.collection("silme_kodlari").deleteMany({ uyeNo });

  return NextResponse.json({ success: true });
}
// /app/api/uye/sil-dogrula/route.js
