// utils/fetchKvkk.js
export default async function fetchKvkk() {
  try {
    const res = await fetch("/mesafeli-satis");
    if (!res.ok) return "KVKK metni yüklenemedi!";
    const html = await res.text();
    const body = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
    return body ? body[1].replace(/<[^>]+>/g, "<br>").replace(/\s+/g, " ").trim() : html;
  } catch {
    return "KVKK metni yüklenemedi!";
  }
}
