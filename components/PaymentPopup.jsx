import React, { useState } from "react";

export default function PaymentPopup({ open, onClose, transferUcreti, sigortaTutar, extras, onNext }) {
  const [cardNo, setCardNo] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardDate, setCardDate] = useState("");
  const [cvv, setCvv] = useState("");
  if (!open) return null;
  const KDV = ((transferUcreti || 0) + (sigortaTutar || 0)) * 0.2;
  const total = (transferUcreti || 0) + (sigortaTutar || 0) + KDV;
  return (
    <div className="fixed inset-0 bg-[#18140dcc] z-[1000] flex items-center justify-center">
      <div className="relative w-[95vw] max-w-xl bg-[#231d0f] border border-[#bfa658] rounded-2xl p-8">
        <button className="absolute top-4 right-6 text-2xl text-[#bfa658] font-bold" onClick={onClose}>×</button>
        <h2 className="text-2xl font-bold mb-2 text-[#bfa658] text-center">Ödeme ve Onay</h2>
        <div className="mb-2 text-[#ffeec2]">
          {transferUcreti && <div>Transfer Ücreti: ₺{transferUcreti.toLocaleString("tr-TR")}</div>}
          {sigortaTutar ? <div>Sigorta: ₺{sigortaTutar.toLocaleString("tr-TR")}</div> : null}
          <div>KDV (%20): ₺{KDV.toLocaleString("tr-TR")}</div>
          <div className="font-bold text-lg mt-2">Toplam Ödenecek Tutar: <span className="text-[#ffd700]">₺{total.toLocaleString("tr-TR")}</span></div>
        </div>
        <div className="bg-[#ffeec299] p-3 rounded-lg text-black font-semibold mb-2 text-center">
          Kredi kartı bilgileriniz demo olarak alınacaktır. Gerçek ödeme burada gerçekleşmez.
        </div>
        <div className="grid grid-cols-1 gap-2">
          <input className="input" placeholder="Kart Numarası" maxLength={19} value={cardNo} onChange={e => setCardNo(e.target.value)} />
          <input className="input" placeholder="Kart Üzerindeki İsim" value={cardName} onChange={e => setCardName(e.target.value)} />
          <div className="flex gap-2">
            <input className="input flex-1" placeholder="AA/YY" value={cardDate} onChange={e => setCardDate(e.target.value)} />
            <input className="input flex-1" placeholder="CVV" maxLength={4} value={cvv} onChange={e => setCvv(e.target.value)} />
          </div>
        </div>
        <button className="w-full btn bg-gradient-to-r from-[#bfa658] to-[#ffeec2] text-black text-lg font-bold py-3 mt-4 rounded-lg"
          onClick={onNext}>Öde ve VIP hizmetin keyfini çıkar</button>
      </div>
    </div>
  );
}
