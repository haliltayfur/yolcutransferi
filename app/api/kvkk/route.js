import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  let errorStep = "başlangıç";

  try {
    console.log("✅ Adım 0: İstek geldi");

    const body = await request.json();
    errorStep = "body parsing";
    console.log("✅ Adım 1: Body alındı", body);

    const { adsoyad, telefon, eposta, talep, aciklama } = body;

    if (!adsoyad || !eposta || !talep) {
      errorStep = "eksik alan kontrolü";
      return NextResponse.json({ error: "Eksik bilgi" }, { status: 400 });
    }

    errorStep = "MongoDB bağlantısı";
    const db = await connectToDatabase();

    errorStep = "MongoDB kayıt işlemi";
    const result = await db.collection("kvkkForms").insertOne({
      adsoyad,
      telefon,
      eposta,
      talep,
      aciklama,
      createdAt: new Date(),
    });

    console.log("🟢 MongoDB'ye başarılı insert:", result.insertedId);

    errorStep = "mail gönderim başlangıcı";
    await resend.emails.send({
      from: "YolcuTransferi KVKK <info@yolcutransferi.com>",
      to: ["info@yolcutransferi.com", "byhaliltayfur@hotmail.com"],
      subject: "Yeni KVKK Başvurusu",
      html: `
        <div style="font-family:sans-serif; font-size:15px;">
          <p><strong>Ad Soyad:</strong> ${adsoyad}</p>
          <p><strong>Telefon:</strong> ${telefon || "-"}</p>
          <p><strong>E-posta:</strong> ${eposta}</p>
          <p><strong>Talep Türü:</strong> ${talep}</p>
          <p><strong>Açıklama:</strong><br/>${aciklama || "-"}</p>
        </div>
      `
    });

    console.log("✅ Mail başarıyla gönderildi");

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error(`❌ KVKK HATA – Adım: ${errorStep}`, err);
    return NextResponse.json({ error: `Sunucu hatası – Adım: ${errorStep}` }, { status: 500 });
  }
}
