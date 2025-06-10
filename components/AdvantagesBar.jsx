
"use client";

import { advantages } from "../data/advantages";

export default function AdvantagesBar() {
  return (
    <section className="w-full flex flex-col items-center mb-12 px-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 max-w-5xl w-full">
        {advantages.map((adv, i) => (
          <div key={i} className="flex items-center gap-3 bg-[#191919] border border-gold/30 rounded-xl py-4 px-4 shadow font-semibold text-base min-h-[65px]">
            <span className="text-gold">{adv.icon}</span>
            <span className="leading-tight">{adv.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
