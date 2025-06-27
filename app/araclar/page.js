// app/araclar/page.js

"use client";
import Image from "next/image";
import { vehicles } from "../../data/vehicleList";
import { User2, Briefcase, Wifi, GlassWater, Sparkle, Baby, Car, ShieldCheck, BadgeCheck } from "lucide-react";

const SEGMENT_ORDER = ["Lüks", "Prime+", "Ekonomik"];
const SEGMENT_TITLES = {
  "Lüks": "LÜKS VIP TRANSFER",
  "Prime+": "PRIME+ & ULTRA LÜKS",
  "Ekonomik": "EKONOMİK & KONFORLU"
};
const SEGMENT_DESC = {
  "Lüks": "Lüks segmentte iş ortaklarımızın en seçkin araçlarıyla, prestijli ve üst düzey yolculuk.",
  "Prime+": "Sınırlı sayıdaki ultra lüks, özel seri araçlar ve ayrıcalıklı deneyimler.",
  "Ekonomik": "Bütçenizden ödün vermeden konforlu ve güvenli VIP transfer seçenekleri."
};

// Özellik badge ikon eşleştirmesi
const BADGE_ICONS = {
  "Wi-Fi": <Wifi size={15} />,
  "Minibar": <GlassWater size={15} />,
  "Deri Koltuk": <BadgeCheck size={15} />,
  "Çocuk Koltuğu": <Baby size={15} />,
  "Güvenlik": <ShieldCheck size={15} />,
  "Elektrikli": <Sparkle size={15} />,
  "4x4": <Car size={15} />,
};

export default function Araclar() {
  // Segmentlere göre gruplandır, dron taksiyi ayır
  const dronTaksi = vehicles.find(v => v.key === "dron_taksi");
  const segmentGroups = SEGMENT_ORDER.map(segment => ({
    segment,
    vehicles: vehicles.filter(v => v.segment === segment && v.key !== "dron_taksi")
  }));

  return (
    <main className="max-w-5xl mx-auto px-2 sm:px-4 py-10 md:py-16">
      <div className="bg-gradient-to-br from-black via-[#19160a] to-[#302811] border border-[#bfa658] rounded-3xl shadow-2xl px-2 sm:px-7 md:px-12 py-10 md:py-14">
        {/* Kurumsal giriş */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#bfa658] mb-4 md:mb-7 text-center drop-shadow-lg font-quicksand tracking-tight">
          VIP Transfer Araçları
        </h1>
        <div className="text-[#ffeec2] text-center text-[18px] md:text-lg mb-8 max-w-2xl mx-auto">
          Türkiye’nin en seçkin araçları, güçlü iş ortaklarımızın portföyünde. Yolculuğunuzun her aşamasında <span className="text-gold font-bold">kusursuz, konforlu ve ayrıcalıklı</span> transfer deneyimi.
        </div>
        {/* Segment bazlı araçlar */}
        <div className="flex flex-col gap-12 md:gap-16">
          {segmentGroups.map(({ segment, vehicles }) =>
            vehicles.length > 0 && (
              <section key={segment} className="mb-3">
                <div className="flex items-center gap-3 mb-3">
                  <h2 className="text-xl md:text-2xl font-bold text-gold tracking-wide">{SEGMENT_TITLES[segment] || segment}</h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-[#bfa658]/60 to-transparent" />
                </div>
                <div className="text-[#ffeec2] mb-5 text-sm">{SEGMENT_DESC[segment]}</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {vehicles.map(arac => (
                    <div
                      key={arac.key}
                      className="flex bg-black/75 rounded-2xl shadow-lg p-6 border border-gold/30 items-center group hover:scale-[1.02] transition-all min-h-[152px]"
                    >
                      <div className="relative">
                        <Image
                          src={arac.image}
                          alt={arac.label}
                          width={110}
                          height={80}
                          className="rounded-xl shadow border border-[#bfa658]/50 bg-[#221f15] mr-4"
                          style={{ objectFit: "cover" }}
                        />
                        {/* VIP/Prime Rozeti */}
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
                          {(arac.features || []).slice(0, 3).map((f, i) =>
                            <span key={i} className="inline-flex items-center gap-1 bg-gold/10 border border-gold/30 rounded-lg px-2 py-1 text-xs font-semibold text-gold">
                              {BADGE_ICONS[f] || <BadgeCheck size={15} />} {f}
                            </span>
                          )}
                        </div>
                        <div className="text-[#ffeec2] text-[15px]">{arac.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )
          )}
          {/* Dron taksi özel kartı */}
          {dronTaksi &&
            <section>
              <div className="flex items-center gap-3 mt-10 mb-3">
                <h2 className="text-xl md:text-2xl font-bold text-gold tracking-wide">YAKINDA: DRON TAKSİ</h2>
                <span className="px-3 py-1 bg-gold text-black rounded-full font-bold text-xs animate-pulse">Pek Yakında!</span>
                <div className="flex-1 h-px bg-gradient-to-r from-[#bfa658]/60 to-transparent" />
              </div>
              <div className="flex bg-black/75 rounded-2xl shadow-lg p-6 border-2 border-[#bfa658] items-center mt-3">
                <Image
                  src={dronTaksi.image}
                  alt={dronTaksi.label}
                  width={120}
                  height={88}
                  className="rounded-xl shadow border border-[#bfa658]/70 bg-[#221f15] mr-4"
                  style={{ objectFit: "cover" }}
                />
                <div>
                  <h3 className="font-bold text-lg md:text-xl text-gold">{dronTaksi.label}</h3>
                  <div className="flex gap-2 mb-2 mt-1 flex-wrap">
                    <span className="inline-flex items-center gap-1 bg-gold/10 border border-gold/40 rounded-lg px-3 py-1 text-xs font-semibold text-gold">
                      <User2 size={16} /> {dronTaksi.capacity} yolcu
                    </span>
                    <span className="inline-flex items-center gap-1 bg-gold/10 border border-gold/40 rounded-lg px-3 py-1 text-xs font-semibold text-gold">
                      <Wifi size={15} /> Wi-Fi
                    </span>
                  </div>
                  <div className="text-[#ffeec2] text-[15px]">{dronTaksi.description}</div>
                  <div className="mt-2 text-gold text-sm font-semibold">Yeni nesil şehir içi hava transferi – <b>rezervasyon için beklemede!</b></div>
                </div>
              </div>
            </section>
          }
        </div>
        {/* Footer bilgi */}
        <div className="mt-12 text-center text-gray-400 text-sm">
          <span className="text-gold">Tüm araçlar yolcu güvenliği, hijyen ve konfor standartlarına uygundur.</span>
        </div>
      </div>
    </main>
  );
}

// app/araclar/page.js
