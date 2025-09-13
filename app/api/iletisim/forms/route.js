// /app/api/iletisim/forms/route.js
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const env = process.env.VERCEL_ENV || process.env.NODE_ENV || "unknown";
  const dbName = process.env.MONGODB_DB || "yolcutransferi";

  try {
    const db = await connectToDatabase();

    const forms = await db
      .collection("iletisimForms")
      .find({ kaldirildi: { $ne: true } })
      .sort({ createdAt: -1 })
      .limit(100)
      .toArray();

    return NextResponse.json(
      { env, dbName, count: forms.length, forms },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("API HATASI (/api/iletisim/forms):", error);
    return NextResponse.json(
      { env, dbName, error: "Kayıtlar alınamadı." },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
