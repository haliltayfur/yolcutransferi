// app/api/uye/upload-photo/route.js

import { promises as fs } from "fs";
import path from "path";
import formidable from "formidable";
import { connectToDatabase } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

// ✔️ Vercel Next 14.2 için doğru config:
export const routeSegmentConfig = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  // Dosya upload işlemi
  const form = formidable({ multiples: false, uploadDir: "/tmp", keepExtensions: true });

  // Buffer'ı al
  const data = await req.formData();
  const file = data.get("file"); // <input name="file" />
  const uyeNo = data.get("uyeNo"); // <input name="uyeNo" />

  if (!file || !uyeNo) {
    return Response.json({ success: false, error: "Dosya veya üye numarası eksik" }, { status: 400 });
  }

  // Dosya adı: Üye numarasına göre kaydet
  const buffer = Buffer.from(await file.arrayBuffer());
  const uploadDir = path.join(process.cwd(), "public");
  const fileName = `${uyeNo}.png`;
  const filePath = path.join(uploadDir, fileName);

  // Kayıt et
  await fs.writeFile(filePath, buffer);

  // İstersen DB'de de üyeye profil resmi kaydını güncelle
  const db = await connectToDatabase();
  await db.collection("uyeler").updateOne(
    { uyeNo },
    { $set: { fotoUrl: `/public/${fileName}` } }
  );

  return Response.json({ success: true, fileName });
}

// app/api/uye/upload-photo/route.js
