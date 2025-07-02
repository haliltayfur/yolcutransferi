// app/api/mesafeli-icerik/route.js
export async function GET(req) {
  // Dışarıdan canlı içeriği çek
  const res = await fetch("https://yolcutransferi.com/mesafeli-satis", {
    headers: { "User-Agent": "Mozilla/5.0" },
    cache: "no-store"
  });
  const html = await res.text();

  // Sadece ana içerik (main veya section) al, yoksa tüm html döner
  let content = html;
  try {
    const match = html.match(/<main[^>]*>([\s\S]+?)<\/main>/i) || html.match(/<section[^>]*>([\s\S]+?)<\/section>/i);
    content = match ? match[1] : html;
  } catch (e) {}

  return new Response(content, {
    headers: { "Content-Type": "text/html; charset=utf-8" }
  });
}
