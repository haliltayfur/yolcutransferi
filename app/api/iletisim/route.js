import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json(); // Dosya yoksa, JSON olarak alıyoruz
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

    // E-posta gönder
    await resend.emails.send({
      from: "YolcuTransferi <info@yolcutransferi.com>",
      to: ["info@yolcutransferi.com", "byhaliltayfur@hotmail.com"],
      subject: "Yeni İletişim Mesajı",
      html: `<b>Ad Soyad:</b> ${yeniKayit.ad} ${yeniKayit.soyad || ""}<br/>
             <b>Telefon:</b> ${yeniKayit.telefon}<br/>
             <b>E-posta:</b> ${yeniKayit.email}<br/>
             <b>Mesaj:</b> ${yeniKayit.mesaj}<br/>
             <b>İletişim Nedeni:</b> ${yeniKayit.neden}<br/>
             <b>Tercih:</b> ${yeniKayit.iletisimTercihi}<br/>
             <b>KVKK Onay:</b> ${yeniKayit.kvkkOnay ? "Evet" : "Hayır"}<br/>
             <b>Kayıt No:</b> ${yeniKayit.kayitNo}`
    });

    return NextResponse.json({ success: true, kayitNo });
  } catch (err) {
    console.error("Kayıt eklenirken hata:", err);
    return NextResponse.json({ error: err.toString() }, { status: 500 });
  }
}
