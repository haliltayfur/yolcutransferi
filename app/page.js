"use client";
import { useRef, useEffect, useState } from "react";
import HeroSlider from "../components/HeroSlider";
import RezervasyonHero from "../components/RezervasyonHero";
import AdvantagesBar from "../components/AdvantagesBar";
import TestimonialsSlider from "../components/TestimonialsSlider";

export default function Home() {
  // SLIDER genişliğini ölç
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

  // ORANLAR (68-2-30 gibi)
  const formW = sliderWidth * 0.68;
  const gapW = sliderWidth * 0.02;
  const videoW = sliderWidth * 0.30;

  return (
    <main className="w-full flex flex-col items-center">
      {/* SLIDER tam container! */}
      <div
        ref={sliderOuterRef}
        style={{
          width: "min(100vw, 2000px)",
          margin: "0 auto",
        }}
      >
        <HeroSlider />
      </div>
      {/* ALT GRID tam slider genişliğiyle aynı, tam altına! */}
      <div
        className="flex flex-row justify-between items-start mt-10 mb-12"
        style={{
          width: sliderWidth,
          maxWidth: "2000px",
          margin: "0 auto",
        }}
      >
        {/* FORM */}
        <div
          style={{
            width: formW,
            minWidth: 300,
            transition: "width 0.3s",
          }}
        >
          <RezervasyonHero />
        </div>
        {/* BOŞLUK */}
        <div style={{ width: gapW, minWidth: 10 }} />
        {/* VIDEO */}
        <div
          style={{
            width: videoW,
            minWidth: 180,
            transition: "width 0.3s",
          }}
        >
          {/* Eğer video dışarıda ise: */}
          {/* <video src="/public/reklam.mp4" controls style={{ width: "100%", borderRadius: 18 }} /> */}
        </div>
      </div>
      <AdvantagesBar />
      <TestimonialsSlider />
    </main>
  );
}
