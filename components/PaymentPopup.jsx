// === Dosya: components/PaymentPopup.jsx ===
import React, { useState } from "react";

export default function PaymentPopup({
  from, to, km, duration, people, segment, transfer, date, time,
  name, surname, tc, phone, email, pnr, note, extras, extrasQty, sigorta, sigortaTutar, transferPrice,
  onComplete
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handlePay() {
    setLoading(true);
    setError("");
    try {
      // DB ve mail gönderme
      await fetch("/api/rezervasyon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from, to, km, duration, people, segment, transfer, date, time,
          name, surname, tc, phone, email, pnr, note, extras, extrasQty, sigorta, sigortaTutar, transferPrice,
        }),
      });
      setSuccess(true);
      setTimeout(onComplete, 1200);
    } catch (err) {
      setError("Ödeme/Gönderim sırasında hata oluştu, lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-[#00000088] flex items-center justify-center">
      <div className="bg-[#19160a] border border-[#bfa658] rounded-2xl p-8 w-full max-w-xl shadow-lg relative">
        <h2 className="text-2xl font-bold mb-4 text-[#bfa658] text-center">Ödeme ve Onay</h2>
        <div className="mb-6 text-[#ffeec2] text-lg">
          <b>Toplam Ödenecek Tutar:</b> <span className="text-[#FFD700]">{transferPrice ? `${transferPrice.toLocaleString()} ₺` : "Bilinmiyor"}</span>
        </div>
        <div className="mb-2 text-[#bfa658] text-center">
          Kredi kartı/iyzico altyapısı ile güvenli ödeme (DEMO). Rezervasyonunuz ve ödemeniz kayıt altına alınacaktır.
        </div>
        {error && <div className="text-red-400 font-bold mb-3">{error}</div>}
        {success && <div className="text-green-400 font-bold mb-3">Başarılı! Yönlendiriliyorsunuz...</div>}
        <div className="flex justify-center gap-4 mt-6">
          <button
            className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold py-3 px-10 rounded-xl text-xl shadow hover:scale-105 transition"
            disabled={loading}
            onClick={handlePay}
          >
            {loading ? "İşlem Yapılıyor..." : "Ödemeyi Tamamla"}
          </button>
        </div>
      </div>
    </div>
  );
}
