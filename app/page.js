// PATH: app/page.js

"use client";
import HeroSlider from "../components/HeroSlider";
import RezervasyonHero from "../components/RezervasyonHero";
import AdvantagesBar from "../components/AdvantagesBar";
import TestimonialsSlider from "../components/TestimonialsSlider";

export default function Home() {
  return (
    <main>
      {/* Hero Slider (sayfanın üstü) */}
      <HeroSlider />

      {/* Rezervasyon Formu + Video */}
      <RezervasyonHero />

      {/* Neden YolcuTransferi (Avantajlar) */}
      <AdvantagesBar />

      {/* Müşteri Yorumları */}
      <TestimonialsSlider />
    </main>
  );
}
