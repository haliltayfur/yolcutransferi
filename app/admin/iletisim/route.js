// /app/api/admin/iletisim/route.js
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
  try {
    const db = await connectToDatabase();
    const forms = await db.collection("iletisimForms")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    return NextResponse.json({ forms });
  } catch (err) {
    console.error("API HATASI:", err);
    return NextResponse.json({ error: err.message || "Kayıtlar alınamadı." }, { status: 500 });
  }
}
// /app/api/admin/iletisim/route.js SONU


