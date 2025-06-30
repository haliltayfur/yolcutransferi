import React from "react";
import fs from "fs";
import path from "path";

export default async function EklerPage() {
  const root = path.join(process.cwd(), "public", "ekler", "iletisim");
  let items = [];
  let days = [];
  // Klasör yoksa hata vermesin:
  try {
    await fs.promises.access(root);
  } catch {
    // Klasör yoksa oluştur (ilk deployda)
    await fs.promises.mkdir(root, { recursive: true });
  }
  try {
    days = await fs.promises.readdir(root);
  } catch { days = []; }
  for (let day of days) {
    const klasor = path.join(root, day);
    let files = [];
    try {
      files = await fs.promises.readdir(klasor);
    } catch { files = []; }
    items.push({
      day,
      files: files.map(f => `/ekler/iletisim/${day}/${f}`)
    });
  }
  return (
    <main className="max-w-3xl mx-auto p-7">
      <h1 className="text-2xl font-bold text-[#FFD700] mb-8">İletişim Dosya Ekleri</h1>
      {items.length === 0 && <div className="text-gray-400">Henüz yüklenen dosya yok.</div>}
      {items.map(({ day, files }) => (
        <div key={day} className="mb-8 border-b border-[#bfa65855] pb-6">
          <h2 className="font-semibold text-lg text-[#bfa658] mb-3">{day}</h2>
          <ul className="space-y-2">
            {files.map(file => (
              <li key={file}>
                <a href={file} target="_blank" rel="noopener noreferrer" className="text-[#ffd700] underline hover:text-white transition">
                  {file.split("/").pop()}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </main>
  );
}
