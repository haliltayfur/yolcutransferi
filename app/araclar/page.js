"use client";
import { vehicles } from "../../data/vehicleList";

const SEGMENT_ORDER = ["Prime+", "Lüks", "Ekonomik"];
const SEGMENT_TITLES = {
  "Prime+": "PRIME+",
  "Lüks": "LÜKS VIP",
  "Ekonomik": "EKONOMİK"
};
const SEGMENT_DESC = {
  "Prime+": "Ultra lüks ve maksimum konforlu VIP seçenekler.",
  "Lüks": "Prestijli ve konforlu transferler için VIP araçlar.",
  "Ekonomik": "Uygun bütçeli, modern ve güvenli yolculuk."
};

export default function Araclar() {
  const segmentGroups = SEGMENT_ORDER.map(segment => ({
    segment,
    vehicles: vehicles.filter(v => v.segment === segment)
  }));

  return (
    <main className="max-w-5xl mx-auto px-2 sm:px-6 py-10 md:py-16">
      <div className="bg-gradient-to-br from-black via-[#19160a] to-[#232118] border border-[#bfa658] rounded-3xl shadow-2xl px-2 sm:px-10 md:px-14 py-10 md:py-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#bfa658] mb-6 text-center tracking-tight">
          Araç Seçenekleri
        </h1>
        <div className="text-[#ffeec2] text-center text-lg mb-10 max-w-2xl mx-auto">
          Tüm segmentlerde bakımlı ve modern araçlarla güvenli yolculuk.
        </div>
        <div className="flex flex-col gap-12 md:gap-16">
          {segmentGroups.map(({ segment, vehicles }, idx) =>
            vehicles.length > 0 && (
              <section key={segment} className="mb-3">
                <div className="flex items-center gap-3 mb-3">
                  <h2 className="text-2xl md:text-3xl font-bold text-[#bfa658]">{SEGMENT_TITLES[segment]}</h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-[#bfa658]/50 to-transparent" />
                </div>
                <div className="text-[#ffeec2] mb-6 text-base">{SEGMENT_DESC[segment]}</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-7">
                  {vehicles.map(arac => (
                    <div
                      key={arac.value}
                      className="flex flex-col bg-[#181612] rounded-xl border border-[#bfa658]/30 p-4 min-h-[110px] shadow-md hover:shadow-lg group hover:scale-[1.025] transition-all relative"
                    >
                      <div className="font-bold text-base md:text-lg text-[#bfa658] mb-2">{arac.label}</div>
                      <div className="flex gap-2 mb-2 text-xs font-semibold text-[#ffeec2]">
                        <span className="inline-flex items-center gap-1 bg-gold/10 border border-gold/30 rounded-lg px-2 py-1">
                          {arac.max} Kişi
                        </span>
                        <span className="inline-flex items-center gap-1 bg-gold/10 border border-gold/30 rounded-lg px-2 py-1">
                          {arac.luggage} Valiz
                        </span>
                      </div>
                      <div className="text-xs text-[#e3dca4]">{arac.description}</div>
                    </div>
                  ))}
                </div>
                {idx !== segmentGroups.length - 1 && (
                  <div className="my-8 border-t border-[#bfa658]/15" />
                )}
              </section>
            )
          )}
        </div>
        <div className="mt-14 text-center text-[#e0d7bc] text-[15px]">
          <span className="text-gold">
            Tüm araçlar YolcuTransferi iş ortaklarından; hijyen ve bakım standartlarında sunulur.
          </span>
        </div>
      </div>
    </main>
  );
}
