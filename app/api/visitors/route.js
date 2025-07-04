// PATH: /app/api/visitors/route.js
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
  const db = await connectToDatabase();
  const today = new Date().toISOString().slice(0, 10);
  const count = await db.collection("visitors").countDocuments({ date: today });
  return NextResponse.json({ count });
}
// PATH: /app/api/visitors/route.js
