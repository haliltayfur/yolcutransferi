// ... üstte useState, locations importları

// Aşağıdaki satırı kodun başına ekle:
const havalimaniList = [
  "Adana Şakirpaşa Havalimanı",
  "Adıyaman Havalimanı",
  "Ağrı Ahmed-i Hani Havalimanı",
  "Amasya Merzifon Havalimanı",
  "Ankara Esenboğa Havalimanı",
  "Antalya Havalimanı",
  "Balıkesir Edremit Koca Seyit Havalimanı",
  "Balıkesir Merkez Havalimanı",
  "Batman Havalimanı",
  "Bingöl Havalimanı",
  "Bitlis Tatvan Havalimanı",
  "Bodrum-Milas Havalimanı",
  "Bursa Yenişehir Havalimanı",
  "Çanakkale Havalimanı",
  "Denizli Çardak Havalimanı",
  "Diyarbakır Havalimanı",
  "Elazığ Havalimanı",
  "Erzincan Yıldırım Akbulut Havalimanı",
  "Erzurum Havalimanı",
  "Eskişehir Hasan Polatkan Havalimanı",
  "Gaziantep Oğuzeli Havalimanı",
  "Giresun-Ordu Havalimanı",
  "Hakkari Yüksekova Selahaddin Eyyubi Havalimanı",
  "Hatay Havalimanı",
  "Iğdır Şehit Bülent Aydın Havalimanı",
  "Isparta Süleyman Demirel Havalimanı",
  "İstanbul Havalimanı",
  "İstanbul Sabiha Gökçen Havalimanı",
  "İzmir Adnan Menderes Havalimanı",
  "Kahramanmaraş Havalimanı",
  "Kars Harakani Havalimanı",
  "Kastamonu Havalimanı",
  "Kayseri Erkilet Havalimanı",
  "Kırıkkale Havalimanı",
  "Kırklareli Havalimanı",
  "Kocaeli Cengiz Topel Havalimanı",
  "Konya Havalimanı",
  "Kütahya Zafer Havalimanı",
  "Malatya Erhaç Havalimanı",
  "Mardin Prof. Dr. Aziz Sancar Havalimanı",
  "Mersin Çukurova Bölgesel Havalimanı",
  "Mardin Havalimanı",
  "Muğla Dalaman Havalimanı",
  "Muğla Milas-Bodrum Havalimanı",
  "Muş Sultan Alparslan Havalimanı",
  "Nevşehir Kapadokya Havalimanı",
  "Ordu-Giresun Havalimanı",
  "Rize-Artvin Havalimanı",
  "Samsun Çarşamba Havalimanı",
  "Siirt Havalimanı",
  "Sinop Havalimanı",
  "Sivas Nuri Demirağ Havalimanı",
  "Şanlıurfa GAP Havalimanı",
  "Şırnak Şerafettin Elçi Havalimanı",
  "Tekirdağ Çorlu Atatürk Havalimanı",
  "Tokat Havalimanı",
  "Trabzon Havalimanı",
  "Uşak Havalimanı",
  "Van Ferit Melen Havalimanı",
  "Zonguldak Çaycuma Havalimanı"
];

function handleInput(e) {
  const val = e.target.value;
  setInput(val);
  if (val.length < 2) return setSuggestions([]);
  const all = [];
  // Şehir, ilçe, mahalle araması
  locations.forEach(ilObj => {
    if (ilObj.il.toLowerCase().includes(val.toLowerCase())) {
      all.push(ilObj.il);
    }
    ilObj.ilceler.forEach(ilceObj => {
      if (ilceObj.ilce.toLowerCase().includes(val.toLowerCase())) {
        all.push(`${ilObj.il} / ${ilceObj.ilce}`);
      }
      ilceObj.mahalleler.forEach(m => {
        if (m.toLowerCase().includes(val.toLowerCase())) {
          all.push(`${ilObj.il} / ${ilceObj.ilce} / ${m}`);
        }
      });
    });
  });
  // Tüm havalimanı isimlerinde arama
  havalimaniList.forEach(hav => {
    if (hav.toLowerCase().includes(val.toLowerCase())) all.push(hav);
  });
  setSuggestions(all.slice(0, 10));
}
