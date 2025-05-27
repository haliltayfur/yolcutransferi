"use client";
import { useEffect, useState } from "react";

export default function RezervasyonTeklif() {
  // Sabit senaryo
  const [euroKuru, setEuroKuru] = useState(null);
  const fiyatEuro = 48.36; // Örnek fiyat (isteğe bağlı değiştir)
  const masraf = 200; // TL (opsiyonel)
  const netKarOran = 0.20; // %20 net kar

  const [teklifTL, setTeklifTL] = useState(null);

  useEffect(() => {
    async function fetchEuro() {
      const res = await fetch("/api/get-euro");
      const data = await res.json();
      setEuroKuru(data.euro);
    }
    fetchEuro();
  }, []);

  useEffect(() => {
    if (euroKuru) {
      const hamTutar = fiyatEuro * euroKuru + masraf;
      const teklif = hamTutar * (1 + netKarOran);
      setTeklifTL(teklif.toFixed(0));
    }
  }, [euroKuru]);

  return (
    <main className="max-w-xl mx-auto mt-16 px-4 py-8 bg-black/80 rounded-2xl shadow">
      <h2 className="text-2xl font-bold text-gold mb-4">Anında Teklif</h2>
      <ul className="mb-6 text-lg text-gray-200 space-y-2">
        <li><b>Avrupa'dan Fiyat:</b> {fiyatEuro} €</li>
        <li><b>Yapı Kredi Euro Kuru:</b> {euroKuru ? euroKuru + " TL" : "Yükleniyor..."}</li>
        <li><b>Ek Masraf:</b> {masraf} TL</li>
        <li><b>Net Kar:</b> %{netKarOran * 100}</li>
      </ul>
      <div className="text-3xl font-extrabold text-gold mb-3">
        Teklif: {teklifTL ? `${teklifTL} TL` : "Hesaplanıyor..."}
      </div>
      <div className="text-xs text-gray-400">Fiyatlar canlı döviz kuru ile otomatik hesaplanır.</div>
    </main>
  );
}
