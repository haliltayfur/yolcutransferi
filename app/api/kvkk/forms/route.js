// ✅ Dosya: app/api/kvkk/forms/route.js
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// -- Kayıt No fonksiyonu (kvkkYYYYMMDD_00001 formatında) --
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

// --- GET: Listele, sayfalama, kaldırılanlar kontrolü ---
export async function GET(req) {
  const url = new URL(req.url, "http://localhost");
  const showRemoved = url.searchParams.get("showRemoved") === "true";
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const pageSize = parseInt(url.searchParams.get("pageSize") || "5", 10);

  const db = await connectToDatabase();
  const query = showRemoved ? {} : { kaldirildi: { $ne: true } };
  const total = await db.collection("kvkkForms").countDocuments(query);

  const forms = await db.collection("kvkkForms")
    .find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .toArray();

  return NextResponse.json({ items: forms, total });
}

// --- PATCH: Kaldır/göster ---
export async function PATCH(req) {
  const { id, kaldirildi } = await req.json();
  const db = await connectToDatabase();
  await db.collection("kvkkForms").updateOne(
    { _id: new ObjectId(id) },
    { $set: { kaldirildi: !!kaldirildi } }
  );
  return NextResponse.json({ success: true });
}

// --- POST: Yeni başvuru ekle ---
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
    console.error("KVKK formu eklenirken hata:", e);
    return NextResponse.json({ error: "Kayıt eklenemedi" }, { status: 500 });
  }
}
