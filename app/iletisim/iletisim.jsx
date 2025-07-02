"use client";
import React, { useState } from "react";
import { FaWhatsapp, FaPhone, FaEnvelope } from "react-icons/fa";

const ILETISIM_NEDENLERI = [
  "Bilgi Talebi", "Transfer Rezervasyonu", "Teklif Almak İstiyorum",
  "İş Birliği / Ortaklık", "Geri Bildirim / Öneri", "Şikayet Bildirimi", "Diğer"
];
const ILETISIM_TERCIHLERI = [
  { label: "WhatsApp", value: "WhatsApp", icon: <FaWhatsapp className="text-[#25d366]" size={16} /> },
  { label: "Telefon", value: "Telefon", icon: <FaPhone className="text-[#51A5FB]" size={16} /> },
  { label: "E-posta", value: "E-posta", icon: <FaEnvelope className="text-[#FFA500]" size={16} /> }
];

export default function IletisimForm() {
  const [form, setForm] = useState({
    ad: "", soyad: "", telefon: "", email: "",
    neden: ILETISIM_NEDENLERI[0], mesaj: "", iletisimTercihi: "",
    kvkkOnay: false
  });
  const [errors, setErrors] = useState({});
  const [buttonStatus, setButtonStatus] = useState("normal");
  const [buttonMsg, setButtonMsg] = useState("Mesajı Gönder");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    setErrors({ ...errors, [name]: undefined });
  };

  const handleIletisimTercihiChange = (value) => {
    setForm({ ...form, iletisimTercihi: value });
    setErrors({ ...errors, iletisimTercihi: undefined });
  };

  function resetButton() {
    setTimeout(() => { setButtonMsg("Mesajı Gönder"); setButtonStatus("normal"); }, 4000);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!form.ad || form.ad.length < 3) newErrors.ad = "Adınız en az 3 harf olmalı.";
    if (!form.soyad || form.soyad.length < 2) newErrors.soyad = "Soyadınız en az 2 harf olmalı.";
    if (!/^05\d{9}$/.test(form.telefon)) newErrors.telefon = "Telefon hatalı. 05xx xxx xx xx";
    if (!form.email || !form.email.includes("@")) newErrors.email = "Geçersiz e-posta.";
    if (!form.mesaj || form.mesaj.length < 10) newErrors.mesaj = "Mesaj en az 10 karakter olmalı.";
    if (!form.iletisimTercihi) newErrors.iletisimTercihi = "İletişim tercihi zorunlu.";
    if (!form.kvkkOnay) newErrors.kvkkOnay = "Koşulları kabul etmelisiniz.";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setButtonStatus("error"); setButtonMsg("Eksik alanlar var"); resetButton(); return;
    }

    setButtonStatus("loading"); setButtonMsg("Gönderiliyor...");
    try {
      await fetch("/api/iletisim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      setButtonStatus("success"); setButtonMsg("Teşekkürler, mesajınız alındı."); resetButton();
      setForm({ ad: "", soyad: "", telefon: "", email: "", neden: ILETISIM_NEDENLERI[0], mesaj: "", iletisimTercihi: "", kvkkOnay: false });
    } catch {
      setButtonStatus("error"); setButtonMsg("Sunucu hatası, tekrar deneyin."); resetButton();
    }
  };

  return (
    <section className="w-full max-w-4xl mx-auto border border-[#bfa658] rounded-3xl shadow-2xl px-6 md:px-12 py-14 bg-gradient-to-br from-black via-[#19160a] to-[#302811] mt-16 mb-10">
      <h1 className="text-3xl md:text-4xl font-extrabold text-[#bfa658] tracking-tight mb-1 text-center">İletişim</h1>
      <div className="text-lg text-[#ffeec2] font-semibold text-center mb-8">7/24 VIP Müşteri Hattı • Kişiye özel ayrıcalık</div>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3 bg-black/70 rounded-2xl p-6 border border-[#bfa658]/60 shadow">
        <div className="flex gap-2">
          <input type="text" name="ad" placeholder="Ad" value={form.ad} onChange={handleChange}
            className={`p-3 rounded-lg border flex-1 bg-[#181611] text-[#e7e7e7] border-[#423c1c] focus:border-[#bfa658] transition`} minLength={3} required />
          <input type="text" name="soyad" placeholder="Soyad" value={form.soyad} onChange={handleChange}
            className={`p-3 rounded-lg border flex-1 bg-[#181611] text-[#e7e7e7] border-[#423c1c] focus:border-[#bfa658] transition`} minLength={2} required />
        </div>
        <div className="flex gap-2">
          <input type="tel" name="telefon" placeholder="05xx xxx xx xx"
            value={form.telefon} onChange={handleChange}
            className={`p-3 rounded-lg border flex-1 bg-[#181611] text-[#e7e7e7] border-[#423c1c] focus:border-[#bfa658] transition`} maxLength={11} required />
          <input type="email" name="email" placeholder="E-posta"
            value={form.email} onChange={handleChange}
            className={`p-3 rounded-lg border flex-1 bg-[#181611] text-[#e7e7e7] border-[#423c1c] focus:border-[#bfa658] transition`} required />
        </div>
        <select name="neden" value={form.neden} onChange={handleChange}
          className="p-3 rounded-lg border border-[#423c1c] bg-[#181611] text-[#e7e7e7] focus:border-[#bfa658] transition text-base" required>
          {ILETISIM_NEDENLERI.map((neden, i) => (
            <option key={neden} value={neden}>{neden}</option>
          ))}
        </select>
        <textarea name="mesaj" placeholder="Mesajınız" value={form.mesaj} onChange={handleChange}
          className={`p-3 rounded-lg border bg-[#181611] text-[#e7e7e7] border-[#423c1c] focus:border-[#bfa658] transition`} minLength={10} required rows={3} />
        <span className="text-sm text-gray-300 font-bold ml-1 mt-2">İletişim tercihinizi seçiniz</span>
        <div className="flex flex-row gap-3 w-full mb-2 flex-wrap">
          {ILETISIM_TERCIHLERI.map((item) => (
            <label
              key={item.value}
              className={`flex items-center gap-1 px-4 py-1 rounded-full border font-bold text-xs cursor-pointer
              select-none shadow-md transition
              ${form.iletisimTercihi === item.value
                ? "bg-black border-[#FFD700] text-[#FFD700]"
                : "bg-black border-[#bfa658] text-white hover:bg-gray-900 hover:border-gray-400"}`}
              style={{ minWidth: 90, justifyContent: 'center' }}
            >
              <input
                type="radio"
                name="iletisimTercihi"
                value={item.value}
                checked={form.iletisimTercihi === item.value}
                onChange={() => handleIletisimTercihiChange(item.value)}
                className="hidden"
              />
              {item.icon}
              {item.label}
            </label>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-1">
          <input
            type="checkbox"
            name="kvkkOnay"
            checked={form.kvkkOnay}
            onChange={handleChange}
            required
            className="accent-[#FFD700] w-4 h-4"
          />
          <span className="text-xs text-gray-200">
            <a
              href="/kvkk"
              target="_blank"
              className="underline text-[#FFD700] hover:text-[#bfa658] cursor-pointer"
            >
              YolcuTransferi.com politika ve koşullarını
            </a>{" "}
            okudum, kabul ediyorum.
          </span>
        </div>
        <button
          type="submit"
          className={`font-bold py-3 px-8 rounded-xl text-lg mt-2 w-full shadow transition text-black
            ${buttonStatus === "success"
              ? "bg-green-500"
              : buttonStatus === "error"
                ? "bg-red-600"
                : "bg-[#bfa658] hover:bg-yellow-600"}`}
          style={{ minHeight: 50, minWidth: 180 }}
          disabled={buttonStatus === "loading"}
        >
          {buttonMsg}
        </button>
        {Object.keys(errors).length > 0 && (
          <div className="mt-2 flex flex-col gap-1">
            {Object.values(errors).map((err, i) => (
              <span key={i} className="text-xs text-red-400 pl-2 font-bold">{err}</span>
            ))}
          </div>
        )}
      </form>
    </section>
  );
}
