"use client";
import React, { useState, useEffect } from "react";
import { extrasList } from "../data/extras";

export default function SummaryPopup({
  open, onClose, from, to, date, time, people, segment, transfer,
  name, surname, tc, phone, email, pnr, note,
  extras, sigorta, sigortaTutar, transferUcreti, vehicleText, onNext
}) {
  function getLabel(key) {
    const found = extrasList.find(e => e.key === key);
    return found ? found.label : key;
  }
  const [extrasQty, setExtrasQty] = useState(() =>
    Object.fromEntries((extras || []).map(x => [x, 1]))
  );

  useEffect(() => {
    setExtrasQty(Object.fromEntries((extras || []).map(x => [x, 1])));
  }, [extras, open]);

  function changeQty(key, diff) {
    setExtrasQty(q => {
      const next = { ...q, [key]: Math.max(1, (q[key] || 1) + diff) };
      return next;
    });
  }
  function removeExtra(key) {
    setExtrasQty(q => {
      const next = { ...q };
      delete next[key];
      return next;
    });
  }

  function getExtraPrice(key) {
    const found = extrasList.find(e => e.key === key);
    return found && found.price ? found.price : 0;
  }
  const extrasToplam = Object.entries(extrasQty).reduce(
    (sum, [key, val]) => sum + getExtraPrice(key) * val,
    0
  );
  const araToplam = (Number(transferUcreti || 0) + Number(sigortaTutar || 0) + Number(extrasToplam));
  const kdv = Math.round(araToplam * 0.2);
  const toplam = araToplam + kdv;

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-[#18140dcc] z-[1000] flex items-center justify-center">
      <div className="relative w-full max-w-2xl mx-auto bg-[#231d0f] border border-[#bfa658] rounded-2xl p-6 md:p-8 shadow-xl">
        <button className="absolute top-4 right-6 text-2xl text-[#bfa658] font-bold" onClick={onClose}>×</button>
        <h2 className="text-2xl font-bold mb-2 text-[#bfa658] text-center">Sipariş Özeti</h2>
        <div className="flex flex-col gap-1 text-[#ffeec2] text-base">
          <div><b>Nereden:</b> {from} <b>Nereye:</b> {to}</div>
          <div><b>Tarih:</b> {date} <b>Saat:</b> {time}</div>
          <div><b>Kişi sayısı:</b> {people} <b>Segment:</b> {segment}</div>
          <div><b>Transfer Türü:</b> {transfer}</div>
          {vehicleText && (<div className="mt-1"><b>Araç:</b> {vehicleText}</div>)}
          <div><b>Ad Soyad:</b> {name} {surname}</div>
          <div><b>TC Kimlik:</b> {tc}</div>
          <div><b>Telefon:</b> {phone}</div>
          <div><b>E-posta:</b> {email}</div>
          {pnr && <div><b>PNR/Uçuş Kodu:</b> {pnr}</div>}
          {note && <div><b>Ek Not:</b> {note}</div>}
        </div>
        {sigorta && (
          <div className="mt-3 text-[#ffeec2] font-bold">
            <b>YolcuTransferi Sigortası:</b> EKLENDİ {sigortaTutar ? `(₺${sigortaTutar})` : ""}
          </div>
        )}
        <div className="mt-4 mb-2">
          <b className="text-[#bfa658]">Ekstralar:</b>
          <ul className="mt-1">
            {Object.entries(extrasQty).length === 0 && (
              <li className="ml-4 italic text-[#bfa658]">Ekstra seçilmedi</li>
            )}
            {Object.entries(extrasQty).map(([key, val]) => (
              <li key={key} className="flex items-center ml-2 my-1">
                <button onClick={() => changeQty(key, -1)} className="w-6 h-6 bg-[#c4b07c] rounded-full text-black mr-1 font-bold">-</button>
                <span className="font-bold text-[#ffeec2]">{val}x</span>
                <button onClick={() => changeQty(key, +1)} className="w-6 h-6 bg-[#c4b07c] rounded-full text-black ml-1 font-bold">+</button>
                <span className="ml-2">{getLabel(key)}</span>
                <button onClick={() => removeExtra(key)} className="ml-2 text-red-500 text-xl">🗑️</button>
                {getExtraPrice(key) > 0 && (
                  <span className="ml-2 text-[#bfa658] font-medium">₺{getExtraPrice(key) * val}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6 flex flex-col gap-1 text-[#ffeec2] text-lg">
          <div>Transfer Ücreti: <b className="text-[#ffd700]">{transferUcreti ? `₺${transferUcreti.toLocaleString("tr-TR")}` : "Hesaplanamadı"}</b></div>
          {extrasToplam > 0 && <div>Ekstralar Toplamı: <b className="text-[#bfa658]">₺{extrasToplam}</b></div>}
          {sigorta && sigortaTutar > 0 && <div>Sigorta: <b className="text-[#bfa658]">₺{sigortaTutar}</b></div>}
          <div>KDV (%20): <b className="text-[#bfa658]">₺{kdv}</b></div>
          <div className="mt-1 text-xl">Toplam: <span className="text-[#ffd700] font-extrabold">₺{toplam.toLocaleString("tr-TR")}</span></div>
        </div>
        <div className="flex gap-2 mt-8">
          <button onClick={onClose} className="flex-1 btn bg-[#222] text-white py-2 rounded-lg border border-[#bfa658] hover:bg-[#2c2a20]">Vazgeç</button>
          <button onClick={() => onNext(extrasQty)} className="flex-1 btn bg-gradient-to-r from-[#bfa658] to-[#ffeec2] text-black font-bold py-2 rounded-lg hover:scale-105 transition">Ödemeye Geç</button>
        </div>
      </div>
    </div>
  );
}
