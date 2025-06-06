import axios from "axios";
import { load } from "cheerio";
import { NextResponse } from "next/server";

export async function GET() {
  const url = "https://www.yapikredi.com.tr/en/yatirimci-kosesi/doviz-kurlari";
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = load(html);

    let euro = null;
    $('td:contains("Euro")').each(function () {
      euro = $(this).next().text();
    });

    if (euro) {
      euro = euro.replace(/[^\d.,]/g, "").replace(",", ".");
      return NextResponse.json({ euro: parseFloat(euro) });
    } else {
      return NextResponse.json({ error: "Euro kuru bulunamadı" }, { status: 500 });
    }
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
