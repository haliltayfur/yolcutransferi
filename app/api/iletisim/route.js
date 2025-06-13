import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      ad, soyad, telefon, email, neden, mesaj, iletisimTercihi = "E-posta", honeypot = ""
    } = body;

    if (honeypot && honeypot.length > 0) {
      return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
    }
    if (!ad || !soyad || !telefon || !email || !neden || !mesaj || !iletisimTercihi) {
      return NextResponse.json({ error: "Tüm alanlar zorunludur." }, { status: 400 });
    }

    const db = await connectToDatabase();
    await db.collection("iletisim").insertOne({
      ad, soyad, telefon, email, neden, mesaj, iletisimTercihi, createdAt: new Date()
    });

    // İstersen burada mail gönderimini de ekleyebilirsin.
    return NextResponse.json({ success: true, message: "Mesajınız başarıyla alındı." });
  } catch (error) {
    return NextResponse.json({ error: "Sunucu hatası." }, { status: 500 });
  }
}
