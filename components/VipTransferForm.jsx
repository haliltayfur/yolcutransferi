"use client";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { vehicles } from "../data/vehicleList";

const saatler = [
  "00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30",
  "04:00", "04:30", "05:00", "05:30", "06:00", "06:30", "07:00", "07:30",
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
  "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"
];

const segmentOptions = [
  { value: "", label: "Araç Sınıfı Seçin" },
  { value: "Ekonomik", label: "Ekonomik (Standart Konfor)" },
  { value: "Lüks", label: "Lüks (Premium Sınıf)" },
  { value: "Prime+", label: "Prime+ (Ultra Lüks)" },
];

const transferOptions = [
  { value: "", label: "Transfer Türü Seç" },
  { value: "VIP Havalimanı Transferi", label: "VIP Havalimanı Transferi" },
  { value: "Şehirler Arası Transfer", label: "Şehirler Arası Transfer" },
  { value: "Kurumsal Etkinlik", label: "Kurumsal Etkinlik" },
  { value: "Özel Etkinlik", label: "Özel Etkinlik" },
  { value: "Tur & Gezi", label: "Tur & Gezi" },
  { value: "Toplu Transfer", label: "Toplu Transfer" },
  { value: "Düğün vb Organizasyonlar", label: "Düğün vb Organizasyonlar" },
];

function getAvailableVehicles(segment, transfer, people) {
  return vehicles.filter(
    v =>
      (!segment || v.segment === segment) &&
      (!transfer || (v.transferTypes || []).includes(transfer)) &&
      (!people || (v.max || 1) >= people)
  );
}

