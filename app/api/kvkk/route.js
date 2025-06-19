import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    console.log("✅ Adım 0: İstek geldi");

    const body = await request.json();
    const { adsoyad, telefon, eposta, talep, aciklama } = body;

    console.log("✅ Adım 1: Body alındı", body);

    if (!adsoyad || !eposta || !talep) {
      console.warn("⚠️ Eksik bilgi var");
      return NextResponse.json({ error: "Eksik bilgi" }, { status: 400 });
    }

    const db = await connectToDatabase();
    await db.collection("kvkkForms").insertOne({
      adsoyad,
      telefon,
      eposta,
      talep,
      aciklama,
      createdAt: new Date(),
    });

    console.log("✅ Adım 2: MongoDB kaydı başarılı");

    const recipients = [
      "info@yolcutransferi.com",
      "byhaliltayfur@hotmail.com"
    ];

    console.log("✅ Adım 3: Mail gönderimi başlıyor");

    await resend.emails.send({
      from: "YolcuTransferi KVKK <info@yolcutransferi.com>",
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

    console.log("✅ Adım 4: Mail başarıyla gönderildi");

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("❌ KVKK RESEND HATASI:", JSON.stringify(err, null, 2));
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
