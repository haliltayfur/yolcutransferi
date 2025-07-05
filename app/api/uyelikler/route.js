// PATH: app/api/uyelikler/route.js
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { sendWelcomeMail } from "@/lib/mailUtils";

// Dinamik üye no algoritması
function generateUyeno(tip, ad = "", firmaAdi = "") {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(-2);
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  let base = "";
  if (tip === "musteri") base = `musteri${dd}${mm}${yy}1`;
  else if (tip === "sofor") base = `sofor${dd}${mm}${yy}69`;
  else if (tip === "firma") base = (firmaAdi ? firmaAdi.replace(/\s+/g, "").toLowerCase() : "firma") + `${dd}${mm}${yy}5`;
  else if (tip === "isbirligi") base = `isbirligi${dd}${mm}${yy}31`;
  else base = `uye${dd}${mm}${yy}`;
  // Son 4 rakam random
  return `${base}${Math.floor(1000 + Math.random() * 9000)}`;
}

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

  // Üye no üret
  const uyeno = generateUyeno(body.tip, body.ad, body.firmaAdi);
  const { insertedId } = await db.collection("uyeler").insertOne({ ...body, uyeno });
  if (insertedId && body.email) {
    await sendWelcomeMail(body.email, body.ad, body.soyad, uyeno);
  }
  return NextResponse.json({ success: !!insertedId });
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ success: false, error: "ID zorunlu!" });
  const db = await connectToDatabase();
  const result = await db.collection("uyeler").deleteOne({ _id: new ObjectId(id) });
  return NextResponse.json({ success: result.deletedCount > 0 });
}
// PATH: app/api/uyelikler/route.js
