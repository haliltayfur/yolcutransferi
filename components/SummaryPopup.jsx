// === Dosya: components/SummaryPopup.jsx ===
import React from "react";

export default function SummaryPopup({
  from, to, km, duration, people, segment, transfer, date, time,
  name, surname, tc, phone, email, pnr, note, extras, extrasQty, sigorta, sigortaTutar, transferPrice,
  onClose, onPayment
}) {
  // Ekstralar formatı
  const formatExtras = () => {
    if (!extras || !Array.isArray(extras)) return "Yok";
    return extras.map(e =>
      <li key={e}>{e} {extrasQty && extrasQty[e] ? `(${extrasQty[e]} adet)` : ""}</li>
    );
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-[#00000088] flex items-center justify-center">
      <div className="bg-[#19160a] border border-[#bfa658] rounded-2xl p-8 w-full max-w-2xl shadow-lg relative">
        <button
          className="absolute right-5 top-5 text-[#bfa658] text-lg font-bold hover:scale-110"
          onClick={onClose}
        >
          Kapat ✖
        </button>
        <h2 className="text-2xl font-bold mb-4 text-[#bfa658] text-center">Sipariş Özeti</h2>
        <div className="flex flex-col gap-2 text-[#ffeec2]">
          <div><b>Nereden:</b> {from}</div>
          <div><b>Nereye:</b> {to}</div>
          {km && duration && (
            <div>
              <b>Mesafe:</b> {km.toFixed(1)} km, <b>Süre:</b> {duration}
            </div>
          )}
          <div><b>Tarih:</b> {date} &nbsp; <b>Saat:</b> {time}</div>
          <div><b>Kişi Sayısı:</b> {people}</div>
          <div><b>Segment:</b> {segment}</div>
          <div><b>Transfer Türü:</b> {transfer}</div>
          <div><b>Ad Soyad:</b> {name} {surname}</div>
          <div><b>TC Kimlik No:</b> {tc}</div>
          <div><b>Telefon:</b> {phone}</div>
          <div><b>E-posta:</b> {email}</div>
          {pnr && <div><b>PNR/Uçuş Kodu:</b> {pnr}</div>}
          {note && <div><b>Ek Not:</b> {note}</div>}
          <div><b>Ekstralar:</b> <ul className="ml-3 list-disc">{formatExtras()}</ul></div>
          {sigorta && (
            <div className="text-[#FFD700]">
              <b>Ekstra YolcuTransferi Sigortası:</b> {sigortaTutar ? `${sigortaTutar.toLocaleString()}₺` : "Fiyatı transfer ücretiyle birlikte hesaplanır."}
            </div>
          )}
          <div className="text-xl mt-3">
            <b>Transfer Ücreti:</b>
            &nbsp;
            <span className="text-[#FFD700]">
              {transferPrice !== null
                ? `${transferPrice.toLocaleString()} ₺`
                : "Transfer ücreti hesaplanamadı, yetkililerimiz size özel teklif sunacak."}
            </span>
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-8">
          <button
            className="bg-gray-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-gray-700"
            onClick={onClose}
          >
            Vazgeç
          </button>
          <button
            className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold py-3 px-8 rounded-xl text-xl shadow hover:scale-105 transition"
            onClick={onPayment}
          >
            Ödemeye Geç
          </button>
        </div>
      </div>
    </div>
  );
}
