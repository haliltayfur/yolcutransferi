// /app/api-kur.js
import axios from "axios";
import * as cheerio from "cheerio";

// Next.js API Route gibi kullanıyoruz: /api-kur şeklinde fetch edilir
export async function GET(req, res) {
  try {
    const { data } = await axios.get("https://www.yapikredi.com.tr/doviz-ve-altin/kurlar");
    const $ = cheerio.load(data);

    let euro = 0, usd = 0;
    $("table tbody tr").each((i, el) => {
      const cells = $(el).find("td");
      const name = $(cells[0]).text().trim();
      const satis = parseFloat($(cells[2]).text().replace(",", "."));
      if (name.includes("EURO")) euro = satis;
      if (name.includes("ABD DOLARI")) usd = satis;
    });

    euro = +(euro * 1.04).toFixed(2); // %4 spread
    usd = +(usd * 1.04).toFixed(2);

    // Next.js 13/14 app router için Response
    return new Response(JSON.stringify({ euro, usd }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Kur alınamadı", details: err.message }), { status: 500 });
  }
}
