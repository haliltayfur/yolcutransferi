"use client";
import React from "react";

export default function TesekkurPopup({ open, onClose, name, email }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-[#18140dcc] z-[1000] flex items-center justify-center">
      <div className="relative w-[95vw] max-w-lg bg-[#231d0f] border border-[#bfa658] rounded-2xl p-8 text-center shadow-2xl">
        <button
          className="absolute top-4 right-6 text-2xl text-[#bfa658] font-bold"
          onClick={onClose}
          tabIndex={0}
          aria-label="Kapat"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-3 text-[#bfa658]">Teşekkürler!</h2>
        <div className="text-[#ffeec2] text-lg mb-3 leading-relaxed">
          Sayın <span className="font-bold">{name}</span>,
          <br />
          <span className="block mt-3">
            <b>Rezervasyonunuz başarıyla alınmıştır.</b>
            <br /><br />
            Rezervasyonunuza ait <b>tüm bilgiler</b> ve size atanacak <b>özel araç ve profesyonel şoför</b> detayları,
            sistemde kayıtlı <b>{email}</b> adresinize kısa süre içinde gönderilecektir.
          </span>
          <span className="block mt-3">
            Ayrıcalıklı ve güvenli transfer deneyimi için bizi tercih ettiğiniz için teşekkür ederiz.
          </span>
        </div>
        <div className="text-[#bfa658] mt-6 text-sm">
          Her türlü soru ve destek için:{" "}
          <a
            href="mailto:info@yolcutransferi.com"
            className="underline hover:text-[#ffd700] transition"
          >
            info@yolcutransferi.com
          </a>
        </div>
      </div>
    </div>
  );
}
