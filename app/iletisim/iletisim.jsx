"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaWhatsapp, FaInstagram, FaPhone, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { SiX } from "react-icons/si";

const SOCIALS = [
  { icon: <FaWhatsapp size={20} />, name: "WhatsApp", url: "https://wa.me/905395267569" },
  { icon: <FaInstagram size={20} />, name: "Instagram", url: "https://instagram.com/yolcutransferi" },
  { icon: <SiX size={20} />, name: "X (Twitter)", url: "https://x.com/yolcutransferi" }
];

const ILETISIM_NEDENLERI = [
  "Bilgi Talebi",
  "Transfer Rezervasyonu",
  "Teklif Almak İstiyorum",
  "İş Birliği / Ortaklık",
  "Geri Bildirim / Öneri",
  "Şikayet Bildirimi",
  "Diğer"
];

const ILETISIM_TERCIHLERI = [
  {
    label: "WhatsApp",
    value: "WhatsApp",
    icon: <FaWhatsapp className="text-[#25d366] mr-1" size={16} />
  },
  {
    label: "Telefon",
    value: "Telefon",
    icon: <FaPhone className="text-[#51A5FB] mr-1" size={16} />
  },
  {
    label: "E-posta",
    value: "E-posta",
    icon: <FaEnvelope className="text-[#FFA500] mr-1" size={16} />
  }
];

const messages = [
  "YolcuTransferi.com olarak, deneyimli ekibimizle sizlere lüks ve güvenli bir yolculuk deneyimi yaşatmak için buradayız.",
  "Her türlü talebiniz, rezervasyonunuz veya iş birliği teklifiniz için bizimle çekinmeden iletişime geçebilirsiniz.",
  "İhtiyacınıza en uygun çözümü, en hızlı şekilde sunabilmek için profesyonel destek ekibimiz sizinle.",
  "VIP standartlarında hizmet için, bize ulaşmanız yeterli. Sizi dinlemek ve en iyi deneyimi yaşatmak önceliğimiz.",
  "Bize ilettiğiniz her mesaj titizlikle incelenir; ilgili ekibimiz en kısa sürede size dönüş sağlar.",
  "YolcuTransferi.com — Sadece bir transfer değil, bir ayrıcalık..."
];

