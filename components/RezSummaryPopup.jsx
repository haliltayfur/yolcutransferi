import { extrasList } from "../data/extras";
import { rotarList } from "../data/rotarOptions";
import { useState } from "react";

export default function RezSummaryPopup({ show, summaryData, onRemoveExtra, onClose }) {
  const [ekstraTalep, setEkstraTalep] = useState("");
  if (!show) return null;

  // Kuruyemiş açıklaması eklenecek ekstralar
  const nutIncluded = ["bira", "sarap", "viski"];

  return (
    <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center">
      <div className="bg-white text-black rounded-2xl shadow-2xl p-8 max-w-lg w-full relative animate-fade-in">
        <button onClick={onClose} className="absolute top-2 right-3 text-lg text-gray-400 hover:text-red-500 font-bold">×</button>
        <h3 className="text-xl font-bold mb-2 text-center text-gold">Rezervasyon Özeti</h3>
        {/* Yolcu/rezervasyon bilgileri vs buraya gelecek */}
        <div className="mb-2">
          <b>Ekstralar:</b><br />
          {extrasList.filter(e => summaryData?.extras?.includes(e.key)).length === 0 && <i>Ekstra seçilmedi.</i>}
          {extrasList.filter(e => summaryData?.extras?.includes(e.key)).map(e => (
            <div key={e.key} className="flex justify-between items-center text-sm">
              <span>
                {e.label}
                {nutIncluded.includes(e.key) && <span className="ml-2 text-xs text-green-600">Kuruyemiş ikramı ücretsiz</span>}
              </span>
              <span className="text-gray-600 ml-2">({e.price}₺)</span>
              <button className="text-red-400 hover:text-red-600 font-bold ml-2" onClick={() => onRemoveExtra(e.key)}>×</button>
            </div>
          ))}
          {/* Rotar */}
          {summaryData?.rotar > 1 &&
            <div className="flex justify-between items-center text-sm">
              <span>Rotar Garantisi ({summaryData.rotar} Saat)</span>
              <span className="text-gray-600 ml-2">
                ({rotarList.find(r => r.hours === summaryData.rotar)?.price || 0}₺)
              </span>
            </div>
          }
        </div>
        {/* Ekstra talepler kutusu */}
        <div className="mb-2 mt-3">
          <b>Ekstra taleplerinizi buradan yazınız:</b>
          <textarea
            className="w-full border rounded-lg p-2 mt-2"
            rows={2}
            placeholder="Ekstra istekleriniz (çocuk arabası, doğum günü süslemesi, özel şoför vb.)"
            value={ekstraTalep}
            onChange={e => setEkstraTalep(e.target.value)}
          />
          {ekstraTalep &&
            <div className="text-xs text-gray-700 mt-1">
              Bu talepleriniz için size ayrıca teklif verilecektir.
            </div>
          }
        </div>
        {/* ... diğer özet ve butonlar ... */}
      </div>
      <style jsx>{`
        .animate-fade-in { animation: fadeIn .3s; }
        @keyframes fadeIn { from { opacity: 0; transform: scale(.95);} to { opacity: 1; transform: scale(1);} }
      `}</style>
    </div>
  );
}