export default function VipTransferForm() {
  const [form, setForm] = useState({
    from: "",
    to: "",
    people: 1,
    segment: "",
    transfer: "",
    date: "",
    time: "",
    pnr: "",
    vehicleId: null,
  });

  const availableVehicles = getAvailableVehicles(form.segment, form.transfer, form.people);

  // Takvim styling fix
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .react-datepicker,
      .react-datepicker__month-container {
        background: #19160a !important;
        color: #ffeec2 !important;
        border-radius: 20px !important;
      }
      .react-datepicker__header {
        background: #19160a !important;
        border-bottom: 1px solid #bfa658 !important;
      }
      .react-datepicker__day--selected,
      .react-datepicker__day--keyboard-selected {
        background: #bfa658 !important;
        color: #19160a !important;
      }
      .react-datepicker__day {
        border-radius: 8px !important;
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
    return () => { document.head.removeChild(style); };
  }, []);

  const inputClass = "w-full py-3 px-4 rounded-xl border border-[#bfa658] bg-black/50 text-[#ffeec2] text-base focus:outline-none focus:border-[#ffeec2] font-quicksand shadow-none";
  const labelClass = "font-bold text-[#bfa658] mb-1 block font-quicksand";

  return (
    <div className="w-full flex flex-col justify-center items-center py-8 md:py-16 bg-black">
      <form
        className="w-full max-w-[430px] md:max-w-[700px] mx-auto rounded-3xl bg-[#19160a] border border-[#bfa658] px-4 md:px-10 py-8 md:py-12 flex flex-col gap-2 shadow-xl"
        style={{
          fontFamily: "Quicksand, sans-serif"
        }}
        autoComplete="off"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#bfa658] tracking-tight mb-4 text-center font-quicksand">
          VIP Rezervasyon Formu
        </h2>
        {/* Nereden/Nereye */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
          <div>
            <label className={labelClass}>Nereden?</label>
            <input
              type="text"
              name="from"
              value={form.from}
              onChange={e => setForm(f => ({ ...f, from: e.target.value }))}
              className={inputClass}
              placeholder="İlçe/Mahalle"
              required
            />
          </div>
          <div>
            <label className={labelClass}>Nereye?</label>
            <input
              type="text"
              name="to"
              value={form.to}
              onChange={e => setForm(f => ({ ...f, to: e.target.value }))}
              className={inputClass}
              placeholder="İlçe/Mahalle"
              required
            />
          </div>
        </div>
        {/* Araç Sınıfı / Kişi Sayısı */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
          <div>
            <label className={labelClass}>Araç Sınıfı</label>
            <select
              name="segment"
              value={form.segment}
              onChange={e => setForm(f => ({ ...f, segment: e.target.value, vehicleId: null }))}
              className={inputClass}
              required
            >
              {segmentOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Kişi Sayısı</label>
            <select
              name="people"
              value={form.people}
              onChange={e => setForm(f => ({ ...f, people: Number(e.target.value), vehicleId: null }))}
              className={inputClass}
              required
            >
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
          </div>
        </div>
        {/* Transfer Türü */}
        <div className="mb-2">
          <label className={labelClass}>Transfer Türü</label>
          <select
            name="transfer"
            value={form.transfer}
            onChange={e => setForm(f => ({ ...f, transfer: e.target.value, vehicleId: null }))}
            className={inputClass}
            required
          >
            {transferOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        {/* Araçlar - Kart Grid */}
        <div className="mb-2">
          <label className={labelClass}>Araçlar</label>
          {form.segment && availableVehicles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {availableVehicles.map((v) => (
                <button
                  type="button"
                  key={v.id}
                  onClick={() => setForm(f => ({ ...f, vehicleId: v.id }))}
                  className={`flex flex-col items-center justify-center border rounded-xl p-3 bg-black/60 transition-all
                    ${form.vehicleId === v.id
                      ? "border-[#ffeec2] bg-[#bfa658]/30 scale-105 shadow-lg"
                      : "border-[#bfa658] hover:border-[#ffeec2] hover:bg-[#bfa658]/20"}
                  `}
                  style={{
                    minHeight: 90,
                  }}
                >
                  <span className="font-semibold text-[#ffeec2] text-base">{v.label}</span>
                  <span className="text-xs text-[#bfa658] mt-1">{v.segment}</span>
                  <span className="text-xs text-[#ffeec2] mt-1">{v.max} Kişi</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="w-full text-[#ffeec2] text-sm py-2">
              {form.segment ? "Seçili kriterlere uygun araç bulunamadı." : "Önce araç sınıfı seçiniz."}
            </div>
          )}
        </div>
        {/* Tarih / Saat */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
          <div>
            <label className={labelClass}>Tarih</label>
            <DatePicker
              selected={form.date ? new Date(form.date) : null}
              onChange={date =>
                setForm(f => ({
                  ...f,
                  date: date ? date.toISOString().split("T")[0] : ""
                }))
              }
              dateFormat="dd.MM.yyyy"
              minDate={new Date()}
              placeholderText="Tarih Seç"
              className={inputClass}
              calendarClassName="bg-black text-[#ffeec2]"
              popperPlacement="bottom"
              required
            />
          </div>
          <div>
            <label className={labelClass}>Saat</label>
            <select
              name="time"
              value={form.time}
              onChange={e => setForm(f => ({ ...f, time: e.target.value }))}
              className={inputClass}
              required
            >
              <option value="">Saat seç</option>
              {saatler.map(saat => (
                <option key={saat} value={saat}>{saat}</option>
              ))}
            </select>
          </div>
        </div>
        {/* PNR */}
        <div className="mb-1" style={{ maxWidth: 320 }}>
          <label className={labelClass}>PNR / Uçuş Kodu</label>
          <input
            name="pnr"
            value={form.pnr}
            onChange={e => setForm(f => ({ ...f, pnr: e.target.value }))}
            className={inputClass}
            placeholder="Uçuş Rezervasyon Kodu (PNR)"
            maxLength={20}
          />
        </div>
        {/* Buton */}
        <div className="flex justify-end mt-5">
          <button
            type="submit"
            className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold py-3 px-10 rounded-xl text-lg shadow hover:scale-105 transition w-full md:w-[60%]"
            style={{ maxWidth: "340px" }}
          >
            Transfer Planla
          </button>
        </div>
      </form>
    </div>
  );
}
