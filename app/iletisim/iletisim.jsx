"use client";
import { useState, useEffect, useRef } from "react";
import { FaWhatsapp, FaInstagram, FaPhone, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { SiX } from "react-icons/si";

const ILETISIM_NEDENLERI = [
  "Bilgi Talebi", "Transfer Rezervasyonu", "Teklif Almak İstiyorum",
  "İş Birliği / Ortaklık", "Geri Bildirim / Öneri", "Şikayet Bildirimi", "Diğer"
];
const ILETISIM_TERCIHLERI = [
  { label: "WhatsApp", value: "WhatsApp", icon: <FaWhatsapp className="text-[#25d366] mr-1" size={16} /> },
  { label: "Telefon", value: "Telefon", icon: <FaPhone className="text-[#51A5FB] mr-1" size={16} /> },
  { label: "E-posta", value: "E-posta", icon: <FaEnvelope className="text-[#FFA500] mr-1" size={16} /> }
];

function PolicyPopup({ open, onClose, onConfirm }) {
  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    fetch("/mesafeli-satis")
      .then(res => res.text())
      .then(str => {
        const div = document.createElement("div");
        div.innerHTML = str;
        const main = div.querySelector("main") || div;
        setHtml(main.innerHTML);
        setLoading(false);
      });
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" style={{ backdropFilter: "blur(2px)" }}>
      <div className="relative w-[98vw] max-w-2xl rounded-2xl bg-[#181405] border-4 border-[#FFD700] shadow-2xl p-6 pt-10">
        {/* Kapat Butonu */}
        <button
          onClick={onClose}
          className="absolute top-4 right-7 px-5 py-1 rounded-lg bg-black text-[#FFD700] font-bold text-lg border-2 border-[#FFD700] hover:bg-[#ffd70022]"
        >
          Kapat
        </button>
        <div className="overflow-y-auto text-base max-h-[55vh] px-1 py-2 text-[#ffeec2]" style={{ fontFamily: "inherit" }}>
          {loading ? <div className="py-10 text-center text-lg">Yükleniyor...</div>
            : <div dangerouslySetInnerHTML={{ __html: html }} />}
        </div>
        <div className="pt-5 flex justify-end">
          <button
            onClick={() => { onConfirm && onConfirm(); onClose(); }}
            className="py-2 px-8 rounded-xl font-bold text-base bg-[#FFD700] hover:bg-yellow-600 text-black transition"
          >Onaylıyorum</button>
        </div>
      </div>
    </div>
  );
}

export default function Iletisim() {
  // ... validasyon fonksiyonlarını yukarıdan ekle (isRealEmail, isRealName vs.)
  // (Daha önce verdiğin fonksiyonları ekle)

  const fileInput = useRef();
  const [form, setForm] = useState({
    ad: "", soyad: "", telefon: "", email: "", neden: ILETISIM_NEDENLERI[0], mesaj: "",
    iletisimTercihi: "", kvkkOnay: false, ek: null
  });
  const [errors, setErrors] = useState({});
  const [buttonStatus, setButtonStatus] = useState("normal");
  const [buttonMsg, setButtonMsg] = useState("Mesajı Gönder");
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupKvkkConfirmed, setPopupKvkkConfirmed] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");

  useEffect(() => {
    if (popupKvkkConfirmed) {
      setForm(f => ({ ...f, kvkkOnay: true }));
      setPopupKvkkConfirmed(false);
    }
  }, [popupKvkkConfirmed]);

  // ... Validasyon ve handleChange fonksiyonları burada
  // handleEkChange fonksiyonunu daha önceki örnekteki gibi kullanabilirsin.

  const handleEkChange = (e) => {
    const file = e.target.files[0];
    if (!file) { setForm(f => ({ ...f, ek: null })); setSelectedFileName(""); return; }
    if (file.size > 10 * 1024 * 1024) {
      alert("Maksimum dosya boyutu 10 MB olmalı.");
      setForm(f => ({ ...f, ek: null })); setSelectedFileName("");
      e.target.value = "";
      return;
    }
    const ext = file.name.split(".").pop().toLowerCase();
    if (!["jpg", "jpeg", "png", "pdf", "doc", "docx", "xls", "xlsx", "zip"].includes(ext)) {
      alert("JPG, PNG, PDF, DOC, XLS, ZIP uzantıları desteklenir.");
      setForm(f => ({ ...f, ek: null })); setSelectedFileName("");
      e.target.value = "";
      return;
    }
    setForm(f => ({ ...f, ek: file }));
    setSelectedFileName(file.name);
  };

  // Diğer handleChange, handlePhoneChange fonksiyonları ve validasyonlar aynen devam
  // ...

  // Kurumsal ve anlamlı yeni slogan
  const iletisimSlogan = "Bize dilediğiniz zaman ulaşın; uzman ekibimiz en kısa sürede sizinle iletişime geçecektir.";

  // Submit (fetch ve FormData ile)
  const handleSubmit = async (e) => {
    e.preventDefault();
    // ... Validasyonlar (errors vs)
    setButtonStatus("loading");
    setButtonMsg("Gönderiliyor...");
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        if (k === "ek" && v) formData.append("ek", v);
        else if (k !== "ek") formData.append(k, v);
      });
      await fetch("/api/iletisim", { method: "POST", body: formData });
      setButtonStatus("success");
      setButtonMsg("Teşekkürler, mesajınız alındı.");
      setForm({ ad: "", soyad: "", telefon: "", email: "", neden: ILETISIM_NEDENLERI[0], mesaj: "", iletisimTercihi: "", kvkkOnay: false, ek: null });
      setSelectedFileName("");
      if (fileInput.current) fileInput.current.value = "";
    } catch (err) {
      setButtonStatus("error");
      setButtonMsg("Sunucu hatası, tekrar deneyin.");
    }
    setTimeout(() => setButtonStatus("normal"), 4000);
  };

  return (
    <main className="flex justify-center items-center min-h-[90vh] bg-black">
      <section className="w-full max-w-4xl mx-auto border border-[#bfa658] rounded-3xl shadow-2xl px-6 md:px-12 py-14 bg-gradient-to-br from-black via-[#19160a] to-[#302811] mt-16 mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#bfa658] tracking-tight mb-1 text-center">İletişim</h1>
        <div className="text-lg text-[#ffeec2] font-semibold text-center mb-8">{iletisimSlogan}</div>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3 bg-black/70 rounded-2xl p-6 border border-[#bfa658]/60 shadow" encType="multipart/form-data">
          {/* ... Diğer inputlar burada, dosya ekini aşağıda ekle */}
          <div className="flex flex-col">
            <label className="relative w-full">
              <input
                type="file"
                name="ek"
                ref={fileInput}
                accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.xls,.xlsx,.zip"
                onChange={handleEkChange}
                className="opacity-0 absolute left-0 top-0 w-full h-full z-10 cursor-pointer"
                style={{ width: "100%", height: 32, cursor: "pointer" }}
              />
              <div
                className="flex items-center w-fit px-3 py-1 rounded bg-[#bfa658] text-black font-semibold text-base shadow cursor-pointer hover:bg-yellow-600 transition"
                style={{ minHeight: 32, fontSize: 14 }}
              >
                {selectedFileName ? <span className="truncate w-full">{selectedFileName}</span> : <span>📎 Dosya Seç (opsiyonel)</span>}
              </div>
            </label>
          </div>
          {/* ... Diğer form alanları ve buton */}
        </form>
        <PolicyPopup open={popupOpen} onClose={() => setPopupOpen(false)} onConfirm={() => setPopupKvkkConfirmed(true)} />
      </section>
    </main>
  );
}
