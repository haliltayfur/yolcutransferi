// app/api/rezervasyon/route.js
import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../lib/mongodb";
import nodemailer from "nodemailer";

// SMTP bilgilerini .env dosyasından al
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 465;
const MAILS = ["info@yolcutransferi.com", "byhaliltayfur@hotmail.com"];

export async function POST(req) {
  try {
    const data = await req.json();

    // DB bağlantısı
    const db = await connectToDatabase();
    const collection = db.collection("rezervasyonlar");

    // Varsayılan durum
    let status = data.status;
    if (!status) status = "Ödeme Yapıldı";

    // Sipariş kodu oluştur (geldiyse kullan)
    let orderId = data.orderId;
    if (!orderId) {
      const today = new Date();
      orderId = `siparis${today.getDate()}${today.getMonth() + 1}${today.getFullYear()}_${1000 + Math.floor(Math.random() * 300)}`;
    }

    // DB'ye yaz
    const dbObj = {
      createdAt: new Date(),
      status,
      orderId,
      ad: data.name,
      soyad: data.surname,
      tc: data.tc,
      telefon: data.phone,
      email: data.email || "",
      from: data.from,
      to: data.to,
      people: data.people,
      segment: data.segment,
      transfer: data.transfer,
      vehicle: data.vehicle,
      date: data.date,
      time: data.time,
      pnr: data.pnr,
      note: data.note,
      extras: data.extras,
      extrasQty: data.extrasQty,
      card: data.card ? {
        name: data.card.name,
        number: "**** **** **** " + (data.card.number || "").slice(-4), // son 4 rakamı göster
      } : undefined,
    };
    await collection.insertOne(dbObj);

    // Mail içeriği oluştur
    let extrasTxt = "";
    if (data.extras && data.extras.length > 0) {
      extrasTxt =
        data.extras
          .map(
            (k) =>
              `- ${k} (${(data.extrasQty && data.extrasQty[k]) || 1} adet)`
          )
          .join("<br>");
    } else {
      extrasTxt = "Yok";
    }

    const html = `
      <div style="font-family:Arial,sans-serif;font-size:15px;">
        <h2 style="color:#bfa658;">YolcuTransferi.com Yeni Rezervasyon</h2>
        <b>Sipariş No:</b> ${orderId}<br>
        <b>Ad Soyad:</b> ${data.name} ${data.surname} <br>
        <b>T.C.:</b> ${data.tc}<br>
        <b>Telefon:</b> ${data.phone}<br>
        <b>E-posta:</b> ${data.email || "-"}<br>
        <b>Transfer:</b> ${data.transfer}<br>
        <b>Segment:</b> ${data.segment}<br>
        <b>Araç:</b> ${data.vehicle}<br>
        <b>Kişi:</b> ${data.people}<br>
        <b>Nereden:</b> ${data.from}<br>
        <b>Nereye:</b> ${data.to}<br>
        <b>Tarih:</b> ${data.date} ${data.time}<br>
        <b>PNR:</b> ${data.pnr || "-"}<br>
        <b>Not:</b> ${data.note || "-"}<br>
        <b>Ekstralar:</b><br>${extrasTxt}<br>
        <b>Kart Bilgisi:</b> ${(data.card && data.card.name) ? data.card.name + " (**** " + (data.card.number || "").slice(-4) + ")" : "-"}<br>
        <b>Durum:</b> <span style="color:${status === "Ödeme Yapıldı" ? "green" : "red"}">${status}</span>
        <hr>
        <i>Bu mesaj sistem tarafından otomatik gönderilmiştir.</i>
      </div>
    `;

    // Mail gönder
    if (SMTP_USER && SMTP_PASS && SMTP_HOST) {
      let transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_PORT === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
      });

      await transporter.sendMail({
        from: `"YolcuTransferi.com" <${SMTP_USER}>`,
        to: MAILS.join(","),
        subject: `Yeni Rezervasyon - ${orderId}`,
        html,
      });
    }

    return NextResponse.json({ ok: true, orderId }, { status: 200 });
  } catch (err) {
    console.error("Rezervasyon Kaydı/Mail Hatası:", err);
    return NextResponse.json({ ok: false, error: err.toString() }, { status: 500 });
  }
}
