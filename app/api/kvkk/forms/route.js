import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// Tarihe göre kayıtNo üret
function tarihKodu() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  return `kvkk${yyyy}${mm}${dd}_`;
}
async function nextKayitNo(db, dateCode) {
  const regex = new RegExp("^" + dateCode);
  const count = await db.collection("kvkkForms").countDocuments({ kayitNo: { $regex: regex } });
  return dateCode + String(count + 1).padStart(5, "0");
}

// GET
export async function GET(req) {
  const url = new URL(req.url, "http://localhost");
  const showRemoved = url.searchParams.get("showRemoved") === "true";
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const pageSize = parseInt(url.searchParams.get("pageSize") || "25", 10);
  const db = await connectToDatabase();
  const query = showRemoved ? {} : { kaldirildi: { $ne: true } };
  const total = await db.collection("kvkkForms").countDocuments(query);
  const items = await db.collection("kvkkForms")
    .find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .toArray();
  return NextResponse.json({ items, total });
}

// PATCH (Kaldır/Geri al)
export async function PATCH(req) {
  const { id, kaldirildi } = await req.json();
  const db = await connectToDatabase();
  await db.collection("kvkkForms").updateOne(
    { _id: new ObjectId(id) },
    { $set: { kaldirildi: !!kaldirildi } }
  );
  return NextResponse.json({ success: true });
}

// POST (Kayıt ekle)
export async function POST(req) {
  try {
    const body = await req.json();
    const db = await connectToDatabase();
    const dateCode = tarihKodu();
    const kayitNo = await nextKayitNo(db, dateCode);
    const {
      adsoyad, telefon, eposta, talep, aciklama, kvkkOnay
    } = body;
    await db.collection("kvkkForms").insertOne({
      kayitNo,
      adsoyad,
      telefon,
      eposta,
      talep,
      aciklama,
      kvkkOnay: !!kvkkOnay,
      kaldirildi: false,
      createdAt: new Date()
    });
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: "Kayıt eklenemedi" }, { status: 500 });
  }
}
