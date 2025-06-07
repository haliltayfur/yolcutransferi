import { NextResponse } from "next/server";
import { Resend } from "resend";

// .env.local dosyanda RESEND_API_KEY=... olmalı!
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const data = await request.json();

    if (!data.ad || !data.soyad || !data.telefon || !data.email || !data.mesaj) {
      return NextResponse.json({ error: "Eksik bilgi var." }, { status: 400 });
    }

    const TO_EMAILS = ["info@yolcutransferi.com", "byhaliltayfur@hotmail.com"];
    const subject = `Yeni İletişim Formu: ${data.neden || "Mesaj"}`;
    const html = `
      <h2>Yeni iletişim talebi</h2>
      <b>Ad Soyad:</b> ${data.ad} ${data.soyad}<br/>
      <b>Telefon:</b> ${data.telefon}<br/>
      <b>E-posta:</b> ${data.email}<br/>
      <b>İletişim Tercihi:</b> ${data.iletisimTercihi || ""}<br/>
      <b>Talep Nedeni:</b> ${data.neden || ""}<br/>
      <b>Mesaj:</b><br/>
      <div style="white-space:pre-wrap; border:1px solid #eee; background:#faf8f1; border-radius:4px; padding:8px; margin:8px 0">${data.mesaj}</div>
      <hr>
      <small>YolcuTransferi.com - İletişim Formu</small>
    `;

    const response = await resend.emails.send({
      from: "YolcuTransferi <info@yolcutransferi.com>",
      to: TO_EMAILS,
      subject,
      html,
      reply_to: data.email,
    });

    if (response.error) {
      console.error("Resend Hatası:", response.error);
      return NextResponse.json({ error: "Mail gönderilemedi.", detail: response.error }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API Hatası:", error);
    return NextResponse.json({ error: "Sunucu hatası.", detail: error?.message }, { status: 500 });
  }
}