export default function Iletisim() {
  const [form, setForm] = useState({
    ad: "",
    soyad: "",
    telefon: "",
    email: "",
    neden: ILETISIM_NEDENLERI[0],
    mesaj: "",
    iletisimTercihi: ILETISIM_TERCIHLERI[0].value
  });
  const [sent, setSent] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % (messages.length + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "telefon") {
      let val = e.target.value.replace(/\D/g, "");
      if (val.length > 11) val = val.slice(0, 11);
      setForm({ ...form, [e.target.name]: val });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleIletisimTercihiChange = (value) => {
    setForm({ ...form, iletisimTercihi: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Backend'de "form.iletisimTercihi" alanı da mail içeriğine eklensin!
    setSent(true);
    setTimeout(() => setSent(false), 7000);
    setForm({
      ad: "",
      soyad: "",
      telefon: "",
      email: "",
      neden: ILETISIM_NEDENLERI[0],
      mesaj: "",
      iletisimTercihi: ILETISIM_TERCIHLERI[0].value
    });
  };

  return (
    <div className="w-full flex justify-center bg-black min-h-[calc(100vh-150px)] py-6 px-2">
      <div className="w-full max-w-4xl bg-[#191714]/90 border-[3px] border-[#bfa658] rounded-2xl shadow-2xl px-2 sm:px-6 py-6 flex flex-col gap-6">
        {/* Bilboard EN ÜSTTE */}
        <div className="w-full flex justify-center mb-2">
          <div
            className="relative w-full max-w-3xl bg-black border border-[#bfa658] rounded-xl shadow flex items-center justify-center transition-all duration-500 overflow-hidden"
            style={{
              height: 78,
              minHeight: 78,
              padding: "0 12px"
            }}
          >
            {activeIndex < messages.length ? (
              <span
                className="text-base sm:text-lg text-gray-100 text-center font-medium animate-fade-in leading-normal truncate-message"
                style={{
                  whiteSpace: "normal",
                  width: "100%",
                  wordBreak: "break-word",
                  fontSize: "1.08rem",
                  lineHeight: "1.4"
                }}
              >
                {messages[activeIndex]}
              </span>
            ) : (
              <span className="flex items-center justify-center w-full h-full py-1 animate-fade-in">
                <Image
                  src="/LOGO.png"
                  alt="YolcuTransferi.com"
                  width={320}
                  height={100}
                  priority
                  className="mx-auto max-h-24 object-contain"
                  style={{ width: "auto", maxWidth: "90%", height: "60px" }}
                />
              </span>
            )}
          </div>
        </div>
        {/* Form */}
        <div className="flex flex-col md:flex-row gap-6">
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-3">
            <div className="flex gap-2">
              <input
                type="text"
                name="ad"
                placeholder="Ad"
                value={form.ad}
                onChange={handleChange}
                className="p-3 rounded-lg border border-[#423c1c] bg-[#181611] text-white w-1/2 focus:border-[#bfa658] transition text-base"
                required
              />
              <input
                type="text"
                name="soyad"
                placeholder="Soyad"
                value={form.soyad}
                onChange={handleChange}
                className="p-3 rounded-lg border border-[#423c1c] bg-[#181611] text-white w-1/2 focus:border-[#bfa658] transition text-base"
                required
              />
            </div>
            <div className="flex gap-2">
              <input
                type="tel"
                name="telefon"
                placeholder="05xx xxx xx xx"
                value={form.telefon}
                onChange={handleChange}
                className="p-3 rounded-lg border border-[#423c1c] bg-[#181611] text-white w-1/2 focus:border-[#bfa658] transition text-base"
                maxLength={11}
                pattern="\d{11}"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="E-posta"
                value={form.email}
                onChange={handleChange}
                className="p-3 rounded-lg border border-[#423c1c] bg-[#181611] text-white w-1/2 focus:border-[#bfa658] transition text-base"
                required
              />
            </div>
            <select
              name="neden"
              value={form.neden}
              onChange={handleChange}
              className="p-3 rounded-lg border border-[#423c1c] bg-[#181611] text-white focus:border-[#bfa658] transition text-base"
              required
            >
              {ILETISIM_NEDENLERI.map((neden, i) => (
                <option key={neden} value={neden}>{neden}</option>
              ))}
            </select>

            {/* Size nasıl ulaşalım kutucukları */}
            <div className="mt-2 flex flex-col items-start gap-1">
              <span className="text-sm text-gray-400 font-semibold mb-1 ml-1">Size nasıl ulaşalım?</span>
              <div className="flex flex-row gap-2 w-full">
                {ILETISIM_TERCIHLERI.map((item) => (
                  <label
                    key={item.value}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full border text-xs cursor-pointer
                    transition select-none shadow-sm
                    ${form.iletisimTercihi === item.value
                      ? "bg-[#bfa658] border-[#bfa658] text-black"
                      : "bg-[#191714] border-[#423c1c] text-gray-300 hover:border-[#bfa658]"
                    }`}
                    style={{ minWidth: 70, justifyContent: 'center' }}
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
            </div>

            <textarea
              name="mesaj"
              placeholder="Mesajınız"
              value={form.mesaj}
              onChange={handleChange}
              className="p-3 rounded-lg border border-[#423c1c] bg-[#181611] text-white focus:border-[#bfa658] transition text-base"
              required
              rows={3}
            />

            <button
              type="submit"
              className="bg-[#bfa658] text-black font-bold py-3 px-8 rounded-xl text-lg hover:bg-yellow-600 transition shadow mt-2 w-full"
            >
              Mesajı Gönder
            </button>
            {sent && (
              <div className="mt-2 p-3 rounded-lg text-base font-semibold bg-green-700/90 text-white text-center border-2 border-green-400 shadow">
                Mesajınız alınmıştır. İlgili ekiplerimiz en kısa sürede sizinle iletişime geçecektir.
              </div>
            )}
          </form>
          {/* Adres & Sosyal Medya */}
          <div className="flex-1 flex flex-col justify-start gap-4 mt-2">
            <div className="space-y-2 text-base text-gray-100">
              <div className="flex items-center gap-2"><FaPhone /> <span>+90 539 526 75 69</span></div>
              <div className="flex items-center gap-2"><FaEnvelope /> <span>info@yolcutransferi.com</span></div>
            </div>
            {/* Sosyal medya butonları burada! */}
            <div className="flex flex-row gap-4 pt-1">
              {SOCIALS.map(({ icon, url, name }) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-[#23201a] hover:bg-[#bfa658] text-white hover:text-black transition"
                  title={name}
                >
                  {icon}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-2 text-base text-gray-100 pt-2">
              <FaMapMarkerAlt /> <span>Ümraniye, İnkılap Mah. Plazalar Bölgesi, İstanbul</span>
            </div>
          </div>
        </div>
        {/* Harita */}
        <div className="w-full flex justify-center">
          <div style={{ width: "100%", maxWidth: "900px", height: "210px" }} className="rounded-xl overflow-hidden border-2 border-[#bfa658] shadow-lg bg-[#23201a]">
            <iframe
              title="YolcuTransferi.com Konum"
              width="100%"
              height="210"
              frameBorder="0"
              style={{ border: 0 }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24081.262044014337!2d29.0903967!3d41.0319917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac9cd7fd8d1ef%3A0xf6f8ff72b91ed1db!2sENPLAZA!5e0!3m2!1str!2str!4v1717693329992!5m2!1str!2str"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
      {/* Animasyon için gerekli CSS */}
      <style>{`
        .animate-fade-in {
          animation: fadeIn .7s;
        }
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(15px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        .truncate-message {
          display: block;
          width: 100%;
          overflow-wrap: break-word;
          white-space: normal;
          line-height: 1.4;
          font-size: 1rem;
        }
        @media (max-width: 640px) {
          .truncate-message {
            font-size: 0.97rem;
          }
          .max-w-3xl {
            max-width: 99vw !important;
          }
        }
      `}</style>
    </div>
  );
}
