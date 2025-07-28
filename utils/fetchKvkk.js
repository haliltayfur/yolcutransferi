// utils/fetchKvkk.js
export default async function fetchKvkk() {
  try {
    const res = await fetch("/mesafeli-satis");
    if (!res.ok) return "KVKK metni yüklenemedi!";
    const html = await res.text();
    // Sadece ana içerik div'ini almak için:
    const body = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
    return body ? body[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() : html;
  } catch {
    return "KVKK metni yüklenemedi!";
  }
}
