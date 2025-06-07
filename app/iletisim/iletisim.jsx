"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaWhatsapp, FaInstagram, FaPhone, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { SiX } from "react-icons/si";

// ... (Kısa tutmak için: useRateLimit, formatDuration, getBlockedWords, isRealEmail, isRealName, isRealPhone, isRealMsg, parseMessage)
// Buradaki fonksiyonları doğrudan eski koddan al ve aşağıya yerleştir. Aynen bırakabilirsin.

////////////////////////////////////////////////////////////////
// --- BURADAN İTİBAREN YENİ TASARIM --- ///////////////////////
////////////////////////////////////////////////////////////////

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
  { label: "WhatsApp", value: "WhatsApp", icon: <FaWhatsapp className="text-[#25d366] mr-1" size={16} /> },
  { label: "Telefon", value: "Telefon", icon: <FaPhone className="text-[#51A5FB] mr-1" size={16} /> },
  { label: "E-posta", value: "E-posta", icon: <FaEnvelope className="text-[#FFA500] mr-1" size={16} /> }
];

const messages = [
  "YolcuTransferi.com olarak, alanında uzman ve profesyonel ekibimizle ihtiyacınıza en uygun çözümleri sunuyoruz.",
  "Talep, rezervasyon ve iş ortaklığı süreçlerinde çözüm odaklı destek sağlıyoruz.",
  "Her mesajınız, deneyimli ekiplerimiz tarafından hızla değerlendirilir ve çözüme ulaştırılır.",
  "YolcuTransferi.com Sadece bir transfer değil, size özel bir ayrıcalık yaşatır..."
];

