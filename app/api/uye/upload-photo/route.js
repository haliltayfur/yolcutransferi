// app/api/uye/upload-photo/route.js
import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";
import formidable from "formidable";

// Next.js özel ayar (formidable ile dosya parse etmek için)
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  // formidable ile dosya al
  const form = new formidable.IncomingForm();
  form.uploadDir = "/tmp";
  form.keepExtensions = true;

  return new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) return resolve(NextResponse.json({ success: false, error: "Yükleme hatası" }));

      const file = files.file;
      const filename = fields.filename || "user.png";

      // Dosya yolu: /public/üyeno.png
      const targetPath = path.join(process.cwd(), "public", filename);

      try {
        await fs.copyFile(file.filepath, targetPath);
        resolve(
          NextResponse.json({
            success: true,
            photoUrl: `/${filename}`,
          })
        );
      } catch (e) {
        resolve(NextResponse.json({ success: false, error: "Kayıt hatası" }));
      }
    });
  });
}
