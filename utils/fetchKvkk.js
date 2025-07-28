// utils/fetchKvkk.js

// Sunucu tarafında Next.js API route'u üzerinden fetch ile metin çekmek için
export default async function fetchKvkkText() {
  // VERCEL'de localde proxy gerekebilir!  
  // Adres güncel ve açık olmalı:
  const url = "https://yolcutransferi.com/mesafeli-satis";
  try {
    const response = await fetch(url);
    const html = await response.text();
    // Basit bir şekilde sadece ana içerik alanını çekeriz:
    const match = html.match(/<main.*?>([\s\S]+?)<\/main>/i);
    if (match) {
      // HTML taglarını kaldır (saf metin olsun)
      return match[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    }
    return "Sözleşme metni çekilemedi.";
  } catch (e) {
    return "Sözleşme metni alınamadı!";
  }
}
