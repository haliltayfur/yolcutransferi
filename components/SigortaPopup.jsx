import React from "react";
export default function SigortaPopup({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-[#18140dcc] z-[1000] flex items-center justify-center">
      <div className="relative w-[95vw] max-w-lg bg-[#231d0f] border border-[#bfa658] rounded-2xl p-7 text-[#ffeec2]">
        <button className="absolute top-4 right-6 text-2xl text-[#bfa658] font-bold" onClick={onClose}>×</button>
        <div className="font-bold text-lg mb-2">YolcuTransferi Sigortası</div>
        <div>
          Transfer süresince <b>kaza, vefat, sakatlık, sağlık, bagaj kaybı</b> gibi tüm risklerde özel sigorta koruması sağlar.
          Her yolcu için geçerlidir. 7/24 destek ve tazminat. Fiyat, transfer ücreti ve yolcu sayısına göre otomatik hesaplanır.
          Sigorta ücreti, transfer ücretine eklenir ve faturada gösterilir.
        </div>
      </div>
    </div>
  );
}
