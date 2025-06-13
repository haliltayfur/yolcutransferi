import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

// GET /api/admin/iletisim
export async function GET() {
  try {
    const db = await connectToDatabase();
    const forms = await db.collection("iletisim").find().sort({ createdAt: -1 }).toArray();
    return NextResponse.json({ forms });
  } catch (error) {
    return NextResponse.json({ error: "Kayıtlar alınamadı." }, { status: 500 });
  }
}
