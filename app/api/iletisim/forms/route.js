import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req) {
  const url = new URL(req.url, "http://localhost");
  const showRemoved = url.searchParams.get("showRemoved") === "true";
  const db = await connectToDatabase();
  const query = showRemoved ? {} : { kaldirildi: { $ne: true } };
  const forms = await db.collection("iletisimForms").find(query).sort({ createdAt: -1 }).toArray();
  return NextResponse.json(forms);
}

export async function PATCH(req) {
  const { id, kaldirildi } = await req.json();
  const db = await connectToDatabase();
  await db.collection("iletisimForms").updateOne(
    { _id: new ObjectId(id) },
    { $set: { kaldirildi } }
  );
  return NextResponse.json({ success: true });
}
