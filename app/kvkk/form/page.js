"use client";
import { useState } from "react";

export default function KvkkFormPage() {
  const [form, setForm] = useState({
    adsoyad: "",
    telefon: "",
    eposta: "",
    talep: "",
    aciklama: ""
  });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "telefon") {
      let tel = value;
      if (!tel.startsWith("0")) tel = "0" + tel;
      setForm({ ...form, [name]: tel });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/kvkk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        setStatus("success");
        setForm({ adsoyad: "", telefon: "", eposta: "", talep: "", aciklama: "" });
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-12 border-2 border-[#bfa658] rounded-3xl bg-black/80">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-[#bfa658] mb-8 tracking-tight">
        KVKK Başvuru Formu
      </h1>

      <p className="text-sm text-gray-300 mb-6">
        Form gönderenin hakları KVKK kapsamında sahip olduğunuz başlıca haklar:
        <ul className="list-disc list-inside mt-2">
          <li>Kişisel verinizin işlenip işlenmediğini öğrenme</li>
          <li>Hangi verilerin işlendiğini ve işleme amacını öğrenme</li>
          <li>Hatalı/eksik verilerin düzeltilmesini isteme</li>
          <li>Verilerin silinmesini/yok edilmesini talep etme</li>
          <li>Yasaya aykırı işlenme nedeniyle zarar doğarsa tazminat isteme</li>
        </ul>
      </p>

      {status === "success" && <p className="text-green-500 font-semibold mb-6">Başvurunuz alındı. Teşekkür ederiz.</p>}
      {status === "error" && <p className="text-red-500 font-semibold mb-6">Bir hata oluştu. Lütfen tekrar deneyin.</p>}

      <form onSubmit={handleSubmit} className="space-y-6 text-white">
        <div>
          <label className="block mb-2 font-medium text-white">Adınız Soyadınız</label>
          <input type="text" name="adsoyad" required onChange={handleChange} value={form.adsoyad} className="w-full p-3 rounded bg-gray-900 border border-[#bfa658] placeholder-gray-500 text-white" placeholder="Ad Soyad" />
        </div>
        <div>
          <label className="block mb-2 font-medium text-white">Telefon Numaranız</label>
          <input type="tel" name="telefon" onChange={handleChange} value={form.telefon} className="w-full p-3 rounded bg-gray-900 border border-[#bfa658] placeholder-gray-500 text-white" placeholder="05XXXXXXXXX - Cep numarası giriniz" />
        </div>
        <div>
          <label className="block mb-2 font-medium text-white">E-posta Adresiniz</label>
          <input type="email" name="eposta" required onChange={handleChange} value={form.eposta} className="w-full p-3 rounded bg-gray-900 border border-[#bfa658] placeholder-gray-500 text-white" placeholder="ornek@mail.com" />
        </div>
        <div>
          <label className="block mb-2 font-medium text-white">Talep Türünüz</label>
          <select name="talep" required onChange={handleChange} value={form.talep} className="w-full p-3 rounded bg-gray-900 border border-[#bfa658] text-white">
            <option value="">Bir seçim yapınız</option>
            <option value="veri_ogrenme">Kişisel verilerim işleniyor mu?</option>
            <option value="veri_duzeltme">Eksik/yanlış verilerimin düzeltilmesi</option>
            <option value="veri_silme">Kişisel verilerimin silinmesi</option>
            <option value="veri_aktarim">Verilerim kimlerle paylaşıldı?</option>
            <option value="tazminat">Zarar nedeniyle tazminat talebi</option>
            <option value="diger">Diğer</option>
          </select>
        </div>
        <div>
          <label className="block mb-2 font-medium text-white">Açıklamanız</label>
          <textarea
            name="aciklama"
            rows="5"
            onChange={handleChange}
            value={form.aciklama}
            className="w-full p-3 rounded bg-gray-900 border border-[#bfa658] text-white"
            placeholder="Lütfen detaylı açıklama yazınız."
          ></textarea>
        </div>
        <button type="submit" className="bg-[#6e5a1e] hover:bg-[#8c7327] text-white font-bold py-3 px-6 rounded-xl text-lg shadow">
          Başvuruyu Gönder
        </button>
      </form>
    </main>
  );
}
