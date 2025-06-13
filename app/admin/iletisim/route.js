import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const forms = await db
      .collection("iletisim_formlari")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ forms });
  } catch (err) {
    return NextResponse.json(
      { error: "Kayıtlar alınamadı", forms: [] },
      { status: 500 }
    );
  }
}
