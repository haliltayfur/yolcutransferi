// app/api/rezervasyon/route.js
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const db = await connectToDatabase();

    // Sipariş kodu (orderId) varsa onu al yoksa üret
    let orderId = body.orderId;
    if (!orderId) {
      const today = new Date();
      orderId = `siparis${today.getDate()}${today.getMonth() + 1}${today.getFullYear()}_${1000 + Math.floor(Math.random() * 300)}`;
    }

    // Ödeme durumunu kontrol et (varsa kullan yoksa default)
    let status = body.status || "Ödeme Yapıldı";

    // "extras" ve "extrasQty" güvenli kontrol
    let extras = [];
    let extrasQty = {};
    try {
      extras = Array.isArray(body.extras) ? body.extras : [];
      extrasQty = typeof body.extrasQty === "object" && body.extrasQty !== null ? body.extrasQty : {};
    } catch {
      extras = [];
      extrasQty = {};
    }

    // Kayıt objesi hazırla
    const newRez = {
      ...body,
      orderId,
      status,
      extras,
      extrasQty,
      createdAt: new Date(),
    };

    // DB'ye yaz
    await db.collection("rezervasyonlar").insertOne(newRez);

    // Ekstralar insan okuyabilir şekilde
    let extrasHtml = "Ekstra yok";
    if (extras && extras.length > 0) {
      extrasHtml = extras.map(k => {
        let adet = extrasQty?.[k] || 1;
        return `${k} (${adet} adet)`;
      }).join(", ");
    }

    // Rezervasyon Özeti HTML (hem admin hem müşteri için ortak)
    const summaryHtml = `
      <b>Sipariş No:</b> ${orderId}<br/>
      <b>Ad Soyad:</b> ${body.name || "-"} ${body.surname || ""}<br/>
      <b>Telefon:</b> ${body.phone || "-"}<br/>
      <b>E-posta:</b> ${body.email || "-"}<br/>
      <b>Transfer Türü:</b> ${body.transfer || "-"}<br/>
      <b>Nereden:</b> ${body.from || "-"}<br/>
      <b>Nereye:</b> ${body.to || "-"}<br/>
      <b>Tarih/Saat:</b> ${body.date || "-"} ${body.time || ""}<br/>
      <b>Kişi Sayısı:</b> ${body.people || "-"}<br/>
      <b>Araç:</b> ${body.vehicle || "-"}<br/>
      ${body.pnr ? `<b>PNR:</b> ${body.pnr}<br/>` : ""}
      ${body.note ? `<b>Not:</b> ${body.note}<br/>` : ""}
      <b>Ekstralar:</b> ${extrasHtml}<br/>
      <b>Durum:</b> ${status}
    `;

    // Sadece başarılı ödemelerde mail gönder (iptal edilenlerde mail yok)
    if (status === "Ödeme Yapıldı") {
      // -- ADMIN'E MAİL --
      await resend.emails.send({
        from: "YolcuTransferi <info@yolcutransferi.com>",
        to: ["info@yolcutransferi.com", "byhaliltayfur@hotmail.com"],
        subject: "Yeni Rezervasyon Alındı",
        html: `<b>Yeni rezervasyon!</b><br/><br/>${summaryHtml}`,
        reply_to: "info@yolcutransferi.com"
      });

      // -- MÜŞTERİYE MAİL --
      if (body.email && /\S+@\S+\.\S+/.test(body.email)) {
        await resend.emails.send({
          from: "YolcuTransferi <info@yolcutransferi.com>",
          to: [body.email],
          subject: "Rezervasyonunuz Alındı | YolcuTransferi.com",
          reply_to: "info@yolcutransferi.com",
          html: `
            <div style="font-family: Quicksand,Arial,sans-serif; color:#232118;">
              <h2 style="color:#bfa658; margin-bottom:8px;">Sayın ${body.name || ""} ${body.surname || ""},</h2>
              <p>
                Rezervasyon talebiniz başarıyla alındı. Size özel hazırlanmış eşsiz bir transfer deneyimi için çalışmaya başladık!
              </p>
              <div style="margin:16px 0; padding:12px 18px; border:1px solid #bfa658; border-radius:14px; background:#19160a; color:#ffeec2;">
                ${summaryHtml}
              </div>
              <p>
                En kısa zamanda sipariş özetinize istinaden, <b>en iyi hizmeti sunacak şoför ve aracı</b> rezerve edeceğiz.<br/>
                Transferinizle ilgili tüm detaylar <b>telefon</b> veya <b>e-posta</b> yoluyla tarafınıza bildirilecektir.<br/>
                <span style="color:#bfa658;"><b>YolcuTransferi ailesi olarak keyifli bir yolculuk dileriz.</b></span>
              </p>
              <hr style="margin:20px 0; border:none; border-top:1px solid #bfa658;"/>
              <div style="color:#bfa658; font-size:13px;">info@yolcutransferi.com &nbsp; | &nbsp; 0539 526 75 69</div>
            </div>
          `,
        });
      }
    }

    return NextResponse.json({ success: true, orderId });
  } catch (err) {
    return NextResponse.json({ error: err?.toString() }, { status: 500 });
  }
}
