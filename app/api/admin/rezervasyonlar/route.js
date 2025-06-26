// app/api/admin/rezervasyonlar/route.js
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
  try {
    const db = await connectToDatabase();
    const items = await db.collection("rezervasyonlar")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    return NextResponse.json({ items });
  } catch (err) {
    return NextResponse.json({ error: err.toString() }, { status: 500 });
  }
}
