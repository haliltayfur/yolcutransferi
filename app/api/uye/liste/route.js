// /app/api/uye/liste/route.js
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
  const db = await connectToDatabase();
  const uyeler = await db.collection("uyeler").find({}).toArray();
  // Tarih sırası yeni üye üstte
  uyeler.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return NextResponse.json({ uyeler });
}
// /app/api/uye/liste/route.js
