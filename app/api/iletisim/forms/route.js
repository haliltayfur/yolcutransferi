import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// Tarih kodu ve özel kayıtNo oluşturucu
function tarihKodu() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  return `iletisim${yyyy}${mm}${dd}_`;
}

async function nextKayitNo(db, dateCode) {
  const regex = new RegExp("^" + dateCode);
  const count = await db.collection("iletisimForms").countDocuments({ kayitNo: { $regex: regex } });
  return dateCode + String(count + 1).padStart(5, "0");
}

// ---- GET (listeleme) ----
export async function GET(req) {
  try {
    const url = new URL(req.url, "http://localhost");
    const showRemoved = url.searchParams.get("showRemoved") === "true";
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const pageSize = parseInt(url.searchParams.get("pageSize") || "5", 10);

    const db = await connectToDatabase();
    const query = showRemoved ? {} : { kaldirildi: { $ne: true } };
    const total = await db.collection("iletisimForms").countDocuments(query);

    const forms = await db.collection("iletisimForms")
      .find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .toArray();

    return NextResponse.json({ items: forms, total });
  } catch (e) {
    return NextResponse.json({ error: "Kayıtlar alınamadı" }, { status: 500 });
  }
}

// ---- PATCH (Kaldır/Geri Ekle) ----
export async function PATCH(req) {
  const { id, kaldirildi } = await req.json();
  const db = await connectToDatabase();
  await db.collection("iletisimForms").updateOne(
    { _id: new ObjectId(id) },
    { $set: { kaldirildi: !!kaldirildi } }
  );
  return NextResponse.json({ success: true });
}

// ---- POST (Yeni Kayıt) ----
export async function POST(req) {
  try {
    const body = await req.json();
    const db = await connectToDatabase();
    const dateCode = tarihKodu();
    const kayitNo = await nextKayitNo(db, dateCode);

    const {
      ad, soyad, telefon, email, neden, mesaj, iletisimTercihi, kvkkOnay
    } = body;

    // KVKK checkbox işaretlenmeden kayıt yapılmasın
    if (!kvkkOnay) {
      return NextResponse.json({ error: "KVKK onayı zorunlu" }, { status: 400 });
    }

    // Türkçe karakterleri bozmadan kayıt!
    await db.collection("iletisimForms").insertOne({
      kayitNo,
      ad,
      soyad,
      telefon,
      email,
      neden,
      mesaj,
      iletisimTercihi,
      kvkkOnay: !!kvkkOnay, // bool olarak kaydedilsin
      kaldirildi: false,
      createdAt: new Date()
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("İletişim formu eklenirken hata:", e);
    return NextResponse.json({ error: "Kayıt eklenemedi" }, { status: 500 });
  }
}
