// app/api/rezervasyon/route.js
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const data = await request.json();
    const db = await connectToDatabase();

    // Sipariş kodu/numarası oluştur
    const now = new Date();
    const dateStr = `${String(now.getDate()).padStart(2, "0")}${String(now.getMonth()+1).padStart(2,"0")}${now.getFullYear()}`;
    const countToday = await db.collection("rezervasyonlar").countDocuments({
      createdAt: { $gte: new Date(now.getFullYear(), now.getMonth(), now.getDate()) }
    });
    const orderId = data.orderId ||
      `siparis${dateStr}_${String(countToday+1001)}`;

    // Varsayılan durum
    let status = data.status;
    if (!status) status = "Ödeme Yapıldı";

    // DB'ye yaz
    const yeniKayit = {
      ...data,
      orderId,
      createdAt: new Date(),
      status
    };
    await db.collection("rezervasyonlar").insertOne(yeniKayit);

    // Ekstralar metni
    let extrasTxt = "";
    if (data.extras && data.extras.length > 0) {
      extrasTxt = data.extras
        .map(
          (k) => `- ${k} (${(data.extrasQty && data.extrasQty[k]) || 1} adet)`
        )
        .join("<br>");
    } else {
      extrasTxt = "Yok";
    }

    // Kart bilgisi sadece son 4 hane (gizli)
    let kartTxt = "-";
    if (data.card && data.card.number) {
      kartTxt = `**** **** **** ${(data.card.number || "").slice(-4)} (${data.card.name || ""})`;
    }

    // Mail içeriği
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
        <b>Kart Bilgisi:</b> ${kartTxt}<br>
        <b>Durum:</b> <span style="color:${status === "Ödeme Yapıldı" ? "green" : "red"}">${status}</span>
        <hr>
        <i>Bu mesaj sistem tarafından otomatik gönderilmiştir.</i>
      </div>
    `;

    // E-posta gönder
    await resend.emails.send({
      from: "YolcuTransferi <info@yolcutransferi.com>",
      to: ["info@yolcutransferi.com", "byhaliltayfur@hotmail.com"],
      subject: `Yeni Rezervasyon - ${orderId}`,
      html
    });

    return NextResponse.json({ ok: true, orderId }, { status: 200 });
  } catch (err) {
    console.error("Rezervasyon Kaydı/Mail Hatası:", err);
    return NextResponse.json({ ok: false, error: err.toString() }, { status: 500 });
  }
}
