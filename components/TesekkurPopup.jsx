// === Dosya: components/TesekkurPopup.jsx ===
import React from "react";

export default function TesekkurPopup({ name, email, onClose }) {
  return (
    <div className="fixed inset-0 z-[9999] bg-[#000000cc] flex items-center justify-center">
      <div className="bg-[#19160a] border border-[#bfa658] rounded-2xl p-10 w-full max-w-md shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4 text-[#FFD700]">Teşekkürler {name}!</h2>
        <div className="text-[#ffeec2] text-lg mb-3">
          Rezervasyonunuz başarıyla alındı. Detaylar {email} adresine gönderildi.  
          <br />Müşteri temsilcimiz en kısa sürede size ulaşacak.
        </div>
        <button
          className="mt-4 bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold py-3 px-8 rounded-xl text-xl shadow hover:scale-105 transition"
          onClick={onClose}
        >
          Anasayfaya Dön
        </button>
      </div>
    </div>
  );
}
