import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { ad, soyad, telefon, email, neden, mesaj, iletisimTercihi } = body;

    if (!ad || !soyad || !email || !telefon || !mesaj || !iletisimTercihi) {
      return NextResponse.json({ error: "Eksik bilgiler var." }, { status: 400 });
    }

    const db = await connectToDatabase();

    // MongoDB Kayıt İşlemi
    const result = await db.collection("iletisimForms").insertOne({
      ad, soyad, telefon, email, neden, mesaj, iletisimTercihi,
      createdAt: new Date(),
    });

    console.log("✅ MongoDB insert başarılı:", result.insertedId);

    // Mail Gönderim İşlemi (Resend)
    await resend.emails.send({
      from: "YolcuTransferi İletişim <info@yolcutransferi.com>",
      to: ["info@yolcutransferi.com", "byhaliltayfur@hotmail.com"],
      subject: "Yeni İletişim Formu",
      html: `
        <div style="font-family:sans-serif; font-size:15px;">
          <p><strong>Ad Soyad:</strong> ${ad} ${soyad}</p>
          <p><strong>Telefon:</strong> ${telefon}</p>
          <p><strong>E-posta:</strong> ${email}</p>
          <p><strong>İletişim Tercihi:</strong> ${iletisimTercihi}</p>
          <p><strong>Neden:</strong> ${neden}</p>
          <p><strong>Mesaj:</strong><br/>${mesaj}</p>
        </div>
      `
    });

    console.log("✅ Mail başarıyla gönderildi");

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("❌ İletişim formu hatası:", err);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
