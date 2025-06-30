import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Resend } from "resend";
import formidable from "formidable";
import { promises as fs } from "fs";
import path from "path";

// uploads dizini: public/ekler/iletisim/YYYY-MM-DD/
const UPLOAD_ROOT = path.join(process.cwd(), "public", "ekler", "iletisim");

// *** DİKKAT: export const config satırı ARTIK YOK! ***

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    // 1. Dosya ve alanları ayıkla (form-data)
    const form = formidable({
      multiples: false,
      maxFileSize: 10 * 1024 * 1024, // 10 MB
      filter: part => {
        if (!part.originalFilename) return false;
        const ext = path.extname(part.originalFilename || "").toLowerCase();
        return [".jpg",".jpeg",".png",".pdf",".doc",".docx",".xls",".xlsx",".zip"].includes(ext);
      },
      keepExtensions: true
    });

    const data = await new Promise((resolve, reject) =>
      form.parse(req, (err, fields, files) => {
        if (err) reject(err); else resolve({ fields, files });
      })
    );

    // 2. Alanlar
    const body = Object.fromEntries(
      Object.entries(data.fields).map(([k, v]) => [k, Array.isArray(v) ? v[0] : v])
    );

    // 3. Ek dosya işleme ve kaydetme (günlük klasör)
    let ekYolu = "";
    if (data.files.ek) {
      const file = data.files.ek;
      const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
      const targetDir = path.join(UPLOAD_ROOT, today);
      await fs.mkdir(targetDir, { recursive: true });
      // Benzersiz isim: timestamp_randomuzantı
      const ext = path.extname(file.originalFilename || "").toLowerCase();
      const newName = `${Date.now()}_${Math.random().toString(36).substr(2,6)}${ext}`;
      const dest = path.join(targetDir, newName);
      await fs.copyFile(file.filepath, dest);
      ekYolu = `/ekler/iletisim/${today}/${newName}`;
    }

    // 4. Yeni kayıt numarası üret (iletisimYYYYMMDD_00001)
    const db = await connectToDatabase();
    const now = new Date();
    const dateStr = `${String(now.getDate()).padStart(2,"0")}${String(now.getMonth()+1).padStart(2,"0")}${now.getFullYear()}`;
    const countToday = await db.collection("iletisimForms").countDocuments({
      createdAt: { $gte: new Date(now.getFullYear(), now.getMonth(), now.getDate()) }
    });
    const kayitNo = `iletisim${dateStr}_${String(countToday+1).padStart(5,"0")}`;

    // 5. Kayıt ve mail için hazırlık
    const yeniKayit = {
      ...body,
      createdAt: new Date(),
      kaldirildi: false,
      kayitNo,
      ek: ekYolu,
      kvkkOnay: body.kvkkOnay === "true" || body.kvkkOnay === true
    };
    await db.collection("iletisimForms").insertOne(yeniKayit);

    // 6. E-posta gönder
    let ekSatiri = ekYolu
      ? `<b>Ek Dosya:</b> <a href="https://yolcutransferi.com${ekYolu}" target="_blank">Dosyayı Görüntüle / İndir</a><br/>`
      : "";

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
             ${ekSatiri}
             <b>KVKK Onay:</b> ${yeniKayit.kvkkOnay ? "Evet" : "Hayır"}<br/>
             <b>Kayıt No:</b> ${yeniKayit.kayitNo}`
    });

    return NextResponse.json({ success: true, kayitNo, ek: ekYolu });
  } catch (err) {
    return NextResponse.json({ error: err.toString() }, { status: 500 });
  }
}
