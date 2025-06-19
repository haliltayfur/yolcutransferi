import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
  try {
    const db = await connectToDatabase();
    const forms = await db.collection("iletisimForms")
      .find()
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(forms);
  } catch (error) {
    console.error("❌ İletişim form verileri alınamadı:", error);
    return NextResponse.json({ error: "Veri alınamadı" }, { status: 500 });
  }
}
