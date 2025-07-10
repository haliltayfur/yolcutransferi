import axios from 'axios';
import cheerio from 'cheerio';

export default async function handler(req, res) {
  const { from, to } = req.body;
  let fiyatlar = [];

  // Örnek firma listesi
  const firmalar = ["https://firma1.com", "https://firma2.com", "https://firma3.com"];

  for (let firma of firmalar) {
    try {
      const response = await axios.post(`${firma}/getPrice`, { from, to });
      const $ = cheerio.load(response.data);
      const fiyat = parseFloat($(".price").text().replace("₺", "").replace(",", "."));
      if (fiyat) fiyatlar.push(fiyat);
    } catch (error) {
      console.log(`Fiyat çekimi başarısız: ${firma}`, error);
    }
  }

  if (fiyatlar.length > 0) {
    const ortalamaFiyat = fiyatlar.reduce((a, b) => a + b, 0) / fiyatlar.length;
    const sonFiyat = ortalamaFiyat * 1.3 * 1.2; // %30 kar + %20 KDV
    res.status(200).json({ sonFiyat });
  } else {
    res.status(200).json({ message: "Size özel fiyat çalışıyoruz." });
  }
}
