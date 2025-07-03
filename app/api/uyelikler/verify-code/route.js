//app/api/uyelikler/verify-code/route.js
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(req) {
  const { email, code } = await req.json();
  const db = await connectToDatabase();
  const rec = await db.collection("uyelik_kodlari").findOne({ email });
  if (!rec || rec.code !== code || Date.now() > rec.expires) {
    return NextResponse.json({ success: false, error: "Kod yanlış ya da süresi dolmuş." }, { status: 401 });
  }
  await db.collection("uyelik_kodlari").deleteOne({ email });
  return NextResponse.json({ success: true });
}
//app/api/uyelikler/verify-code/route.js
