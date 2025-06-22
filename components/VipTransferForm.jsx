"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { vehicles } from "../data/vehicleList";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// (Eğer segment ve transfer de eklenecekse bunları bir şekilde state olarak alırsın. Burada örnek olarak altta örnek select var.)

const saatler = [
  "00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30",
  "04:00", "04:30", "05:00", "05:30", "06:00", "06:30", "07:00", "07:30",
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
  "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"
];

// NORMALİZE fonksiyonu: Büyük/küçük harf, &/ve, fazladan boşlukları düzeltir
function normalize(str) {
  return (str || "")
    .toLowerCase()
    .replace(/&/g, "ve")
    .replace(/[,\.]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export default function VipTransferForm() {
  const router = useRouter();

  // SEÇİMLER (Segment ve Transfer için örnek)
  const [segment, setSegment] = useState(""); // "Ekonomik", "Lüks", "Prime+" vb.
  const [transfer, setTransfer] = useState(""); // "VIP Havalimanı Transferi" vb.

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("");
  const [vehicle, setVehicle] = useState(""); // Seçili araç
  const [people, setPeople] = useState(1);

  useEffect(() => {
    const draft = JSON.parse(localStorage.getItem("reservationDraft") || "{}");
    if (draft.from) setFrom(draft.from);
    if (draft.to) setTo(draft.to);
    if (draft.date) setDate(new Date(draft.date));
    if (draft.time) setTime(draft.time);
    if (draft.vehicle) setVehicle(draft.vehicle);
    if (draft.people) setPeople(draft.people);
    if (draft.segment) setSegment(draft.segment);
    if (draft.transfer) setTransfer(draft.transfer);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "reservationDraft",
      JSON.stringify({
        from,
        to,
        date: date ? date.toISOString() : "",
        time,
        vehicle,
        people,
        segment,
        transfer
      })
    );
  }, [from, to, date, time, vehicle, people, segment, transfer]);

  // **FİLTRELEME - AKILLI**
  const availableVehicles = vehicles.filter(v => {
    // Segment seçilmişse normalleştirerek eşleştir
    if (segment && normalize(v.segment) !== normalize(segment)) return false;
    // Kişi kapasitesi
    if (people && v.max < people) return false;
    // Transfer türü seçilmişse, normalize ederek array’de var mı bak
    if (transfer) {
      const transferNorm = normalize(transfer);
      const arr = (v.transferTypes || []).map(normalize);
      if (!arr.some(t => t === transferNorm)) return false;
    }
    return true;
  });

  // Seçili araç, filtre dışına çıkarsa ilk uygun aracı seç
  useEffect(() => {
    if (availableVehicles.length > 0) {
      if (!availableVehicles.find(v => v.value === vehicle)) {
        setVehicle(availableVehicles[0].value);
      }
    } else {
      setVehicle("");
    }
    // eslint-disable-next-line
  }, [segment, transfer, people, vehicles]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!from || !to || !date || !time || !vehicle) {
      alert("Lütfen tüm alanları eksiksiz doldurun.");
      return;
    }
    const params = new URLSearchParams({
      from, to, date: date.toISOString().split("T")[0], time, vehicle, people, segment, transfer
    }).toString();
    router.push(`/rezervasyon?${params}`);
  }

  return (
    <form
      className="w-full h-full flex flex-col justify-center px-8 py-6"
      style={{ maxWidth: "900px", maxHeight: "700px" }}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-4 w-full mb-4">
        <input
          type="text"
          placeholder="Nereden? (il/ilçe/mahalle/sokak)"
          className="w-full py-4 px-4 rounded-xl border border-gold bg-black/80 text-lg text-white focus:outline-none"
          value={from}
          onChange={e => setFrom(e.target.value)}
          autoComplete="off"
        />
        <input
          type="text"
          placeholder="Nereye? (il/ilçe/mahalle/sokak)"
          className="w-full py-4 px-4 rounded-xl border border-gold bg-black/80 text-lg text-white focus:outline-none"
          value={to}
          onChange={e => setTo(e.target.value)}
          autoComplete="off"
        />
      </div>

      {/* Segment ve Transfer Seçimi */}
      <div className="flex flex-row gap-4 w-full mb-4">
        {/* Segment */}
        <select
          className="w-1/3 py-4 px-4 rounded-xl border border-gold bg-black/80 text-lg text-white"
          value={segment}
          onChange={e => setSegment(e.target.value)}
        >
          <option value="">Segment Seç</option>
          <option value="Ekonomik">Ekonomik</option>
          <option value="Lüks">Lüks</option>
          <option value="Prime+">Prime+</option>
        </select>
        {/* Transfer Türü */}
        <select
          className="w-2/3 py-4 px-4 rounded-xl border border-gold bg-black/80 text-lg text-white"
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

      <div className="flex flex-row gap-4 w-full mb-4">
        {/* Araç Tipi */}
        <select
          className="w-1/3 py-4 px-4 rounded-xl border border-gold bg-black/80 text-lg text-white"
          value={vehicle}
          onChange={e => setVehicle(e.target.value)}
        >
          {availableVehicles.length === 0 && <option value="">Uygun araç yok</option>}
          {availableVehicles.map((v, i) => (
            <option key={i} value={v.value}>{v.label}</option>
          ))}
        </select>
        {/* Kişi */}
        <select
          className="w-1/6 py-4 px-4 rounded-xl border border-gold bg-black/80 text-lg text-white"
          value={people}
          onChange={e => setPeople(Number(e.target.value))}
        >
          {Array.from({ length: 24 }, (_, i) => i + 1).map(val =>
            <option key={val} value={val}>{val}</option>
          )}
        </select>
        {/* Tarih (Modern Calendar) */}
        <DatePicker
          selected={date}
          onChange={date => setDate(date)}
          dateFormat="dd.MM.yyyy"
          minDate={new Date()}
          placeholderText="Tarih Seç"
          className="w-1/3 py-4 px-4 rounded-xl border border-gold bg-black/80 text-lg text-white focus:outline-none"
          popperPlacement="bottom"
          calendarClassName="bg-black text-white"
        />
        {/* Saat */}
        <select
          className="w-1/4 py-4 px-4 rounded-xl border border-gold bg-black/80 text-lg text-white"
          value={time}
          onChange={e => setTime(e.target.value)}
        >
          <option value="">Saat seç</option>
          {saatler.map((saat, i) => (
            <option key={i} value={saat}>{saat}</option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold py-4 px-8 rounded-xl w-full text-xl shadow hover:scale-105 transition"
      >
        Transfer Planla
      </button>
    </form>
  );
}
