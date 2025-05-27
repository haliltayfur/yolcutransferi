"use client";
import { useEffect, useState } from "react";

// TL fiyatı prop olarak veriyorsun, ör: <FiyatGoster tlTutar={3500} />
export default function FiyatGoster({ tlTutar }) {
  const [kur, setKur] = useState({ euro: 0, usd: 0, yukleniyor: true, hata: false });

  useEffect(() => {
    // API'den kurları al
    fetch("/api-kur")
      .then(r => r.json())
      .then(data => setKur({ euro: data.euro, usd: data.usd, yukleniyor: false, hata: false }))
      .catch(() => setKur({ euro: 0, usd: 0, yukleniyor: false, hata: true }));
  }, []);

  if (kur.yukleniyor) return <div>Kurlar yükleniyor...</div>;
  if (kur.hata) return <div>Kurlar alınamadı!</div>;

  return (
    <div className="flex flex-col gap-1 p-3 rounded-xl bg-black/60 text-gold max-w-xs text-lg font-bold">
      <div>
        <span>₺ </span>{tlTutar.toLocaleString("tr-TR")} TL
      </div>
      <div>
        <span>€ </span>
        {(tlTutar / kur.euro).toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} EUR
        <span className="text-xs text-gray-300 ml-2">(Yapı Kredi +%4 spread)</span>
      </div>
      <div>
        <span>$ </span>
        {(tlTutar / kur.usd).toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
        <span className="text-xs text-gray-300 ml-2">(Yapı Kredi +%4 spread)</span>
      </div>
    </div>
  );
}
