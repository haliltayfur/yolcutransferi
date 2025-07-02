import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const db = await connectToDatabase();

    const kayitNo = "iletisim_" + Date.now();

    const yeniKayit = {
      ...body,
      createdAt: new Date(),
      kaldirildi: false,
      kayitNo,
      kvkkOnay: body.kvkkOnay === "true" || body.kvkkOnay === true
    };

    await db.collection("iletisimForms").insertOne(yeniKayit);

    // Mail gönder
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
