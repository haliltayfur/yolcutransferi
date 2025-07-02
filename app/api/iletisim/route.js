import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Resend } from "resend";
import formidable from "formidable";
import { promises as fs } from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const UPLOAD_ROOT = path.join(process.cwd(), "public", "ekler", "iletisim");
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  // Edge runtime'da çalışmaz, next.config'de runtime: "nodejs" olmalı!
  try {
    // Request'ten Node.js readable stream alın
    const body = await req.body;
    const contentType = req.headers.get("content-type");
    if (!contentType?.includes("multipart/form-data")) {
      return NextResponse.json({ error: "Geçersiz istek tipi" }, { status: 400 });
    }
    const boundary = contentType.split("boundary=")[1];
    const buffer = await streamToBuffer(body);

    // formidable ile buffer'dan parse
    const form = formidable({ multiples: false, uploadDir: UPLOAD_ROOT, keepExtensions: true });
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse({ headers: { "content-type": contentType }, buffer }, (err, fields, files) => {
        if (err) reject(err); else resolve({ fields, files });
      });
    });

    let ekYolu = "";
    if (files.ek) {
      const file = files.ek;
      const today = new Date().toISOString().slice(0, 10);
      const targetDir = path.join(UPLOAD_ROOT, today);
      await fs.mkdir(targetDir, { recursive: true });
      const ext = path.extname(file.originalFilename || "").toLowerCase();
      const newName = `${Date.now()}_${Math.random().toString(36).slice(2,6)}${ext}`;
      const dest = path.join(targetDir, newName);
      await fs.copyFile(file.filepath, dest);
      ekYolu = `/ekler/iletisim/${today}/${newName}`;
    }

    const db = await connectToDatabase();
    const now = new Date();
    const dateStr = `${String(now.getDate()).padStart(2,"0")}${String(now.getMonth()+1).padStart(2,"0")}${now.getFullYear()}`;
    const countToday = await db.collection("iletisimForms").countDocuments({
      createdAt: { $gte: new Date(now.getFullYear(), now.getMonth(), now.getDate()) }
    });
    const kayitNo = `iletisim${dateStr}_${String(countToday+1).padStart(5,"0")}`;

    const yeniKayit = {
      ...fields,
      createdAt: new Date(),
      kaldirildi: false,
      kayitNo,
      ek: ekYolu,
      kvkkOnay: fields.kvkkOnay === "true" || fields.kvkkOnay === true
    };
    await db.collection("iletisimForms").insertOne(yeniKayit);

    // Kullanıcıya otomatik mail gönder
    if (fields.email) {
      await resend.emails.send({
        from: "YolcuTransferi <info@yolcutransferi.com>",
        to: fields.email,
        subject: "YolcuTransferi İletişim - Mesajınız Alındı",
        html: `
        <div style="font-family: Arial,sans-serif;font-size:16px;">
        <b>Sayın ${fields.ad} ${fields.soyad},</b><br>
        İletişim sayfamızdan gönderdiğiniz mesaj bize ulaşmıştır.<br>
        <b>En kısa sürede, tercih ettiğiniz iletişim kanalı üzerinden size geri dönüş yapılacaktır.</b><br><br>
        Teşekkürler,<br>
        <b>YolcuTransferi.com</b><br>
        </div>`
      });
    }

    return NextResponse.json({ success: true, kayitNo, ek: ekYolu });
  } catch (err) {
    return NextResponse.json({ error: err.toString() }, { status: 500 });
  }
}

// Helper: Stream'den buffer (Vercel'de gerekebilir)
async function streamToBuffer(stream) {
  const reader = stream.getReader();
  let chunks = [];
  let done, value;
  while (!(done = (await reader.read()).done)) {
    value = (await reader.read()).value;
    if (value) chunks.push(value);
  }
  return Buffer.concat(chunks);
}
