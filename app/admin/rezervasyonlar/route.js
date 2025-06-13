import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const items = await db
      .collection("rezervasyonlar")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ items });
  } catch (err) {
    return NextResponse.json(
      { error: "Kayıtlar alınamadı", items: [] },
      { status: 500 }
    );
  }
}
