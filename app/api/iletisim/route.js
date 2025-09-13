// /app/api/iletisim/route.js
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

// ==== ENV ZORUNLU ====
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const MAIL_FROM = process.env.MAIL_FROM; // Örn: 'YolcuTransferi <info@yolcutransferi.com>'
const MAIL_ADMINS = (
  process.env.MAIL_ADMINS ||
  process.env.MAIL_TO || // eski değişken
  ""
).split(",").map(s => s.trim()).filter(Boolean);

// Env doğrulama (erken fail -> problemi hemen gör)
function assertEnv() {
  if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY tanımlı değil.");
  if (!MAIL_FROM || !/@/.test(MAIL_FROM)) throw new Error("MAIL_FROM hatalı veya boş. Örn: YolcuTransferi <info@yolcutransferi.com>");
  if (!MAIL_ADMINS.length) throw new Error("MAIL_ADMINS boş. Örn: info@yolcutransferi.com,byhaliltayfur@hotmail.com");
}
assertEnv();

const resend = new Resend(RESEND_API_KEY);
const s = (v) => String(v ?? "");

async function sendResend({ to, subject, html, replyTo }) {
  try {
    const { data, error } = await resend.emails.send({
      from: MAIL_FROM,
      to,
      subject,
      html,
      reply_to: replyTo || undefined,
    });
    if (error) return { ok: false, id: data?.id || null, error: error?.message || JSON.stringify(error) };
    return { ok: true, id: data?.id || null, error: null };
  } catch (e) {
    return { ok: false, id: null, error: String(e?.message || e) };
  }
}

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

    // --- DB'ye yaz ---
    const db = await connectToDatabase();
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const dateStr = `${String(now.getDate()).padStart(2,"0")}${String(now.getMonth()+1).padStart(2,"0")}${now.getFullYear()}`;
    const countToday = await db.collection("iletisimForms").countDocuments({ createdAt: { $gte: todayStart } });
    const kayitNo = `iletisim${dateStr}_${String(countToday + 1).padStart(5,"0")}`;

    const doc = {
      ad, soyad, telefon, email, mesaj, iletisimTercihi, neden,
      kvkkOnay, createdAt: now, kaldirildi: false, kayitNo
    };
    const insertRes = await db.collection("iletisimForms").insertOne(doc);

    // --- ADMIN mailleri: tek tek gönder ---
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

    const adminResults = [];
    for (const to of MAIL_ADMINS) {
      const r = await sendResend({ to, subject: adminSubject, html: adminHtml, replyTo: email });
      adminResults.push({ to, ...r });
    }

    // --- MÜŞTERİ onayı ---
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

    const customerResult = await sendResend({ to: email, subject: customerSubject, html: customerHtml });

    // --- Sonuçları kayda yaz ---
    await db.collection("iletisimForms").updateOne(
      { _id: insertRes.insertedId },
      { $set: { mail: { admins: adminResults, customer: customerResult }, mailAt: new Date() } }
    );

    // Net tanılama için döndür
    return NextResponse.json({
      success: true,
      env, dbName, kayitNo,
      toAdmins: MAIL_ADMINS,
      from: MAIL_FROM,
      sent: { admins: adminResults, customer: customerResult }
    }, { headers: { "Cache-Control": "no-store" } });

  } catch (err) {
    console.error("[/api/iletisim] Hata:", err);
    return NextResponse.json({ error: String(err?.message || err) }, { status: 500, headers: { "Cache-Control": "no-store" } });
  }
}
