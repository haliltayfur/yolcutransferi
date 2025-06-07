// app/api/iletisim/route.js

import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      ad,
      soyad,
      telefon,
      email,
      neden,
      mesaj,
      iletisimTercihi = "E-posta",
      honeypot = ""
    } = body;

    // Bot önleme
    if (honeypot && honeypot.length > 0) {
      return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
    }

    // Alan kontrolü
    if (
      !ad ||
      !soyad ||
      !telefon ||
      !email ||
      !neden ||
      !mesaj ||
      !iletisimTercihi
    ) {
      return NextResponse.json({ error: "Tüm alanlar zorunludur." }, { status: 400 });
    }

    // Mail gövdesi — Tüm detaylar, iletişim tercihi ile birlikte
    const mailContent = `
      <div style="font-family:sans-serif;">
        <h2>Yeni İletişim Talebi</h2>
        <table cellpadding="5">
          <tr><td><b>Ad Soyad:</b></td><td>${ad} ${soyad}</td></tr>
          <tr><td><b>Telefon:</b></td><td>${telefon}</td></tr>
          <tr><td><b>E-posta:</b></td><td>${email}</td></tr>
          <tr><td><b>İletişim Nedeni:</b></td><td>${neden}</td></tr>
          <tr><td><b>İletişim Tercihi:</b></td><td>${iletisimTercihi}</td></tr>
          <tr><td><b>Mesaj:</b></td><td>${mesaj.replace(/\n/g, "<br/>")}</td></tr>
        </table>
        <br/>
        <b>Müşteriye nasıl dönüş yapılmalı?</b><br/>
        ${
          iletisimTercihi === "E-posta"
            ? `Lütfen müşterinin <b>e-posta adresine</b> dönüş yapınız: <b>${email}</b>`
            : iletisimTercihi === "WhatsApp"
            ? `Lütfen müşteriye <b>WhatsApp üzerinden</b> geri dönüş yapınız: <b>${telefon}</b>`
            : iletisimTercihi === "Telefon"
            ? `Lütfen müşteriyi <b>telefonla arayarak</b> geri dönüş yapınız: <b>${telefon}</b>`
            : ""
        }
      </div>
    `;

    // BURADA GERÇEK MAİL GÖNDERME KODU OLACAK — örn: Resend veya Nodemailer
    // Sadece örnek: Konsola yazdırmak (test için)
    console.log("Yeni iletişim talebi:\n", {
      ad,
      soyad,
      telefon,
      email,
      neden,
      mesaj,
      iletisimTercihi
    });

    // Örnek: Mail gönderme kodu (isteğe bağlı):
    // await resend.emails.send({
    //   from: "YolcuTransferi <info@yolcutransferi.com>",
    //   to: ["info@yolcutransferi.com", "byhaliltayfur@hotmail.com"],
    //   subject: "Yeni İletişim Talebi (YolcuTransferi.com)",
    //   html: mailContent,
    //   reply_to: email
    // });

    // Cevap dön
    return NextResponse.json({ success: true, message: "Mesajınız başarıyla alındı." });
  } catch (error) {
    console.error("İletişim API hatası:", error);
    return NextResponse.json({ error: "Sunucu hatası." }, { status: 500 });
  }
}
