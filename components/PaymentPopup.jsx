"use client";
import React, { useState } from "react";

// Basit KDV oranı, ekstra toplamı
const calcExtrasTotal = (extras) =>
  (extras || []).reduce((sum, x) => sum + (x.price || 0) * (x.qty || 1), 0);

export default function PaymentPopup({
  open,
  onClose,
  transferUcreti = 0,
  sigortaTutar = 0,
  extras = [],
  onNext,
}) {
  const [cardNo, setCardNo] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardDate, setCardDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const extrasTotal = Number(calcExtrasTotal(extras)) || 0;
  const transferUcretiSafe = Number(transferUcreti) || 0;
  const sigortaTutarSafe = Number(sigortaTutar) || 0;
  const araToplam = transferUcretiSafe + sigortaTutarSafe + extrasTotal;
  const kdv = Math.round(araToplam * 0.20);
  const total = araToplam + kdv;

  function handlePay(e) {
    e.preventDefault();
    setError("");
    if (
      cardNo.replace(/\s/g, "").length < 16 ||
      !cardName ||
      !/^([0-1]\d)\/\d{2}$/.test(cardDate) ||
      cvv.length < 3
    ) {
      setError("Lütfen tüm kart bilgilerini doğru ve eksiksiz girin.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onNext();
    }, 1300);
  }

  return (
    <div className="fixed inset-0 bg-[#18140dcc] z-[1000] flex items-center justify-center">
      <div className="relative w-[95vw] max-w-xl bg-[#231d0f] border border-[#bfa658] rounded-2xl p-8 shadow-xl">
        <button
          className="absolute top-4 right-6 text-2xl text-[#bfa658] font-bold"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-3 text-[#bfa658] text-center">
          Ödeme ve Onay
        </h2>
        <div className="mb-2 text-[#ffeec2]">
          <div>Transfer Ücreti: <b>₺{transferUcretiSafe.toLocaleString("tr-TR")}</b></div>
          {sigortaTutarSafe > 0 && (
            <div>Sigorta: <b>₺{sigortaTutarSafe.toLocaleString("tr-TR")}</b></div>
          )}
          {extrasTotal > 0 && (
            <div>
              Ekstralar: <b>₺{extrasTotal.toLocaleString("tr-TR")}</b>
              <ul className="ml-4 list-disc text-sm">
                {extras.map(
                  (x) =>
                    x.price && (
                      <li key={x.key}>
                        {x.label} {x.qty > 1 ? `x${x.qty}` : ""}
                        {": "}
                        ₺{(x.price * (x.qty || 1)).toLocaleString("tr-TR")}
                      </li>
                    )
                )}
              </ul>
            </div>
          )}
          <div>KDV: <b>₺{kdv.toLocaleString("tr-TR")}</b></div>
          <div className="font-bold text-lg mt-2">
            Toplam Ödenecek Tutar:{" "}
            <span className="text-[#ffd700]">
              ₺{total.toLocaleString("tr-TR")}
            </span>
          </div>
        </div>
        <div className="bg-[#ffeec299] p-3 rounded-lg text-black font-semibold mb-2 text-center">
          Kredi kartı bilgileriniz demo olarak alınacaktır. <br />
          Gerçek ödeme burada gerçekleşmez. (Sahte bilgiler girebilirsiniz)
        </div>
        <form className="grid grid-cols-1 gap-2" onSubmit={handlePay} autoComplete="off">
          <input
            className="input"
            placeholder="Kart Numarası (16 hane)"
            maxLength={19}
            value={cardNo}
            onChange={(e) =>
              setCardNo(
                e.target.value
                  .replace(/\D/g, "")
                  .replace(/(.{4})/g, "$1 ")
                  .trim()
                  .slice(0, 19)
              )
            }
            inputMode="numeric"
          />
          <input
            className="input"
            placeholder="Kart Üzerindeki İsim"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            autoComplete="cc-name"
          />
          <div className="flex gap-2">
            <input
              className="input flex-1"
              placeholder="AA/YY"
              value={cardDate}
              onChange={(e) => setCardDate(e.target.value)}
              maxLength={5}
              inputMode="text"
              autoComplete="cc-exp"
            />
            <input
              className="input flex-1"
              placeholder="CVV"
              maxLength={4}
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
              inputMode="numeric"
              autoComplete="cc-csc"
            />
          </div>
          {error && <div className="text-red-400 text-xs mt-2">{error}</div>}
          <button
            type="submit"
            className="w-full btn bg-gradient-to-r from-[#bfa658] to-[#ffeec2] text-black text-lg font-bold py-3 mt-4 rounded-lg flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <span className="animate-spin h-6 w-6 border-2 border-[#bfa658] border-t-transparent rounded-full"></span>
            ) : (
              "Öde ve VIP hizmetin keyfini çıkar"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
