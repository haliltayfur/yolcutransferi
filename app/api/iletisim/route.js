import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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

    // 1. MongoDB'ye kaydet
    try {
      const client = await clientPromise;
      const db = client.db(); // Default DB (yolcutransferi)
      await db.collection("iletisim_formlari").insertOne({
        ad,
        soyad,
        telefon,
        email,
        neden,
        mesaj,
        iletisimTercihi,
        createdAt: new Date()
      });
    } catch (err) {
      console.error("MongoDB kayıt hatası:", err);
      // DB hatası olsa bile, form kaybolmasın diye devam edelim (ama logla)
    }

    // 2. Mail içeriği
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
        <br><br><i>Bu mesaj admin panelinde de kayıt altındadır.</i>
      </div>
    `;

    // 3. Mail gönder (her iki adrese!)
    try {
      await resend.emails.send({
        from: "YolcuTransferi <info@yolcutransferi.com>",
        to: ["info@yolcutransferi.com", "byhaliltayfur@hotmail.com"],
        subject: "Yeni İletişim Talebi (YolcuTransferi.com)",
        html: mailContent,
        reply_to: email
      });
    } catch (err) {
      console.error("Mail gönderim hatası:", err);
      // Hata olursa logla ama kullanıcıya error döndürme!
    }

    // 4. Kullanıcıya başarılı yanıt dön
    return NextResponse.json({ success: true, message: "Mesajınız başarıyla alındı." });
  } catch (error) {
    console.error("İletişim API hatası:", error);
    return NextResponse.json({ error: "Sunucu hatası." }, { status: 500 });
  }
}
