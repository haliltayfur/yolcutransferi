// PATH: /app/api/rezervasyon/route.js
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
  const db = await connectToDatabase();
  const items = await db.collection("rezervasyonlar").find({}).toArray();
  return NextResponse.json({ items });
}
// PATH: /app/api/rezervasyon/route.js
