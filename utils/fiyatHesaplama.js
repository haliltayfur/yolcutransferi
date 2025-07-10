// /utils/fiyatHesaplama.js

export function fiyatHesapla(fiyatlar) {
  if (fiyatlar.length === 0) return null;
  const ortalamaFiyat = fiyatlar.reduce((toplam, fiyat) => toplam + fiyat, 0) / fiyatlar.length;
  return ortalamaFiyat * 1.3 * 1.2;
}
