// app/odeme/OdemeMain.jsx
"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function OdemeMain() {
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
    extras = q.extras ? q.extras.split(",").filter(x => x) : [];
    extrasQty = q.extrasQty ? JSON.parse(q.extrasQty) : {};
  } catch {
    extras = [];
    extrasQty = {};
  }

  // Sipariş kodu
  const today = new Date();
  const fakeOrderId = `siparis${today.getDate()}${today.getMonth() + 1}${today.getFullYear()}_${1000 + Math.floor(Math.random() * 300)}`;

  // Fiyat Hesabı (Aynı, her yerde tutarlı olsun)
  const basePrice = 4000;
  const allExtras = (() => {
    try {
      // SSR/CSR hatası olursa dummy array döndür
      return require("../../data/extrasByCategory").extrasListByCategory.flatMap(cat => cat.items);
    } catch { return []; }
  })();
  const selectedExtras = allExtras.filter(e => extras.includes(e.key));
  const extrasTotal = selectedExtras.reduce((sum, e) => sum + (e.price * (extrasQty[e.key] || 1)), 0);
  const KDV_ORAN = 0.20;
  const araToplam = basePrice + extrasTotal;
  const kdv = araToplam * KDV_ORAN;
  const toplam = araToplam + kdv;

  // Gönderim
  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    const fullData = {
      ...q,
      extras,
      extrasQty,
      toplamTutar: toplam,
      card: {
        name: form.cardName,
        number: form.cardNumber,
        month: form.cardMonth,
        year: form.cardYear,
        cvc: form.cardCvc,
      },
      orderId: fakeOrderId,
      status: "Ödeme Yapıldı"
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
            toplamTutar: toplam,
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

  // -------------------- ÖDEME BAŞARILI ---------------------
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
          <div className="text-[#ffeec2] text-base text-center mb-8">
            <div className="mb-2">
              YolcuTransferi ailesi olarak size <span className="font-bold text-yellow-400">eşsiz bir transfer deneyimi</span> yaşatacağız.<br />
              Tüm rezervasyon ve ödeme bilgileriniz, tarafınıza ve yöneticilere e-posta olarak iletilmiştir.<br />
              <b>En kısa sürede sizinle iletişime geçeceğiz.</b>
            </div>
            <div className="italic mt-2">Lütfen mail kutunuzu ve gerekirse spam klasörünüzü kontrol edin.<br />Siz sadece arkanıza yaslanın, transferiniz VIP başlıyor!</div>
          </div>
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

  // -------------------- ÖDEME BAŞARISIZ ---------------------
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

  // --------------------- ÖDEME FORMU ----------------------
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#19160a] to-[#302811]">
      <section className="bg-[#19160a] border border-[#bfa658] rounded-3xl shadow-2xl max-w-xl w-full px-8 py-14">
        <h1 className="text-3xl font-bold text-[#bfa658] mb-6 text-center">Kredi Kartı ile Ödeme</h1>
        <div className="text-[#ffeec2] mb-5 text-base space-y-1">
          <div><b>Ad Soyad:</b> {q.name} {q.surname} – T.C.: {q.tc}</div>
          <div><b>Telefon:</b> {q.phone}</div>
          <div><b>E-posta:</b> {q.email}</div>
          <div><b>Transfer:</b> {q.transfer}</div>
          <div><b>Segment:</b> {q.segment}</div>
          <div><b>Araç:</b> {q.vehicle ? q.vehicle : (<span className="italic text-yellow-300">Seçilen segmentte uygun araçlardan biri atanacaktır.</span>)}</div>
          <div><b>Kişi:</b> {q.people}</div>
          <div><b>Nereden:</b> {q.from}</div>
          <div><b>Nereye:</b> {q.to}</div>
          <div><b>Tarih/Saat:</b> {q.date} {q.time}</div>
          {q.pnr && <div><b>PNR/Uçuş Kodu:</b> {q.pnr}</div>}
          {q.note && <div><b>Not:</b> {q.note}</div>}
          <div><b>Ekstralar:</b> {
            selectedExtras.length > 0
              ? (
                <table className="w-full text-sm mt-2 mb-1">
                  <tbody>
                    {selectedExtras.map(extra => (
                      <tr key={extra.key}>
                        <td className="pr-2">{extra.label}</td>
                        <td className="px-2 text-center">{extrasQty[extra.key] || 1} adet</td>
                        <td className="pl-2">{extra.price}₺</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )
              : <span className="text-gray-400 ml-2">Ekstra yok</span>
          }</div>
          <div className="border-t border-[#bfa658] mt-3 pt-2 text-lg font-semibold text-right">
            <div>Transfer Bedeli: {basePrice.toLocaleString()} ₺</div>
            <div>Ekstralar: {extrasTotal.toLocaleString()} ₺</div>
            <div>KDV (%20): {kdv.toLocaleString(undefined, { maximumFractionDigits: 2 })} ₺</div>
            <div className="text-xl font-bold text-yellow-400">Toplam: {toplam.toLocaleString()} ₺</div>
          </div>
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
          <div className="flex flex-col sm:flex-row justify-between gap-3 mt-4">
            <button
              type="button"
              className="bg-gray-700 text-[#ffeec2] font-bold py-3 rounded-xl text-base w-full sm:w-auto hover:bg-gray-600 transition"
              onClick={() => {
                fetch("/api/rezervasyon", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    ...q,
                    extras,
                    extrasQty,
                    toplamTutar: toplam,
                    status: "İptal",
                    orderId: fakeOrderId,
                  }),
                }).then(() => router.push("/"));
              }}
            >
              Vazgeç
            </button>
            <button
              disabled={submitting}
              type="submit"
              className="w-full sm:w-auto bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold py-4 rounded-xl text-xl shadow hover:scale-105 transition"
            >
              {submitting ? "Ödeniyor..." : "Öde ve Rezervasyonu Tamamla"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

// app/odeme/OdemeMain.jsx
