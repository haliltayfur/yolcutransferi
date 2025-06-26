// app/api/rezervasyon/route.js
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const db = await connectToDatabase();

    // Sipariş kodu (orderId) varsa onu al yoksa üret
    let orderId = body.orderId;
    if (!orderId) {
      const today = new Date();
      orderId = `siparis${today.getDate()}${today.getMonth() + 1}${today.getFullYear()}_${1000 + Math.floor(Math.random() * 300)}`;
    }

    // Ödeme durumunu kontrol et (varsa kullan yoksa default)
    let status = body.status || "Ödeme Yapıldı";

    // "extras" ve "extrasQty" düzgün gelmezse güvenli hale getir
    let extras = [];
    let extrasQty = {};
    try {
      extras = Array.isArray(body.extras) ? body.extras : [];
      extrasQty = typeof body.extrasQty === "object" && body.extrasQty !== null ? body.extrasQty : {};
    } catch {
      extras = [];
      extrasQty = {};
    }

    // Kayıt objesi hazırla
    const newRez = {
      ...body,
      orderId,
      status,
      extras,
      extrasQty,
      createdAt: new Date(),
    };

    // DB'ye yaz
    await db.collection("rezervasyonlar").insertOne(newRez);

    // Sadece başarılı ödemelerde mail gönder (iptal edilenlerde mail yok)
    if (status === "Ödeme Yapıldı") {
      // Ekstralar daha okunaklı yazılsın
      let extrasHtml = "Ekstra yok";
      if (extras && extras.length > 0) {
        extrasHtml = extras.map(k => {
          let adet = extrasQty?.[k] || 1;
          return `${k} (${adet} adet)`;
        }).join(", ");
      }

      // Mail içeriği
      const html = `
        <b>Yeni Rezervasyon!</b><br/>
        <b>Sipariş No:</b> ${orderId}<br/>
        <b>Ad Soyad:</b> ${body.name || "-"} ${body.surname || ""} <br/>
        <b>Telefon:</b> ${body.phone || "-"}<br/>
        <b>Transfer:</b> ${body.transfer || "-"} <br/>
        <b>Nereden:</b> ${body.from || "-"}<br/>
        <b>Nereye:</b> ${body.to || "-"}<br/>
        <b>Tarih:</b> ${body.date || "-"} ${body.time || ""}<br/>
        <b>Kişi:</b> ${body.people || "-"}<br/>
        <b>Araç:</b> ${body.vehicle || "-"}<br/>
        ${body.pnr ? `<b>PNR:</b> ${body.pnr}<br/>` : ""}
        ${body.note ? `<b>Not:</b> ${body.note}<br/>` : ""}
        <b>Ekstralar:</b> ${extrasHtml}<br/>
        <b>Durum:</b> ${status}
      `;
      await resend.emails.send({
        from: "YolcuTransferi <info@yolcutransferi.com>",
        to: ["info@yolcutransferi.com", "byhaliltayfur@hotmail.com"],
        subject: "Yeni Rezervasyon Alındı",
        html,
      });
    }

    return NextResponse.json({ success: true, orderId });
  } catch (err) {
    return NextResponse.json({ error: err?.toString() }, { status: 500 });
  }
}
