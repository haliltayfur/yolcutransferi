//app/api/visitors/route.js
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(req) {
  // Ziyaretçi IP’sini yakala (X-Forwarded-For, client başlığı)
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0] ||
    req.headers.get("x-real-ip") ||
    req.headers.get("host") || "bilinmiyor";
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const db = await connectToDatabase();
  await db.collection("visitors").updateOne(
    { ip, date: today.toISOString() },
    { $set: { ip, date: today.toISOString(), createdAt: new Date() } },
    { upsert: true }
  );
  return NextResponse.json({ ok: true });
}

export async function GET(req) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const db = await connectToDatabase();
  const count = await db.collection("visitors").countDocuments({ date: today.toISOString() });
  return NextResponse.json({ count });
}
//app/api/visitors/route.js
