// PATH: /app/api/rezervasyon/route.js
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
// import { sendMail } from "@/lib/sendMail"; // Kendi mail fonksiyonunu burada import et

export async function GET() {
  try {
    const db = await connectToDatabase();
    const items = await db.collection("rezervasyonlar").find({}).toArray();
    return NextResponse.json({ items });
  } catch (e) {
    return NextResponse.json({ error: "DB bağlantı hatası!" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    // Form validasyonunu burada yapabilirsin!
    const db = await connectToDatabase();
    const result = await db.collection("rezervasyonlar").insertOne({
      ...body,
      createdAt: new Date(),
      status: "pending"
    });

    // --- Mail gönderimi: Kendi sendMail fonksiyonunu kur! ---
    const mailText = `
      Yeni transfer rezervasyonu alındı:

      Nereden: ${body.from}
      Nereye: ${body.to}
      Tarih: ${body.date} Saat: ${body.time}
      Ad Soyad: ${body.name} ${body.surname}
      Telefon: ${body.phone}
      E-posta: ${body.email}
      Araç: ${body.segment}
      Transfer Türü: ${body.transfer}
      Kişi: ${body.people}
      Not: ${body.note || "-"}
    `;
    try {
      // await sendMail({
      //   to: ["info@yolcutransferi.com", "byhaliltayfur@hotmail.com"],
      //   subject: "Yeni Rezervasyon",
      //   text: mailText,
      // });
    } catch (e) {
      // Mail hatası loglanabilir ama rezervasyon eklenir
    }

    return NextResponse.json({ ok: true, id: result.insertedId });
  } catch (e) {
    return NextResponse.json({ error: "Rezervasyon kaydedilemedi." }, { status: 500 });
  }
}
