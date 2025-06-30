// /app/admin/ekler/page.jsx

import fs from "fs";
import path from "path";

export default async function EklerPage() {
  const root = path.join(process.cwd(), "public", "ekler", "iletisim");
  let items = [];
  for (let day of await fs.promises.readdir(root)) {
    const klasor = path.join(root, day);
    const files = await fs.promises.readdir(klasor);
    items.push({
      day,
      files: files.map(f => `/ekler/iletisim/${day}/${f}`)
    });
  }
  return (
    <main>
      <h1>İletişim Dosya Ekleri</h1>
      {items.map(({ day, files }) => (
        <div key={day}>
          <h2>{day}</h2>
          <ul>
            {files.map(file => (
              <li key={file}>
                <a href={file} target="_blank" rel="noopener noreferrer">{file.split("/").pop()}</a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </main>
  );
}
