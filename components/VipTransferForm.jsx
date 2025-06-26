"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Demo araç verisi (Gerçek araç datası vehicles.js’den çekilecek)
const vehicles = [
  { id: 1, label: "Mercedes Vito", segment: "Lüks", max: 5, transferTypes: ["VIP Havalimanı Transferi", "Şehirler Arası Transfer"] },
  { id: 2, label: "Sprinter", segment: "Prime+", max: 10, transferTypes: ["VIP Havalimanı Transferi", "Kurumsal Etkinlik"] },
  { id: 3, label: "Passat", segment: "Ekonomik", max: 4, transferTypes: ["Şehirler Arası Transfer"] },
];

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

// Filtreleme fonksiyonu
function getAvailableVehicles(segment, transfer, people) {
  return vehicles.filter(
    v =>
      (!segment || v.segment === segment) &&
      (!transfer || (v.transferTypes || []).includes(transfer)) &&
      (!people || (v.max || 1) >= people)
  );
}

export default function VipTransferPage() {
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
  const router = useRouter();

  // Datepicker tema fix (gold/siyah)
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

  // Submit – parametrelerle başka sayfaya yönlendir!
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-2">
      <div className="flex flex-col md:flex-row items-center gap-10 w-full max-w-6xl mx-auto">
        {/* FORM */}
        <form
          className="w-full max-w-[430px] md:max-w-[500px] bg-[#19160a] border border-[#bfa658] rounded-3xl shadow-2xl px-6 md:px-10 py-10 flex flex-col gap-2"
          style={{ fontFamily: "Quicksand, sans-serif" }}
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#bfa658] tracking-tight mb-5 text-center font-quicksand">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
              className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold py-3 px-10 rounded-xl text-lg shadow hover:scale-105 transition w-full md:w-[70%]"
              style={{ maxWidth: "340px" }}
            >
              Transfer Planla
            </button>
          </div>
        </form>
        {/* SAĞDA GÖRSEL */}
        <div className="hidden md:block">
          <img
            src="/lady.jpg" // Burayı kendi görsel path'inle değiştir!
            alt="VIP Transfer"
            className="rounded-2xl object-cover w-[320px] h-[420px] shadow-xl"
            style={{ background: "#222" }}
          />
        </div>
      </div>
    </div>
  );
}
