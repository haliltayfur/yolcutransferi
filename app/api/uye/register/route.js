// app/api/uye/register/route.js
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

function pad(n, width = 5) {
  return String(n).padStart(width, "0");
}

export async function POST(req) {
  const data = await req.json();
  const db = await connectToDatabase();

  const now = new Date();
  const gun = String(now.getDate()).padStart(2, "0");
  const ay = String(now.getMonth() + 1).padStart(2, "0");
  const yil = String(now.getFullYear()).slice(2);

  // Üye tipi için sayaç bul
  const uyeTipi = data.type; // musteri/firma/sofor/isbirligi
  const tipKey =
    uyeTipi === "musteri"
      ? "Musteri"
      : uyeTipi === "firma"
      ? "Firma"
      : uyeTipi === "sofor"
      ? "Sofor"
      : "Isbirligi";
  const dateStr = `${gun}${ay}${yil}`;

  // Sayaç koleksiyonu ile sayacı artır
  const counterCol = db.collection("uye_no_counters");
  const counterDoc = await counterCol.findOneAndUpdate(
    { tip: tipKey },
    { $inc: { no: 1 } },
    { upsert: true, returnDocument: "after" }
  );
  const yeniNo = counterDoc.value?.no || 1;

  // Üye no oluştur
  const uyeNo = `Uye_${tipKey}${dateStr}_${pad(yeniNo)}`;

  // Kayıt edilecek alanlar:
  const yeniUye = {
    uyeNo,
    type: uyeTipi,
    ad: data.ad || "",
    soyad: data.soyad || "",
    email: data.email || "",
    telefon: data.telefon || "",
    il: data.il || "",
    createdAt: new Date(),
    photo: "",
    // Firma ise
    firmaAdi: data.type === "firma" ? data.firmaAdi || "" : "",
    firmaYetkili: data.type === "firma" ? data.ad || "" : "",
    // Diğer alanlar
    ...data,
  };

  // Email unique olsun (opsiyonel)
  const existing = await db.collection("uyeler").findOne({ email: data.email });
  if (existing)
    return NextResponse.json({
      success: false,
      error: "Bu e-posta ile daha önce kayıt yapılmış.",
    });

  await db.collection("uyeler").insertOne(yeniUye);

  // Şifreyi hashleyerek ayrı bir koleksiyona yazabilirsiniz (güvenlik için önerilir).
  // ...

  return NextResponse.json({
    success: true,
    uye: yeniUye,
  });
}
