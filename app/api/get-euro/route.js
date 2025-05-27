export async function GET() {
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
      return NextResponse.json({ euro: parseFloat(euro) });
    } else {
      return NextResponse.json({ error: "Euro kuru bulunamadı" }, { status: 500 });
    }
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
