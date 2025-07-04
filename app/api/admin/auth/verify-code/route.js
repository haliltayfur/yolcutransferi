import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(req) {
  const { email, code } = await req.json();
  const db = await connectToDatabase();

  const uye = await db.collection("uyeler").findOne({ eposta: email, tip: "admin" });
  if (!uye || !uye.kod || !uye.kodExpire) {
    return NextResponse.json({ ok: false, error: "Kod bulunamadı!" }, { status: 401 });
  }

  if (uye.kod !== code) {
    return NextResponse.json({ ok: false, error: "Kod yanlış!" }, { status: 401 });
  }

  if (Date.now() > uye.kodExpire) {
    return NextResponse.json({ ok: false, error: "Kodun süresi doldu!" }, { status: 401 });
  }

  // Kodu doğruladıktan sonra veritabanından silebilirsin:
  await db.collection("uyeler").updateOne(
    { _id: uye._id },
    { $unset: { kod: "", kodExpire: "" } }
  );

  return NextResponse.json({ ok: true });
}
