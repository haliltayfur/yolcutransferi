// PATH: app/api/uyelikler/route.js
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { sendWelcomeMail } from "@/lib/mailUtils"; // Bunu ekle!

export async function GET() {
  const db = await connectToDatabase();
  const items = await db.collection("uyeler").find({}).toArray();
  return NextResponse.json({ items });
}

export async function POST(req) {
  const body = await req.json();
  const db = await connectToDatabase();
  // Email ile kayıt varsa tekrar oluşturma!
  const exists = await db.collection("uyeler").findOne({ email: body.email });
  if (exists) return NextResponse.json({ success: false, error: "Bu e-posta ile üye zaten var!" });
  const { insertedId } = await db.collection("uyeler").insertOne(body);
  if (insertedId && body.email) {
    // HOŞ GELDİN MAILİ!
    await sendWelcomeMail(body.email, body.ad, body.soyad);
  }
  return NextResponse.json({ success: !!insertedId });
}

// DELETE: /api/uyelikler?id=xxx
export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ success: false, error: "ID zorunlu!" });
  const db = await connectToDatabase();
  const result = await db.collection("uyeler").deleteOne({ _id: new ObjectId(id) });
  return NextResponse.json({ success: result.deletedCount > 0 });
}
// PATH: app/api/uyelikler/route.js
