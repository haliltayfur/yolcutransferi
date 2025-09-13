// /app/api/iletisim/route.js
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Resend } from "resend";

export const runtime = "nodejs";        // Resend için şart
export const dynamic = "force-dynamic"; // DB işlemlerinde cache'e takılmasın

// ENV
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const MAIL_FROM = process.env.MAIL_FROM || "YolcuTransferi <onboarding@resend.dev>"; // domain doğrulanana dek güvenli
const MAIL_TO   = process.env.MAIL_TO   || "info@yolcutransferi.com";

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

function sanitize(str) {
  return String(str || "").toString();
}

export async function POST(req) {
  try {
    const body = await req.json();

    const ad = sanitize(body.ad);
    const soyad = sanitize(body.soyad);
    const telefon = sanitize(body.telefon);
    const email = sanitize(body.email);
    const mesaj = sanitize(body.mesaj);
    const iletisimTercihi = sanitize(body.iletisimTercihi);
    const neden = sanitize(body.neden);
    const kvkkOnay = body.kvkkOnay === true || body.kvkkOnay === "true";

    // Zorunlu alanlar
    if (!ad || !soyad || !telefon || !email || !mesaj || !iletisimTercihi || !kvkkOnay) {
      return NextResponse.json({ error: "Lütfen tüm zorunlu alanları doldurun." }, { status: 400 });
    }

    // --- DB KAYIT ---
    const db = await connectToDatabase();

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const dateStr = `${String(now.getDate()).padStart(2,"0")}${String(now.getMonth()+1).padStart(2,"0")}${now.getFullYear()}`;

    const countToday = await db.collection("iletisimForms").countDocuments({
      createdAt: { $gte: todayStart }
    });

    const kayitNo = `iletisim${dateStr}_${String(countToday + 1).padStart(5,"0")}`;

    const yeniKayit = {
      ad, soyad, telefon, email, mesaj, iletisimTercihi, neden,
      kvkkOnay,
      createdAt: now,
      kaldirildi: false,
      kayitNo,
    };

    await db.collection("iletisimForms").insertOne(yeniKayit);

    // --- MAİLLER ---
    if (!resend) {
      console.error("[iletisim] RESEND_API_KEY tanımlı değil, mail gönderimi atlandı.");
    } else {
      const customerMail = resend.emails.send({
        from: MAIL_FROM,
        to: [email],
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

      const adminMail = resend.emails.send({
        from: MAIL_FROM,
        to: [MAIL_TO, "byhaliltayfur@hotmail.com"],
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

      const results = await Promise.allSettled([customerMail, adminMail]);
      results.forEach((r, i) => {
        if (r.status === "rejected") {
          console.error(`[iletisim] Mail #${i + 1} başarısız:`, r.reason);
        }
      });
    }

    return NextResponse.json({ success: true, kayitNo });
  } catch (err) {
    console.error("Kayıt/Mail hatası:", err);
    return NextResponse.json({ error: String(err?.message || err) }, { status: 500 });
  }
}
