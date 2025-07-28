import React from "react";
export default function KvkkPopup({ open, onClose, text }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-[#18140dcc] z-[1000] flex items-center justify-center">
      <div className="relative w-[95vw] max-w-3xl bg-[#231d0f] border border-[#bfa658] rounded-2xl p-8">
        <button className="absolute top-4 right-6 text-2xl text-[#bfa658] font-bold" onClick={onClose}>×</button>
        <h2 className="text-2xl font-bold mb-4 text-[#bfa658]">Mesafeli Satış Sözleşmesi, KVKK ve Tüm Politika Metinleri</h2>
        <div className="overflow-y-auto max-h-[55vh] text-[#ffeec2] text-base px-1 whitespace-pre-line" style={{ wordBreak: "break-word" }}>
          {text || "Metin yükleniyor..."}
        </div>
        <button className="w-full btn bg-gradient-to-r from-[#bfa658] to-[#ffeec2] text-black font-bold py-3 mt-6 rounded-lg"
          onClick={onClose}>Tümünü Okudum ve Onayladım</button>
      </div>
    </div>
  );
}
