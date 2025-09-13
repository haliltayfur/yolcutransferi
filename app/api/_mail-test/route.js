// /app/api/_mail-test/route.js
import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

const s = (v) => String(v ?? "");

function getMailEnv() {
  const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
  const MAIL_FROM = process.env.MAIL_FROM || ""; // Örn: 'YolcuTransferi <info@yolcutransferi.com>'
  const MAIL_ADMINS = (
    process.env.MAIL_ADMINS || process.env.MAIL_TO || ""
  ).split(",").map(x => x.trim()).filter(Boolean);
  return { RESEND_API_KEY, MAIL_FROM, MAIL_ADMINS };
}

async function sendResend({ apiKey, from, to, subject, html }) {
  if (!apiKey) return { ok: false, id: null, error: "RESEND_API_KEY missing" };
  if (!from)   return { ok: false, id: null, error: "MAIL_FROM missing" };
  const resend = new Resend(apiKey);
  try {
    const { data, error } = await resend.emails.send({ from, to, subject, html });
    if (error) return { ok: false, id: data?.id || null, error: error?.message || JSON.stringify(error) };
    return { ok: true, id: data?.id || null, error: null };
  } catch (e) {
    return { ok: false, id: null, error: String(e?.message || e) };
  }
}

export async function GET(req) {
  const env = process.env.VERCEL_ENV || process.env.NODE_ENV || "unknown";
  const { RESEND_API_KEY, MAIL_FROM, MAIL_ADMINS } = getMailEnv();

  const { searchParams } = new URL(req.url);
  const toOverride = s(searchParams.get("to"));
  const subject = s(searchParams.get("subject")) || "YolcuTransferi — ADMIN TEST";
  const html = s(searchParams.get("html")) || "<b>Bu bir testtir.</b> Admin e-postası geliyor mu?";

  const recipients = toOverride
    ? toOverride.split(",").map(x => x.trim()).filter(Boolean)
    : MAIL_ADMINS;

  if (!RESEND_API_KEY) return NextResponse.json({ ok: false, env, error: "RESEND_API_KEY missing" }, { status: 500 });
  if (!MAIL_FROM)      return NextResponse.json({ ok: false, env, error: "MAIL_FROM missing" }, { status: 500 });
  if (!recipients.length) return NextResponse.json({ ok: false, env, error: "No recipients (MAIL_ADMINS empty and no ?to=...)" }, { status: 400 });

  const results = [];
  for (const to of recipients) {
    const r = await sendResend({ apiKey: RESEND_API_KEY, from: MAIL_FROM, to, subject, html });
    results.push({ to, ...r });
  }

  return NextResponse.json(
    { ok: true, env, from: MAIL_FROM, recipients, results },
    { headers: { "Cache-Control": "no-store" } }
  );
}
