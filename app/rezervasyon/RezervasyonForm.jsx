"use client";
import { useState } from "react";

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
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
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
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Nereden?</label>
            <input
              name="from"
              value={form.from}
              onChange={handleChange}
              className="input w-full py-3 px-4 rounded-xl bg-[#19160a] text-lg text-[#ffeec2] border border-[#bfa658]"
              placeholder="Nereden?"
            />
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Nereye?</label>
            <input
              name="to"
              value={form.to}
              onChange={handleChange}
              className="input w-full py-3 px-4 rounded-xl bg-[#19160a] text-lg text-[#ffeec2] border border-[#bfa658]"
              placeholder="Nereye?"
            />
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Kişi Sayısı</label>
            <select
              name="people"
              value={form.people}
              onChange={handleChange}
              className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <option key={i} value={i}>
                  {i}
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
              className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
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
              className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
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
              className="input w-full py-3 px-4 rounded-xl bg-[#19160a] text-lg text-[#ffeec2] border border-[#bfa658]"
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
              className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
            />
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Saat</label>
            <input
              name="time"
              type="time"
              value={form.time}
              onChange={handleChange}
              className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
            />
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Ad</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="input w-full py-3 px-4 rounded-xl bg-[#19160a] text-lg text-[#ffeec2] border border-[#bfa658]"
              placeholder="Ad"
            />
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Soyad</label>
            <input
              name="surname"
              value={form.surname}
              onChange={handleChange}
              className="input w-full py-3 px-4 rounded-xl bg-[#19160a] text-lg text-[#ffeec2] border border-[#bfa658]"
              placeholder="Soyad"
            />
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">T.C. Kimlik No</label>
            <input
              name="tc"
              value={form.tc}
              onChange={handleChange}
              className="input w-full py-3 px-4 rounded-xl bg-[#19160a] text-lg text-[#ffeec2] border border-[#bfa658]"
              maxLength={11}
              placeholder="T.C. Kimlik No"
            />
          </div>
          <div>
            <label className="font-bold text-[#bfa658] mb-1 block">Telefon</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="input w-full py-3 px-4 rounded-xl bg-[#19160a] text-lg text-[#ffeec2] border border-[#bfa658]"
              maxLength={11}
              placeholder="Telefon"
            />
          </div>
          <div className="md:col-span-2">
            <label className="font-bold text-[#bfa658] mb-1 block">Ek Not</label>
            <textarea
              name="note"
              value={form.note}
              onChange={handleChange}
              className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl"
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
              className="input w-full py-3 px-4 rounded-xl bg-[#19160a] text-lg text-[#ffeec2] border border-[#bfa658]"
              placeholder="Uçuş Rezervasyon Kodu (PNR)"
            />
          </div>
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
