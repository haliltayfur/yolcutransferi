import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
  try {
    const db = await connectToDatabase();
    const forms = await db
      .collection("iletisimForms")
      .find({ kaldirildi: { $ne: true } })
      .sort({ createdAt: -1 })
      .limit(100)
      .toArray();
    return NextResponse.json({ forms });
  } catch (error) {
    console.error("API HATASI:", error);
    return NextResponse.json({ error: "Kayıtlar alınamadı." }, { status: 500 });
  }
}
