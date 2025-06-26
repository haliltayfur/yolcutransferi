"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { vehicles } from "../data/vehicleList";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Saatler
const saatler = Array.from({ length: 24 * 2 }, (_, i) => {
  const h = Math.floor(i / 2).toString().padStart(2, "0");
  const m = i % 2 === 0 ? "00" : "30";
  return `${h}:${m}`;
});

function normalize(str) {
  return (str || "")
    .toLowerCase()
    .replace(/&/g, "ve")
    .replace(/[,\.]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

const segmentLabels = {
  "Ekonomik": "Ekonomik (Standart Konfor)",
  "Lüks": "Lüks (Yüksek Konfor)",
  "Prime+": "Prime+ (Ultra Lüks)"
};

export default function VipTransferForm() {
  const router = useRouter();
  const params = useSearchParams();

  // Tüm inputlar, localStorage varsayılanları
  const [from, setFrom] = useState(params.get("from") || "");
  const [to, setTo] = useState(params.get("to") || "");
  const [segment, setSegment] = useState(params.get("segment") || "");
  const [people, setPeople] = useState(Number(params.get("people")) || 1);
  const [transfer, setTransfer] = useState(params.get("transfer") || "");
  const [vehicle, setVehicle] = useState(params.get("vehicle") || "");
  const [date, setDate] = useState(params.get("date") ? new Date(params.get("date")) : null);
  const [time, setTime] = useState(params.get("time") || "");
  const [pnr, setPnr] = useState(params.get("pnr") || "");

  // Formu her cihazda/sekmede boş açmak için storage effect:
  useEffect(() => {
    // Eğer sayfa yenilenirse veya farklı cihazsa: varsayılanları çek
    setFrom(params.get("from") || "");
    setTo(params.get("to") || "");
    setSegment(params.get("segment") || "");
    setPeople(Number(params.get("people")) || 1);
    setTransfer(params.get("transfer") || "");
    setVehicle(params.get("vehicle") || "");
    setDate(params.get("date") ? new Date(params.get("date")) : null);
    setTime(params.get("time") || "");
    setPnr(params.get("pnr") || "");
  }, [params]);

  // Segment değişince araçları sıfırla
  useEffect(() => {
    setVehicle("");
  }, [segment, people, transfer]);

  // Araç segmentine uygunları getir (seçim olarak göster ama seçilmeden geçilemesin)
  const availableVehicles = vehicles.filter(v => {
    if (segment && normalize(v.segment) !== normalize(segment)) return false;
    if (people && v.max < people) return false;
    if (transfer) {
      const transferNorm = normalize(transfer);
      const arr = (v.transferTypes || []).map(normalize);
      if (!arr.includes(transferNorm)) return false;
    }
    return true;
  });

  // Havalimanı/PNR kontrolü
  const isAirport = str =>
    str && typeof str === "string" &&
    (str.toLowerCase().includes("havaalan") ||
      str.toLowerCase().includes("havaliman") ||
      str.toLowerCase().includes("airport"));
  const showPnr =
    isAirport(from) || isAirport(to) || (transfer && transfer.toLowerCase().includes("hava"));

  // Tarih düzeltme: timezone sorunu varsa (UTC/Türkiye) burada handle edilir.
  function toDateString(dt) {
    if (!dt) return "";
    // Localde gün sapmasını engelle
    const userTimezoneOffset = dt.getTimezoneOffset() * 60000;
    const localDate = new Date(dt.getTime() - userTimezoneOffset);
    return localDate.toISOString().split("T")[0];
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!from || !to || !segment || !people || !transfer || !vehicle || !date || !time) {
      alert("Lütfen tüm alanları eksiksiz doldurun.");
      return;
    }
    // Formda ne girildiyse rezervasyon sayfasına gönder
    const params = new URLSearchParams({
      from,
      to,
      segment,
      people,
      transfer,
      vehicle,
      date: toDateString(date),
      time,
      ...(showPnr && { pnr })
    }).toString();
    router.push(`/rezervasyon?${params}`);
  }

  return (
    <form
      className="w-full max-w-[340px] md:max-w-[810px] p-6 md:p-10 rounded-2xl border border-[#bfa658] bg-black/90 shadow-2xl"
      style={{
        fontFamily: "Quicksand, sans-serif",
        minHeight: "600px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }}
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      <h2 className="text-2xl md:text-3xl font-extrabold text-[#bfa658] tracking-tight mb-8 text-center">
        VIP Rezervasyon Formu
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
        {/* Nereden/Nereye yan yana */}
        <div>
          <label className="text-[#bfa658] font-semibold mb-1 block">Nereden?</label>
          <input
            type="text"
            placeholder="ilçe/Mahalle"
            className="w-full py-3 px-4 rounded-xl border border-[#bfa658] bg-black text-white focus:outline-none"
            value={from}
            onChange={e => setFrom(e.target.value)}
          />
        </div>
        <div>
          <label className="text-[#bfa658] font-semibold mb-1 block">Nereye?</label>
          <input
            type="text"
            placeholder="ilçe/Mahalle"
            className="w-full py-3 px-4 rounded-xl border border-[#bfa658] bg-black text-white focus:outline-none"
            value={to}
            onChange={e => setTo(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
        {/* Araç Sınıfı ve Kişi Sayısı yan yana */}
        <div>
          <label className="text-[#bfa658] font-semibold mb-1 block">Araç Sınıfı</label>
          <select
            className="w-full py-3 px-4 rounded-xl border border-[#bfa658] bg-black text-white"
            value={segment}
            onChange={e => setSegment(e.target.value)}
          >
            <option value="">Araç Sınıfı Seçin</option>
            <option value="Ekonomik">{segmentLabels["Ekonomik"]}</option>
            <option value="Lüks">{segmentLabels["Lüks"]}</option>
            <option value="Prime+">{segmentLabels["Prime+"]}</option>
          </select>
        </div>
        <div>
          <label className="text-[#bfa658] font-semibold mb-1 block">Kişi Sayısı</label>
          <select
            className="w-full py-3 px-4 rounded-xl border border-[#bfa658] bg-black text-white"
            value={people}
            onChange={e => setPeople(Number(e.target.value))}
          >
            {Array.from({ length: 24 }, (_, i) => i + 1).map(val => (
              <option key={val} value={val}>{val}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Transfer Türü */}
      <div className="mb-2">
        <label className="text-[#bfa658] font-semibold mb-1 block">Transfer Türü</label>
        <select
          className="w-full py-3 px-4 rounded-xl border border-[#bfa658] bg-black text-white"
          value={transfer}
          onChange={e => setTransfer(e.target.value)}
        >
          <option value="">Transfer Türü Seç</option>
          <option value="VIP Havalimanı Transferi">VIP Havalimanı Transferi</option>
          <option value="Şehirler Arası Transfer">Şehirler Arası Transfer</option>
          <option value="Özel Etkinlik">Özel Etkinlik</option>
          <option value="Kurumsal Etkinlik">Kurumsal Etkinlik</option>
          <option value="Tur & Gezi">Tur & Gezi</option>
          <option value="Toplu Transfer">Toplu Transfer</option>
          <option value="Düğün vb Organizasyonlar">Düğün vb Organizasyonlar</option>
        </select>
      </div>

      {/* Araç ve Tarih/Saat yan yana */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="text-[#bfa658] font-semibold mb-1 block">Araç</label>
          <select
            className="w-full py-3 px-4 rounded-xl border border-[#bfa658] bg-black text-white"
            value={vehicle}
            onChange={e => setVehicle(e.target.value)}
          >
            <option value="">Araç Seç</option>
            {availableVehicles.map((v, i) => (
              <option key={i} value={v.value}>{v.label}</option>
            ))}
          </select>
          {segment && (
            <span className="text-xs text-[#bfa658] block mt-1">Seçtiğiniz sınıfa uygun bir araç atanacaktır.</span>
          )}
        </div>
        <div>
          <label className="text-[#bfa658] font-semibold mb-1 block">Tarih</label>
          <DatePicker
            selected={date}
            onChange={date => setDate(date)}
            dateFormat="dd.MM.yyyy"
            minDate={new Date()}
            placeholderText="Tarih Seç"
            className="w-full py-3 px-4 rounded-xl border border-[#bfa658] bg-black text-white focus:outline-none"
            calendarClassName="bg-black text-white"
            popperPlacement="bottom"
            style={{ width: "100%" }}
          />
        </div>
        <div>
          <label className="text-[#bfa658] font-semibold mb-1 block">Saat</label>
          <select
            className="w-full py-3 px-4 rounded-xl border border-[#bfa658] bg-black text-white"
            value={time}
            onChange={e => setTime(e.target.value)}
          >
            <option value="">Saat seç</option>
            {saatler.map((saat, i) => (
              <option key={i} value={saat}>{saat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* PNR alanı sadece havalimanı ise */}
      {showPnr && (
        <div className="mb-2">
          <label className="text-[#bfa658] font-semibold mb-1 block">PNR / Uçuş Kodu</label>
          <input
            type="text"
            placeholder="Uçuş Rezervasyon Kodu (PNR)"
            className="w-full py-3 px-4 rounded-xl border border-[#bfa658] bg-black text-white focus:outline-none"
            value={pnr}
            onChange={e => setPnr(e.target.value)}
          />
        </div>
      )}

      <button
        type="submit"
        className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold py-4 px-8 rounded-xl w-full text-xl shadow hover:scale-105 transition mt-4"
      >
        Transfer Planla
      </button>
    </form>
  );
}
