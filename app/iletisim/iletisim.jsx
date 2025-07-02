"use client";
import { useState, useEffect, useRef } from "react";
import { FaWhatsapp, FaInstagram, FaPhone, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { SiX } from "react-icons/si";

// ... yardımcı fonksiyonlar ve validasyonlar aynı şekilde devam ...

function PolicyPopup({ open, onClose }) {
  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (open) {
      setLoading(true);
      fetch("https://yolcutransferi.com/mesafeli-satis")
        .then(res => res.text())
        .then(htmlStr => {
          // sadece ana içerik gelsin
          const div = document.createElement("div");
          div.innerHTML = htmlStr;
          let content = div.querySelector("main") || div.querySelector("section") || div;
          setHtml(content.innerHTML);
          setLoading(false);
        });
    }
  }, [open]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="relative w-[96vw] md:w-[56vw] max-w-4xl bg-[#181405] rounded-2xl border-4 border-[#FFD700] p-8 shadow-2xl flex flex-col overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#FFD700] hover:text-[#fff9e3] font-bold text-lg px-6 py-2 bg-black/50 border-2 border-[#FFD700] rounded-full"
        >
          Kapat
        </button>
        <h2 className="text-2xl font-bold text-[#FFD700] mb-4 text-center">Politika ve Koşullar</h2>
        <div className="text-base text-[#ecd9aa] max-h-[62vh] overflow-y-auto" dangerouslySetInnerHTML={{ __html: loading ? "Yükleniyor..." : html }} />
      </div>
    </div>
  );
}

export default function Iletisim() {
  // ...
  const fileInput = useRef(null);
  const [form, setForm] = useState({
    ad: "", soyad: "", telefon: "", email: "", neden: ILETISIM_NEDENLERI[0], mesaj: "",
    iletisimTercihi: "", kvkkOnay: false, ek: null
  });
  // ... diğer state'ler aynı ...

  const handleEkChange = e => {
    const file = e.target.files[0];
    if (!file) { setForm(f => ({ ...f, ek: null })); return; }
    if (file.size > 10 * 1024 * 1024) {
      alert("Maksimum dosya boyutu 10 MB olmalı.");
      setForm(f => ({ ...f, ek: null })); e.target.value = ""; return;
    }
    const ext = file.name.split(".").pop().toLowerCase();
    if (!["jpg", "jpeg", "png", "pdf", "doc", "docx", "xls", "xlsx", "zip"].includes(ext)) {
      alert("JPG, PNG, PDF, DOC, XLS, ZIP uzantıları desteklenir.");
      setForm(f => ({ ...f, ek: null })); e.target.value = ""; return;
    }
    setForm(f => ({ ...f, ek: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // ... validasyonlar aynı ...
    // Dosya varsa FormData ile POST
    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => {
      if (key === "ek" && val) formData.append("ek", val);
      else if (key !== "ek") formData.append(key, val);
    });
    setButtonStatus("loading"); setButtonMsg("Gönderiliyor...");
    try {
      await fetch("/api/iletisim", { method: "POST", body: formData });
      setButtonStatus("success"); setButtonMsg("Teşekkürler, mesajınız alındı."); resetButton();
      kaydet();
      setForm({ ad: "", soyad: "", telefon: "", email: "", neden: ILETISIM_NEDENLERI[0], mesaj: "", iletisimTercihi: "", kvkkOnay: false, ek: null });
      if (fileInput.current) fileInput.current.value = "";
    } catch {
      setButtonStatus("error"); setButtonMsg("Sunucu hatası, tekrar deneyin."); resetButton();
    }
  };

  return (
    <main className="flex justify-center items-center min-h-[90vh] bg-black">
      <section className="w-full max-w-4xl mx-auto border border-[#bfa658] rounded-3xl shadow-2xl px-6 md:px-12 py-14 bg-gradient-to-br from-black via-[#19160a] to-[#302811] mt-16 mb-10">
        {/* Başlık ve yeni slogan */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#bfa658] tracking-tight mb-1 text-center">İletişim</h1>
        <div className="text-lg text-[#ffeec2] font-semibold text-center mb-8">
          Sorularınızı, önerilerinizi ve taleplerinizi aşağıdaki formdan bize iletebilirsiniz. Tüm başvurularınız titizlikle değerlendirilir ve en kısa sürede yanıtlanır.
        </div>
        
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3 bg-black/70 rounded-2xl p-6 border border-[#bfa658]/60 shadow" encType="multipart/form-data">
          {/* ... diğer inputlar ... */}
          {/* --- Dosya seç --- */}
          <div className="flex flex-col">
            <label className="relative w-full">
              <input
                type="file"
                name="ek"
                ref={fileInput}
                accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.xls,.xlsx,.zip"
                onChange={handleEkChange}
                className="opacity-0 absolute left-0 top-0 w-full h-full z-10 cursor-pointer"
                style={{ width: "100%", height: 45, cursor: "pointer" }}
              />
              <div
                className="flex items-center justify-start w-full py-2 px-4 rounded-xl bg-[#bfa658] text-black font-semibold text-base shadow cursor-pointer hover:bg-yellow-600 transition"
                style={{ minHeight: 36, width: "55%", fontSize: 14, marginTop: 4 }}
              >
                {form.ek ? (
                  <span className="truncate w-full">{form.ek.name}</span>
                ) : (
                  <span>📎 Dosya Seç (opsiyonel)</span>
                )}
              </div>
            </label>
          </div>
          {/* ... kalan alanlar ... */}
          {/* KVKK metni */}
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
              <button
                type="button"
                onClick={() => setPopupOpen(true)}
                className="underline text-[#FFD700] hover:text-[#bfa658] cursor-pointer outline-none"
                style={{ padding: 0, border: "none", background: "transparent" }}
              >
                YolcuTransferi.com politika ve koşullarını
              </button>{" "}
              okudum, kabul ediyorum.
            </span>
          </div>
        </form>
        <PolicyPopup open={popupOpen} onClose={() => setPopupOpen(false)} />
        {/* ... sosyal medya & alt kısımlar ... */}
      </section>
    </main>
  );
}
