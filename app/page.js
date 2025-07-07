// PATH: app/page.js
"use client";
import HeroSlider from "../components/HeroSlider";
import RezervasyonHero from "../components/RezervasyonHero";
import AdvantagesBar from "../components/AdvantagesBar";
import TestimonialsSlider from "../components/TestimonialsSlider";

export default function Home() {
  return (
    <main className="w-full bg-black min-h-screen">
      <HeroSlider />
      <RezervasyonHero />
      <AdvantagesBar />
      <TestimonialsSlider />
    </main>
  );
}
