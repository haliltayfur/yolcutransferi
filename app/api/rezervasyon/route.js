//app/api/rezervasyon/route.js
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

// Tüm rezervasyonları listele
export async function GET() {
  const db = await connectToDatabase();
  const items = await db.collection("rezervasyonlar").find({}).toArray();
  return NextResponse.json({ items });
}

// Yeni rezervasyon ekle
export async function POST(req) {
  const body = await req.json();
  const rezerv = {
    musteriEmail: body.musteriEmail,
    nereden: body.nereden,
    nereye: body.nereye,
    tutar: Number(body.tutar),
    odemeDurumu: body.odemeDurumu || "beklemede", // "tamamlandi"
    transferTarihi: new Date(body.transferTarihi),
    createdAt: new Date(),
    aracTipi: body.aracTipi || "",
    musteriTipi: body.musteriTipi || "",
  };
  const db = await connectToDatabase();
  await db.collection("rezervasyonlar").insertOne(rezerv);
  return NextResponse.json({ success: true });
}
//app/api/rezervasyon/route.js
