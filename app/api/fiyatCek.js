// /app/api/fiyatCek.js

import axios from 'axios';
import cheerio from 'cheerio';

export default async function handler(req, res) {
  const { from, to } = req.body;
  let fiyatlar = [];

  const firmalar = [
    "https://rotatransfer.com.tr",
    "https://progotransfer.com",
    "https://atstransfer.com",
    "https://istanbultransferexpert.com",
    "https://viptransfer.com.tr",
    "https://transferim.com",
    "https://luxtransfer.com.tr"
  ];

  for (let firma of firmalar) {
    try {
      const response = await axios.post(`${firma}/getPrice`, { from, to });
      const $ = cheerio.load(response.data);
      const fiyat = parseFloat($(".price").text().replace("₺", "").replace(",", "."));
      if (fiyat) fiyatlar.push({ firma, fiyat });
    } catch (error) {
      console.log(`Fiyat çekimi başarısız: ${firma}`, error);
    }
  }

  if (fiyatlar.length > 0) {
    const ortalamaFiyat = fiyatlar.reduce((a, b) => a + b.fiyat, 0) / fiyatlar.length;
    const sonFiyat = ortalamaFiyat * 1.3 * 1.2; // %30 kar + %20 KDV
    res.status(200).json({ sonFiyat, fiyatlar });
  } else {
    res.status(200).json({ message: "Size özel fiyat çalışıyoruz." });
  }
}
