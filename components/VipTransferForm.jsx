"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// ... AutoCompleteInput ve diğer sabit fonksiyonlar yukarıdakiyle aynı (kırpmadım, yukarıdan kopyalayabilirsin) ...

export default function VipTransferForm() {
  const router = useRouter();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [people, setPeople] = useState("");
  const [segment, setSegment] = useState("");
  const [transfer, setTransfer] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [pnr, setPnr] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  function handleSubmit(e) {
    e.preventDefault();
    const err = {};
    if (!from) err.from = "Nereden?";
    if (!to) err.to = "Nereye?";
    if (!people) err.people = "Kişi sayısı?";
    if (!segment) err.segment = "Segment?";
    if (!transfer) err.transfer = "Transfer türü?";
    if (!date) err.date = "Tarih?";
    if (!time) err.time = "Saat?";
    setFieldErrors(err);
    if (Object.keys(err).length > 0) return;
    const params = new URLSearchParams({
      from, to, people, segment, transfer, date, time, pnr
    });
    router.push(`/rezervasyon?${params.toString()}`);
  }
  const showPNR = transfer === "VIP Havalimanı Transferi" || isAirportRelated(from) || isAirportRelated(to);

  return (
    <form
      onSubmit={handleSubmit}
      className={`
        bg-[#19160a] border border-[#bfa658] rounded-3xl shadow-2xl
        mt-10 ml-0 md:ml-14
        py-8 px-6 md:px-12
        w-[98vw] max-w-4xl
      `}
      style={{ minWidth: 340 }}
    >
      <div className="mb-8 text-2xl font-extrabold text-[#bfa658] text-left">
        VIP Transfer Rezervasyonu
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        <div>
          <label className="block font-bold text-[#bfa658] mb-1">Nereden?</label>
          <AutoCompleteInput value={from} onChange={setFrom} placeholder="Nereden? İl / İlçe / Mahalle / Havalimanı" />
          {fieldErrors.from && <div className="text-red-400 text-xs mt-1">{fieldErrors.from}</div>}
        </div>
        <div>
          <label className="block font-bold text-[#bfa658] mb-1">Nereye?</label>
          <AutoCompleteInput value={to} onChange={setTo} placeholder="Nereye? İl / İlçe / Mahalle / Havalimanı" />
          {fieldErrors.to && <div className="text-red-400 text-xs mt-1">{fieldErrors.to}</div>}
        </div>
        <div>
          <label className="block font-bold text-[#bfa658] mb-1">Kişi Sayısı</label>
          <select
            className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl py-4 px-4 text-base"
            value={people}
            onChange={e => setPeople(e.target.value)}
            style={{ height: 56 }}
          >
            <option value="">Seçiniz</option>
            {Array.from({ length: 24 }, (_, i) => i + 1).map(val => (
              <option key={val} value={val}>{val}</option>
            ))}
          </select>
          {fieldErrors.people && <div className="text-red-400 text-xs mt-1">{fieldErrors.people}</div>}
        </div>
        <div>
          <label className="block font-bold text-[#bfa658] mb-1">Segment</label>
          <select
            className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl py-4 px-4 text-base"
            value={segment}
            onChange={e => setSegment(e.target.value)}
            style={{ height: 56 }}
          >
            <option value="">Seçiniz</option>
            {segmentOptions.map(opt => (
              <option key={opt.key} value={opt.label}>{opt.label}</option>
            ))}
          </select>
          {fieldErrors.segment && <div className="text-red-400 text-xs mt-1">{fieldErrors.segment}</div>}
        </div>
        <div>
          <label className="block font-bold text-[#bfa658] mb-1">Transfer Türü</label>
          <select
            className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl py-4 px-4 text-base"
            value={transfer}
            onChange={e => setTransfer(e.target.value)}
            style={{ height: 56 }}
          >
            <option value="">Seçiniz</option>
            {allTransfers.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          {fieldErrors.transfer && <div className="text-red-400 text-xs mt-1">{fieldErrors.transfer}</div>}
        </div>
        {/* Tarih & Saat yan yana */}
        <div className="flex flex-row gap-3 col-span-2">
          <div className="flex-1">
            <label className="block font-bold text-[#bfa658] mb-1">Tarih</label>
            <input
              type="date"
              className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl py-4 px-4 text-base"
              value={date}
              onChange={e => setDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              style={{ height: 56 }}
            />
            {fieldErrors.date && <div className="text-red-400 text-xs mt-1">{fieldErrors.date}</div>}
          </div>
          <div className="flex-1">
            <label className="block font-bold text-[#bfa658] mb-1">Saat</label>
            <select
              className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl py-4 px-4 text-base"
              value={time}
              onChange={e => setTime(e.target.value)}
              style={{ height: 56 }}
            >
              <option value="">Seçiniz</option>
              {saatler.map(saat => (
                <option key={saat} value={saat}>{saat}</option>
              ))}
            </select>
            {fieldErrors.time && <div className="text-red-400 text-xs mt-1">{fieldErrors.time}</div>}
          </div>
        </div>
        {/* PNR kutucuğu full row */}
        {showPNR && (
          <div className="col-span-2">
            <label className="block font-bold text-[#bfa658] mb-1">PNR/Uçuş Kodu</label>
            <input
              className="input w-full bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl py-4 px-4 text-base"
              value={pnr}
              onChange={e => setPnr(e.target.value)}
              placeholder="Uçuş rezervasyon kodu (varsa)"
              style={{ height: 56 }}
            />
          </div>
        )}
      </div>
      <button
        type="submit"
        className="w-full mt-8 bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold py-4 px-12 rounded-xl text-xl shadow hover:scale-105 transition"
      >
        Devam Et
      </button>
    </form>
  );
}

// AutoCompleteInput, segmentOptions, allTransfers, saatler ve isAirportRelated fonksiyonlarını yukarıdaki örneklerden ekleyebilirsin.
