import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
  try {
    const db = await connectToDatabase();
    const forms = await db.collection("kvkkForms").find().sort({ createdAt: -1 }).toArray();
    return NextResponse.json(forms);
  } catch (error) {
    console.error("KVKK FORMS HATASI:", error);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
