"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { vehicles } from "../data/vehicleList";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// KVKK ve /rezervasyon ile birebir aynı renk/font/yükseklik/grid
const saatler = [
  "00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30",
  "04:00", "04:30", "05:00", "05:30", "06:00", "06:30", "07:00", "07:30",
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
  "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"
];
const segmentOptions = [
  { key: "Ekonomik", label: "Ekonomik" },
  { key: "Lüks", label: "Lüks" },
  { key: "Prime+", label: "Prime+" }
];
function normalize(str) {
  return (str || "")
    .toLocaleLowerCase("tr-TR")
    .replace(/&/g, "ve")
    .replace(/[,\.]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
function isAirport(str) {
  if (!str) return false;
  str = str.toLocaleLowerCase("tr-TR");
  return str.includes("havaalan") || str.includes("havaliman") || str.includes("airport");
}
export default function VipTransferForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [form, setForm] = useState({
    from: params.get("from") || "",
    to: params.get("to") || "",
    people: Number(params.get("people")) || 1,
    segment: params.get("segment") || "",
    transfer: params.get("transfer") || "",
    date: params.get("date") || "",
    time: params.get("time") || "",
    pnr: params.get("pnr") || "",
  });

  useEffect(() => {
    const draft = JSON.parse(localStorage.getItem("reservationDraft") || "{}");
    setForm(f => ({
      ...f,
      ...Object.fromEntries(
        Object.entries(draft).filter(([k]) =>
          ["from","to","people","segment","transfer","date","time","pnr"].includes(k)
        )
      )
    }));
  }, []);
  useEffect(() => {
    localStorage.setItem("reservationDraft", JSON.stringify(form));
  }, [form]);

  useEffect(() => {
    // Takvim renk fix
    const style = document.createElement("style");
    style.innerHTML = `
      .react-datepicker,
      .react-datepicker__month-container {
        background: #19160a !important;
        color: #ffeec2 !important;
        border-radius: 18px !important;
        border: 1px solid #bfa658 !important;
        font-family: Quicksand, sans-serif !important;
      }
      .react-datepicker__header {
        background: #232016 !important;
        border-bottom: 1px solid #bfa658 !important;
      }
      .react-datepicker__day--selected,
      .react-datepicker__day--keyboard-selected {
        background: #bfa658 !important;
        color: #232016 !important;
      }
      .react-datepicker__day {
        border-radius: 6px !important;
      }
      .react-datepicker__day:hover {
        background: #ffeec2 !important;
        color: #19160a !important;
      }
      .react-datepicker__current-month,
      .react-datepicker__day-name {
        color: #ffeec2 !important;
      }
      .react-datepicker__day--disabled {
        color: #444 !important;
        background: #222 !important;
      }
      .react-datepicker__triangle { display: none; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Segment bazlı araçlar
  const availableVehicles = vehicles.filter(
    v =>
      (!form.segment || normalize(v.segment) === normalize(form.segment)) &&
      (!form.transfer || (v.transferTypes || []).map(normalize).includes(normalize(form.transfer))) &&
      (!form.people || (v.max || 1) >= form.people)
  );
  const vehicleNames = availableVehicles.map(v => v.label).join(" / ");

  // PNR alanı
  const showPnr = form.transfer.includes("Havalimanı") || isAirport(form.from) || isAirport(form.to);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }
  function handleDate(d) {
    setForm(f => ({ ...f, date: d ? d.toISOString().split("T")[0] : "" }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    router.push(
      `/rezervasyon?${[
        `from=${encodeURIComponent(form.from)}`,
        `to=${encodeURIComponent(form.to)}`,
        `segment=${encodeURIComponent(form.segment)}`,
        `people=${encodeURIComponent(form.people)}`,
        `transfer=${encodeURIComponent(form.transfer)}`,
        `date=${form.date}`,
        `time=${encodeURIComponent(form.time)}`,
        showPnr ? `pnr=${encodeURIComponent(form.pnr)}` : ""
      ].filter(Boolean).join("&")}`
    );
  }

  return (
    <div className="flex items-center justify-center w-full" style={{minHeight:600}}>
      <section
        className="w-full max-w-4xl mx-auto rounded-3xl shadow-2xl bg-[#19160a] border border-[#bfa658] px-6 md:px-12 py-14 mt-0 mb-0"
        style={{height:600, display:"flex", flexDirection:"column", justifyContent:"flex-start"}}
      >
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#bfa658] tracking-tight mb-8 text-center font-quicksand shadow-none" style={{marginTop:0}}>
          VIP Rezervasyon Formu
        </h1>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
          autoComplete="off"
        >
          {/* Nereden - Nereye */}
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Nereden?</label>
            <input
              name="from"
              value={form.from}
              onChange={handleChange}
              className="w-full py-3 px-4 rounded-xl bg-black/50 text-[#ffeec2] border border-[#bfa658] text-base"
              placeholder="Nereden? (İl/İlçe/Mahalle/Havalimanı)"
              required
            />
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Nereye?</label>
            <input
              name="to"
              value={form.to}
              onChange={handleChange}
              className="w-full py-3 px-4 rounded-xl bg-black/50 text-[#ffeec2] border border-[#bfa658] text-base"
              placeholder="Nereye? (İl/İlçe/Mahalle/Havalimanı)"
              required
            />
          </div>
          {/* Kişi ve Segment */}
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Kişi Sayısı</label>
            <select
              name="people"
              value={form.people}
              onChange={handleChange}
              className="w-full py-3 rounded-xl bg-black/50 text-[#ffeec2] border border-[#bfa658]"
            >
              {Array.from({length:8},(_,i)=>i+1).map(val=>(
                <option key={val} value={val}>{val}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Segment</label>
            <select
              name="segment"
              value={form.segment}
              onChange={handleChange}
              className="w-full py-3 rounded-xl bg-black/50 text-[#ffeec2] border border-[#bfa658]"
            >
              <option value="">Seçiniz</option>
              <option value="Ekonomik">Ekonomik</option>
              <option value="Lüks">Lüks</option>
              <option value="Prime+">Prime+</option>
            </select>
          </div>
          {/* Transfer Türü ve Araçlar */}
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Transfer Türü</label>
            <select
              name="transfer"
              value={form.transfer}
              onChange={handleChange}
              className="w-full py-3 rounded-xl bg-black/50 text-[#ffeec2] border border-[#bfa658]"
            >
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
            <label className="font-bold text-[#bfa658] mb-1 block">Araçlar</label>
            <input
              className="w-full py-3 px-4 rounded-xl bg-black/50 text-[#ffeec2] border border-[#bfa658] text-base"
              value={form.segment ? (vehicleNames || "Seçtiğiniz segmentte araç yok") : ""}
              disabled
              placeholder="Araçlar"
            />
            <div className="text-xs text-[#ffeec2] mt-1">
              Seçtiğiniz segmentteki araçlardan biri atanacaktır.
            </div>
          </div>
          {/* Tarih ve Saat */}
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Tarih</label>
            <DatePicker
              selected={form.date ? new Date(form.date) : null}
              onChange={d => handleDate(d)}
              dateFormat="dd.MM.yyyy"
              minDate={new Date()}
              placeholderText="Tarih Seç"
              className="w-full py-3 px-4 rounded-xl bg-black/50 text-[#ffeec2] border border-[#bfa658] text-base"
              calendarClassName="bg-black text-white"
              popperPlacement="bottom"
              style={{minWidth:100}}
              required
            />
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Saat</label>
            <select
              name="time"
              value={form.time}
              onChange={handleChange}
              className="w-full py-3 rounded-xl bg-black/50 text-[#ffeec2] border border-[#bfa658]"
              required
            >
              <option value="">Saat seç</option>
              {saatler.map((saat,i)=><option key={i} value={saat}>{saat}</option>)}
            </select>
          </div>
          {/* PNR */}
          {showPnr && (
            <div className="md:col-span-2">
              <label className="font-bold text-[#bfa658] mb-1 block">PNR / Uçuş Kodu</label>
              <input
                name="pnr"
                value={form.pnr}
                onChange={handleChange}
                className="w-full py-3 px-4 rounded-xl bg-black/50 text-[#ffeec2] border border-[#bfa658]"
                placeholder="Uçuş Rezervasyon Kodu (PNR)"
              />
            </div>
          )}
          {/* --- BUTONU KOLONDA YAP VE TAŞMAZ! --- */}
          <div className="md:col-span-2 flex justify-end mt-6">
            <button
              type="submit"
              className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold py-4 px-12 rounded-xl text-xl shadow hover:scale-105 transition"
              style={{width:"60%",minWidth:180,maxWidth:400}}
            >
              Transfer Planla
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
