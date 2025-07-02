import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Resend } from "resend";
export const dynamic = "force-dynamic";
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const db = await connectToDatabase();

    const now = new Date();
    const dateStr = `${String(now.getDate()).padStart(2,"0")}${String(now.getMonth()+1).padStart(2,"0")}${now.getFullYear()}`;
    const countToday = await db.collection("iletisimForms").countDocuments({
      createdAt: { $gte: new Date(now.getFullYear(), now.getMonth(), now.getDate()) }
    });
    const kayitNo = `iletisim${dateStr}_${String(countToday+1).padStart(5,"0")}`;

    const yeniKayit = {
      ...body,
      createdAt: new Date(),
      kaldirildi: false,
      kayitNo,
      kvkkOnay: body.kvkkOnay === "true" || body.kvkkOnay === true
    };
    await db.collection("iletisimForms").insertOne(yeniKayit);

    // Kullanıcıya otomatik mail (kurumsal dil)
    if (body.email) {
      await resend.emails.send({
        from: "YolcuTransferi <info@yolcutransferi.com>",
        to: body.email,
        subject: "YolcuTransferi İletişim - Mesajınız Alındı",
        html: `
        <div style="font-family: Arial,sans-serif;font-size:16px;">
        <b>Sayın ${body.ad} ${body.soyad},</b><br>
        İletişim sayfamızdan gönderdiğiniz mesaj alınmıştır.<br>
        Tercih ettiğiniz iletişim kanalı üzerinden en kısa sürede dönüş yapılacaktır.<br><br>
        Teşekkür ederiz.<br>
        <b>YolcuTransferi.com Ekibi</b>
        </div>`
      });
    }

    // Yöneticiye bildirim maili
    await resend.emails.send({
      from: "YolcuTransferi <info@yolcutransferi.com>",
      to: ["info@yolcutransferi.com", "byhaliltayfur@hotmail.com"],
      subject: "Yeni İletişim Mesajı",
      html: `<b>Ad Soyad:</b> ${body.ad} ${body.soyad || ""}<br/>
             <b>Telefon:</b> ${body.telefon}<br/>
             <b>E-posta:</b> ${body.email}<br/>
             <b>Mesaj:</b> ${body.mesaj}<br/>
             <b>İletişim Nedeni:</b> ${body.neden}<br/>
             <b>Tercih:</b> ${body.iletisimTercihi}<br/>
             <b>KVKK Onay:</b> ${yeniKayit.kvkkOnay ? "Evet" : "Hayır"}<br/>
             <b>Kayıt No:</b> ${kayitNo}`
    });

    return NextResponse.json({ success: true, kayitNo });
  } catch (err) {
    return NextResponse.json({ error: err.toString() }, { status: 500 });
  }
}
