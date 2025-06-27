// app/araclar/page.js

"use client";
import Image from "next/image";
import { User2, Briefcase, Sparkle } from "lucide-react";
import { vehicles } from "../../data/vehicleList";

// Segmentler ve başlıkları
const SEGMENT_ORDER = ["Ekonomik", "Lüks", "Prime+"];
const SEGMENT_TITLES = {
  "Ekonomik": "Ekonomik VIP Araçlar",
  "Lüks": "Lüks VIP Araçlar",
  "Prime+": "Prime+ ve Ultra Lüks"
};
const SEGMENT_DESC = {
  "Ekonomik": "Bütçenizden ödün vermeden VIP transfer keyfi. Konforlu ve güvenli araçlarımızla yolculuğunuz ayrıcalıklı başlar.",
  "Lüks": "Lüks segmentte, prestij ve konfor bir arada. Geniş iç hacim, ekstra donanım ve stil sahibi VIP yolculuklar için.",
  "Prime+": "Ultra lüks, özel seri araçlar. Eşi benzeri olmayan konfor, yeni nesil güvenlik ve şoför ayrıcalıkları."
};

export default function Araclar() {
  // Segmentlere grupla
  const segmentGroups = SEGMENT_ORDER.map(segment => ({
    segment,
    vehicles: vehicles.filter(v => v.segment === segment)
  }));

  return (
    <main className="max-w-5xl mx-auto px-2 sm:px-4 py-8 md:py-14">
      <div className="bg-gradient-to-br from-black via-[#19160a] to-[#302811] border border-[#bfa658] rounded-3xl shadow-2xl px-2 sm:px-6 md:px-10 py-8 md:py-14">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#bfa658] mb-6 md:mb-10 text-center drop-shadow-lg font-quicksand tracking-tight">
          VIP Transfer Filomuz
        </h1>
        <div className="text-[#ffeec2] text-center text-[18px] md:text-lg mb-8 max-w-2xl mx-auto">
          Tüm yolculuklarınızda kusursuz deneyim. Sizin için en güncel ve seçkin araçlarımızla her zaman <span className="text-gold font-bold">güvenli, ayrıcalıklı ve zamanında transfer</span>.
        </div>

        {/* Segmentlere göre bölümlü araç listesi */}
        <div className="flex flex-col gap-14">
          {segmentGroups.map(({ segment, vehicles }) =>
            vehicles.length > 0 && (
              <section key={segment} className="mb-3">
                <h2 className="text-2xl md:text-3xl font-bold text-gold mb-2 pl-2 border-l-4 border-gold">{SEGMENT_TITLES[segment] || segment}</h2>
                <div className="text-[#ffeec2] mb-5 text-sm pl-3">{SEGMENT_DESC[segment]}</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {vehicles.map(arac => (
                    <div
                      key={arac.key}
                      className="flex bg-black/75 rounded-2xl shadow-lg p-6 border border-gold/30 items-center group hover:scale-[1.02] transition-all"
                    >
                      <div className="relative">
                        <Image
                          src={arac.image}
                          alt={arac.label}
                          width={110}
                          height={78}
                          className="rounded-xl shadow border border-[#bfa658]/50 bg-[#221f15] mr-4"
                          style={{ objectFit: "cover" }}
                        />
                        {/* VIP Rozeti */}
                        {arac.segment === "Prime+" && (
                          <span className="absolute top-2 left-2 bg-gold text-black text-xs font-bold rounded-full px-2 py-0.5 flex items-center gap-1 shadow-sm">
                            <Sparkle size={15} /> Ultra VIP
                          </span>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-1 mb-1">
                          <h3 className="font-bold text-lg md:text-xl text-gold">{arac.label}</h3>
                        </div>
                        <div className="flex gap-2 mb-2 flex-wrap">
                          <span className="inline-flex items-center gap-1 bg-gold/10 border border-gold/40 rounded-lg px-3 py-1 text-xs font-semibold text-gold">
                            <User2 size={16} /> {arac.capacity} yolcu
                          </span>
                          <span className="inline-flex items-center gap-1 bg-gold/10 border border-gold/40 rounded-lg px-3 py-1 text-xs font-semibold text-gold">
                            <Briefcase size={16} /> {arac.luggage} valiz
                          </span>
                        </div>
                        <div className="text-[#ffeec2] text-[15px]">{arac.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )
          )}
        </div>

        <div className="mt-14 text-center">
          <a
            href="/rezervasyon"
            className="inline-block bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold py-4 px-10 rounded-2xl text-xl shadow hover:scale-105 transition mt-5"
          >
            VIP Transfer Rezervasyonu
          </a>
          <div className="mt-6 text-gray-400 text-sm">
            Tüm araçlarımız periyodik bakımlı, yeni ve profesyonel şoförlüdür.<br />
            <span className="text-gold">YolcuTransferi ile lüks yolculuğunuz başlar.</span>
          </div>
        </div>
      </div>
    </main>
  );
}

// app/araclar/page.js
