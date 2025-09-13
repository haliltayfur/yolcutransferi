// /app/api/iletisim/route.js
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Resend } from "resend";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

// ---------- ENV ----------
const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
const MAIL_FROM = process.env.MAIL_FROM || "YolcuTransferi <onboarding@resend.dev>"; // domain doğrulanana dek güvenli
// Çoklu admin desteklenir (virgül ile ayırın)
const MAIL_ADMINS = (process.env.MAIL_ADMINS || process.env.MAIL_TO || "info@yolcutransferi.com,byhaliltayfur@hotmail.com")
  .split(",").map(s => s.trim()).filter(Boolean);

// SMTP (fallback) — isteğe bağlı, varsa kullanılır
const SMTP_HOST = process.env.SMTP_HOST || "";
const SMTP_PORT = Number(process.env.SMTP_PORT || 0);
const SMTP_USER = process.env.SMTP_USER || "";
const SMTP_PASS = process.env.SMTP_PASS || "";

// ---------- HELPERS ----------
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

function s(v) { return String(v ?? ""); }

async function sendViaResend({ to, subject, html, replyTo }) {
  if (!resend) return { ok: false, provider: "resend", id: null, error: "RESEND_API_KEY missing" };
  try {
    const { data, error } = await resend.emails.send({
      from: MAIL_FROM,
      to,
      subject,
      html,
      reply_to: replyTo || undefined,
    });
    if (error) {
      return { ok: false, provider: "resend", id: data?.id || null, error: error?.message || JSON.stringify(error) };
    }
    return { ok: true, provider: "resend", id: data?.id || null, error: null };
  } catch (e) {
    return { ok: false, provider: "resend", id: null, error: String(e?.message || e) };
  }
}

async function getSmtpTransport() {
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) return null;
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465, // 465=yes, 587/25=no
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

async function sendViaSMTP({ to, subject, html, replyTo }) {
  const transporter = await getSmtpTransport();
  if (!transporter) return { ok: false, provider: "smtp", id: null, error: "SMTP not configured" };
  try {
    const info = await transporter.sendMail({
      from: MAIL_FROM, // ör. "YolcuTransferi <info@yolcutransferi.com>"
      to,
      subject,
      html,
      replyTo: replyTo || undefined,
    });
    return { ok: true, provider: "smtp", id: info?.messageId || null, error: null };
  } catch (e) {
    return { ok: false, provider: "smtp", id: null, error: String(e?.message || e) };
  }
}

// Resend → olmadıysa SMTP
async function smartSend({ to, subject, html, replyTo }) {
  // 1) Resend dene
  const r1 = await sendViaResend({ to, subject, html, replyTo });
  if (r1.ok) return r1;
  // 2) SMTP fallback (varsa)
  const r2 = await sendViaSMTP({ to, subject, html, replyTo });
  // İkisini de döndür (tanılama için faydalı)
  return r2.ok ? r2 : { ok: false, provider: `${r1.provider}+${r2.provider}`, id: null, error: r1.error || r2.error || "unknown" };
}

// ---------- HANDLER ----------
export async function POST(req) {
  const env = process.env.VERCEL_ENV || process.env.NODE_ENV || "unknown";
  const dbName = process.env.MONGODB_DB || "yolcutransferi";

  try {
    const body = await req.json();

    const ad = s(body.ad);
    const soyad = s(body.soyad);
    const telefon = s(body.telefon);
    const email = s(body.email);
    const mesaj = s(body.mesaj);
    const iletisimTercihi = s(body.iletisimTercihi);
    const neden = s(body.neden);
    const kvkkOnay = body.kvkkOnay === true || body.kvkkOnay === "true";

    if (!ad || !soyad || !telefon || !email || !mesaj || !iletisimTercihi || !kvkkOnay) {
      return NextResponse.json({ error: "Lütfen tüm zorunlu alanları doldurun." }, { status: 400 });
    }

    // --- 1) DB'ye yaz ---
    const db = await connectToDatabase();
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const dateStr = `${String(now.getDate()).padStart(2,"0")}${String(now.getMonth()+1).padStart(2,"0")}${now.getFullYear()}`;
    const countToday = await db.collection("iletisimForms").countDocuments({ createdAt: { $gte: todayStart } });
    const kayitNo = `iletisim${dateStr}_${String(countToday + 1).padStart(5,"0")}`;

    const doc = {
      ad, soyad, telefon, email, mesaj, iletisimTercihi, neden,
      kvkkOnay,
      createdAt: now,
      kaldirildi: false,
      kayitNo,
    };

    const insertRes = await db.collection("iletisimForms").insertOne(doc);

    // --- 2) MAİL içerikleri ---
    const adminSubject = "Yeni İletişim Mesajı";
    const adminHtml = `
      <b>Ad Soyad:</b> ${ad} ${soyad}<br/>
      <b>Telefon:</b> ${telefon}<br/>
      <b>E-posta:</b> ${email}<br/>
      <b>İletişim Nedeni:</b> ${neden || "-"}<br/>
      <b>İletişim Tercihi:</b> ${iletisimTercihi}<br/>
      <b>Kayıt No:</b> ${kayitNo}<br/>
      <b>Mesaj:</b><br/>
      <div style="border:1px solid #ffeec2;border-radius:8px;padding:8px 16px;margin:8px 0;color:#000;background:#fff8e1">
        ${mesaj.replace(/\n/g, "<br/>")}
      </div>
      <b>KVKK Onay:</b> ${kvkkOnay ? "Evet" : "Hayır"}<br/>
    `.trim();

    const customerSubject = "YolcuTransferi — İletişim talebinizi aldık";
    const customerHtml = `
      <b>${neden || ""}</b> konulu mesajınızı uzman ekibimize ilettik.<br/>
      Size <b>${iletisimTercihi}</b> üzerinden dönüş yapacağız.<br/><br/>
      <b>Kayıt No:</b> ${kayitNo}<br/>
      <b>Mesajınız:</b><br/>
      <div style="border:1px solid #ffeec2;border-radius:8px;padding:8px 16px;margin:8px 0;color:#000;background:#fff8e1">
        ${mesaj.replace(/\n/g, "<br/>")}
      </div>
      <br/>YolcuTransferi.com
    `.trim();

    // --- 3) ADMIN mailleri (AYRI AYRI) ---
    const adminResults = [];
    for (const to of MAIL_ADMINS) {
      const r = await smartSend({ to, subject: adminSubject, html: adminHtml, replyTo: email });
      adminResults.push({ to, ...r });
    }

    // --- 4) MÜŞTERİ onayı ---
    const customerResult = await smartSend({ to: email, subject: customerSubject, html: customerHtml });

    // --- 5) Sonuçları kayda işle ---
    await db.collection("iletisimForms").updateOne(
      { _id: insertRes.insertedId },
      { $set: { mail: { admins: adminResults, customer: customerResult }, mailAt: new Date() } }
    );

    return NextResponse.json(
      {
        success: true,
        kayitNo,
        env,
        dbName,
        sent: { admins: adminResults, customer: customerResult }
      },
      { headers: { "Cache-Control": "no-store" } }
    );

  } catch (err) {
    console.error("Kayıt/Mail hatası:", err);
    return NextResponse.json(
      { error: String(err?.message || err), env: process.env.VERCEL_ENV || process.env.NODE_ENV },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
