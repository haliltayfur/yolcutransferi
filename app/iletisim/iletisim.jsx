"use client";
import { useState } from "react";
import { FaWhatsapp, FaInstagram, FaPhone, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";

const gold = "#6e5a1e";

export default function Iletisim() {
  const [form, setForm] = useState({
    ad: "",
    telefon: "",
    email: "",
    konu: "Bilgi Talebi",
    mesaj: "",
  });
  const [ok, setOk] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("/api/iletisim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Sunucu hatası");

      setOk(true);
      setForm({ ad: "", telefon: "", email: "", konu: "Bilgi Talebi", mesaj: "" });
      setTimeout(() => setOk(false), 5000);
    } catch (err) {
      setError("Mesaj gönderilemedi. Lütfen daha sonra tekrar deneyin.");
    }
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-14">
      <h2 className="text-4xl font-extrabold mb-8 text-center" style={{ color: gold }}>
        İletişim
      </h2>

      <div className="flex flex-col md:flex-row gap-8 bg-black/80 border-4 rounded-xl shadow-lg p-7 mb-10" style={{ borderColor: gold }}>
        {/* Sol sütun: İletişim ve sosyal medya */}
        <div className="flex-1 space-y-5 text-gray-200">
          <div className="flex items-center gap-3 text-lg">
            <FaPhone style={{ color: gold }} /> <span>+90 539 526 75 69</span>
          </div>
          <div className="flex items-center gap-3 text-lg">
            <FaEnvelope style={{ color: gold }} /> <span>info@yolcutransferi.com</span>
          </div>
          <div className="flex items-center gap-3 text-lg">
            <FaMapMarkerAlt style={{ color: gold }} />
            <span>Ümraniye Plazalar Bölgesi, İstanbul, Türkiye</span>
          </div>
          <a
            href="https://wa.me/905395267569"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-lg hover:underline"
          >
            <FaWhatsapp className="text-green-400" />
            <span>Whatsapp üzerinden 7/24 destek</span>
          </a>
          <a
            href="https://www.instagram.com/yolcutransferi/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-lg hover:underline"
          >
            <FaInstagram className="text-pink-500" />
            <span>Instagram: @yolcutransferi</span>
          </a>
          <a
            href="https://x.com/yolcutransferi"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-lg hover:underline"
          >
            <span className="text-blue-400 font-bold text-lg">X: @yolcutransferi</span>
          </a>
        </div>

        {/* Sağ sütun: Form */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-4">
          <input name="ad" value={form.ad} onChange={handleChange} required placeholder="Adınız"
            className="rounded px-4 py-2 bg-black/70 border" style={{ borderColor: gold, color: "#fff" }} />
          <input name="telefon" value={form.telefon} onChange={handleChange} required placeholder="Telefon Numaranız"
            className="rounded px-4 py-2 bg-black/70 border" style={{ borderColor: gold, color: "#fff" }} />
          <input name="email" value={form.email} onChange={handleChange} required type="email" placeholder="E-posta"
            className="rounded px-4 py-2 bg-black/70 border" style={{ borderColor: gold, color: "#fff" }} />
          <select name="konu" value={form.konu} onChange={handleChange}
            className="rounded px-4 py-2 bg-black/70 border" style={{ borderColor: gold, color: "#fff" }}>
            <option>Bilgi Talebi</option>
            <option>Şikayet</option>
            <option>Rezervasyon</option>
            <option>İş Birliği</option>
            <option>Diğer</option>
          </select>
          <textarea name="mesaj" value={form.mesaj} onChange={handleChange} required placeholder="Mesajınız" rows={4}
            className="rounded px-4 py-2 bg-black/70 border" style={{ borderColor: gold, color: "#fff" }} />
          <button type="submit"
            className="bg-[#6e5a1e] text-white font-semibold py-2 px-8 rounded-xl text-lg shadow hover:bg-[#8c7327] transition">
            Gönder
          </button>
          {ok && <div className="text-green-400 mt-2">Mesajınız iletildi!</div>}
          {error && <div className="text-red-400 mt-2">{error}</div>}
        </form>
      </div>

      {/* Harita */}
      <div className="w-full h-64 rounded-xl overflow-hidden shadow-lg">
        <iframe
          title="Harita"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.5201021622075!2d29.1251234!3d41.0183012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab71d9dfb2d4f%3A0x11cbd6a5c0d16a67!2sYolcuTransferi.com!5e0!3m2!1str!2str!4v1717260141741!5m2!1str!2str"
        />
      </div>
    </main>
  );
}
