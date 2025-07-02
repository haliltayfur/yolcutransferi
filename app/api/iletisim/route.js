// /app/api/iletisim/route.js
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Resend } from "resend";

// ENV'DEN KEY'i çek
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    // 1) JSON al
    const body = await req.json();

    // VALIDASYON: KVKK ve zorunlu alanlar
    if (!body.ad || !body.soyad || !body.telefon || !body.email || !body.mesaj || !body.iletisimTercihi || !body.kvkkOnay) {
      return NextResponse.json({ error: "Lütfen tüm zorunlu alanları doldurun." }, { status: 400 });
    }

    // 2) DB'ye kayıt at
    const db = await connectToDatabase();
    const now = new Date();
    const dateStr = `${String(now.getDate()).padStart(2,"0")}${String(now.getMonth()+1).padStart(2,"0")}${now.getFullYear()}`;
    const countToday = await db.collection("iletisimForms").countDocuments({
      createdAt: { $gte: new Date(now.getFullYear(), now.getMonth(), now.getDate()) }
    });
    const kayitNo = `iletisim${dateStr}_${String(countToday+1).padStart(5,"0")}`;

    const yeniKayit = {
      ...body,
      createdAt: now,
      kaldirildi: false,
      kayitNo,
      kvkkOnay: body.kvkkOnay === "true" || body.kvkkOnay === true
    };
    await db.collection("iletisimForms").insertOne(yeniKayit);

    // 3) Müşteriye onay maili
    await resend.emails.send({
      from: "YolcuTransferi <info@yolcutransferi.com>",
      to: [body.email],
      subject: "Yolcu Transferi İletişim",
      html: `<b>${body.neden || ""}</b> konulu mesajınızı uzman ekibimize ilettik.<br/>
             Tercih ettiğiniz gibi size <b>${body.iletisimTercihi}</b> üzerinden ulaşacağız.<br/><br/>
             <b>Kayıt No:</b> ${kayitNo}<br/>
             <b>Mesajınız:</b><br/>
             <div style="border:1px solid #ffeec2;border-radius:8px;padding:8px 16px;margin:8px 0;color:#000;background:#fff8e1">
             ${body.mesaj.replace(/\n/g, "<br/>")}
             </div>
             <br/>
             7/24 VIP Yolcu Transferi için Yolcutransferi.com olarak her zaman yanınızdayız.`
    });

    // 4) Admin ve byhalil'e info maili (KISA & KURUMSAL)
    await resend.emails.send({
      from: "YolcuTransferi <info@yolcutransferi.com>",
      to: ["info@yolcutransferi.com", "byhaliltayfur@hotmail.com"],
      subject: "Yeni İletişim Mesajı",
      html: `<b>Ad Soyad:</b> ${body.ad} ${body.soyad || ""}<br/>
             <b>Telefon:</b> ${body.telefon}<br/>
             <b>E-posta:</b> ${body.email}<br/>
             <b>İletişim Nedeni:</b> ${body.neden}<br/>
             <b>Tercih:</b> ${body.iletisimTercihi}<br/>
             <b>Kayıt No:</b> ${kayitNo}<br/>
             <b>Mesaj:</b><br/>
             <div style="border:1px solid #ffeec2;border-radius:8px;padding:8px 16px;margin:8px 0;color:#000;background:#fff8e1">
             ${body.mesaj.replace(/\n/g, "<br/>")}
             </div>
             <b>KVKK Onay:</b> ${body.kvkkOnay ? "Evet" : "Hayır"}<br/>`
    });

    return NextResponse.json({ success: true, kayitNo });
  } catch (err) {
    console.error("Kayıt eklenirken hata:", err);
    return NextResponse.json({ error: err.toString() }, { status: 500 });
  }
}
