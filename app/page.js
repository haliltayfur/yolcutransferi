// PATH: app/page.js
"use client";
import { useRef, useEffect, useState } from "react";
import HeroSlider from "../components/HeroSlider";
import RezervasyonHero from "../components/RezervasyonHero";
import AdvantagesBar from "../components/AdvantagesBar";
import TestimonialsSlider from "../components/TestimonialsSlider";

export default function Home() {
  // 1. Slider'ın genişliğini ölç
  const sliderRef = useRef();
  const [sliderWidth, setSliderWidth] = useState(1200);

  useEffect(() => {
    function handleResize() {
      if (sliderRef.current) {
        setSliderWidth(sliderRef.current.offsetWidth);
      }
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 2. Form ve video oranları (örn: %68 ve %30, %2 aralık)
  const formW = sliderWidth * 0.68;
  const videoW = sliderWidth * 0.30;
  const gapW = sliderWidth * 0.02;

  return (
    <main className="w-full flex flex-col items-center">
      {/* SLIDER */}
      <div ref={sliderRef} className="w-full flex justify-center">
        <HeroSlider />
      </div>
      {/* ALT GRID */}
      <div
        className="flex flex-row justify-start items-start mt-8 mb-12"
        style={{
          width: sliderWidth,
          maxWidth: "96vw",
          margin: "0 auto",
        }}
      >
        {/* FORM */}
        <div
          style={{
            width: formW,
            minWidth: 300,
            marginRight: gapW,
            transition: "width 0.3s",
          }}
        >
          <RezervasyonHero />
        </div>
        {/* VIDEO */}
        <div
          style={{
            width: videoW,
            minWidth: 180,
            transition: "width 0.3s",
          }}
        >
          {/* RezervasyonHero içinde video varsa oradan çıkar, dışarıda <video> da koyabilirsin. */}
          {/* Eğer video burada ise: */}
          {/* <video src="/public/reklam.mp4" controls style={{ width: "100%", borderRadius: 18 }} /> */}
        </div>
      </div>
      {/* DİĞER BÖLÜMLER */}
      <AdvantagesBar />
      <TestimonialsSlider />
    </main>
  );
}
