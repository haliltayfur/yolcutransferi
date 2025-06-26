// app/api/rezervasyon/route.js
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Türkçe TC kimlik ve telefon validasyonu:
function isValidTC(tc) {
  return /^[1-9][0-9]{10}$/.test(tc);
}
function isValidPhone(phone) {
  return /^05\d{9}$/.test(phone); // 05xxx şeklinde 11 hane
}
function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email || "");
}

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

    // Ödeme veya iptal (vazgeçen) durumu kontrol
    let status = body.status || "Ödeme Yapıldı";

    // E-mail, TC ve Telefon kontrolü
    if (status === "Ödeme Yapıldı") {
      if (!isValidTC(body.tc)) return NextResponse.json({ error: "TC kimlik numarası hatalı." }, { status: 400 });
      if (!isValidPhone(body.phone)) return NextResponse.json({ error: "Telefon numarası hatalı. (05xxx...)" }, { status: 400 });
      if (!isValidEmail(body.email)) return NextResponse.json({ error: "Geçerli bir e-posta adresi giriniz." }, { status: 400 });
    }

    // Güvenli ekstralar kontrol
    let extras = [];
    let extrasQty = {};
    try {
      extras = Array.isArray(body.extras) ? body.extras : (typeof body.extras === "string" ? body.extras.split(",").filter(Boolean) : []);
      extrasQty = typeof body.extrasQty === "object" && body.extrasQty !== null ? body.extrasQty : {};
    } catch {
      extras = [];
      extrasQty = {};
    }

    // Tutar, KDV ve toplam tutar
    const basePrice = Number(body.basePrice || 4000);
    let extrasList = [];
    if (body.extrasList && Array.isArray(body.extrasList)) {
      extrasList = body.extrasList;
    }
    // Eğer body.extrasList gelmiyorsa, admin panelden ilgili kayıttan gösterim için extras ve extrasQty kullanılabilir.

    // Ekstralar detayını metinleştir
    let extrasHtml = "Ekstra yok";
    if (extras && extras.length > 0) {
      extrasHtml = extras
        .map(k => {
          let adet = extrasQty?.[k] || 1;
          return `${k} (${adet} adet)`;
        })
        .join(", ");
    }

    // Tutar hesap
    let extrasTotal = 0;
    if (Array.isArray(body.selectedExtras)) {
      extrasTotal = body.selectedExtras.reduce((sum, e) => sum + (e.price * (body.extrasQty?.[e.key] || 1)), 0);
    }
    const araToplam = basePrice + extrasTotal;
    const KDV_ORAN = 0.20;
    const kdv = araToplam * KDV_ORAN;
    const toplam = araToplam + kdv;

    // Kayıt objesi (admin panelde kolay detay için tüm alanlar ile)
    const newRez = {
      ...body,
      orderId,
      status,
      extras,
      extrasQty,
      createdAt: new Date(),
      summary: {
        basePrice,
        extrasTotal,
        kdv,
        toplam,
      },
    };

    // DB'ye yaz
    await db.collection("rezervasyonlar").insertOne(newRez);

    // Özeti oluştur (hem admin hem müşteri için)
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
      <b>Segment:</b> ${body.segment || "-"}<br/>
      <b>Araç:</b> ${body.vehicle || "-"} <span style="font-size:13px">(Müşteri, segment seçti. Uygun araç atanacaktır.)</span><br/>
      ${body.pnr ? `<b>PNR:</b> ${body.pnr}<br/>` : ""}
      ${body.note ? `<b>Not:</b> ${body.note}<br/>` : ""}
      <b>Ekstralar:</b> ${extrasHtml}<br/>
      <b>Transfer Bedeli:</b> ${basePrice.toLocaleString()} ₺<br/>
      <b>Ekstralar:</b> ${extrasTotal.toLocaleString()} ₺<br/>
      <b>KDV (%20):</b> ${kdv.toLocaleString(undefined, { maximumFractionDigits: 2 })} ₺<br/>
      <b>Toplam:</b> ${toplam.toLocaleString()} ₺<br/>
      <b>Durum:</b> ${status}
    `;

    // Sadece başarılı ödemede mail gönder
    if (status === "Ödeme Yapıldı") {
      // 1- Admin'e mail
      await resend.emails.send({
        from: "YolcuTransferi <info@yolcutransferi.com>",
        to: ["info@yolcutransferi.com", "byhaliltayfur@hotmail.com"],
        subject: `Yeni Rezervasyon Alındı - ${orderId}`,
        html: `<b>Yeni rezervasyon!</b><br/><br/>${summaryHtml}`,
        reply_to: "info@yolcutransferi.com"
      });

      // 2- Müşteriye özet, güzel cümlelerle:
      if (body.email && isValidEmail(body.email)) {
        await resend.emails.send({
          from: "YolcuTransferi <info@yolcutransferi.com>",
          to: [body.email],
          subject: `Rezervasyonunuz Alındı | YolcuTransferi.com`,
          reply_to: "info@yolcutransferi.com",
          html: `
            <div style="font-family: Quicksand,Arial,sans-serif; color:#232118;">
              <h2 style="color:#bfa658; margin-bottom:8px;">Sayın ${body.name || ""} ${body.surname || ""},</h2>
              <p>
                Rezervasyon talebiniz başarıyla alınmıştır. Size özel hazırlanmış <b>VIP transfer deneyimi</b> için çalışmaya başladık!
              </p>
              <div style="margin:16px 0; padding:12px 18px; border:1px solid #bfa658; border-radius:14px; background:#19160a; color:#ffeec2;">
                ${summaryHtml}
              </div>
              <p>
                <b>En kısa zamanda sipariş özetinize istinaden, en iyi hizmeti sunacak şoför ve aracı rezerve edeceğiz.</b><br/>
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
// app/api/rezervasyon/route.js
