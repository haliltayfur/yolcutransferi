// app/araclar/page.js

"use client";
import Image from "next/image";
import { User2, Briefcase } from "lucide-react";
import { vehicles } from "../../data/vehicleList";

// Segment sıralama ve başlıklar
const SEGMENT_ORDER = ["Ekonomik", "Lüks", "Prime+"];
const SEGMENT_TITLES = {
  "Ekonomik": "Ekonomik VIP Araçlar",
  "Lüks": "Lüks VIP Araçlar",
  "Prime+": "Prime+ ve Ultra Lüks"
};

export default function Araclar() {
  // Araçları segmentlere grupla, sıralı olsun
  const segmentGroups = SEGMENT_ORDER.map(segment => ({
    segment,
    vehicles: vehicles.filter(v => v.segment === segment)
  }));

  return (
    <main className="max-w-5xl mx-auto px-2 sm:px-4 py-8 md:py-14">
      <div className="bg-gradient-to-br from-black via-[#19160a] to-[#302811] border border-[#bfa658] rounded-3xl shadow-2xl px-2 sm:px-6 md:px-10 py-8 md:py-14">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#bfa658] mb-5 md:mb-10 text-center drop-shadow-lg font-quicksand tracking-tight">
          VIP Araç Filomuz
        </h1>
        <div className="text-[#ffeec2] text-center text-lg mb-7 md:mb-12">
          <span className="text-gold font-bold">Her segmentte konfor ve prestij!</span><br />
          Yolculuğunuz için en uygun aracı seçin.
        </div>
        
        {/* Segmentlere göre bölümlü araç listesi */}
        <div className="flex flex-col gap-14">
          {segmentGroups.map(({ segment, vehicles }) =>
            vehicles.length > 0 && (
              <section key={segment}>
                <h2 className="text-2xl md:text-3xl font-bold text-gold mb-7 pl-2 border-l-4 border-gold">
                  {SEGMENT_TITLES[segment] || segment}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {vehicles.map(arac => (
                    <div
                      key={arac.key}
                      className="flex bg-black/70 rounded-2xl shadow-lg p-6 border border-gold/30 items-center hover:scale-[1.02] transition-all"
                    >
                      <Image
                        src={arac.image}
                        alt={arac.label}
                        width={110}
                        height={78}
                        className="mr-6 rounded-xl shadow border border-[#bfa658]/50 bg-[#221f15]"
                        style={{ objectFit: "cover" }}
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-xl text-gold mb-1">{arac.label}</h3>
                        <div className="flex gap-2 mb-2 flex-wrap">
                          <span className="inline-flex items-center gap-1 bg-gold/10 border border-gold/40 rounded-lg px-3 py-1 text-xs font-semibold text-gold">
                            <User2 size={16} /> {arac.capacity} yolcu
                          </span>
                          <span className="inline-flex items-center gap-1 bg-gold/10 border border-gold/40 rounded-lg px-3 py-1 text-xs font-semibold text-gold">
                            <Briefcase size={16} /> {arac.luggage} valiz
                          </span>
                          <span className="inline-flex items-center gap-1 bg-gold/10 border border-gold/40 rounded-lg px-3 py-1 text-xs font-semibold text-gold">
                            {arac.segment}
                          </span>
                        </div>
                        <p className="text-[#ffeec2] text-[15px]">{arac.description}</p>
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
            Hemen VIP Transfer Teklifi Al
          </a>
          <div className="mt-6 text-gray-400 text-sm">
            Tüm araçlarımız periyodik bakımlı, yeni ve profesyonel şoförlüdür.<br />
            <b>YolcuTransferi.com</b> ile ayrıcalığı yaşayın.
          </div>
        </div>
      </div>
    </main>
  );
}

// app/araclar/page.js
