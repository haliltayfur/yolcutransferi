import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  let errorStep = "başlangıç";

  try {
    const body = await request.json();
    errorStep = "body parsing";

    const { ad, soyad, telefon, email, neden, mesaj, iletisimTercihi } = body;

    if (!ad || !soyad || !email || !mesaj || !iletisimTercihi) {
      return NextResponse.json({ error: "Eksik bilgi" }, { status: 400 });
    }

    errorStep = "MongoDB bağlantısı";
    const db = await connectToDatabase();

    errorStep = "MongoDB kayıt işlemi";
    await db.collection("iletisimForms").insertOne({
      ad, soyad, telefon, email, neden, mesaj, iletisimTercihi,
      createdAt: new Date(),
    });

    errorStep = "mail gönderim başlangıcı";
    await resend.emails.send({
      from: "YolcuTransferi İletişim <info@yolcutransferi.com>",
      to: ["info@yolcutransferi.com", "byhaliltayfur@hotmail.com"],
      subject: "Yeni İletişim Formu Başvurusu",
      html: `
        <div style="font-family:sans-serif; font-size:15px;">
          <p><strong>Ad Soyad:</strong> ${ad} ${soyad}</p>
          <p><strong>Telefon:</strong> ${telefon || "-"}</p>
          <p><strong>E-posta:</strong> ${email}</p>
          <p><strong>Neden:</strong> ${neden}</p>
          <p><strong>Mesaj:</strong><br/>${mesaj || "-"}</p>
          <p><strong>İletişim Tercihi:</strong> ${iletisimTercihi}</p>
        </div>
      `
    });

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error(`❌ İLETİŞİM FORMU HATASI – Adım: ${errorStep}`, err);
    return NextResponse.json({ error: `Sunucu hatası – Adım: ${errorStep}` }, { status: 500 });
  }
}
