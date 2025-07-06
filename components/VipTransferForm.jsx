// === Dosya: /components/VipTransferForm.jsx ===

"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Otomatik doldurma için localStorage ve navigator kullanımı
function getAutoFill(field) {
  if (typeof window === "undefined") return "";
  // 1. Kendi localStorage key'in (formdatam vs)
  try {
    const v = localStorage.getItem("transferForm_" + field);
    if (v) return v;
  } catch {}
  // 2. Tarayıcıdan çekilebilecek varsa (çok basit)
  if (field === "name" && window.navigator.userAgentData)
    return window.navigator.userAgentData.fullName || "";
  if (field === "email" && window.navigator.userAgentData)
    return window.navigator.userAgentData.email || "";
  return "";
}

export default function VipTransferForm({ user }) {
  const router = useRouter();
  // USER bilgisi varsa, ön doldur!
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [people, setPeople] = useState("");
  const [segment, setSegment] = useState("");
  const [transfer, setTransfer] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  // Doldurma kontrolleri
  useEffect(() => {
    if (typeof window === "undefined") return;
    setFrom(localStorage.getItem("transferForm_from") || "");
    setTo(localStorage.getItem("transferForm_to") || "");
    setPeople(localStorage.getItem("transferForm_people") || "");
    setSegment(localStorage.getItem("transferForm_segment") || "");
    setTransfer(localStorage.getItem("transferForm_transfer") || "");
    setDate(localStorage.getItem("transferForm_date") || "");
    setTime(localStorage.getItem("transferForm_time") || "");
  }, []);
  // Alanlar değiştikçe local'e yaz
  useEffect(() => { if (typeof window !== "undefined") localStorage.setItem("transferForm_from", from); }, [from]);
  useEffect(() => { if (typeof window !== "undefined") localStorage.setItem("transferForm_to", to); }, [to]);
  useEffect(() => { if (typeof window !== "undefined") localStorage.setItem("transferForm_people", people); }, [people]);
  useEffect(() => { if (typeof window !== "undefined") localStorage.setItem("transferForm_segment", segment); }, [segment]);
  useEffect(() => { if (typeof window !== "undefined") localStorage.setItem("transferForm_transfer", transfer); }, [transfer]);
  useEffect(() => { if (typeof window !== "undefined") localStorage.setItem("transferForm_date", date); }, [date]);
  useEffect(() => { if (typeof window !== "undefined") localStorage.setItem("transferForm_time", time); }, [time]);

  // Üye login ise props'tan veya global'den auto-fill (örnek için hardcode simülasyonu)
  useEffect(() => {
    if (!user) return;
    if (user.from) setFrom(user.from);
    if (user.to) setTo(user.to);
    if (user.people) setPeople(user.people);
    if (user.segment) setSegment(user.segment);
    if (user.transfer) setTransfer(user.transfer);
    if (user.date) setDate(user.date);
    if (user.time) setTime(user.time);
  }, [user]);

  // Minimum form
  function handleSubmit(e) {
    e.preventDefault();
    if (!from || !to || !people || !segment || !transfer || !date || !time) return alert("Lütfen tüm alanları doldurun.");
    // Alanları query ile yeni sayfaya yolla
    const params = new URLSearchParams({ from, to, people, segment, transfer, date, time });
    router.push(`/rezervasyon?${params.toString()}`);
  }

  // Responsive & dark theme & kutular
  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="on"
      className="w-full h-full flex flex-col justify-center items-center px-2"
      style={{
        maxWidth: 600,
        minWidth: 220,
        margin: "0 auto",
        height: "100%",
        minHeight: 400
      }}
    >
      <div className="w-full max-w-lg mx-auto bg-[#19160a] border border-[#bfa658] rounded-2xl px-3 md:px-6 py-6 md:py-9 shadow-2xl flex flex-col gap-3"
        style={{ boxSizing: "border-box", background: "#19160a", minWidth: 220 }}>
        <h1 className="text-xl md:text-2xl font-extrabold text-[#bfa658] tracking-tight mb-5 text-center font-quicksand">
          VIP Rezervasyon Formu
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-3">
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Nereden?</label>
            <input type="text" value={from} onChange={e => setFrom(e.target.value)}
              placeholder="Nereden? (İl / Havalimanı / Otel)"
              className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl px-3 py-2"
              autoComplete="address-level2"
            />
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Nereye?</label>
            <input type="text" value={to} onChange={e => setTo(e.target.value)}
              placeholder="Nereye? (İl / İlçe / Otel)"
              className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl px-3 py-2"
              autoComplete="address-level2"
            />
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Kişi Sayısı</label>
            <select value={people} onChange={e => setPeople(e.target.value)}
              className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl px-3 py-2">
              <option value="">Seçiniz</option>
              {Array.from({ length: 24 }, (_, i) => i + 1).map(val =>
                <option key={val} value={val}>{val}</option>
              )}
            </select>
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Segment</label>
            <select value={segment} onChange={e => setSegment(e.target.value)}
              className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl px-3 py-2">
              <option value="">Seçiniz</option>
              <option value="Ekonomik">Ekonomik</option>
              <option value="Lüks">Lüks</option>
              <option value="Prime+">Prime+</option>
            </select>
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Transfer Türü</label>
            <select value={transfer} onChange={e => setTransfer(e.target.value)}
              className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl px-3 py-2">
              <option value="">Seçiniz</option>
              <option value="VIP Havalimanı Transferi">VIP Havalimanı Transferi</option>
              <option value="Şehirler Arası Transfer">Şehirler Arası Transfer</option>
              <option value="Kurumsal Etkinlik">Kurumsal Etkinlik</option>
              <option value="Özel Etkinlik">Özel Etkinlik</option>
              <option value="Tur & Gezi">Tur & Gezi</option>
              <option value="Toplu Transfer">Toplu Transfer</option>
              <option value="Düğün vb Organizasyonlar">Düğün vb Organizasyonlar</option>
            </select>
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Tarih</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl px-3 py-2"
            />
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Saat</label>
            <input type="time" value={time} onChange={e => setTime(e.target.value)}
              className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl px-3 py-2"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold py-3 mt-5 rounded-xl text-lg shadow hover:scale-105 transition"
        >
          Devam Et
        </button>
      </div>
      <style jsx>{`
        @media (max-width: 800px) {
          .max-w-lg { max-width: 99vw !important; }
        }
        @media (max-width: 600px) {
          .max-w-lg { max-width: 99vw !important; }
          .px-3 { padding-left: 8px !important; padding-right: 8px !important; }
          .py-6 { padding-top: 16px !important; padding-bottom: 16px !important; }
        }
      `}</style>
    </form>
  );
}
// === Dosya SONU: /components/VipTransferForm.jsx ===
