//app/api/admin/auth/verify-code/route.js
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb"; // senin kodun

export async function POST(req) {
  const { email, code } = await req.json();
  const db = await connectToDatabase();
  const entry = await db.collection("admin_codes").findOne({ email });

  if (!entry) {
    return NextResponse.json({ success: false, error: "Kod bulunamadı veya süresi dolmuş." }, { status: 400 });
  }
  if (entry.code !== code) {
    return NextResponse.json({ success: false, error: "Kod yanlış." }, { status: 401 });
  }
  if (Date.now() > entry.expires) {
    await db.collection("admin_codes").deleteOne({ email });
    return NextResponse.json({ success: false, error: "Kodun süresi dolmuş." }, { status: 400 });
  }
  // Kod doğrulandıktan sonra sil
  await db.collection("admin_codes").deleteOne({ email });
  return NextResponse.json({ success: true });
}
//app/api/admin/auth/verify-code/route.js
