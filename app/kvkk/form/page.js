"use client";
import { useState } from "react";
import Link from "next/link";

export default function KvkkFormPage() {
  const [form, setForm] = useState({
    adsoyad: "",
    telefon: "",
    eposta: "",
    talep: "",
    aciklama: ""
  });
  const [status, setStatus] = useState("idle");
  const [kvkkOnay, setKvkkOnay] = useState(false);
  const [kvkkError, setKvkkError] = useState("");

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
    setKvkkError("");
    if (!kvkkOnay) {
      setKvkkError("KVKK metnini okuduğunuzu ve onayladığınızı belirtmelisiniz.");
      return;
    }
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
        setKvkkOnay(false);
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-12 mb-20 border-2 border-[#bfa658] rounded-3xl bg-black/80">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-[#bfa658] mb-8 tracking-tight">
        KVKK Başvuru Formu
      </h1>

      {status === "success" && <p className="text-green-500 font-semibold mb-6">Başvurunuz alındı. Teşekkür ederiz.</p>}
      {status === "error" && <p className="text-red-500 font-semibold mb-6">Bir hata oluştu. Lütfen tekrar deneyin.</p>}

      <form onSubmit={handleSubmit} className="space-y-6 text-white">
        <div>
          <label className="block mb-2 font-medium text-white">Adınız Soyadınız</label>
          <input
            type="text"
            name="adsoyad"
            required
            onChange={handleChange}
            value={form.adsoyad}
            className="w-full p-3 rounded bg-gray-900 border border-[#bfa658] placeholder-gray-500 text-white"
            placeholder="Ad Soyad"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium text-white">Telefon Numaranız</label>
          <input
            type="tel"
            name="telefon"
            onChange={handleChange}
            value={form.telefon}
            className="w-full p-3 rounded bg-gray-900 border border-[#bfa658] placeholder-gray-500 text-white"
            placeholder="05XXXXXXXXX - Cep numarası giriniz"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium text-white">E-posta Adresiniz</label>
          <input
            type="email"
            name="eposta"
            required
            onChange={handleChange}
            value={form.eposta}
            className="w-full p-3 rounded bg-gray-900 border border-[#bfa658] placeholder-gray-500 text-white"
            placeholder="ornek@mail.com"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium text-white">Talep Türünüz</label>
          <select
            name="talep"
            required
            onChange={handleChange}
            value={form.talep}
            className="w-full p-3 rounded bg-gray-900 border border-[#bfa658] text-white"
          >
            <option value="">Bir seçim yapınız</option>
            <option value="veri_ogrenme">Kişisel verilerim işleniyor mu?</option>
            <option value="veri_duzeltme">Eksik veya yanlış verilerin düzeltilmesi</option>
            <option value="veri_silme">Verilerin silinmesi / yok edilmesi</option>
            <option value="veri_aktarim">Verilerim kimlerle paylaşıldı?</option>
            <option value="tazminat">Yasaya aykırı işleme nedeniyle zarar tazmini</option>
            <option value="diger">Diğer (KVKK kapsamındaki tüm haklarınız için açıklama kısmını kullanabilirsiniz)</option>
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

        {/* KVKK onay kutusu */}
        <div className="flex items-start mt-4">
          <input
            type="checkbox"
            id="kvkkOnay"
            checked={kvkkOnay}
            onChange={(e) => setKvkkOnay(e.target.checked)}
            className="w-5 h-5 accent-[#bfa658] rounded border border-[#bfa658] mt-1"
            required
          />
          <label htmlFor="kvkkOnay" className="ml-3 text-base text-[#e4c275]">
            <span>
              <Link
                href="/kvkk"
                target="_blank"
                className="underline hover:text-[#bfa658] font-semibold"
              >
                KVKK Aydınlatma Metni’ni
              </Link>{" "}
              okudum ve onaylıyorum.
            </span>
          </label>
        </div>
        {kvkkError && (
          <div className="text-red-400 text-sm mt-1">{kvkkError}</div>
        )}

        <button
          type="submit"
          className="bg-[#6e5a1e] hover:bg-[#8c7327] text-white font-bold py-3 px-6 rounded-xl text-lg shadow mt-2"
        >
          Başvuruyu Gönder
        </button>
      </form>
    </main>
  );
}
