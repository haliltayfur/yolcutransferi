"use client";
import { useState } from "react";
import { FaWhatsapp, FaInstagram, FaPhone, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";

export default function Iletisim() {
  const [form, setForm] = useState({
    ad: "",
    email: "",
    mesaj: "",
  });

  // Buraya form gönderme fonksiyonun gelecek
  // Şimdilik örnek olarak alert veriyorum:
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Mesajınız alındı!");
    setForm({ ad: "", email: "", mesaj: "" });
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">İletişim</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Adınız"
          value={form.ad}
          onChange={e => setForm({ ...form, ad: e.target.value })}
          className="p-3 rounded border bg-black/40"
          required
        />
        <input
          type="email"
          placeholder="E-posta"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          className="p-3 rounded border bg-black/40"
          required
        />
        <textarea
          placeholder="Mesajınız"
          value={form.mesaj}
          onChange={e => setForm({ ...form, mesaj: e.target.value })}
          className="p-3 rounded border bg-black/40"
          required
        />
        <button
          type="submit"
          className="bg-yellow-500 text-black font-bold py-2 px-6 rounded hover:bg-yellow-600 transition"
        >
          Gönder
        </button>
      </form>
      <div className="mt-8 space-y-2">
        <div className="flex items-center gap-3"><FaPhone /> <span>+90 539 526 75 69</span></div>
        <div className="flex items-center gap-3"><FaEnvelope /> <span>info@yolcutransferi.com</span></div>
        <div className="flex items-center gap-3"><FaMapMarkerAlt /> <span>İstanbul, Türkiye</span></div>
        <div className="flex items-center gap-3"><FaWhatsapp /> <span>WhatsApp Destek</span></div>
        <div className="flex items-center gap-3"><FaInstagram /> <span>Instagram: @yolcutransferi</span></div>
      </div>
    </div>
  );
}
