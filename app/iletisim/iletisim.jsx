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
            className={`p-3 rounded-lg border flex-1 bg-[#181611] text-[#e7e7e7] border-[#423c1c] focus:border-[#bfa658] transiti
