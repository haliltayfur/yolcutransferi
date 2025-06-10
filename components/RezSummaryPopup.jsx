import { extrasList } from "../data/extras";
import { rotarList } from "../data/rotarOptions";
import { useState } from "react";

export default function RezSummaryPopup({ show, summaryData, onRemoveExtra, onClose, onPaymentStep }) {
  if (!show) return null;

  const nutIncluded = ["bira", "sarap", "viski"];
  const kuruyemisKey = "cookies";
  const alkolSecili = summaryData?.extras?.some(e => nutIncluded.includes(e));
  const kuruyemisSecili = summaryData?.extras?.includes(kuruyemisKey);

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
      <div className="bg-white text-black rounded-2xl shadow-2xl p-8 max-w-lg w-full relative animate-fade-in">
        <button onClick={onClose} className="absolute top-2 right-3 text-lg text-gray-400 hover:text-red-500 font-bold">×</button>
        <h3 className="text-xl font-bold mb-3 text-center text-gold">Rezervasyon Özeti</h3>
        {/* Yolcu/rezervasyon bilgileri vs buraya gelecek */}
        <div className="mb-2">
          <b>Araç tipi:</b> {summaryData?.vehicle} &nbsp;|&nbsp;
          <b>Yolcu sayısı:</b> {summaryData?.personCount}<br />
          <b>Nereden:</b> {summaryData?.from} &nbsp;|&nbsp;
          <b>Nereye:</b> {summaryData?.to}<br />
          <b>Tarih:</b> {summaryData?.date} &nbsp;|&nbsp;
          <b>Saat:</b> {summaryData?.time}<br />
        </div>
        <div className="mb-3">
          <b>Ekstralar:</b>
          <div className="flex flex-col gap-1 mt-1">
            {extrasList.filter(e => summaryData?.extras?.includes(e.key)).length === 0 && <i>Ekstra seçilmedi.</i>}
            {extrasList.filter(e => summaryData?.extras?.includes(e.key)).map(e => (
              <div key={e.key} className="flex justify-between items-center text-sm"
                style={alkolSecili && e.key === kuruyemisKey ? { textDecoration: "line-through", color: "#999" } : {}}
              >
                <span>
                  {e.label}
                  {alkolSecili && e.key === kuruyemisKey && <span className="ml-2 text-xs text-green-600">İkram</span>}
                  {!alkolSecili && nutIncluded.includes(e.key) && <span className="ml-2 text-xs text-green-600">Ücretsiz Kuruyemiş ikramı</span>}
                </span>
                <span className="text-gray-600 ml-2 font-bold">{e.price}₺</span>
                <button className="text-red-400 hover:text-red-600 font-bold ml-2" onClick={() => onRemoveExtra(e.key)}>×</button>
              </div>
            ))}
            {summaryData?.rotar > 1 &&
              <div className="flex justify-between items-center text-sm">
                <span>Rotar Garantisi ({summaryData.rotar === 12 ? "Sınırsız (12 saat)" : `${summaryData.rotar} Saat`})</span>
                <span className="text-gray-600 ml-2 font-bold">
                  {rotarList.find(r => r.hours === summaryData.rotar)?.price || 0}₺
                </span>
              </div>
            }
          </div>
        </div>
        {/* Fiyat Özeti */}
        <div className="mb-2">
          <b>Fiyatlar:</b>
          <div>
            <div className="flex justify-between"><span>VIP Transfer ücreti:</span><span>{summaryData?.fiyatlar?.avg}₺</span></div>
            <div className="flex justify-between"><span>Ekstralar:</span><span>{summaryData?.fiyatlar?.ekstraFiyat}₺</span></div>
            <div className="flex justify-between"><span>KDV ve Masraflar:</span><span>{summaryData?.fiyatlar?.masraflar}₺</span></div>
            <div className="flex justify-between"><span>Kâr:</span><span>{summaryData?.fiyatlar?.kar}₺</span></div>
            <div className="flex justify-between text-green-700"><span>Size özel indirim %10:</span><span>-{summaryData?.fiyatlar?.indirim}₺</span></div>
            <div className="flex justify-between text-lg font-bold text-gold mt-2 border-t pt-2"><span>TOPLAM:</span><span>{summaryData?.fiyatlar?.toplam}₺</span></div>
          </div>
        </div>
        {/* Adım butonları */}
        <div className="mt-3 flex flex-col items-center gap-3">
          <button onClick={onPaymentStep} className="bg-gold hover:bg-yellow-400 text-black font-bold rounded-xl px-6 py-3 transition text-lg w-full">
            Devam Et / Rezervasyonu Onayla
          </button>
          <button className="underline text-gray-500 hover:text-gray-900 mt-2" onClick={onClose}>Geri</button>
        </div>
      </div>
      <style jsx>{`
        .animate-fade-in { animation: fadeIn .3s; }
        @keyframes fadeIn { from { opacity: 0; transform: scale(.95);} to { opacity: 1; transform: scale(1);} }
      `}</style>
    </div>
  );
}
