import React from "react";

export default function TesekkurPopup({ open, onClose, name, email }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-[#18140dcc] z-[1000] flex items-center justify-center">
      <div className="relative w-[95vw] max-w-lg bg-[#231d0f] border border-[#bfa658] rounded-2xl p-8 text-center">
        <button className="absolute top-4 right-6 text-2xl text-[#bfa658] font-bold" onClick={onClose}>×</button>
        <h2 className="text-2xl font-bold mb-4 text-[#bfa658]">Teşekkürler!</h2>
        <div className="text-[#ffeec2] text-lg mb-3">
          Sayın <span className="font-bold">{name}</span>,<br />
          Rezervasyonunuz başarıyla alınmıştır.
          <br /><br />
          Size özel aracınız ve profesyonel şoförünüz, rezervasyon bilgileriniz doğrultusunda atanacaktır.<br />
          <span className="font-bold">Tüm bilgileriniz {email} adresinize e-posta ile iletilecek.</span><br />
          Ayrıcalıklı transfer deneyimi için teşekkür ederiz.
        </div>
        <div className="text-[#bfa658] mt-6 text-sm">
          Sorularınız için <b>info@yolcutransferi.com</b> adresine yazabilirsiniz.
        </div>
      </div>
    </div>
  );
}
