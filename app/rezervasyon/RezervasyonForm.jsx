"use client";
import { useState } from "react";

// Demo ekstralar
const extralar = [
  { key: "bebek_koltugu", label: "Bebek Koltuğu" },
  { key: "wi-fi", label: "Wi-Fi" },
  { key: "ikram", label: "İkram" }
];

export default function RezervasyonForm() {
  const [form, setForm] = useState({
    from: "",
    to: "",
    people: 1,
    segment: "",
    transfer: "",
    vehicle: "",
    date: "",
    time: "",
    name: "",
    surname: "",
    tc: "",
    phone: "",
    note: "",
    pnr: "",
    ekstralar: []
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox" && name === "ekstralar") {
      setForm((f) => ({
        ...f,
        ekstralar: checked
          ? [...f.ekstralar, value]
          : f.ekstralar.filter((k) => k !== value)
      }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    alert("Form başarıyla çalışıyor!");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-black via-[#19160a] to-[#302811] pt-10 pb-4">
      <section className="w-full max-w-4xl mx-auto rounded-3xl shadow-2xl bg-[#19160a] border border-[#bfa658] px-6 md:px-12 py-14 mt-8 mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#bfa658] tracking-tight mb-8 text-center font-quicksand shadow-none">
          VIP Rezervasyon Formu
        </h1>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
          autoComplete="off"
        >
          {/* FORM ALANLARI */}
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Nereden?</label>
            <input
              name="from"
              value={form.from}
              onChange={handleChange}
              className="input w-full py-3 px-4 rounded-xl bg-black/50 text-[#ffeec2] border border-[#bfa658] text-base"
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
              className="input w-full py-3 px-4 rounded-xl bg-black/50 text-[#ffeec2] border border-[#bfa658] text-base"
              placeholder="Nereye? (İl/İlçe/Mahalle/Havalimanı)"
              required
            />
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Kişi Sayısı</label>
            <select
              name="people"
              value={form.people}
              onChange={handleChange}
              className="input w-full py-3 rounded-xl bg-black/50 text-[#ffeec2] border border-[#bfa658]"
            >
              {[...Array(8)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Segment</label>
            <select
              name="segment"
              value={form.segment}
              onChange={handleChange}
              className="input w-full py-3 rounded-xl bg-black/50 text-[#ffeec2] border border-[#bfa658]"
            >
              <option value="">Seçiniz</option>
              <option value="Ekonomik">Ekonomik</option>
              <option value="Lüks">Lüks</option>
              <option value="Prime+">Prime+</option>
            </select>
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Transfer Türü</label>
            <select
              name="transfer"
              value={form.transfer}
              onChange={handleChange}
              className="input w-full py-3 rounded-xl bg-black/50 text-[#ffeec2] border border-[#bfa658]"
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
            <label className="font-bold text-[#bfa658] mb-1 block">Araç</label>
            <input
              name="vehicle"
              value={form.vehicle}
              onChange={handleChange}
              className="input w-full py-3 px-4 rounded-xl bg-black/50 text-[#ffeec2] border border-[#bfa658] text-base"
              placeholder="Araç"
            />
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Tarih</label>
            <input
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              className="input w-full py-3 px-4 rounded-xl bg-black/50 text-[#ffeec2] border border-[#bfa658]"
              required
            />
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Saat</label>
            <input
              name="time"
              type="time"
              value={form.time}
              onChange={handleChange}
              className="input w-full py-3 px-4 rounded-xl bg-black/50 text-[#ffeec2] border border-[#bfa658]"
              required
            />
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Ad</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="input w-full py-3 px-4 rounded-xl bg-black/50 text-[#ffeec2] border border-[#bfa658] text-base"
              placeholder="Ad"
              required
            />
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Soyad</label>
            <input
              name="surname"
              value={form.surname}
              onChange={handleChange}
              className="input w-full py-3 px-4 rounded-xl bg-black/50 text-[#ffeec2] border border-[#bfa658] text-base"
              placeholder="Soyad"
              required
            />
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">T.C. Kimlik No</label>
            <input
              name="tc"
              value={form.tc}
              onChange={handleChange}
              maxLength={11}
              className="input w-full py-3 px-4 rounded-xl bg-black/50 text-[#ffeec2] border border-[#bfa658] text-base"
              placeholder="T.C. Kimlik No"
              required
            />
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Telefon</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              maxLength={11}
              className="input w-full py-3 px-4 rounded-xl bg-black/50 text-[#ffeec2] border border-[#bfa658] text-base"
              placeholder="Telefon"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="font-bold text-[#bfa658] mb-1 block">Ek Not</label>
            <textarea
              name="note"
              value={form.note}
              onChange={handleChange}
              className="input w-full bg-black/50 text-[#ffeec2] border border-[#bfa658] rounded-xl"
              rows={2}
              placeholder="Eklemek istediğiniz bir not var mı?"
            />
          </div>
          <div className="md:col-span-2">
            <label className="font-bold text-[#bfa658] mb-1 block">PNR / Uçuş Kodu</label>
            <input
              name="pnr"
              value={form.pnr}
              onChange={handleChange}
              className="input w-full py-3 px-4 rounded-xl bg-black/50 text-[#ffeec2] border border-[#bfa658]"
              placeholder="Uçuş Rezervasyon Kodu (PNR)"
            />
          </div>
          {/* Ekstralar Alanı */}
          <div className="md:col-span-2">
            <label className="font-bold text-[#bfa658] mb-1 block">Ekstralar</label>
            <div className="flex flex-wrap gap-4">
              {extralar.map((extra) => (
                <label key={extra.key} className="flex items-center gap-2 bg-black/40 rounded-xl px-4 py-2 border border-[#bfa658]">
                  <input
                    type="checkbox"
                    name="ekstralar"
                    value={extra.key}
                    checked={form.ekstralar.includes(extra.key)}
                    onChange={handleChange}
                    className="accent-[#bfa658] w-5 h-5"
                  />
                  <span className="text-[#ffeec2] text-base">{extra.label}</span>
                </label>
              ))}
            </div>
          </div>
          {/* --- BUTONU KOLONDA YAP VE TAŞMAZ! --- */}
          <div className="md:col-span-2 flex justify-end mt-6">
            <button
              type="submit"
              className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold py-4 px-12 rounded-xl text-xl shadow hover:scale-105 transition"
            >
              Rezervasyonu Tamamla
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
