// app/api/uye/upload-photo/route.js
import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

// ZORUNLU: Vercel'de dosya sistemine erişim YOK! Sadece yerel testte /public'e yazabilirsin.
// Gerçek deploy için bir bulut servisine (S3 vb) upload etmelisin. Ama local geliştirme ve demo için aşağıdaki kod çalışır.

export const dynamic = "force-dynamic";

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get("file");
  const filename = formData.get("filename");

  if (!file || !filename) {
    return NextResponse.json({ success: false, error: "Dosya veya isim eksik." });
  }

  // Okunan dosyayı /public altına yaz
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filePath = path.join(process.cwd(), "public", filename);
  try {
    await fs.writeFile(filePath, buffer);
    return NextResponse.json({ success: true, photoUrl: `/${filename}` });
  } catch (e) {
    return NextResponse.json({ success: false, error: "Dosya kaydedilemedi." });
  }
}
