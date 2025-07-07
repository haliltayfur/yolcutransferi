"use client";
import HeroSlider from "../components/HeroSlider";
import RezervasyonHero from "../components/RezervasyonHero"; // form + video kapsayıcısı
import AdvantagesBar from "../components/AdvantagesBar";
import TestimonialsSlider from "../components/TestimonialsSlider";

export default function Home() {
  return (
    <main
      style={{
        maxWidth: "1300px", // SLIDER VE ALT KAPSAYICI İÇİN TEK HAT!
        width: "min(100vw, 1300px)",
        margin: "0 auto",
        padding: "0",
      }}
    >
      <HeroSlider />

      {/* --- FORM + VIDEO --- */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "68% 2% 30%", // FORM - ARALIK - VİDEO
          gap: 0,
          width: "100%",
          minHeight: 600,
          margin: "2.5rem 0 2.5rem 0"
        }}
      >
        <div style={{ height: 600 }}>
          <RezervasyonHero />
        </div>
        <div /> {/* boşluk */}
        <div style={{ height: 600 }}>
          {/* Eğer video RezervasyonHero içinde ise burası boş kalabilir */}
        </div>
      </div>

      {/* ALTTAKİ BÖLÜMLER */}
      <AdvantagesBar />
      <TestimonialsSlider />
    </main>
  );
}
