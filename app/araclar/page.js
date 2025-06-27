// app/araclar/page.js

"use client";
import Image from "next/image";
import { vehicles } from "../../data/vehicleList";
import { User2, Briefcase, Wifi, GlassWater, BadgeCheck, Sparkle, Baby, Car, ShieldCheck, CheckCircle, PlusCircle, Wine, Sparkles, MonitorCheck, Crown, Volume2, PartyPopper, ThermometerSnowflake } from "lucide-react";

const FEATURE_ICONS = {
  "Wi-Fi": <Wifi size={15} />,
  "Minibar": <GlassWater size={15} />,
  "Deri Koltuk": <BadgeCheck size={15} />,
  "360° Kamera": <MonitorCheck size={15} />,
  "Isıtmalı Koltuk": <ThermometerSnowflake size={15} />,
  "Çocuk Koltuğu": <Baby size={15} />,
  "Özel Güvenlik": <ShieldCheck size={15} />,
  "4x4": <Car size={15} />,
  "Özel Şoför": <CheckCircle size={15} />,
  "Alkollü İçecek": <Wine size={15} />,
  "Ekstralar": <PlusCircle size={15} />,
  "VIP Aydınlatma": <Sparkle size={15} />,
  "Parti Paketi": <PartyPopper size={15} />,
  "Ses Sistemi": <Volume2 size={15} />,
  "Ultra Lüks": <Crown size={15} />,
};

const SEGMENT_ORDER = ["Prime+", "Lüks", "Ekonomik"];
const SEGMENT_TITLES = {
  "Prime+": "PRIME+ & ULTRA LÜKS",
  "Lüks": "LÜKS VIP",
  "Ekonomik": "EKONOMİK & KONFORLU"
};
const SEGMENT_DESC = {
  "Prime+": "Yeni nesil ultra lüks, benzersiz konfor, üst düzey VIP donanım.",
  "Lüks": "En çok tercih edilen VIP araçlar, her detayıyla konforlu ve prestijli.",
  "Ekonomik": "Bütçe dostu, modern ve güvenli transfer için ideal seçenekler."
};

function getFeatureBadges(features = [], extras = []) {
  // Standart donanım ve ekstra hizmet ayrımı
  const allFeatures = features.concat((extras || []).map(e => e + " (Ekstra)"));
  return allFeatures.map((feat, i) => (
    <span key={i} className="inline-flex items-center gap-1 bg-gold/10 border border-gold/30 rounded-lg px-2 py-1 text-xs font-semibold text-gold mr-1 mb-1">
      {FEATURE_ICONS[feat.replace(" (Ekstra)", "")] || <BadgeCheck size={15} />}
      {feat}
    </span>
  ));
}

