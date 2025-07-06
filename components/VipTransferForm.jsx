// === Dosya: /components/VipTransferForm.jsx ===

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

// 15 dakikalık saatler
const saatler = [];
for (let h = 0; h < 24; ++h)
  for (let m of [0, 15, 30, 45]) saatler.push(`${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`);

export default function VipTransferForm({ user }) {
  const router = useRouter();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [people, setPeople] = useState("");
  const [segment, setSegment] = useState("");
  const [transfer, setTransfer] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!from || !to || !people || !segment || !transfer || !date || !time) return alert("Tüm alanları doldurun.");
    const params = new URLSearchParams({ from, to, people, segment, transfer, date, time });
    router.push(`/rezervasyon?${params.toString()}`);
  }

  // Tarih ve saat inputlarını kutuya herhangi bir yere tıklayınca aç
  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="on"
      className="w-full h-full flex flex-col justify-center items-center"
      style={{ maxWidth: 600, minWidth: 220, margin: "0 auto", height: "100%", minHeight: 400 }}
    >
      <div className="w-full mx-auto px-2 md:px-8 py-8 md:py-12 flex flex-col gap-3"
        style={{
          background: "transparent",
          minWidth: 220,
          borderRadius: 18,
        }}>
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#bfa658] tracking-tight mb-5 text-center font-quicksand">
          VIP Rezervasyon Formu
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
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
          <div style={{ position: "relative" }}>
            <label className="font-bold text-[#bfa658] mb-1 block">Tarih</label>
            <div
              tabIndex={0}
              className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl px-3 py-2 cursor-pointer flex items-center"
              onClick={() => { document.getElementById("date-picker").showPicker(); }}
            >
              <input
                id="date-picker"
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="bg-transparent border-0 outline-none text-[#ffeec2] w-full"
                style={{ padding: 0, height: "1.7em" }}
                tabIndex={-1}
              />
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <label className="font-bold text-[#bfa658] mb-1 block">Saat</label>
            <div
              tabIndex={0}
              className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl px-3 py-2 cursor-pointer flex items-center"
              onClick={() => document.getElementById("saat-picker").focus()}
            >
              <select
                id="saat-picker"
                value={time}
                onChange={e => setTime(e.target.value)}
                className="bg-transparent border-0 outline-none text-[#ffeec2] w-full"
                style={{ padding: 0, height: "1.7em" }}
                tabIndex={-1}
              >
                <option value="">Seçiniz</option>
                {saatler.map(saat => <option key={saat} value={saat}>{saat}</option>)}
              </select>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold py-3 mt-6 rounded-xl text-xl shadow hover:scale-105 transition"
        >
          Devam Et
        </button>
      </div>
    </form>
  );
}
// === Dosya SONU: /components/VipTransferForm.jsx ===
