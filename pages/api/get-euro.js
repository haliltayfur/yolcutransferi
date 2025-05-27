import cheerio from "cheerio";

export default async function handler(req, res) {
  const url = "https://www.yapikredi.com.tr/en/yatirimci-kosesi/doviz-kurlari";
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    let euro = null;
    $('td:contains("Euro")').each(function () {
      euro = $(this).next().text();
    });
    if (euro) {
      euro = euro.replace(/[^\d.,]/g, "").replace(",", ".");
      res.status(200).json({ euro: parseFloat(euro) });
    } else {
      res.status(500).json({ error: "Euro kuru bulunamadı" });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
