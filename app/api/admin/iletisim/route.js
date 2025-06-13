import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../lib/mongodb";

export async function GET() {
  try {
    const db = await connectToDatabase();
    const forms = await db.collection("iletisim").find().sort({ createdAt: -1 }).toArray();
    return NextResponse.json({ forms });
  } catch (error) {
    console.error("API HATASI:", error);   // BU SATIRI EKLE
    return NextResponse.json({ error: "Kayıtlar alınamadı." }, { status: 500 });
  }
}