export default function Iletisim() {
  // Buraya eski kodundaki state/fonksiyonları al ve kullan.
  // (useRateLimit, formatDuration, getBlockedWords, ... fonksiyonları olduğu gibi)

  //--- Aşağıdan itibaren yeni ve sadeleştirilmiş kurumsal şık tasarım ---
  const blockedWords = getBlockedWords();
  const [form, setForm] = useState({
    ad: "",
    soyad: "",
    telefon: "",
    email: "",
    neden: ILETISIM_NEDENLERI[0],
    mesaj: "",
    iletisimTercihi: ILETISIM_TERCIHLERI[2].value,
    honeypot: ""
  });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [sendInfo, setSendInfo] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [blocked, kaydet, remaining] = useRateLimit();
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % (messages.length));
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const f = document.querySelector('input[autoComplete="given-name"]');
    if (f) f.focus();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: undefined });
  };

  const handleIletisimTercihiChange = (value) => {
    setForm({ ...form, iletisimTercihi: value });
  };

  const adValid = isRealName(form.ad);
  const soyadValid = isRealName(form.soyad);
  const phoneValid = isRealPhone(form.telefon);
  const emailValid = isRealEmail(form.email);
  const msgValid = isRealMsg(form.mesaj);

  const censored = parseMessage(form.mesaj, blockedWords);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    let newErrors = {};
    setSendInfo("");
    if (blocked) newErrors.global = "Güvenlik nedeniyle üst üste gönderimlerde kısa bir bekleme uygulanmaktadır.";
    if (form.honeypot && form.honeypot.length > 0) return;
    if (!adValid) newErrors.ad = "Lütfen adınızı en az 3 karakter olacak şekilde doldurun.";
    if (!soyadValid) newErrors.soyad = "Lütfen soyadınızı en az 3 karakter olacak şekilde doldurun.";
    if (!phoneValid) newErrors.telefon = "Telefon numarası hatalı (05xx xxx xx xx).";
    if (!emailValid) newErrors.email = "Lütfen geçerli bir e-posta adresi giriniz.";
    if (!msgValid) newErrors.mesaj = "Mesajınızı daha açık ve anlamlı yazınız.";
    if (censored.hasBlocked) newErrors.mesaj = "Mesajınızda uygunsuz veya argo kelime var. Lütfen değiştirin.";
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setSubmitError("");
      return;
    }
    let infoMsg = "";
    if (form.iletisimTercihi === "E-posta") {
      infoMsg = "Teşekkürler, mesajınız bize ulaştı. Size <b>info@yolcutransferi.com</b> adresinden dönüş yapacağız.";
    } else {
      infoMsg = `Teşekkürler, mesajınız bize ulaştı. Size <b>0539 526 75 69</b> ${form.iletisimTercihi.toLowerCase()} hattımızdan ulaşacağız.`;
    }
    setSendInfo(infoMsg);
    setSent(true);
    kaydet();
    try {
      await fetch("/api/iletisim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch (error) {
      setSubmitError("Sunucu hatası, lütfen tekrar deneyin.");
    }
    setTimeout(() => setSent(false), 7000);
    setForm({
      ad: "",
      soyad: "",
      telefon: "",
      email: "",
      neden: ILETISIM_NEDENLERI[0],
      mesaj: "",
      iletisimTercihi: ILETISIM_TERCIHLERI[2].value,
      honeypot: ""
    });
  };

  // --- BAŞLANGIÇ ---
  return (
    <div className="w-full flex justify-center bg-black min-h-[calc(100vh-150px)] py-6 px-2">
      <div className="w-full max-w-2xl rounded-2xl shadow-2xl px-1 sm:px-4 py-6 flex flex-col gap-4" style={{ border: "2.5px solid #bfa658", background: "rgba(25, 23, 20, 0.98)" }}>
        {/* BAŞLIK */}
        <h1 className="text-center text-4xl font-extrabold text-[#FFD700] mb-2 mt-1 tracking-tight drop-shadow">İletişim</h1>
        <div className="text-center mb-1">
          <span className="inline-block bg-[#FFD700] text-black font-bold text-xs px-4 py-1 rounded-full">7/24 VIP Müşteri Hattı • Kişiye özel ayrıcalık</span>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3 bg-black/60 rounded-2xl p-4 border border-[#bfa658]/60 shadow" autoComplete="on">
          <div className="flex gap-2">
            <input type="text" name="ad" autoComplete="given-name" placeholder="Ad"
              value={form.ad} onChange={handleChange}
              className={`p-3 rounded-lg border flex-1 ${adValid ? "border-green-500" : form.ad ? "border-red-600" : "border-[#423c1c]"} bg-[#181611] text-white focus:border-[#bfa658] transition text-base`} minLength={3} required />
            <input type="text" name="soyad" autoComplete="family-name" placeholder="Soyad"
              value={form.soyad} onChange={handleChange}
              className={`p-3 rounded-lg border flex-1 ${soyadValid ? "border-green-500" : form.soyad ? "border-red-600" : "border-[#423c1c]"} bg-[#181611] text-white focus:border-[#bfa658] transition text-base`} minLength={3} required />
          </div>
          <div className="flex gap-2">
            <input type="tel" name="telefon" autoComplete="tel" placeholder="05xx xxx xx xx"
              value={form.telefon} onChange={handleChange}
              className={`p-3 rounded-lg border flex-1 ${phoneValid ? "border-green-500" : form.telefon ? "border-red-600" : "border-[#423c1c]"} bg-[#181611] text-white focus:border-[#bfa658] transition text-base`} maxLength={11} pattern="05\d{9}" required />
            <input type="email" name="email" autoComplete="email" placeholder="E-posta"
              value={form.email} onChange={handleChange}
              className={`p-3 rounded-lg border flex-1 ${emailValid ? "border-green-500" : form.email ? "border-red-600" : "border-[#423c1c]"} bg-[#181611] text-white focus:border-[#bfa658] transition text-base`} required />
          </div>
          <select name="neden" value={form.neden} onChange={handleChange}
            className="p-3 rounded-lg border border-[#423c1c] bg-[#181611] text-white focus:border-[#bfa658] transition text-base" required>
            {ILETISIM_NEDENLERI.map((neden, i) => (
              <option key={neden} value={neden}>{neden}</option>
            ))}
          </select>
          <textarea name="mesaj" placeholder="Mesajınız" value={form.mesaj} onChange={handleChange}
            className={`p-3 rounded-lg border ${msgValid && !censored.hasBlocked ? "border-green-500" : form.mesaj ? "border-red-600" : "border-[#423c1c]"} bg-[#181611] text-white focus:border-[#bfa658] transition text-base`} minLength={15} required rows={3} />
          {/* --- Size nasıl ulaşalım --- */}
          <span className="text-sm text-gray-300 font-bold ml-1 mt-2">Size nasıl ulaşalım?</span>
          <div className="flex flex-row gap-3 w-full mb-2">
            {ILETISIM_TERCIHLERI.map((item) => (
              <label
                key={item.value}
                className={`flex items-center gap-1 px-4 py-1 rounded-full border font-bold text-xs cursor-pointer
                select-none shadow-md transition
                ${form.iletisimTercihi === item.value
                  ? "bg-black border-[#FFD700] text-[#FFD700]"
                  : "bg-black border-[#bfa658] text-white hover:bg-gray-900 hover:border-gray-400"}
                `}
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
                <span className="mr-1">{item.icon}</span>
                <span>{item.label}</span>
              </label>
            ))}
          </div>
          {/* KVKK Sözleşme checkbox'ı */}
          <label className="flex items-center gap-2 text-xs mt-1 select-none">
            <input type="checkbox" required className="accent-[#FFD700] scale-110" style={{ accentColor: "#FFD700" }} />
            <span>
              <a href="/gizlilik" target="_blank" className="underline text-[#FFD700]">KVKK & Gizlilik Sözleşmesi</a>'ni okudum, kabul ediyorum.
            </span>
          </label>
          {/* Hatalar ve Uyarılar */}
          {blocked && (
            <div className="mt-2 flex items-center justify-center gap-2 p-2 rounded-lg text-base font-bold bg-red-700/90 text-white text-center border-2 border-red-400 shadow">
              Güvenlik nedeniyle arka arkaya gönderimlerde kısa bir bekleme uygulanmaktadır.
              <span className="ml-2 text-yellow-200 font-bold">
                ⏳ {formatDuration(remaining)} sonra tekrar deneyebilirsiniz.
              </span>
            </div>
          )}
          {!blocked && (
            <>
              {(errors.ad || errors.soyad || errors.telefon || errors.email || errors.mesaj) && (
                <div className="mt-2 flex items-center justify-center gap-2 p-2 rounded-lg text-base font-bold bg-red-700/90 text-white text-center border-2 border-red-400 shadow">
                  <ul className="list-disc list-inside text-left">
                    {errors.ad && <li>{errors.ad}</li>}
                    {errors.soyad && <li>{errors.soyad}</li>}
                    {errors.telefon && <li>{errors.telefon}</li>}
                    {errors.email && <li>{errors.email}</li>}
                    {errors.mesaj && <li>{errors.mesaj}</li>}
                  </ul>
                </div>
              )}
            </>
          )}
          {/* Mesaj gönder butonu */}
          <button type="submit"
            className="bg-[#bfa658] text-black font-bold py-3 px-8 rounded-xl text-lg hover:bg-yellow-600 transition shadow mt-2 w-full"
            disabled={blocked}>
            Mesajı Gönder
          </button>
        </form>
        {/* --- BİLBOARD: Mesajı Gönder Butonunun ALTINDA --- */}
        <div className="w-full flex flex-col items-stretch mt-3">
          <div
            className="w-full rounded-xl bg-black border border-[#bfa658] shadow py-4 px-5 min-h-[58px] flex items-center justify-start transition-all"
            style={{ minHeight: 58, maxWidth: "100%", margin: "0 auto" }}
          >
            <span
              className="text-base sm:text-lg text-gray-100 font-medium animate-fade-in leading-normal truncate-message"
              style={{
                whiteSpace: "normal",
                width: "100%",
                wordBreak: "break-word",
                fontSize: "1.08rem",
                lineHeight: "1.4",
                textAlign: "left"
              }}
            >
              {messages[activeIndex]}
            </span>
          </div>
          {/* Sosyal medya ikonları */}
          <div className="flex gap-3 pt-3 pl-2">
            {SOCIALS.map(({ icon, url, name }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-full bg-[#181611] border border-[#bfa658] hover:bg-[#FFD700] hover:text-black text-white transition shadow"
                title={name}
              >
                {icon}
              </a>
            ))}
          </div>
          {/* İletişim Bilgileri */}
          <div className="flex flex-col sm:flex-row gap-2 pt-3 pl-2 items-start sm:items-center">
            <div className="flex items-center gap-2 text-base text-gray-100">
              <FaPhone /> <span>+90 539 526 75 69</span>
            </div>
            <div className="flex items-center gap-2 text-base text-gray-100">
              <FaEnvelope /> <span>info@yolcutransferi.com</span>
            </div>
            <div className="flex items-center gap-2 text-base text-gray-100">
              <FaMapMarkerAlt /> <span>Ümraniye, İnkılap Mah. Plazalar Bölgesi, İstanbul</span>
            </div>
          </div>
        </div>
        {/* Harita */}
        <div className="w-full flex justify-center mt-4">
          <div style={{ width: "100%", maxWidth: "100%", height: "180px" }} className="rounded-xl overflow-hidden border-2 border-[#bfa658] shadow-lg bg-[#23201a]">
            <iframe
              title="YolcuTransferi.com Konum"
              width="100%"
              height="180"
              frameBorder="0"
              style={{ border: 0 }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24081.262044014337!2d29.0903967!3d41.0319917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac9cd7fd8d1ef%3A0xf6f8ff72b91ed1db!2sENPLAZA!5e0!3m2!1str!2str!4v1717693329992!5m2!1str!2str"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        {/* Gönderildi / Başarı mesajı */}
        {sent && (
          <div className="mt-2 p-3 rounded-lg text-base font-semibold bg-green-700/90 text-white text-center border-2 border-green-400 shadow" dangerouslySetInnerHTML={{ __html: sendInfo }} />
        )}
        {submitError && (
          <div className="mt-2 p-3 rounded-lg text-base font-semibold bg-red-700/90 text-white text-center border-2 border-red-400 shadow">
            {submitError}
          </div>
        )}
      </div>
      <style>{`
        .animate-fade-in { animation: fadeIn .7s; }
        @keyframes fadeIn { 0% { opacity: 0; transform: translateY(15px);} 100% { opacity: 1; transform: translateY(0);} }
        .truncate-message { display: block; width: 100%; overflow-wrap: break-word; white-space: normal; line-height: 1.4; font-size: 1rem;}
        @media (max-width: 640px) {
          .truncate-message { font-size: 0.97rem; }
        }
      `}</style>
    </div>
  );
}

// Not: Fonksiyonların tamamı (useRateLimit, parseMessage vs.) yukarıdaki ilk kodlarından **hiç değiştirmeden** kullanmalısın.
