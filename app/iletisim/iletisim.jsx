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
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-10 text-center">İletişim</h1>
      <div className="flex flex-col md:flex-row gap-12">
        {/* Sol: İletişim Bilgileri */}
        <div className="w-full md:w-1/2 flex flex-col justify-between">
          <div className="space-y-6 text-base bg-black/40 rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-3">
              <FaPhone /> <span className="font-medium">+90 539 526 75 69</span>
            </div>
            <div className="flex items-center gap-3">
              <FaEnvelope /> <span className="font-medium">info@yolcutransferi.com</span>
            </div>
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt /> <span className="font-medium">Ümraniye, İnkılap Mah. Plazalar Bölgesi, İstanbul</span>
            </div>
            <div className="flex flex-row gap-5 pt-3">
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
          {/* Google Maps */}
          <div className="rounded-2xl overflow-hidden shadow-lg h-[240px]">
            <iframe
              title="YolcuTransferi.com Konum"
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0 }}
              src="https://www.google.com/maps?q=İnkılap%20Mahallesi,%20Ümraniye%20Plazalar%20Bölgesi,%20İstanbul&output=embed"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        {/* Sağ: Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-black/40 rounded-2xl p-6 shadow-xl w-full md:w-1/2">
          <div className="flex fl
