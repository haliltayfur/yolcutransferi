// app/api/iletisim/route.js

import { NextResponse } from "next/server";

// Eğer Resend kullanacaksan
// import { Resend } from 'resend';
// const resend = new Resend(process.env.RESEND_API_KEY);

// Veya Nodemailer ile göndermek istersen eklerim

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
    } = body;

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

    // Mail body’si
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
            ? `Lütfen müşterinin e-posta adresine dönüş yapınız: <b>${email}</b>`
            : iletisimTercihi === "WhatsApp"
            ? `Lütfen müşteriye WhatsApp üzerinden geri dönüş yapınız: <b>${telefon}</b>`
            : iletisimTercihi === "Telefon"
            ? `Lütfen müşteriyi arayarak geri dönüş yapınız: <b>${telefon}</b>`
            : ""
        }
      </div>
    `;

    // Burada mail gönderme örneği (aşağıdaki satırları aktif et, kendi bilgini gir)
    /*
    await resend.emails.send({
      from: "YolcuTransferi <info@yolcutransferi.com>",
      to: ["info@yolcutransferi.com", "byhaliltayfur@hotmail.com"], // İstersen iki kişiye birden gider
      subject: "Yeni İletişim Talebi (YolcuTransferi.com)",
      html: mailContent,
      reply_to: email // Müşteriye direkt cevap verebil
    });
    */

    // Örnek: Mail gönderme kodunu eklemeden sadece log
    console.log("Yeni iletişim talebi:", {
      ad,
      soyad,
      telefon,
      email,
      neden,
      mesaj,
      iletisimTercihi,
    });

    return NextResponse.json({ success: true, message: "Mesajınız başarıyla alındı." });
  } catch (error) {
    console.error("İletişim API hatası:", error);
    return NextResponse.json({ error: "Sunucu hatası." }, { status: 500 });
  }
}
