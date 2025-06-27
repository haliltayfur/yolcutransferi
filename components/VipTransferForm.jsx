// PATH: /components/VipTransferForm.jsx

"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Demo araç verisi
const vehicles = [
  { id: 1, label: "Mercedes Vito", segment: "Lüks", max: 5, transferTypes: ["VIP Havalimanı Transferi", "Şehirler Arası Transfer"] },
  { id: 2, label: "Sprinter", segment: "Prime+", max: 10, transferTypes: ["VIP Havalimanı Transferi", "Kurumsal Etkinlik"] },
  { id: 3, label: "Passat", segment: "Ekonomik", max: 4, transferTypes: ["Şehirler Arası Transfer"] },
  { id: 4, label: "BMW 7", segment: "Lüks", max: 3, transferTypes: ["VIP Havalimanı Transferi"] },
  { id: 5, label: "Ford Tourneo", segment: "Ekonomik", max: 5, transferTypes: ["VIP Havalimanı Transferi", "Şehirler Arası Transfer"] }
];

const saatler = Array.from({ length: 24 * 2 }, (_, i) => {
  const h = String(Math.floor(i / 2)).padStart(2, "0");
  const m = i % 2 === 0 ? "00" : "30";
  return `${h}:${m}`;
});

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

function getAvailableVehicles(segment) {
  return vehicles.filter(v => !segment || v.segment === segment);
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

  const [showPnr, setShowPnr] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // Takvim için tema düzeltme
    const style = document.createElement("style");
    style.innerHTML = `
      .react-datepicker, .react-datepicker__month-container {
        background: #fff !important;
        color: #222 !important;
        border-radius: 16px !important;
      }
      .react-datepicker__header {
        background: #fff !important;
        border-bottom: 1px solid #bfa658 !important;
        color: #111 !important;
      }
      .react-datepicker__day,
      .react-datepicker__day--selected,
      .react-datepicker__day--keyboard-selected {
        background: #fff !important;
        color: #19160a !important;
        border-radius: 7px !important;
      }
      .react-datepicker__day:hover {
        background: #ffeec2 !important;
        color: #19160a !important;
      }
      .react-datepicker__current-month,
      .react-datepicker__day-name {
        color: #19160a !important;
      }
      .react-datepicker__triangle { display: none; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  useEffect(() => {
    setShowPnr(form.transfer === "VIP Havalimanı Transferi");
    if (form.transfer !== "VIP Havalimanı Transferi") {
      setForm(f => ({ ...f, pnr: "" }));
    }
  }, [form.transfer]);

  const inputClass = "w-full py-2 px-3 rounded-lg border border-[#bfa658] bg-black/65 text-[#ffeec2] text-base focus:outline-none focus:border-[#ffeec2] font-quicksand shadow-none";
  const labelClass = "font-bold text-[#bfa658] mb-1 block font-quicksand text-[15px]";

  function handleSubmit(e) {
    e.preventDefault();
    const params = new URLSearchParams({
      from: form.from,
      to: form.to,
      segment: form.segment,
      people: form.people,
      transfer: form.transfer,
      date: form.date,
      time: form.time,
      pnr: form.pnr,
      vehicleId: form.vehicleId ?? "",
    });
    router.push(`/rezervasyon?${params.toString()}`);
  }

  const vehiclesInSegment = getAvailableVehicles(form.segment);

  return (
    <form
      className="w-full h-full flex flex-col gap-2 justify-between"
      style={{
        minWidth: 800,
        maxWidth: 800,
        height: 600,
        minHeight: 600,
        boxSizing: "border-box",
        padding: "28px 24px 20px 24px",
      }}
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <h2 className="text-3xl font-extrabold text-[#bfa658] tracking-tight mb-4 text-center font-quicksand">
        VIP Rezervasyon Formu
      </h2>
      <div className="flex-1 flex flex-col gap-3 justify-start">
        <div className="grid grid-cols-2 gap-4">
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
        <div className="grid grid-cols-2 gap-4">
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
        <div>
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
        {/* Araçlar */}
        <div>
          <label className={labelClass}>Araçlar</label>
          {form.segment && vehiclesInSegment.length > 0 ? (
            <div>
              <div className="grid grid-cols-2 gap-2">
                {vehiclesInSegment.map((v) => (
                  <button
                    type="button"
                    key={v.id}
                    onClick={() => setForm(f => ({ ...f, vehicleId: v.id }))}
                    className={`flex flex-col items-center justify-center border rounded-lg p-2 bg-black/70 transition-all
                      ${form.vehicleId === v.id
                        ? "border-[#ffeec2] bg-[#bfa658]/40 scale-105 shadow"
                        : "border-[#bfa658] hover:border-[#ffeec2] hover:bg-[#bfa658]/20"}
                    `}
                    style={{
                      minHeight: 56,
                    }}
                  >
                    <span className="font-semibold text-[#ffeec2] text-[15px]">{v.label}</span>
                    <span className="text-xs text-[#bfa658] mt-1">{v.segment}</span>
                    <span className="text-xs text-[#ffeec2] mt-1">{v.max} Kişi</span>
                  </button>
                ))}
              </div>
              <div className="text-xs text-[#ffeec2] mt-2 ml-1 opacity-90">
                Seçtiğiniz segmentteki araçlardan biri size rezerve edilecektir.
              </div>
            </div>
          ) : (
            <div className="w-full text-[#ffeec2] text-sm py-1">
              {form.segment ? "Seçili kriterlere uygun araç bulunamadı." : "Önce araç sınıfı seçiniz."}
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
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
              calendarClassName="bg-white text-black"
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
        {/* PNR sadece havalimanı transferinde gösterilir */}
        {showPnr && (
          <div style={{ maxWidth: 330 }}>
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
        )}
      </div>
      <div className="flex justify-end mt-3">
        <button
          type="submit"
          className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold py-3 px-10 rounded-xl text-lg shadow hover:scale-105 transition w-full"
          style={{ maxWidth: 350 }}
        >
          Transfer Planla
        </button>
      </div>
    </form>
  );
}

// PATH: /components/VipTransferForm.jsx
