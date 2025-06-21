"use client";
import { useState } from "react";

const SORULAR = [
  // ... senin yukarıda verdiğin soruların tamamı buraya aynen eklenmeli ...
  // Kısaltmadım, yukarıdan kopyalayabilirsin.
];

export default function SSS() {
  const [acik, setAcik] = useState([0, 1]);

  const toggle = (i) => {
    setAcik(acik.includes(i) ? [] : [i]);
  };

  return (
    <main className="flex justify-center items-center min-h-[90vh] bg-black">
      <section className="w-full max-w-4xl mx-auto border border-[#bfa658] rounded-3xl shadow-2xl px-6 md:px-12 py-14 bg-gradient-to-br from-black via-[#19160a] to-[#302811] mt-16 mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#bfa658] tracking-tight mb-1 text-center">
          Sıkça Sorulan Sorular
        </h1>
        <div className="text-lg text-[#ffeec2] font-semibold text-center mb-8">
          VIP transfer süreçlerimiz hakkında en sık sorulanlar.
        </div>
        <div className="space-y-5">
          {SORULAR.map((item, i) => (
            <div
              key={i}
              className="bg-black/70 border border-[#bfa658]/40 rounded-2xl shadow px-5 py-3"
            >
              <button
                className="w-full text-left flex items-center justify-between font-semibold text-lg text-[#ffeec2] focus:outline-none"
                onClick={() => toggle(i)}
                aria-expanded={acik.includes(i)}
                style={{ fontFamily: "inherit" }}
              >
                <span className="flex-1">{item.q}</span>
                <span
                  className={`
                    flex items-center justify-center ml-4 w-8 h-8 rounded-full border border-[#bfa658] 
                    transition-all duration-300
                    ${acik.includes(i) ? "bg-[#bfa658]/20" : "bg-black/70"}
                  `}
                >
                  <span className={`text-2xl font-bold transition-transform ${acik.includes(i) ? "text-[#bfa658]" : "text-[#ffeec2]"}`}>
                    {acik.includes(i) ? "–" : "+"}
                  </span>
                </span>
              </button>
              {acik.includes(i) && (
                <div className="mt-3 text-[#ecd9aa] text-base leading-relaxed animate-fade-in">{item.a}</div>
              )}
            </div>
          ))}
        </div>
        <style>{`
          .animate-fade-in { animation: fadeIn .7s; }
          @keyframes fadeIn { 0% { opacity: 0; transform: translateY(15px);} 100% { opacity: 1; transform: translateY(0);} }
        `}</style>
      </section>
    </main>
  );
}
