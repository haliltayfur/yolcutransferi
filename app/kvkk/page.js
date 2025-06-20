"use client";
import { useState } from "react";
import Link from "next/link";

export default function Kvkk() {
  const [kvkkOkundu, setKvkkOkundu] = useState(false);

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      {/* Başlık */}
      <h1 className="text-3xl md:text-4xl font-bold text-center text-[#bfa658] mb-8 tracking-tight">
        KVKK Politikası ve Aydınlatma Metni
      </h1>

      {/* Metin Kutusu */}
      <div className="border-2 border-[#bfa658] rounded-2xl bg-black/80 px-4 md:px-8 py-8 text-white text-lg leading-relaxed shadow">
        <p>
          <b>YolcuTransferi.com</b> olarak kişisel verilerinizin korunmasına büyük önem veriyoruz. 
          Kişisel verileriniz, 6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) ve ilgili mevzuat kapsamında, aşağıda belirtilen esaslara uygun olarak işlenmektedir.
        </p>
        {/* ... Diğer metin alanları yukarıdaki gibi ... */}

        {/* Kabul kutusu + buton */}
        <div className="mt-8 flex flex-col items-start gap-3">
          <label className="flex items-center text-base text-[#e4c275]">
            <input
              type="checkbox"
              checked={kvkkOkundu}
              onChange={(e) => setKvkkOkundu(e.target.checked)}
              className="w-5 h-5 accent-[#bfa658] rounded border border-[#bfa658] mr-2"
            />
            KVKK Aydınlatma Metni’ni okudum ve onaylıyorum.
          </label>
          <Link
            href={kvkkOkundu ? "/kvkk/form" : "#"}
            className={`px-6 py-3 rounded-xl font-bold text-lg mt-1 transition bg-[#bfa658] text-black hover:opacity-90 ${!kvkkOkundu ? "pointer-events-none opacity-50" : ""}`}
            tabIndex={kvkkOkundu ? 0 : -1}
            aria-disabled={!kvkkOkundu}
          >
            KVKK Başvuru Formuna Geç
          </Link>
        </div>
      </div>
    </main>
  );
}
