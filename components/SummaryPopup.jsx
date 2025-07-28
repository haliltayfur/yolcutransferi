import React, { useState } from "react";

export default function SummaryPopup({
  open, onClose, from, to, date, time, people, segment, transfer,
  name, surname, tc, phone, email, pnr, note,
  extras, sigorta, sigortaTutar, transferUcreti, vehicleText, onNext
}) {
  const [extrasQty, setExtrasQty] = useState(() =>
    Object.fromEntries((extras || []).map(x => [x, 1]))
  );
  function changeQty(key, diff) {
    setExtrasQty(q => {
      const newQ = { ...q, [key]: Math.max(1, (q[key] || 1) + diff) };
      return newQ;
    });
  }
  function removeExtra(key) {
    setExtrasQty(q => {
      const n = { ...q };
      delete n[key];
      return n;
    });
  }
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-[#18140dcc] z-[1000] flex items-center justify-center">
      <div className="relative w-[95vw] max-w-2xl bg-[#231d0f] border border-[#bfa658] rounded-2xl p-8">
        <button className="absolute top-4 right-6 text-2xl text-[#bfa658] font-bold" onClick={onClose}>×</button>
        <h2 className="text-2xl font-bold mb-2 text-[#bfa658] text-center">Sipariş Özeti</h2>
        <div className="flex flex-col gap-1 text-[#ffeec2]">
          <b>Nereden:</b> {from} <b>Nereye:</b> {to}
          <b>Tarih:</b> {date} <b>Saat:</b> {time}
          <b>Kişi sayısı:</b> {people}
          <b>Segment:</b> {segment}
          <b>Transfer Türü:</b> {transfer}
          {vehicleText && (<div className="mt-1 text-[#ffeec2]"><b>Araç:</b> {vehicleText}</div>)}
          <b>Ad Soyad:</b> {name} {surname}
          <b>TC Kimlik:</b> {tc}
          <b>Telefon:</b> {phone}
          <b>E-posta:</b> {email}
          {pnr && <><b>PNR/Uçuş Kodu:</b> {pnr}</>}
          {note && <><b>Ek Not:</b> {note}</>}
          <div className="mt-2 mb-1">
            <b>Ekstralar:</b>
            <ul>
              {Object.entries(extrasQty).length === 0 && <li className="ml-4 italic text-[#bfa658]">Ekstra seçilmedi</li>}
              {Object.entries(extrasQty).map(([key, val]) => (
                <li key={key} className="flex items-center ml-2 my-1">
                  <button onClick={() => changeQty(key, -1)} className="w-6 h-6 bg-[#c4b07c] rounded-full text-black mr-1">-</button>
                  <span className="font-bold text-[#ffeec2]">{val}x</span>
                  <button onClick={() => changeQty(key, +1)} className="w-6 h-6 bg-[#c4b07c] rounded-full text-black ml-1">+</button>
                  <span className="ml-2">{key}</span>
                  <button onClick={() => removeExtra(key)} className="ml-2 text-red-500">🗑️</button>
                </li>
              ))}
            </ul>
          </div>
          {sigorta && (
            <div className="mt-1 text-[#ffeec2]">
              <b>YolcuTransferi Sigortası:</b> EKLENDİ {sigortaTutar ? `(₺${sigortaTutar})` : ""}
            </div>
          )}
          <div className="mt-4 text-lg font-bold">
            {transferUcreti
              ? <>
                  Transfer Ücreti: <span className="text-[#ffd700]">₺{transferUcreti.toLocaleString("tr-TR")}</span>
                  {sigorta && sigortaTutar && <> + Sigorta: <span className="text-[#ffd700]">₺{sigortaTutar}</span></>}
                </>
              : <span className="text-[#ffd700]">Transfer ücreti hesaplanamadı, yetkililerimiz size özel teklif sunacak.</span>}
          </div>
        </div>
        <div className="flex gap-2 mt-6">
          <button onClick={onClose} className="flex-1 btn bg-[#222] text-white py-2 rounded-lg">Vazgeç</button>
          <button onClick={onNext} className="flex-1 btn bg-gradient-to-r from-[#bfa658] to-[#ffeec2] text-black font-bold py-2 rounded-lg">Ödemeye Geç</button>
        </div>
      </div>
    </div>
  );
}
