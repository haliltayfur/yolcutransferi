// /app/api/_mail-test/route.js
import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const MAIL_FROM = process.env.MAIL_FROM;
const MAIL_ADMINS = (
  process.env.MAIL_ADMINS || process.env.MAIL_TO || ""
).split(",").map(s => s.trim()).filter(Boolean);

export async function GET() {
  try {
    if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY yok");
    if (!MAIL_FROM) throw new Error("MAIL_FROM yok");
    if (!MAIL_ADMINS.length) throw new Error("MAIL_ADMINS boş");

    const resend = new Resend(RESEND_API_KEY);
    const results = [];
    for (const to of MAIL_ADMINS) {
      const { data, error } = await resend.emails.send({
        from: MAIL_FROM,
        to,
        subject: "YolcuTransferi — ADMIN TEST",
        html: "<b>Bu bir testtir.</b> Bu mail admin adreslerine ulaşıyor mu?",
      });
      results.push({ to, id: data?.id || null, error: error?.message || null });
    }

    return NextResponse.json({ ok: true, from: MAIL_FROM, admins: MAIL_ADMINS, results });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}
