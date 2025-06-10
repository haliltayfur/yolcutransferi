"use client";
import { useState } from "react";

export default function PaymentForm({ show, amount, onClose, onSuccess }) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);

  if (!show) return null;

  const handlePayment = (e) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setDone(true);
      if (onSuccess) onSuccess();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
      <div className="bg-white text-black rounded-2xl shadow-2xl p-8 max-w-lg w-full relative animate-fade-in">
        <button onClick={onClose} className="absolute top-2 right-3 text-lg text-gray-400 hover:text-red-500 font-bold">×</button>
        <h3 className="text-xl font-bold mb-3 text-center text-gold">Ödeme Ekranı</h3>
        {done
          ? <div className="text-center text-green-600 text-lg py-8">Ödemeniz başarıyla alınmıştır! <br /> YolcuTransferi ekibi sizinle iletişime geçecektir.</div>
          : (
            <form onSubmit={handlePayment} className="flex flex-col gap-3">
              <input
                type="text" maxLength={19} required
                className="input bg-white border text-black"
                placeholder="Kart Numarası"
                value={cardNumber}
                onChange={e => setCardNumber(e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim())}
              />
              <div className="flex gap-3">
                <input
                  type="text" maxLength={5} required
                  className="input bg-white border text-black"
                  placeholder="AA/YY"
                  value={expiry}
                  onChange={e => setExpiry(e.target.value.replace(/[^0-9/]/g, '').slice(0, 5))}
                />
                <input
                  type="text" maxLength={4} required
                  className="input bg-white border text-black"
                  placeholder="CVV"
                  value={cvv}
                  onChange={e => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                />
              </div>
              <input
                type="text" required
                className="input bg-white border text-black"
                placeholder="Kart Üzerindeki İsim"
                value={cardName}
                onChange={e => setCardName(e.target.value)}
              />
              <button disabled={processing} className="bg-gold hover:bg-yellow-400 text-black font-bold rounded-xl px-6 py-3 transition text-lg w-full mt-3">
                {processing ? "Ödeme İşleniyor..." : `${amount || ""}₺ Ödeme Yap`}
              </button>
            </form>
          )
        }
      </div>
      <style jsx>{`
        .animate-fade-in { animation: fadeIn .3s; }
        @keyframes fadeIn { from { opacity: 0; transform: scale(.95);} to { opacity: 1; transform: scale(1);} }
      `}</style>
    </div>
  );
}
