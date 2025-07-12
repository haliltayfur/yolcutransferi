"use client";
import { vehicles } from "../../data/vehicleList";
import { User2, Briefcase } from "lucide-react";

// Segment başlık ve açıklama
const SEGMENT_ORDER = ["Prime+", "Lüks", "Ekonomik"];
const SEGMENT_TITLES = {
  "Prime+": "PRIME+",
  "Lüks": "LÜKS VIP",
  "Ekonomik": "EKONOMİK"
};
const SEGMENT_DESC = {
  "Prime+": "Ultra lüks ve maksimum konforlu VIP seçenekler.",
  "Lüks": "Konfor ve prestijli transferler için tercih edilen VIP araçlar.",
  "Ekonomik": "Uygun bütçeyle güvenli ve rahat yolculuk imkânı."
};

export default function Araclar() {
  const dronTaksi = vehicles.find(v => v.key === "dron_taksi");
  const segmentGroups = SEGMENT_ORDER.map(segment => ({
    segment,
    vehicles: vehicles.filter(v => v.segment === segment && v.key !== "dron_taksi")
  }));

  return (
    <main className="max-w-6xl mx-auto px-2 sm:px-6 py-10 md:py-16">
      <div className="bg-gradient-to-br from-black via-[#19160a] to-[#232118] border border-[#bfa658] rounded-3xl shadow-2xl px-2 sm:px-8 md:px-14 py-10 md:py-16">
        {/* Başlık */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#bfa658] mb-6 text-center tracking-tight">
          Araç Seçenekleri
        </h1>
        <div className="text-[#ffeec2] text-center text-lg mb-10 max-w-2xl mx-auto">
          Tüm segmentlerde bakımlı ve modern araçlarımızla konforlu yolculuklar.
        </div>

        {/* Segmentler */}
        <div className="flex flex-col gap-12 md:gap-16">
          {segmentGroups.map(({ segment, vehicles }, idx) =>
            vehicles.length > 0 && (
              <section key={segment} className="mb-3">
                {/* Segment başlık */}
                <div className="flex items-center gap-3 mb-3">
                  <h2 className="text-2xl md:text-3xl font-bold text-[#bfa658]">{SEGMENT_TITLES[segment]}</h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-[#bfa658]/50 to-transparent" />
                </div>
                {/* Segment açıklama */}
                <div className="text-[#ffeec2] mb-6 text-base">{SEGMENT_DESC[segment]}</div>
                {/* Araçlar grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-7">
                  {vehicles.map(arac => (
                    <div
                      key={arac.key}
                      className="flex flex-col bg-[#181612] rounded-xl border border-[#bfa658]/30 p-4 min-h-[130px] shadow-md hover:shadow-lg group hover:scale-[1.025] transition-all relative"
                    >
                      {/* Araç adı */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-bold text-base md:text-lg text-[#bfa658]">{arac.label}</span>
                        {arac.segment === "Prime+" && (
                          <span className="ml-2 px-2 py-0.5 text-xs bg-[#bfa658] text-black font-bold rounded-full">Ultra Lüks</span>
                        )}
                      </div>
                      {/* Kapasite & Bavul */}
                      <div className="flex gap-2 mb-2 text-xs font-semibold text-[#ffeec2]">
                        <span className="inline-flex items-center gap-1 bg-gold/10 border border-gold/30 rounded-lg px-2 py-1">
                          <User2 size={15} /> {arac.capacity} yolcu
                        </span>
                        <span className="inline-flex items-center gap-1 bg-gold/10 border border-gold/30 rounded-lg px-2 py-1">
                          <Briefcase size={15} /> {arac.luggage} bavul
                        </span>
                      </div>
                      {/* Açıklama */}
                      <div className="text-xs text-[#e3dca4] mb-1">{arac.description}</div>
                    </div>
                  ))}
                </div>
                {idx !== segmentGroups.length - 1 && (
                  <div className="my-8 border-t border-[#bfa658]/15" />
                )}
              </section>
            )
          )}

          {/* Dron Taksi Konsept */}
          {dronTaksi && (
            <section className="mt-12">
              <div className="flex items-center gap-3 mb-3">
                <h2 className="text-2xl md:text-3xl font-bold text-[#ffeec2] tracking-wide drop-shadow">YAKINDA: DRON TAKSİ</h2>
                <span className="px-3 py-1 bg-gradient-to-br from-[#ffeec2] to-[#bfa658] text-black rounded-full font-bold text-xs animate-pulse shadow border border-[#bfa658] scale-110">PEK YAKINDA</span>
                <div className="flex-1 h-px bg-gradient-to-r from-[#bfa658]/60 to-transparent" />
              </div>
              <div className="flex flex-col items-center bg-gradient-to-br from-[#282510] via-[#221f15] to-[#302811] border-2 border-[#bfa658] rounded-3xl shadow-2xl p-6 md:p-12 mt-2 relative">
                <h3 className="font-bold text-xl md:text-2xl text-gold mb-2 tracking-wide">{dronTaksi.label}</h3>
                <div className="flex gap-3 mb-3 flex-wrap justify-center">
                  <span className="inline-flex items-center gap-1 bg-gold/10 border border-gold/40 rounded-lg px-3 py-1 text-sm font-semibold text-gold">
                    <User2 size={17} /> {dronTaksi.capacity} yolcu
                  </span>
                  <span className="inline-flex items-center gap-1 bg-gold/10 border border-gold/40 rounded-lg px-3 py-1 text-sm font-semibold text-gold">
                    <Briefcase size={16} /> {dronTaksi.luggage} bavul
                  </span>
                </div>
                <div className="text-[#ffeec2] text-[16px] mb-1 text-center">{dronTaksi.description}</div>
                <div className="mt-3 text-gold text-sm font-semibold text-center">
                  Türkiye'nin ilk şehir içi havadan VIP transferi için <b>rezervasyon beklemede!</b>
                </div>
              </div>
            </section>
          )}
        </div>
        <div className="mt-14 text-center text-[#e0d7bc] text-[15px]">
          <span className="text-gold">Tüm araçlar YolcuTransferi iş ortaklarından, üst düzey hijyen ve periyodik bakım standartlarıyla sunulur.</span>
        </div>
      </div>
    </main>
  );
}
