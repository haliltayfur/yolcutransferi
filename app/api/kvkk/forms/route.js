// ✅ Dosya: app/api/kvkk/forms/route.js
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const forms = await db
      .collection("kvkkForms")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(
      forms.map((f) => ({ ...f, _id: f._id.toString() }))
    );
  } catch (error) {
    console.error("KVKK form getirme hatası:", error);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
