"use client";
import { useState } from "react";
import { FaWhatsapp, FaInstagram, FaPhone, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { SiX } from "react-icons/si";

const SOCIALS = [
  { icon: <FaWhatsapp size={22} />, name: "WhatsApp", url: "https://wa.me/905395267569" },
  { icon: <FaInstagram size={22} />, name: "Instagram", url: "https://instagram.com/yolcutransferi" },
  { icon: <SiX size={22} />, name: "X (Twitter)", url: "https://x.com/yolcutransferi" }
];

const ILETISIM_NEDENLERI = [
  "Transfer Rezervasyonu",
  "Bilgi Talebi",
  "Teklif Almak İstiyorum",
  "İş Birliği / Ortaklık",
  "Geri Bildirim / Öneri",
  "Şikayet Bildirimi",
  "Diğer"
];

export default function Iletisim() {
  const [form, setForm] = useState({
    ad: "",
    soyad: "",
    telefon: "",
    email: "",
    neden: "",
    mesaj: ""
  });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "telefon") {
      let val = e.target.value.replace(/\D/g, "");
      if (val.startsWith("0")) val = val.substring(1);
      if (val.length > 10) val = val.slice(0, 10);
      setForm({ ...form, [e.target.name]: val });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 7000);
    setForm({
      ad: "",
      soyad: "",
      telefon: "",
      email: "",
      neden: "",
      mesaj: ""
    });
  };

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-150px)] py-10 px-2 bg-black">
      <h1 className="text-4xl font-bold mb-8 text-center tracking-tight">İletişim</h1>
      <div className="w-full max-w-5xl bg-black/70 rounded-2xl border-4 border-[#bfa658] shadow-2xl px-8 py-10 flex flex-col gap-10">
        {/* İçerik: Bilgiler ve Form Yan Yana */}
        <div className="flex flex-col md:flex-row gap-8 w-full">
          {/* İletişim Bilgileri */}
          <div className="flex-1 flex flex-col gap-6 justify-between">
            <div className="space-y-4 text-base">
              <div className="flex items-center gap-3"><FaPhone /> <span className="font-medium">+90 539 526 75 69</span></div>
              <div className="flex items-center gap-3"><FaEnvelope /> <span className="font-medium">info@yolcutransferi.com</span></div>
              <div className="flex items-center gap-3"><FaMapMarkerAlt /> <span className="font-medium">Ümraniye, İnkılap Mah. Plazalar Bölgesi, İstanbul</span></div>
            </div>
            <div className="flex flex-row gap-6 pt-2">
              {SOCIALS.map(({ icon, url, name }) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center p-3 rounded-full bg-black/70 hover:bg-[#bfa658] transition shadow"
                  title={name}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
          {/* Form */}
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-4">
            <div className="flex gap-3">
              <input
                type="text"
                name="ad"
                placeholder="Adınız"
                value={form.ad}
                onChange={handleChange}
                className="p-3 rounded border bg-black/60 w-1/2 focus:outline-[#bfa658]"
                required
              />
              <input
                type="text"
                name="soyad"
                placeholder="Soyadınız"
                value={form.soyad}
                onChange={handleChange}
                className="p-3 rounded border bg-black/60 w-1/2 focus:outline-[#bfa658]"
                required
              />
            </div>
            <div className="flex gap-3">
              <div className="flex items-center w-1/2">
                <span className="bg-black/40 rounded-l px-3 py-2 border border-r-0 border-gray-700 text-gray-400 select-none">0</span>
                <input
                  type="tel"
                  name="telefon"
                  placeholder="5xx xxx xx xx"
                  value={form.telefon}
                  onChange={handleChange}
                  className="p-3 rounded-r border-l-0 border bg-black/60 w-full focus:outline-[#bfa658]"
                  maxLength={10}
                  pattern="\d{10}"
                  required
                />
              </div>
              <input
                type="email"
                name="email"
                placeholder="E-posta Adresiniz"
                value={form.email}
                onChange={handleChange}
                className="p-3 rounded border bg-black/60 w-1/2 focus:outline-[#bfa658]"
                required
              />
            </div>
            <select
              name="neden"
              value={form.neden}
              onChange={handleChange}
              className="p-3 rounded border bg-black/60 focus:outline-[#bfa658]"
              required
            >
              <option value="">Lütfen iletişim nedeninizi seçiniz</option>
              {ILETISIM_NEDENLERI.map((neden) => (
                <option key={neden} value={neden}>{neden}</option>
              ))}
            </select>
            <textarea
              name="mesaj"
              placeholder="Mesajınız"
              value={form.mesaj}
              onChange={handleChange}
              className="p-3 rounded border bg-black/60 focus:outline-[#bfa658]"
              required
            />
            <button
              type="submit"
              className="bg-[#bfa658] text-black font-bold py-3 px-8 rounded-2xl text-lg hover:bg-yellow-600 transition shadow mt-2"
            >
              Mesajı Gönder
            </button>
            {sent && (
              <div className="mt-2 p-3 rounded-xl text-base font-semibold bg-green-700/90 text-white text-center border-2 border-green-500 shadow">
                Mesajınız alınmıştır. İlgili ekiplerimiz en kısa sürede sizinle iletişime geçecektir.
              </div>
            )}
          </form>
        </div>
        {/* Harita en altta, tam genişlikte */}
        <div className="flex justify-center">
          <div style={{ width: "100%", maxWidth: "900px", height: "200px" }} className="rounded-xl overflow-hidden border-2 border-[#bfa658] shadow-lg">
            <iframe
              title="YolcuTransferi.com Konum"
              width="100%"
              height="200"
              frameBorder="0"
              style={{ border: 0 }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24081.262044014337!2d29.0903967!3d41.0319917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac9cd7fd8d1ef%3A0xf6f8ff72b91ed1db!2sENPLAZA!5e0!3m2!1str!2str!4v1717693329992!5m2!1str!2str"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
