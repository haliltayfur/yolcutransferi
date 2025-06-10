"use client";
import { useState } from "react";

// YENİ EKLENEN: Rezervasyonu localStorage'a kaydeden fonksiyon
function addReservationToStorage(rezervasyon) {
  try {
    const oldList = JSON.parse(localStorage.getItem("reservations") || "[]");
    oldList.push(rezervasyon);
    localStorage.setItem("reservations", JSON.stringify(oldList));
  } catch (err) {
    alert("Rezervasyon admin kaydına alınamadı!");
  }
}

function randomSiparisNo() {
  return "YOLCU" + Math.floor(100000 + Math.random() * 900000);
}

export default function PaymentForm({ show, amount, onClose, onSuccess, customerInfo, transferInfo }) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);
  const [siparisNo] = useState(randomSiparisNo());

  if (!show) return null;

  // YENİ: Rezervasyonu kaydet
  const handlePayment = (e) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setDone(true);
      // --- YENİ EKLENEN: REZERVASYON KAYDI ---
      addReservationToStorage({
        siparisNo,
        ad: customerInfo?.ad,
        soyad: customerInfo?.soyad,
        tel: customerInfo?.tel,
        email: customerInfo?.email,
        tarih: transferInfo?.date,
        saat: transferInfo?.time,
        arac: transferInfo?.vehicle,
        from: transferInfo?.from,
        to: transferInfo?.to,
        durum: "Bekliyor",
        // ... Diğer gerekli alanlar
      });
      // --- SON ---
      if (onSuccess) onSuccess();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
      <div className="bg-white text-black rounded-2xl shadow-2xl p-8 max-w-lg w-full relative animate-fade-in">
        <button onClick={onClose} className="absolute top-2 right-3 text-lg text-gray-400 hover:text-red-500 font-bold">×</button>
        <h3 className="text-xl font-bold mb-3 text-center text-gold">Ödeme Ekranı</h3>
        {done
          ? <div className="text-center text-green-600 text-lg py-8">
              <b>Ödemeniz başarıyla alınmıştır!</b><br />
              Rezervasyon talebiniz alındı.<br />
              <span className="text-black">Sipariş No: <b>{siparisNo}</b></span><br />
              YolcuTransferi.com olarak teşekkür ederiz.
            </div>
          : (
            <form onSubmit={handlePayment} className="flex flex-col gap-3">
              <label className="text-sm font-bold text-gray-700">Kart Numarası</label>
              <input
                type="text" maxLength={19} required
                className="input bg-white border text-black"
                placeholder="Kart Numarası"
                value={cardNumber}
                onChange={e => setCardNumber(e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim())}
              />
              <div className="flex gap-3">
                <div className="flex flex-col flex-1">
                  <label className="text-sm font-bold text-gray-700">AA/YY</label>
                  <input
                    type="text" maxLength={5} required
                    className="input bg-white border text-black"
                    placeholder="AA/YY"
                    value={expiry}
                    onChange={e => setExpiry(e.target.value.replace(/[^0-9/]/g, '').slice(0, 5))}
                  />
                </div>
                <div className="flex flex-col flex-1">
                  <label className="text-sm font-bold text-gray-700">CVV</label>
                  <input
                    type="text" maxLength={4} required
                    className="input bg-white border text-black"
                    placeholder="CVV"
                    value={cvv}
                    onChange={e => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  />
                </div>
              </div>
              <label className="text-sm font-bold text-gray-700">Kart Üzerindeki İsim</label>
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
        <button className="underline text-gray-500 hover:text-gray-900 mt-4 w-full" onClick={onClose}>Geri</button>
      </div>
      <style jsx>{`
        .animate-fade-in { animation: fadeIn .3s; }
        @keyframes fadeIn { from { opacity: 0; transform: scale(.95);} to { opacity: 1; transform: scale(1);} }
      `}</style>
    </div>
  );
}
