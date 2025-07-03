import formidable from "formidable";
import fs from "fs";
import path from "path";
import { connectToDatabase } from "@/lib/mongodb";

// Next.js 14+ ile uyumlu! Sadece aşağıdaki export kullanılacak.
export const dynamic = "force-dynamic";

export async function POST(req) {
  // Klasik upload logic'i (formidable ile)
  const form = formidable({ multiples: false, uploadDir: "./public", keepExtensions: true });
  const data = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });

  // Dosyayı adlandır
  const { files, fields } = data;
  const uyeNo = fields.uyeNo || "unknown";
  const file = files && files.foto;
  let filename = "";
  if (file) {
    filename = `uye_${uyeNo}.png`;
    const dest = path.join(process.cwd(), "public", filename);
    fs.renameSync(file.filepath, dest);
  }

  // DB güncellemesi yapılabilir
  // const db = await connectToDatabase();
  // await db.collection("uyeler").updateOne({ uyeNo }, { $set: { fotoUrl: `/uye_${uyeNo}.png` } });

  return new Response(JSON.stringify({ success: true, url: filename ? `/${filename}` : "" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
