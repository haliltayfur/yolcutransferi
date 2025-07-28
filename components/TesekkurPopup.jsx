"use client";
import React, { useEffect } from "react";

export default function TesekkurPopup({ open, onClose, name, email }) {
  // Escape tuşu ile de kapatılabilir (UX için)
  useEffect(() => {
    if (!open) return;
    const handleKey = e => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-[#18140dcc] z-[1000] flex items-center justify-center">
      <div className="relative w-[96vw] max-w-lg bg-[#231d0f] border border-[#bfa658] rounded-2xl p-8 text-center animate__animated animate__fadeInDown">
        <button
          className="absolute top-4 right-6 text-2xl text-[#bfa658] font-bold hover:text-[#ffd700] transition"
          onClick={onClose}
          tabIndex={0}
          aria-label="Kapat"
        >×</button>
        <h2 className="text-2xl font-bold mb-4 text-[#bfa658] tracking-wide drop-shadow">
          Teşekkürler, {name}!
        </h2>
        <div className="text-[#ffeec2] text-lg mb-4 leading-relaxed">
          <p>
            Rezervasyonunuz başarıyla alınmıştır.<br />
            <b>VIP transferiniz için ayrıcalıklı hizmet kaydınız oluşturulmuştur.</b>
          </p>
          <p className="mt-2">
            En kısa sürede aracınız ve profesyonel şoförünüz atanacaktır. Transfer detaylarınız ve ödeme bilginiz
            <span className="block font-bold mt-1">{email}</span>
            adresinize e-posta olarak iletilecektir.
          </p>
          <p className="mt-3">
            Dilerseniz rezervasyonunuzu <b>her zaman ekibimize sorabilirsiniz</b>. <br />
            YolcuTransferi ile kusursuz ve güvenli bir ulaşım deneyimi sizi bekliyor.
          </p>
        </div>
        <div className="text-[#bfa658] mt-5 text-sm">
          Her türlü sorunuz için <b>info@yolcutransferi.com</b> adresine yazabilirsiniz.<br />
          <span className="italic">İyi yolculuklar dileriz!</span>
        </div>
      </div>
    </div>
  );
}
