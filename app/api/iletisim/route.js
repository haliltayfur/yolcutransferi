// /app/api/iletisim/route.js
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Resend } from "resend";
// (Opsiyonel) SMTP fallback isterseniz nodemailer ekleyebilirsiniz:
// import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

// ----------------- Yardımcılar -----------------
const s = (v) => String(v ?? "");

// Env'leri yalnızca istek sırasında oku (build'te patlamasın)
function getMailEnv() {
  // Resend
  const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
  // From: domain doğrulandıysa kendi adresiniz, aksi halde geçici bir from da kullanılabilir.
  const MAIL_FROM = process.env.MAIL_FROM || ""; // Örn: 'YolcuTransferi <info@yolcutransferi.com>'

  // Admin listesi: virgülle ayırın
  const MAIL_ADMINS = (
    process.env.MAIL_ADMINS ||
    process.env.MAIL_TO || "" // eski değişken desteği
  )
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);

  return { RESEND_API_KEY, MAIL_FROM, MAIL_ADMINS };
}

async function sendViaResend({ apiKey, from, to, subject, html, replyTo }) {
  if (!apiKey) return { ok: false, provider: "resend", id: null, error: "RESEND_API_KEY missing" };
  if (!from)   return { ok: false, provider: "resend", id: null, error: "MAIL_FROM missing" };

  const resend = new Resend(apiKey);
  try {
    const { data, error } = await resend.emails.send({
      from,
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

/* // İstersen SMTP fallback ekleyebilirsin (env tanımlarsan):
async function getSmtpTransport() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 0);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !port || !user || !pass) return null;
  return nodemailer.createTransport({
    host, port, secure: port === 465,
    auth: { user, pass },
  });
}
async function sendViaSMTP({ from, to, subject, html, replyTo }) {
  const t = await getSmtpTransport();
  if (!t) return { ok: false, provider: "smtp", id: null, error: "SMTP not configured" };
  try {
    const info = await t.sendMail({ from, to, subject, html, replyTo });
    return { ok: true, provider: "smtp", id: info?.messageId || null, error: null };
  } catch (e) {
    return { ok: false, provider: "smtp", id: null, error: String(e?.message || e) };
  }
}
*/

export async function POST(req) {
  const env    = process.env.VERCEL_ENV || process.env.NODE_ENV || "unknown";
  const dbName = process.env.MONGODB_DB || "yolcutransferi";

  try {
    const body = await req.json();
