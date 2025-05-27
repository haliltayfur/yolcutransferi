// ÖRNEK! Her siteye göre fonksiyon ayrı ayrı yazılır
async function progoFiyatAl({ from, to, arac, kisi, tarih }) {
  // Buradaki URL ve parametreler tamamen ÖRNEKTİR!
  // Gerçek endpoint ve parametreleri dev tools ile bulmalısın
  // Aşağıda örnek bir scraping mantığı gösteriyorum
  const url = "https://www.progo.com.tr/transfer-fiyat-hesaplama";
  // params = { ... }
  // const res = await axios.post(url, params);
  // cheerio ile res.data içinden fiyatı bul
  // return fiyatTL;
  return 1750; // test için sahte değer
}

// (Aynı şekilde diğer siteler için fonksiyon yazılır)

export async function POST(req) {
  const { from, to, arac, kisi, tarih } = await req.json();

  // Tüm fiyatları çek (sen şimdilik tek fonksiyonla başla, sonra arttırırsın)
  const fiyatlar = await Promise.all([
    progoFiyatAl({ from, to, arac, kisi, tarih }),
    // airporttransferFiyatAl({ ... }),
    // citytransferFiyatAl({ ... }),
    // ...
  ]);

  // Fiyat ortalamasını al, kar ekle
  const ort = fiyatlar.reduce((a, b) => a + b, 0) / fiyatlar.length;
  const masraf = 200, netKar = 0.20;
  const teklifTL = Math.round((ort + masraf) * (1 + netKar));

  return NextResponse.json({ teklif: teklifTL, fiyatlar });
}