export default function Araclar() {
  const dronTaksi = vehicles.find(v => v.key === "dron_taksi");
  const segmentGroups = SEGMENT_ORDER.map(segment => ({
    segment,
    vehicles: vehicles.filter(v => v.segment === segment && v.key !== "dron_taksi")
  }));

  return (
    <main className="max-w-6xl mx-auto px-2 sm:px-6 py-10 md:py-16">
      <div className="bg-gradient-to-br from-black via-[#19160a] to-[#232118] border border-[#bfa658] rounded-3xl shadow-2xl px-2 sm:px-8 md:px-14 py-10 md:py-16">
        {/* Başlık ve açıklama */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#bfa658] mb-4 md:mb-9 text-center font-quicksand tracking-tight">
          VIP Araç Seçenekleri
        </h1>
        <div className="text-[#ffeec2] text-center text-[18px] md:text-lg mb-10 max-w-2xl mx-auto">
          <span className="font-semibold text-gold">Tüm segmentlerde, güncel ve bakımlı VIP araçlar.</span> 
          <br />
          Donanım ve ekstra hizmetlerle kişiselleştirilmiş yolculuk.
        </div>
        <div className="flex flex-col gap-14 md:gap-20">
          {/* Segment grupları */}
          {segmentGroups.map(({ segment, vehicles }, idx) =>
            vehicles.length > 0 && (
              <section key={segment} className="mb-3">
                <div className="flex items-center gap-3 mb-3">
                  <h2 className="text-2xl md:text-3xl font-bold text-gold tracking-wide">{SEGMENT_TITLES[segment]}</h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-[#bfa658]/50 to-transparent" />
                </div>
                <div className="text-[#ffeec2] mb-6 text-base">{SEGMENT_DESC[segment]}</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {vehicles.map(arac => (
                    <div
                      key={arac.key}
                      className="flex bg-gradient-to-br from-[#181612] via-[#232118] to-[#1c1a13] rounded-2xl shadow-lg p-6 border border-gold/20 items-center group hover:scale-[1.025] transition-all min-h-[172px] relative"
                    >
                      {/* Araç görseli */}
                      <div className="relative flex-shrink-0">
                        <Image
                          src={arac.image}
                          alt={arac.label}
                          width={116}
                          height={84}
                          className="rounded-xl shadow border border-[#bfa658]/40 bg-[#221f15] mr-4"
                          style={{ objectFit: "cover" }}
                        />
                        {arac.segment === "Prime+" && (
                          <span className="absolute top-2 left-2 bg-gold text-black text-xs font-bold rounded-full px-2 py-0.5 flex items-center gap-1 shadow-sm">
                            <Sparkles size={15} /> Ultra VIP
                          </span>
                        )}
                      </div>
                      <div className="flex-1">
                        {/* Araç adı */}
                        <div className="flex items-center gap-1 mb-1">
                          <h3 className="font-bold text-lg md:text-xl text-gold">{arac.label}</h3>
                        </div>
                        {/* Kapasite ve valiz */}
                        <div className="flex gap-2 mb-2 flex-wrap text-[#ffeec2] font-semibold text-sm">
                          <span className="inline-flex items-center gap-1 bg-gold/10 border border-gold/40 rounded-lg px-3 py-1">
                            <User2 size={16} /> <span>{arac.capacity} kişi</span>
                          </span>
                          <span className="inline-flex items-center gap-1 bg-gold/10 border border-gold/40 rounded-lg px-3 py-1">
                            <Briefcase size={16} /> <span>{arac.luggage} valiz</span>
                          </span>
                        </div>
                        {/* VIP donanım ve ekstralar */}
                        <div className="flex flex-wrap gap-1 mb-2">
                          {getFeatureBadges(arac.features, arac.extras)}
                        </div>
                        <div className="text-[#ffeec2] text-[15px]">{arac.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
                {idx !== segmentGroups.length - 1 && (
                  <div className="my-8 border-t border-[#bfa658]/20" />
                )}
              </section>
            )
          )}

          {/* DRON TAKSİ — Konsept */}
          {dronTaksi &&
            <section>
              <div className="flex items-center gap-3 mt-12 mb-3">
                <h2 className="text-2xl md:text-3xl font-bold text-[#fff7e1] tracking-wide drop-shadow-lg">YAKINDA: DRON TAKSİ</h2>
                <span className="px-3 py-1 bg-gradient-to-br from-[#ffeec2] to-[#bfa658] text-black rounded-full font-bold text-xs animate-pulse shadow-lg border border-[#bfa658] scale-110">PEK YAKINDA</span>
                <div className="flex-1 h-px bg-gradient-to-r from-[#bfa658]/60 to-transparent" />
              </div>
              <div className="flex flex-col md:flex-row items-center bg-gradient-to-br from-[#282510] via-[#221f15] to-[#302811] border-2 border-[#bfa658] rounded-3xl shadow-2xl p-8 md:p-12 mt-3 relative">
                <Image
                  src={dronTaksi.image}
                  alt={dronTaksi.label}
                  width={240}
                  height={170}
                  className="rounded-2xl shadow-xl border border-[#bfa658]/70 bg-[#221f15] mr-0 md:mr-10 mb-5 md:mb-0"
                  style={{ objectFit: "cover", boxShadow: "0 2px 28px 4px #bfa65844" }}
                />
                <div className="flex-1 text-center md:text-left">
                  <h3 className="font-bold text-2xl md:text-3xl text-gold mb-2 tracking-wide">{dronTaksi.label}</h3>
                  <div className="flex gap-2 mb-3 flex-wrap justify-center md:justify-start">
                    <span className="inline-flex items-center gap-1 bg-gold/10 border border-gold/40 rounded-lg px-3 py-1 text-sm font-semibold text-gold">
                      <User2 size={18} /> {dronTaksi.capacity} kişi
                    </span>
                    <span className="inline-flex items-center gap-1 bg-gold/10 border border-gold/40 rounded-lg px-3 py-1 text-sm font-semibold text-gold">
                      <Wifi size={16} /> Wi-Fi
                    </span>
                  </div>
                  <div className="text-[#ffeec2] text-[17px] mb-2">{dronTaksi.description}</div>
                  <div className="mt-4 text-gold text-base font-semibold">
                    <Sparkles className="inline mr-2" /> Türkiye'nin ilk şehir içi havadan VIP transferi için <b>rezervasyon beklemede!</b>
                  </div>
                </div>
                <div className="absolute -top-7 right-7 animate-pulse z-10 hidden md:block">
                  <Sparkle size={46} color="#ffeec2" />
                </div>
              </div>
            </section>
          }
        </div>
        <div className="mt-14 text-center text-[#e0d7bc] text-[15px]">
          <span className="text-gold">Tüm araçlar YolcuTransferi partner ağındandır; bakımlı, güvenli ve üst düzey hijyen standartlarında sunulur.</span>
        </div>
      </div>
    </main>
  );
}

// app/araclar/page.js
