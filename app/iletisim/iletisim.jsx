"use client";
import { useState } from "react";
import { FaWhatsapp, FaInstagram, FaPhone, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { SiX } from "react-icons/si";

const SOCIALS = [
  {
    icon: <FaWhatsapp size={22} />,
    name: "WhatsApp",
    url: "https://wa.me/905395267569"
  },
  {
    icon: <FaInstagram size={22} />,
    name: "Instagram",
    url: "https://instagram.com/yolcutransferi"
  },
  {
    icon: <SiX size={22} />,
    name: "X (Twitter)",
    url: "https://x.com/yolcutransferi"
  }
];

const ILETISIM_NEDENLERI = [
  "Rezervasyon",
  "Öneri",
  "Şikayet",
  "İş Birliği",
  "Fiyat Teklifi",
  "Genel Bilgi",
  "Diğer"
];

export default function Iletisim() {
  const [form, setForm] = useState({
    ad: "",
    telefon: "",
    email: "",
    neden: "",
    mesaj: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Mesajınız başarıyla gönderildi!");
    setForm({
      ad: "",
      telefon: "",
      email: "",
      neden: "",
      mesaj: ""
    });
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">İletişim</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-black/40 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            name="ad"
            placeholder="Adınız Soyadınız"
            value={form.ad}
            onChange={handleChange}
            className="p-3 rounded border bg-black/60 w-full"
            required
          />
          <input
            type="tel"
            name="telefon"
            placeholder="Telefon Numaranız"
            value={form.telefon}
            onChange={handleChange}
            className="p-3 rounded border bg-black/60 w-full"
            required
          />
        </div>
        <input
          type="email"
          name="email"
          placeholder="E-posta Adresiniz"
          value={form.email}
          onChange={handleChange}
          className="p-3 rounded border bg-black/60"
          required
        />
        <select
          name="neden"
          value={form.neden}
          onChange={handleChange}
          className="p-3 rounded border bg-black/60"
          required
        >
          <option value="">İletişim Nedeni Seçin</option>
          {ILETISIM_NEDENLERI.map((neden) => (
            <option key={neden} value={neden}>{neden}</option>
          ))}
        </select>
        <textarea
          name="mesaj"
          placeholder="Mesajınız"
          value={form.mesaj}
          onChange={handleChange}
          className="p-3 rounded border bg-black/60"
          required
        />
        <button
          type="submit"
          className="bg-yellow-500 text-black font-bold py-3 px-8 rounded-2xl text-lg hover:bg-yellow-600 transition shadow"
        >
          Mesajı Gönder
        </button>
      </form>
      <div className="flex flex-col md:flex-row items-center justify-between mt-10 gap-6">
        <div className="space-y-3 text-base">
          <div className="flex items-center gap-3">
            <FaPhone /> <span className="font-medium">+90 539 526 75 69</span>
          </div>
          <div className="flex items-center gap-3">
            <FaEnvelope /> <span className="font-medium">info@yolcutransferi.com</span>
          </div>
          <div className="flex items-center gap-3">
            <FaMapMarkerAlt /> <span className="font-medium">İstanbul, Türkiye</span>
          </div>
        </div>
        <div className="flex flex-row gap-6">
          {SOCIALS.map(({ icon, url, name }) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-3 rounded-full bg-black/60 hover:bg-yellow-500 transition shadow"
              title={name}
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
