// PATH: app/utils/calcTransferPrice.js

// Şoförün sana verdiği tablodan türetilmiş km başı fiyat algoritması
export default function calcTransferPrice(km, segment, people, saat) {
  if (!km || !segment) return 0;

  // Tabloyu algoritmaya çeviriyoruz (senin fiyatlarından türetildi):
  let fiyat = 0;
  km = Number(km);
  people = Number(people);

  // Temel km başı fiyatlar (örnekleme):
  let baseFiyat = 0;

  if (segment === "Ekonomik") {
    if (km <= 10) baseFiyat = 1100;
    else if (km <= 33) baseFiyat = 1500;
    else if (km <= 85) baseFiyat = 3000;
    else if (km <= 142) baseFiyat = 6500;
    else baseFiyat = Math.round(km * 45); // örnek: 45 TL/km üstü
  }
  else if (segment === "Lüks") {
    if (km <= 10) baseFiyat = 1500;
    else if (km <= 33) baseFiyat = 2500;
    else if (km <= 85) baseFiyat = 4000;
    else if (km <= 142) baseFiyat = 8000;
    else baseFiyat = Math.round(km * 60);
  }
  else if (segment === "Prime+") {
    if (km <= 10) baseFiyat = 9000;
    else if (km <= 33) baseFiyat = 17000;
    else if (km <= 85) baseFiyat = 20000;
    else if (km <= 142) baseFiyat = 40000;
    else baseFiyat = Math.round(km * 270);
  }
  else if (people >= 9) { // 9 ve üstü yolcu için (minibüs, sprinter, büyük araçlar)
    if (km <= 10) baseFiyat = 12000;
    else if (km <= 33) baseFiyat = 12000;
    else if (km <= 85) baseFiyat = 12000;
    else if (km <= 142) baseFiyat = 35000;
    else baseFiyat = Math.round(km * 280);
  } else if (people >= 7) {
    // 7-8 kişilik fiyatlar
    if (km <= 10) baseFiyat = 2500;
    else if (km <= 33) baseFiyat = 3400;
    else if (km <= 85) baseFiyat = 7000;
    else if (km <= 142) baseFiyat = 20000;
    else baseFiyat = Math.round(km * 100);
  }

  // Kişi başı +%5 ekle (1'den fazla ise)
  let extraPeopleRatio = people > 1 ? 1 + (people - 1) * 0.05 : 1;
  let fiyatWithPeople = baseFiyat * extraPeopleRatio;

  // Gece zammı (22:00 - 07:00 arası ise +%10 ekle)
  let saatNum = 12;
  if (typeof saat === "string" && saat.length >= 2) {
    saatNum = parseInt(saat.split(":")[0], 10);
  }
  let geceZammi = (saatNum >= 22 || saatNum < 7) ? 1.10 : 1;

  // Şoförün sana verdiği fiyat, gece ve kişi başı ile:
  let toplam = fiyatWithPeople * geceZammi;

  // Şirket kârı ekle (%20)
  toplam = toplam * 1.20;

  // Sanal pos/ödeme platformu masrafı ekle (%2.5)
  toplam = toplam * 1.025;

  // KDV (%20) ekle
  const kdv = toplam * 0.20;

  // KDV dahil toplamı tam sayıya yuvarla (TL)
  const sonFiyat = Math.round(toplam + kdv);

  return sonFiyat;
}
