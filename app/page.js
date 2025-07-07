// PATH: app/page.js
"use client";
import { useRef, useEffect, useState } from "react";
import HeroSlider from "../components/HeroSlider";
import RezervasyonHero from "../components/RezervasyonHero";
import AdvantagesBar from "../components/AdvantagesBar";
import TestimonialsSlider from "../components/TestimonialsSlider";

export default function Home() {
  // Slider genişliği
  const sliderOuterRef = useRef();
  const [sliderWidth, setSliderWidth] = useState(1200);

  useEffect(() => {
    function updateWidth() {
      if (sliderOuterRef.current) {
        setSliderWidth(sliderOuterRef.current.offsetWidth);
      }
    }
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // ORANLAR
  const formW = sliderWidth * 0.68;
  const gapW = sliderWidth * 0.02;
  const videoW = sliderWidth * 0.30;

  return (
    <main className="w-full flex flex-col items-center bg-black min-h-screen">
      {/* === SLIDER === */}
      <div
        ref={sliderOuterRef}
        style={{
          width: "min(100vw, 2000px)",
          margin: "0 auto",
        }}
      >
        <HeroSlider />
      </div>

      {/* === ALT GRID === */}
      <div
        className="flex flex-row items-start"
        style={{
          width: sliderWidth,
          maxWidth: "2000px",
          margin: "0 auto",
          marginTop: "32px",
        }}
      >
        {/* FORM */}
        <div
          style={{
            width: formW,
            minWidth: 350,
            transition: "width 0.3s",
          }}
        >
          <RezervasyonHero />
        </div>
        {/* BOŞLUK */}
        <div style={{ width: gapW, minWidth: 20 }} />
        {/* VIDEO */}
        <div
          style={{
            width: videoW,
            minWidth: 220,
            transition: "width 0.3s",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {/* Eğer video dışarıdan geldiyse burada import et veya <video ... /> ile göster */}
        </div>
      </div>

      {/* === ALT KISIM === */}
      <AdvantagesBar />
      <TestimonialsSlider />
    </main>
  );
}
