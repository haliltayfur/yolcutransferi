// app/api/uye/upload-photo/route.js
import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { nanoid } from "nanoid";

export const dynamic = "force-dynamic";

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get("file");
  const filename = formData.get("filename"); // ör: Uye_Musteri030724_10001.png

  if (!file || !filename) {
    return NextResponse.json({ success: false, error: "Dosya veya isim eksik." });
  }

  // Uygun mime/type kontrolü (image)
  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ success: false, error: "Yalnızca resim dosyası yüklenebilir." });
  }

  // Vercel Blob'a upload (üye numarası ile sabit isim)
  // Aynı isimli dosya yüklenirse eskiyi siler (üzerine yazar!)
  try {
    const blob = await put(
      `uyeresimleri/${filename}`,
      file,
      {
        access: "public",
        addRandomSuffix: false, // İsim sabit kalsın, hep aynı üyeno.png
      }
    );
    // blob.url: https://<deploy-id>.blob.vercel-storage.com/uyeresimleri/filename.png
    return NextResponse.json({ success: true, photoUrl: blob.url });
  } catch (e) {
    return NextResponse.json({ success: false, error: "Blob upload hatası: " + e.message });
  }
}
