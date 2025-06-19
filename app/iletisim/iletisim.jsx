"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaWhatsapp, FaInstagram, FaPhone, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { SiX } from "react-icons/si";

// ...Yardımcı fonksiyonlar ve sabitler burada...

export default function Iletisim() {
  const blockedWords = getBlockedWords();
  const [form, setForm] = useState({
    ad: "", soyad: "", telefon: "", email: "", neden: ILETISIM_NEDENLERI[0], mesaj: "",
    iletisimTercihi: "", honeypot: "", kvkkOnay: false // <-- KVKK ONAY EKLENDİ
  });
  const [errors, setErrors] = useState({});
  const [buttonStatus, setButtonStatus] = useState("normal");
  const [buttonMsg, setButtonMsg] = useState("Mesajı Gönder");
  const [blocked, kaydet, remaining] = useRateLimit();

  useEffect(() => { setButtonMsg("Mesajı Gönder"); setButtonStatus("normal"); }, []);
  useEffect(() => { const f = document.querySelector('input[autoComplete="given-name"]'); if (f) f.focus(); }, []);

  function resetButton() {
    setTimeout(() => { setButtonMsg("Mesajı Gönder"); setButtonStatus("normal"); }, 10000);
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    setErrors({ ...errors, [name]: undefined });
  };
  const handleIletisimTercihiChange = (value) => {
    setForm({ ...form, iletisimTercihi: value });
    setErrors({ ...errors, iletisimTercihi: undefined });
  };

  const adValid = isRealName(form.ad);
  const soyadValid = isRealName(form.soyad);
  const phoneValid = isRealPhone(form.telefon);
  const emailValid = isRealEmail(form.email);
  const msgValid = isRealMsg(form.mesaj);

  const censored = parseMessage(form.mesaj, blockedWords);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};
    if (blocked) newErrors.global = "Güvenlik nedeniyle üst üste gönderimlerde kısa bir bekleme uygulanmaktadır.";
    if (form.honeypot && form.honeypot.length > 0) return;
    if (!adValid) newErrors.ad = "Lütfen adınızı en az 3 karakter olacak şekilde doldurun.";
    if (!soyadValid) newErrors.soyad = "Lütfen soyadınızı en az 3 karakter olacak şekilde doldurun.";
    if (!phoneValid) newErrors.telefon = "Telefon numarası hatalı (05xx xxx xx xx).";
    if (!emailValid) newErrors.email = "Lütfen geçerli bir e-posta adresi giriniz.";
    if (!msgValid) newErrors.mesaj = "Mesajınızı daha açık ve anlamlı yazınız.";
    if (censored.hasBlocked) newErrors.mesaj = "Mesajınızda uygunsuz veya argo kelime var. Lütfen değiştirin.";
    if (!form.iletisimTercihi) newErrors.iletisimTercihi = "Lütfen iletişim tercihinizi seçiniz.";
    if (!form.kvkkOnay) newErrors.kvkkOnay = "KVKK & Gizlilik Sözleşmesi'ni kabul etmelisiniz."; // <-- Eklendi!
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setButtonStatus("error"); setButtonMsg("Lütfen eksik alanları doldurun"); resetButton(); return;
    }
    let infoMsg = form.iletisimTercihi === "E-posta"
      ? "Teşekkürler, mesajınız bize ulaştı. Size info@yolcutransferi.com adresinden dönüş yapacağız."
      : `Teşekkürler, mesajınız bize ulaştı. Size 0539 526 75 69 ${form.iletisimTercihi.toLowerCase()} hattımızdan ulaşacağız.`;
    setButtonStatus("success"); setButtonMsg(infoMsg); resetButton(); kaydet();
    try {
      await fetch("/api/iletisim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }
    catch {
      setButtonStatus("error"); setButtonMsg("Sunucu hatası, lütfen tekrar deneyin."); resetButton();
    }
    setForm({ ad: "", soyad: "", telefon: "", email: "", neden: ILETISIM_NEDENLERI[0], mesaj: "", iletisimTercihi: "", honeypot: "", kvkkOnay: false });
  };

  // ...stil, harita ve diğer detaylar değişmedi...

  return (
    <div className="w-full flex justify-center bg-black min-h-[calc(100vh-150px)] py-6 px-2 font-poppins">
      <div className="w-full max-w-2xl rounded-2xl shadow-2xl px-1 sm:px-4 py-6 flex flex-col gap-4" style={{ border: "2.5px solid #bfa658", background: "rgba(25, 23, 20, 0.98)" }}>
        {/* ...diğer kodlar... */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3 bg-black/60 rounded-2xl p-4 border border-[#bfa658]/60 shadow" autoComplete="on">
          {/* ...diğer inputlar... */}
          {/* KVKK Onayı */}
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
              <a href="/gizlilik" className="underline text-[#FFD700]" target="_blank" rel="noopener noreferrer">KVKK & Gizlilik Sözleşmesi'ni</a> okudum, kabul ediyorum.
            </span>
          </div>
          {errors.kvkkOnay && <span className="text-xs text-red-400 font-bold pl-2">{errors.kvkkOnay}</span>}
          {/* ...gönder butonu ve diğer kodlar... */}
        </form>
        {/* ...sosyal medya, iletişim, harita vs... */}
      </div>
      {/* ...stil kodları... */}
    </div>
  );
}
