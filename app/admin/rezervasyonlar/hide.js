// app/api/admin/rezervasyonlar/hide.js
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const hide = searchParams.get("hide") === "1";
  if (!id) return NextResponse.json({ error: "ID zorunlu" }, { status: 400 });

  const db = await connectToDatabase();
  await db.collection("rezervasyonlar").updateOne(
    { _id: new ObjectId(id) },
    { $set: { hidden: hide } }
  );

  return NextResponse.json({ ok: true });
}
