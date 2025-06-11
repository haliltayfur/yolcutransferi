"use client";
import { useState } from "react";
import { extrasList } from "../data/extras";
import { rotarList } from "../data/rotarOptions";

export default function RezSummaryPopup({ show, onClose, info }) {
  const [ekstraList, setEkstraList] = useState(info.selectedExtras || []);
  const rotarFiyat = rotarList.find(opt => opt.label === info.rotar)?.price || 0;

  // Kuruyemiş ve içki ilişkisi
  const hasAlcohol = ekstraList.some(key =>
    ["bira", "sarap", "viski", "sampanya"].includes(key)
  );
  const kuruyemisKey = "cookies";
  const showKuruyemisStrikethrough = hasAlcohol && ekstraList.includes(kuruyemisKey);

  // Ekstra çıkarma
  const handleRemove = (key) =>
    setEkstraList(list => list.filter(k => k !== key));

  // Fiyat hesaplama
  const baseFiyat = 1800;
  const ekstralarFiyat = ekstraList.reduce((sum, key) => {
    const item = extrasList.find(e => e.key === key);
    if (hasAlcohol && ["bira", "sarap", "viski", "sampanya"].includes(key)) {
      return sum + Math.round((item?.price || 0) * 1.10);
    }
    return sum + (item?.price || 0);
  }, 0);
  const toplam = baseFiyat + ekstralarFiyat + rotarFiyat;

  if (!show) return null;

  // Havalimanı mı kontrolü
  const isAirport =
    (info?.from || "").toLowerCase().includes("hava") ||
    (info?.to || "").toLowerCase().includes("hava");

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
      <div className="bg-white text-black rounded-2xl shadow-2xl p-8 max-w-md w-full relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-xl text-gray-400 hover:text-red-500 font-bold"
        >×</button>
        <h3 className="text-xl font-bold mb-2 text-gold text-center">Rezervasyon Özeti</h3>
        <div className="mb-4">
          <div className="mb-2 text-sm font-bold text-gray-700">{info.vehicle} | Yolcu: {info.people}</div>
          <div className="text-base mb-2">
            <span className="font-semibold">Nereden:</span> {info.from} &nbsp;
            <span className="font-semibold">Nereye:</span> {info.to}
          </div>
          <div className="text-base mb-2">
            <span className="font-semibold">Tarih:</span> {info.date} &nbsp;
            <span className="font-semibold">Saat:</span> {info.time}
          </div>
          {isAirport && info.ucusNo && (
            <div className="text-base mb-2">
              <span className="font-semibold">Uçuş/Pnr No:</span> {info.ucusNo}
            </div>
          )}
        </div>

        {/* Ekstralar */}
        <div className="mb-3">
          <div className="font-bold mb-1 text-gray-700">Ekstralar:</div>
          <ul className="text-base space-y-1">
            {ekstraList.map(key => {
              if (key === kuruyemisKey && showKuruyemisStrikethrough) {
                return (
                  <li key={key} className="flex items-center gap-2 line-through text-gray-500 italic">
                    Kuruyemiş İkramı
                    <span className="ml-auto text-xs">ikram</span>
                    <button onClick={() => handleRemove(key)} className="text-red-500 text-lg px-2 font-bold">×</button>
                  </li>
                );
              }
              const item = extrasList.find(e => e.key === key);
              if (!item) return null;
              return (
                <li key={key} className="flex items-center gap-2">
                  {item.label}
                  <span className="ml-auto text-xs font-semibold">
                    {hasAlcohol && ["bira", "sarap", "viski", "sampanya"].includes(key)
                      ? (item.price * 1.10).toFixed(0)
                      : item.price
                    }₺
                  </span>
                  <button onClick={() => handleRemove(key)} className="text-red-500 text-lg px-2 font-bold">×</button>
                </li>
              );
            })}
            {ekstraList.length === 0 && (
              <li className="italic text-gray-400">Ekstra yok</li>
            )}
          </ul>
        </div>

        {/* Rotar Garantisi */}
        {info.rotar && (
          <div className="flex justify-between text-base border-t pt-2 mt-3">
            <span className="font-semibold">Rötar Garantisi</span>
            <span className="font-semibold">{info.rotar} ({rotarFiyat}₺)</span>
          </div>
        )}

        {/* Fiyatlar */}
        <div className="pt-4 mt-4 border-t">
          <div className="flex justify-between text-base mb-1">
            <span className="font-semibold">VIP Transfer Ücreti:</span>
            <span>{baseFiyat}₺</span>
          </div>
          <div className="flex justify-between text-base mb-1">
            <span className="font-semibold">Ekstralar:</span>
            <span>{ekstralarFiyat}₺</span>
          </div>
          {rotarFiyat > 0 && (
            <div className="flex justify-between text-base mb-1">
              <span className="font-semibold">Rötar Garantisi:</span>
              <span>{rotarFiyat}₺</span>
            </div>
          )}
          {/* Toplam */}
          <div className="flex justify-between text-lg font-extrabold mt-4 text-gold">
            <span>TOPLAM:</span>
            <span>{toplam}₺</span>
          </div>
        </div>
        <button className="w-full bg-gold text-black font-bold rounded-xl py-3 text-lg mt-5 hover:bg-yellow-400" onClick={() => alert("Bir sonraki adıma geçecek!")}>
          Devam Et / Rezervasyonu Onayla
        </button>
        <button className="underline text-gray-500 hover:text-gray-900 mt-2 w-full" onClick={onClose}>Geri</button>
      </div>
      <style jsx>{`
        .animate-fade-in { animation: fadeIn .3s; }
        @keyframes fadeIn { from { opacity: 0; transform: scale(.95);} to { opacity: 1; transform: scale(1);} }
      `}</style>
    </div>
  );
}
