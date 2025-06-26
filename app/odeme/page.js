// app/odeme/page.js
"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function OdemePage() {
  const router = useRouter();
  const params = useSearchParams();
  const [form, setForm] = useState({
    cardName: "",
    cardNumber: "",
    cardMonth: "",
    cardYear: "",
    cardCvc: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  // Form verilerini queryden al
  const q = Object.fromEntries(params.entries());
  let extras = [];
  let extrasQty = {};
  try {
    extras = q.extras ? q.extras.split(",") : [];
    extrasQty = q.extrasQty ? JSON.parse(q.extrasQty) : {};
  } catch {
    extras = [];
    extrasQty = {};
  }

  // Sipariş kodu
  const today = new Date();
  const fakeOrderId = `siparis${today.getDate()}${today.getMonth() + 1}${today.getFullYear()}_${1000 + Math.floor(Math.random() * 300)}`;

  // Gönderim
  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    const fullData = {
      ...q,
      extras,
      extrasQty,
      card: {
        name: form.cardName,
        number: form.cardNumber,
        month: form.cardMonth,
        year: form.cardYear,
        cvc: form.cardCvc,
      },
      orderId: fakeOrderId,
    };
    // API'ye gönder
    const resp = await fetch("/api/rezervasyon", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fullData),
    });
    if (resp.ok) {
      setResult({ ok: true, code: fakeOrderId });
    } else {
      setResult({ ok: false });
    }
    setSubmitting(false);
  }

  // Vazgeçme / sayfa terk etme yakala → vazgeçenler listesine ekle (kapanırsa)
  useEffect(() => {
    const beforeUnload = () => {
      if (!result) {
        fetch("/api/rezervasyon", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...q,
            extras,
            extrasQty,
            status: "İptal",
            orderId: fakeOrderId,
          }),
        });
      }
    };
    window.addEventListener("beforeunload", beforeUnload);
    return () => window.removeEventListener("beforeunload", beforeUnload);
    // eslint-disable-next-line
  }, []);

  if (result && result.ok) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#19160a] to-[#302811]">
        <section className="bg-[#19160a] border border-[#bfa658] rounded-3xl shadow-2xl max-w-xl w-full px-8 py-14 flex flex-col items-center">
          <h1 className="text-3xl font-bold text-[#bfa658] mb-6 text-center">Ödeme Başarılı!</h1>
          <p className="text-[#ffeec2] text-lg text-center mb-3">
            Ödemeniz başarıyla alındı.<br />
            <span className="font-bold text-yellow-400">Sipariş Numaranız:</span>
            <br />
            <span className="text-2xl font-extrabold tracking-wider text-[#bfa658]">{result.code}</span>
          </p>
          <p className="text-[#ffeec2] text-base text-center mb-8">
            YolcuTransferi ailesi olarak size eşsiz bir transfer deneyimi yaşatacağız.<br />
            Detaylar ve yolculuk bilgileriniz e-posta adresinize gönderildi.<br />
            <span className="italic">Siz sadece arkanıza yaslanın, transferiniz VIP başlıyor!</span>
          </p>
          <button
            className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold py-3 px-8 rounded-xl text-xl hover:scale-105 transition"
            onClick={() => router.push("/")}
          >
            Ana Sayfaya Dön
          </button>
        </section>
      </main>
    );
  }

  if (result && !result.ok) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#19160a] to-[#302811]">
        <section className="bg-[#19160a] border border-[#bfa658] rounded-3xl shadow-2xl max-w-xl w-full px-8 py-14 flex flex-col items-center">
          <h1 className="text-3xl font-bold text-red-400 mb-4">Ödeme Başarısız!</h1>
          <p className="text-[#ffeec2] mb-4">Bir sorun oluştu. Lütfen tekrar deneyin veya bizimle iletişime geçin.</p>
          <button
            className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold py-3 px-8 rounded-xl text-xl hover:scale-105 transition"
            onClick={() => router.push("/")}
          >
            Ana Sayfaya Dön
          </button>
        </section>
      </main>
    );
  }

  // ÖDEME EKRANI
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#19160a] to-[#302811]">
      <section className="bg-[#19160a] border border-[#bfa658] rounded-3xl shadow-2xl max-w-xl w-full px-8 py-14">
        <h1 className="text-3xl font-bold text-[#bfa658] mb-6 text-center">Kredi Kartı ile Ödeme</h1>
        <div className="text-[#ffeec2] mb-5 text-base space-y-1">
          <div><b>Ad Soyad:</b> {q.name} {q.surname} – T.C.: {q.tc}</div>
          <div><b>Telefon:</b> {q.phone}</div>
          <div><b>Transfer:</b> {q.transfer}</div>
          <div><b>Araç:</b> {q.vehicle}</div>
          <div><b>Kişi:</b> {q.people}</div>
          <div><b>Nereden:</b> {q.from}</div>
          <div><b>Nereye:</b> {q.to}</div>
          <div><b>Tarih/Saat:</b> {q.date} {q.time}</div>
          {q.pnr && <div><b>PNR/Uçuş Kodu:</b> {q.pnr}</div>}
          {q.note && <div><b>Not:</b> {q.note}</div>}
          <div><b>Ekstralar:</b> {
            extras && extras.length > 0
              ? extras.map(k => (
                  <span key={k} className="inline-block mx-2">
                    {k} ({extrasQty[k] || 1} adet)
                  </span>
                ))
              : <span className="text-gray-400 ml-2">Ekstra yok</span>
          }</div>
        </div>
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label className="font-bold text-[#bfa658] block mb-1">Kart Üzerindeki İsim</label>
            <input
              type="text"
              className="input w-full bg-black text-[#ffeec2] border border-[#bfa658] rounded-xl px-4 py-3"
              required
              value={form.cardName}
              onChange={e => setForm(f => ({ ...f, cardName: e.target.value }))}
              autoComplete="cc-name"
              placeholder="Kart Üzerindeki İsim"
            />
          </div>
          <div>
            <label className="font-bold text-[#bfa658] block mb-1">Kart Numarası</label>
            <input
              type="text"
              className="input w-full bg-black text-[#ffeec2] border border-[#bfa658] rounded-xl px-4 py-3"
              required
              maxLength={19}
              value={form.cardNumber}
              onChange={e => setForm(f => ({ ...f, cardNumber: e.target.value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim() }))}
              autoComplete="cc-number"
              placeholder="0000 0000 0000 0000"
            />
          </div>
          <div className="flex gap-3">
            <div className="w-1/2">
              <label className="font-bold text-[#bfa658] block mb-1">Ay / Yıl</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="input w-full bg-black text-[#ffeec2] border border-[#bfa658] rounded-xl px-4 py-3"
                  required
                  maxLength={2}
                  value={form.cardMonth}
                  onChange={e => setForm(f => ({ ...f, cardMonth: e.target.value.replace(/\D/g, "").slice(0, 2) }))}
                  placeholder="AA"
                  autoComplete="cc-exp-month"
                />
                <input
                  type="text"
                  className="input w-full bg-black text-[#ffeec2] border border-[#bfa658] rounded-xl px-4 py-3"
                  required
                  maxLength={2}
                  value={form.cardYear}
                  onChange={e => setForm(f => ({ ...f, cardYear: e.target.value.replace(/\D/g, "").slice(0, 2) }))}
                  placeholder="YY"
                  autoComplete="cc-exp-year"
                />
              </div>
            </div>
            <div className="w-1/2">
              <label className="font-bold text-[#bfa658] block mb-1">CVC</label>
              <input
                type="text"
                className="input w-full bg-black text-[#ffeec2] border border-[#bfa658] rounded-xl px-4 py-3"
                required
                maxLength={4}
                value={form.cardCvc}
                onChange={e => setForm(f => ({ ...f, cardCvc: e.target.value.replace(/\D/g, "").slice(0, 4) }))}
                placeholder="CVC"
                autoComplete="cc-csc"
              />
            </div>
          </div>
          <button
            disabled={submitting}
            type="submit"
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold py-4 rounded-xl text-xl shadow hover:scale-105 transition mt-6"
          >
            {submitting ? "Ödeniyor..." : "Öde ve Rezervasyonu Tamamla"}
          </button>
        </form>
      </section>
    </main>
  );
}
