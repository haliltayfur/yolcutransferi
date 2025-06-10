
"use client";

import { whyUsCards } from "../data/whyUs";

export default function WhyUsGrid() {
  return (
    <section className="w-full max-w-6xl mx-auto py-12 px-3">
      <h2 className="text-2xl font-bold text-gold mb-7 text-center">Neden YolcuTransferi?</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-7">
        {whyUsCards.map((card, idx) => (
          <div key={idx} className="bg-black/40 border border-gold/15 rounded-2xl p-6 text-center flex flex-col items-start shadow min-h-[170px]">
            <div className="w-full flex flex-col items-center">
              {card.icon}
              <div className="text-gold font-bold text-lg mb-2 mt-2" style={{ minHeight: "3rem", display: "flex", alignItems: "flex-start", justifyContent: "center", textAlign: "center" }}>{card.title}</div>
            </div>
            <div className="text-gray-300 text-base mt-2" style={{ minHeight: "3.5rem", display: "flex", alignItems: "flex-start", textAlign: "center" }}>{card.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
