"use client";
import { useState } from "react";
import { FaWhatsapp, FaInstagram, FaPhone, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";

export default function Iletisim() {
  const [form, setForm] = useState({ ad: "", email: "", mesaj: "" });
  const [ok, setOk] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Burada gerçek e-mail entegrasyonu için backend gerekecek; örnek olarak local çalışır.
  const handleSubmit = (e) => {
    e.preventDefault();
    setOk(true);
    setForm({ ad: "", email: "", mesaj: "" });
  };

  return (
    <main className="max-w-2xl mx-auto px-4 py-14">
      <h2 className="text-3xl md:text-4xl font-extrabold text-gold mb-7 text-center">
        İletişim
      </h2>
      <div className="flex flex-col md:flex-row gap-8 bg-black/70 border border-gold/20 rounded-xl shadow-lg p-7 mb-10">
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-3 text-lg text-gray-200">
            <FaPhone className="text-gold" /> <span>+90 539 526 75 69</span>
          </div>
          <div className="flex items-center gap-3 text-lg text-gray-200">
            <FaEnvelope className="text-gold" /> <span>info@yolcutransferi.com</span>
          </div>
          <div className="flex items-center gap-3 text-lg text-gray-200">
            <FaMapMarkerAlt className="text-gold" />
            <span>Ümraniye Plazalar Bölgesi, İstanbul, Türkiye</span>
          </div>
          <div className="flex items-center gap-3 text-lg text-gray-200">
            <FaWhatsapp className="text-green-400" />
            <span>Whatsapp üzerinden 7/24 destek</span>
          </div>
          <div className="flex items-center gap-3 text-lg text-gray-200">
            <FaInstagram className="text-pink-500" />
            <span>Instagram hesabımız çok yakında!</span>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-3">
          <input
            required
            name="ad"
            value={form.ad}
            onChange={handleChange}
            placeholder="Adınız"
            className="rounded px-4 py-2 bg-black/70 border border-gold/20 text-white"
          />
          <input
            required
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="E-posta"
            type="email"
            className="rounded px-4 py-2 bg-black/70 border border-gold/20 text-white"
          />
          <textarea
            required
            name="mesaj"
            value={form.mesaj}
            onChange={handleChange}
            placeholder="Mesajınız"
            rows={4}
            className="rounded px-4 py-2 bg-black/70 border border-gold/20 text-white"
          />
          <button
            type="submit"
            className="bg-gold text-black font-semibold py-2 px-8 rounded-xl text-lg shadow hover:bg-white transition"
          >
            Gönder
          </button>
          {ok && (
            <div className="text-green-400 mt-2">Mesajınız iletildi! En kısa sürede dönüş yapılacaktır.</div>
          )}
        </form>
      </div>
      <div className="w-full h-64 bg-gray-900 rounded-xl overflow-hidden">
        {/* Buraya harita entegrasyonu eklenebilir. Şimdilik placeholder. */}
        <iframe
          title="Harita"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          src="https://www.openstreetmap.org/export/embed.html?bbox=29.120,40.990,29.160,41.010&layer=mapnik"
        />
      </div>
      <div className="mt-7 text-center text-xs text-gray-400">
        Tüm verileriniz gizli tutulur, üçüncü kişilerle paylaşılmaz.
      </div>
    </main>
  );
}
