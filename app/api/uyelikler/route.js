// PATH: /app/api/uyelikler/route.js
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
  const db = await connectToDatabase();
  const items = await db.collection("uyeler").find({}).toArray();
  return NextResponse.json({ items });
}
// PATH: /app/api/uyelikler/route.js
