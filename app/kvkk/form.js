"use client";
import React from "react";

export default function KvkkForm() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-[#bfa658] mb-8 tracking-tight">
        KVKK Başvuru Formu
      </h1>

      <p className="text-lg text-gray-300 leading-relaxed mb-6">
        Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında veri sorumlusu sıfatıyla,
        aşağıdaki formu doldurarak bize başvuru yapabilirsiniz. Bu form, kişisel veri işleme
        süreçlerimize ilişkin bilgi talep etmenizi, düzeltme veya silme istemenizi kolaylaştırmak için hazırlanmıştır.
      </p>

      <form
        action="mailto:info@yolcutransferi.com"
        method="POST"
        encType="text/plain"
        className="space-y-6 text-gray-100"
      >
        <div>
          <label className="block mb-2 font-semibold">Adınız Soyadınız</label>
          <input type="text" name="adsoyad" required className="w-full p-3 rounded bg-gray-800 border border-[#bfa658]" />
        </div>

        <div>
          <label className="block mb-2 font-semibold">Telefon Numaranız</label>
          <input type="tel" name="telefon" className="w-full p-3 rounded bg-gray-800 border border-[#bfa658]" />
        </div>

        <div>
          <label className="block mb-2 font-semibold">E-posta Adresiniz</label>
          <input type="email" name="eposta" required className="w-full p-3 rounded bg-gray-800 border border-[#bfa658]" />
        </div>

        <div>
          <label className="block mb-2 font-semibold">Talep Türünüz</label>
          <select name="talep" required className="w-full p-3 rounded bg-gray-800 border border-[#bfa658]">
            <option value="">Bir seçim yapınız</option>
            <option value="veri_ogrenme">Kişisel verilerim işleniyor mu?</option>
            <option value="veri_duzeltme">Eksik/yanlış verilerimin düzeltilmesi</option>
            <option value="veri_silme">Kişisel verilerimin silinmesi</option>
            <option value="veri_aktarim">Verilerim kimlerle paylaşıldı?</option>
            <option value="diger">Diğer</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-semibold">Açıklamanız</label>
          <textarea
            name="aciklama"
            rows="5"
            className="w-full p-3 rounded bg-gray-800 border border-[#bfa658]"
            placeholder="Lütfen detaylı açıklama yazınız."
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-[#6e5a1e] hover:bg-[#8c7327] text-white font-bold py-3 px-6 rounded-xl text-lg shadow"
        >
          Başvuruyu Gönder
        </button>
      </form>
    </main>
  );
}
