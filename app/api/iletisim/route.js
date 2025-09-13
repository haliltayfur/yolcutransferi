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

    // ---- 1) Form verileri ----
    const ad              = s(body.ad);
    const soyad           = s(body.soyad);
    const telefon         = s(body.telefon);
    const email           = s(body.email);
    const mesaj           = s(body.mesaj);
    const iletisimTercihi = s(body.iletisimTercihi);
    const neden           = s(body.neden);
    const kvkkOnay        = body.kvkkOnay === true || body.kvkkOnay === "true";

    if (!ad || !soyad || !telefon || !email || !mesaj || !iletisimTercihi || !kvkkOnay) {
      return NextResponse.json({ error: "Lütfen tüm zorunlu alanları doldurun." }, { status: 400 });
    }

    // ---- 2) DB'ye yaz ----
    const db = await connectToDatabase();
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const dateStr = `${String(now.getDate()).padStart(2, "0")}${String(now.getMonth() + 1).padStart(2, "0")}${now.getFullYear()}`;
    const countToday = await db.collection("iletisimForms").countDocuments({ createdAt: { $gte: todayStart } });
    const kayitNo = `iletisim${dateStr}_${String(countToday + 1).padStart(5, "0")}`;

    const doc = {
      ad, soyad, telefon, email, mesaj, iletisimTercihi, neden,
      kvkkOnay,
      createdAt: now,
      kaldirildi: false,
      kayitNo,
    };

    const insertRes = await db.collection("iletisimForms").insertOne(doc);

    // ---- 3) Mail env'lerini oku (RUN-TIME) ----
    const { RESEND_API_KEY, MAIL_FROM, MAIL_ADMINS } = getMailEnv();

    // ---- 4) Mail içerikleri ----
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

    // ---- 5) Gönderimler (önce Resend) ----
    const adminResults = [];
    if (MAIL_ADMINS.length > 0) {
      for (const to of MAIL_ADMINS) {
        // Önce Resend dene
        const rResend = await sendViaResend({
          apiKey: RESEND_API_KEY,
          from: MAIL_FROM,
          to,
          subject: adminSubject,
          html: adminHtml,
          replyTo: email,
        });

        // // Gerekirse SMTP fallback'i burada deneyebilirsin:
        // const finalR = rResend.ok ? rResend : await sendViaSMTP({
        //   from: MAIL_FROM, to, subject: adminSubject, html: adminHtml, replyTo: email
        // });

        adminResults.push({ to, ...rResend });
      }
    }

    const customerResult = await sendViaResend({
      apiKey: RESEND_API_KEY,
      from: MAIL_FROM,
      to: email,
      subject: customerSubject,
      html: customerHtml,
    });
    // // SMTP fallback istersen:
    // const customerFinal = customerResult.ok ? customerResult : await sendViaSMTP({
    //   from: MAIL_FROM, to: email, subject: customerSubject, html: customerHtml
    // });

    // ---- 6) Sonuçları kayda işle ----
    await db.collection("iletisimForms").updateOne(
      { _id: insertRes.insertedId },
      { $set: { mail: { admins: adminResults, customer: customerResult }, mailAt: new Date(), mailMeta: { from: MAIL_FROM, admins: MAIL_ADMINS } } }
    );

    // ---- 7) Dönüş ----
    return NextResponse.json(
      {
        success: true,
        env, dbName, kayitNo,
        mailFrom: MAIL_FROM,
        mailAdmins: MAIL_ADMINS,
        sent: { admins: adminResults, customer: customerResult }
      },
      { headers: { "Cache-Control": "no-store" } }
    );

  } catch (err) {
    console.error("[/api/iletisim] Hata:", err);
    return NextResponse.json({ error: String(err?.message || err) }, { status: 500, headers: { "Cache-Control": "no-store" } });
  }
}
