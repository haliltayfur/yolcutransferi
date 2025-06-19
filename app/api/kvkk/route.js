import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { adsoyad, telefon, eposta, talep, aciklama } = body;

    if (!adsoyad || !eposta || !talep) {
      return NextResponse.json({ error: "Eksik bilgi" }, { status: 400 });
    }

    // MongoDB kaydı
    const db = await connectToDatabase();
    await db.collection("kvkkForms").insertOne({
      adsoyad,
      telefon,
      eposta,
      talep,
      aciklama,
      createdAt: new Date(),
    });

    // Mail alıcıları
    const recipients = [
      "info@yolcutransferi.com",
      "byhaliltayfur@hotmail.com"
    ];

    // KVKK Başvuru Bildirim Maili
    await resend.emails.send({
      from: "YolcuTransferi KVKK <info@yolcutransferi.com>", // sadece bu görünecek
      to: recipients,
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

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("KVKK RESEND HATASI:", err);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
