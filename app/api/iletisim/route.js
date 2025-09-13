// /app/api/iletisim/route.js
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

// Domaininizi Resend üzerinde SPF/DKIM ile doğrulayana kadar geçici FROM:
const MAIL_FROM = process.env.MAIL_FROM || "YolcuTransferi <onboarding@resend.dev>";
// Virgülle çoklu admin tanımı desteklenir (örn: "info@yol...,destek@yol...")
const MAIL_ADMINS =
  (process.env.MAIL_ADMINS || process.env.MAIL_TO || "info@yolcutransferi.com,byhaliltayfur@hotmail.com")
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);

function s(v) { return String(v ?? ""); }

async function sendEmailSafe(opts) {
  if (!resend) return { ok: false, id: null, error: "RESEND_API_KEY missing" };
  try {
    const { data, error } = await resend.emails.send(opts);
    if (error) {
      // Resend SDK çoğu durumda error ile resolve eder (throw etmez)
      console.error("[mail] ERR:", error);
      return { ok: false, id: data?.id || null, error: (error?.message || JSON.stringify(error)) };
    }
    return { ok: true, id: data?.id || null, error: null };
  } catch (e) {
    console.error("[mail] EXC:", e);
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

    // 1) DB'ye yaz
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
    await db.collection("iletisimForms").insertOne(doc);

    // 2) ADMIN mailleri (her alıcıya AYRI gönder)
    const adminResults = [];
    for (const to of MAIL_ADMINS) {
      const r = await sendEmailSafe({
        from: MAIL_FROM,
        to,
        reply_to: email, // müşteriye cevap atmak için
        subject: "Yeni İletişim Mesajı",
        html: `
          <b>Ad Soyad:</b> ${ad} ${soyad}<br/>
          <b>Telefon:</b> ${telefon}<br/>
          <b>E-posta:</b> ${email}<br/>
          <b>İletişim Nedeni:</b> ${neden || "-"}<br/>
          <b>Tercih:</b> ${iletisimTercihi}<br/>
          <b>Kayıt No:</b> ${kayitNo}<br/>
          <b>Mesaj:</b><br/>
          <div style="border:1px solid #ffeec2;border-radius:8px;padding:8px 16px;margin:8px 0;color:#000;background:#fff8e1">
            ${mesaj.replace(/\n/g, "<br/>")}
          </div>
          <b>KVKK Onay:</b> ${kvkkOnay ? "Evet" : "Hayır"}<br/>
        `.trim(),
      });
      adminResults.push({ to, ...r });
    }

    // 3) MÜŞTERİ onay maili
    const customerResult = await sendEmailSafe({
      from: MAIL_FROM,
      to: email,
      subject: "YolcuTransferi — İletişim talebinizi aldık",
      html: `
        <b>${neden || ""}</b> konulu mesajınızı uzman ekibimize ilettik.<br/>
        Size <b>${iletisimTercihi}</b> üzerinden dönüş yapacağız.<br/><br/>
        <b>Kayıt No:</b> ${kayitNo}<br/>
        <b>Mesajınız:</b><br/>
        <div style="border:1px solid #ffeec2;border-radius:8px;padding:8px 16px;margin:8px 0;color:#000;background:#fff8e1">
          ${mesaj.replace(/\n/g, "<br/>")}
        </div>
        <br/>YolcuTransferi.com
      `.trim(),
    });

    // Log: hangi admin düştü/düşmedi gör
    console.log("[iletisim] adminResults:", adminResults);
    console.log("[iletisim] customerResult:", customerResult);

    return NextResponse.json(
      {
        success: true,
        kayitNo,
        env,
        dbName,
        sent: {
          admins: adminResults,   // [{to, ok, id, error}, ...]
          customer: customerResult // {ok, id, error}
        }
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
