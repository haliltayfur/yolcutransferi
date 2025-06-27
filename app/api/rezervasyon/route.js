// /app/api/rezervasyon/route.js
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Resend } from "resend";
import { extrasListByCategory } from "@/data/extrasByCategory";

// İsim formatlayıcı
function formatName(name = "") {
  return name.trim().charAt(0).toUpperCase() + name.trim().slice(1).toLowerCase();
}
function formatSurname(surname = "") {
  return surname.trim().toUpperCase();
}

// Mail şablonu — müşteriye gönderilecek!
function buildCustomerMail({
  name, surname, segment, orderId, date, time, transfer, from, to,
  people, vehicle, pnr, note,
  selectedExtras, extrasQty,
  basePrice, extrasTotal, kdv, toplam
}) {
  return `
  <div style="background:#19160a; color:#ffeec2; font-family:'Quicksand',Arial,sans-serif; max-width:520px; margin:auto; border-radius:20px; border:2px solid #bfa658; padding:32px 28px 24px 28px;">
    <div style="text-align:center;margin-bottom:16px;">
      <img src="https://yolcutransferi.com/logo_gold.svg" alt="YolcuTransferi.com" style="height:48px;">
    </div>
    <div style="font-size:19px;font-weight:600;color:#ffeec2;margin-bottom:10px;">
      Sayın ${formatName(name)} ${formatSurname(surname)},
    </div>
    <div style="font-size:16px;color:#ffeec2;margin-bottom:14px;">
      <b>Yolcu Transferi Rezervasyon</b> talebiniz başarılı bir şekilde ekiplerimize iletilmiştir.<br>
      Ekibimiz, seçmiş olduğunuz <b>${segment}</b> segmentinde <b>en iyi VIP transfer deneyimi</b> için hazırlıklara başlamıştır. 
      Kısa süre içerisinde, size özel <b>VIP aracınız</b> ve <b>profesyonel şoförünüz</b> belirlenerek, rezervasyonunuzda ilettiğiniz tüm talepleriniz eksiksiz hazırlanacaktır.
    </div>
    <div style="background:#232118; border-radius:12px; padding:18px 18px 10px 18px; margin-bottom:12px; border:1.5px solid #bfa658;">
      <table style="width:100%;font-size:15px;color:#ffeec2;">
        <tbody>
          <tr><td><b>Sipariş No:</b></td><td>${orderId}</td></tr>
          <tr><td><b>Tarih/Saat:</b></td><td>${date} ${time}</td></tr>
          <tr><td><b>Transfer Türü:</b></td><td>${transfer}</td></tr>
          <tr><td><b>Kalkış:</b></td><td>${from}</td></tr>
          <tr><td><b>Varış:</b></td><td>${to}</td></tr>
          <tr><td><b>Kişi Sayısı:</b></td><td>${people}</td></tr>
          <tr><td><b>Segment:</b></td><td>${segment}</td></tr>
          <tr><td><b>Araç:</b></td><td>${vehicle ? vehicle : `<span style="color:#bfa658;font-size:14px;">Seçtiğiniz segmentte en uygun VIP araç atanacaktır.</span>`}</td></tr>
          ${pnr ? `<tr><td><b>PNR/Uçuş Kodu:</b></td><td>${pnr}</td></tr>` : ""}
          ${note ? `<tr><td><b>Ek Not:</b></td><td>${note}</td></tr>` : ""}
        </tbody>
      </table>
      <div style="margin-top:18px;">
        <b style="color:#bfa658;">Ekstralar:</b>
        ${
          selectedExtras && selectedExtras.length > 0
          ? `<table style="width:100%;font-size:14px;margin-top:5px;">
              <thead>
                <tr>
                  <th align="left">Ürün</th>
                  <th>Adet</th>
                  <th>Birim</th>
                  <th>Toplam</th>
                </tr>
              </thead>
              <tbody>
                ${selectedExtras.map(e => `
                  <tr>
                    <td>${e.label}</td>
                    <td style="text-align:center;">${extrasQty[e.key] || 1}</td>
                    <td>${e.price?.toLocaleString()} ₺</td>
                    <td>${((e.price || 0)*(extrasQty[e.key]||1)).toLocaleString()} ₺</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>`
          : `<span style="color:#aaa;margin-left:10px;">Ekstra talebiniz bulunmamaktadır.</span>`
        }
      </div>
      <div style="margin-top:15px;text-align:right;">
        <div>Transfer Bedeli: <b>${basePrice.toLocaleString()} ₺</b></div>
        <div>Ekstralar: <b>${extrasTotal.toLocaleString()} ₺</b></div>
        <div>KDV (%20): <b>${kdv.toLocaleString(undefined, { maximumFractionDigits: 2 })} ₺</b></div>
        <div style="font-size:16px;color:#bfa658;"><b>Toplam: ${toplam.toLocaleString()} ₺</b></div>
      </div>
    </div>
    <div style="font-size:14px;color:#ffeec2; margin-bottom:8px;">
      <b>Rezervasyonunuzun tüm detayları kontrol edilip, en kısa sürede tarafınıza dönüş sağlanacaktır.</b><br/>
      Rezervasyonunuz ve VIP hizmetlerimiz hakkında sorularınız olursa 7/24 WhatsApp hattımızdan bize ulaşabilirsiniz.
    </div>
    <div style="color:#bfa658; font-size:13px;text-align:center;margin-top:15px;">
      <img src="https://yolcutransferi.com/logo_gold.svg" style="height:26px;margin-bottom:3px;"><br>
      <span>YolcuTransferi – Lüks Yolculuğunuzun Adı</span>
    </div>
    <div style="text-align:center;font-size:13px;margin-top:7px;">
      <span style="color:#ffeec2;background:#19160a;padding:5px 10px;border-radius:8px;display:inline-block;">
        WhatsApp 7/24: <b>+90 539 526 75 69</b>
      </span>
    </div>
  </div>
  `;
}

// Eksik veya sıfır fiyata karşı garanti (dummy fiyat)
function parsePrice(n) {
  const x = Number(n);
  return isNaN(x) ? 0 : x;
}

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

    let status = body.status || "Ödeme Yapıldı";

    // Fiyat hesaplamaları
    const basePrice = parsePrice(body.basePrice || 4000);
    let allExtras = [];
    try {
      allExtras = extrasListByCategory.flatMap(cat => cat.items);
    } catch { allExtras = []; }
    let selectedExtras = [];
    if (body.extras && Array.isArray(body.extras)) {
      selectedExtras = allExtras.filter(e => body.extras.includes(e.key));
    }
    const extrasQty = typeof body.extrasQty === "object" && body.extrasQty !== null ? body.extrasQty : {};
    const extrasTotal = selectedExtras.reduce((sum, e) => sum + (e.price * (extrasQty[e.key] || 1)), 0);
    const KDV_ORAN = 0.20;
    const araToplam = basePrice + extrasTotal;
    const kdv = araToplam * KDV_ORAN;
    const toplam = araToplam + kdv;

    // Tüm alanlarla kaydet (gerekirse extras, extrasQty ve summary dahil)
    const newRez = {
      ...body,
      orderId,
      status,
      extras: body.extras || [],
      extrasQty,
      selectedExtras,
      createdAt: new Date(),
      summary: { basePrice, extrasTotal, kdv, toplam }
    };
    await db.collection("rezervasyonlar").insertOne(newRez);

    // Sadece başarılı ödemede müşteriye özel kurumsal e-posta!
    if (status === "Ödeme Yapıldı" && body.email) {
      const html = buildCustomerMail({
        name: body.name,
        surname: body.surname,
        segment: body.segment,
        orderId,
        date: body.date,
        time: body.time,
        transfer: body.transfer,
        from: body.from,
        to: body.to,
        people: body.people,
        vehicle: body.vehicle,
        pnr: body.pnr,
        note: body.note,
        selectedExtras,
        extrasQty,
        basePrice,
        extrasTotal,
        kdv,
        toplam
      });

      await resend.emails.send({
        from: "YolcuTransferi <info@yolcutransferi.com>",
        to: [body.email],
        subject: `Yolcu Transferi Rezervasyonunuz Onaylandı!`,
        html,
      });
    }

    // ... (ADMİN'E GİDEN MAİLİ DE AYNI ŞABLONDA Kİ BARİZ FARKLA AYRI YAPABİLİRSİN, BURADA ODAK MÜŞTERİ MAİLİ)
    return NextResponse.json({ success: true, orderId });
  } catch (err) {
    return NextResponse.json({ error: err?.toString() }, { status: 500 });
  }
}
// /app/api/rezervasyon/route.js
