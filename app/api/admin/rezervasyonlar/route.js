// /app/api/admin/rezervasyonlar/route.js
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const showHidden = searchParams.get("showHidden") === "true";
    const db = await connectToDatabase();
    const filter = showHidden ? {} : { hide: { $ne: true } };
    const items = await db
      .collection("rezervasyonlar")
      .find(filter)
      .sort({ createdAt: -1 })
      .toArray();
    return NextResponse.json({ items });
  } catch (err) {
    return NextResponse.json({ error: err?.toString() || "Hata" }, { status: 500 });
  }
}

export async function POST(req) {
  const rezervasyon = await req.json();
  const db = await connectToDatabase();
  rezervasyon.createdAt = new Date();
  await db.collection("rezervasyonlar").insertOne(rezervasyon);
  return NextResponse.json({ ok: true });
}

export async function PATCH(req) {
  try {
    const body = await req.json();
    const { id, hide } = body;
    if (!id) return NextResponse.json({ error: "ID zorunlu" }, { status: 400 });
    const db = await connectToDatabase();
    await db.collection("rezervasyonlar").updateOne(
      { _id: new ObjectId(id) },
      { $set: { hide: !!hide } }
    );
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: err?.toString() || "Hata" }, { status: 500 });
  }
}
