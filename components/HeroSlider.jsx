// === Dosya: components/HeroSlider.jsx ===

"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const heroImages = [
  "/Hero1.png", "/Hero2.png", "/Hero3.png", "/Hero4.png", "/Hero5.png",
  "/Hero6.png", "/Hero7.png", "/Hero8.png", "/Hero9.png"
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [manualPause, setManualPause] = useState(false);
  const pauseTimeoutRef = useRef();

  useEffect(() => {
    if (manualPause) return;
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroImages.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [manualPause, currentSlide]);

  const handleNav = (dir) => {
    setCurrentSlide(dir === "right"
      ? (currentSlide + 1) % heroImages.length
      : (currentSlide - 1 + heroImages.length) % heroImages.length
    );
    setManualPause(true);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => setManualPause(false), 15000);
  };

  return (
    <section className="relative w-full flex items-center justify-center overflow-hidden select-none hero-slider-cinema-v2">
      {/* SİYAH ARKA PLAN */}
      <div className="absolute inset-0 bg-black z-0" />
      {/* RESİMLER */}
      {heroImages.map((src, idx) => (
        <div
          key={src}
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000
            ${currentSlide === idx ? "opacity-100 z-10" : "opacity-0 z-0"}
          `}
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <Image
            src={src}
            alt={`VIP Transfer ${idx + 1}`}
            fill
            priority={idx === 0}
            sizes="100vw"
            draggable={false}
            style={{
              objectFit: "contain",
              width: "100%",
              height: "100%",
              maxHeight: "100%",
              maxWidth: "100%",
              background: "#000",
              borderRadius: "18px",
              boxShadow: "0 2px 24px 0 #0006"
            }}
          />
        </div>
      ))}
      {/* SLIDER BUTTONS */}
      <button
        onClick={() => handleNav("left")}
        aria-label="Önceki"
        className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-gold/40 transition rounded-full w-11 h-11 flex items-center justify-center text-white opacity-60 hover:opacity-90 text-2xl"
        style={{ outline: "none", border: "none" }}
      >
        &#8592;
      </button>
      <button
        onClick={() => handleNav("right")}
        aria-label="Sonraki"
        className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-gold/40 transition rounded-full w-11 h-11 flex items-center justify-center text-white opacity-60 hover:opacity-90 text-2xl"
        style={{ outline: "none", border: "none" }}
      >
        &#8594;
      </button>
      {/* Dot indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {heroImages.map((_, i) => (
          <span
            key={i}
            className={`w-3 h-3 rounded-full ${i === currentSlide ? "bg-gold" : "bg-white/20"} border border-gold transition`}
            style={{ display: "inline-block", cursor: "pointer" }}
            onClick={() => { setCurrentSlide(i); setManualPause(true); }}
          />
        ))}
      </div>
      {/* RESPONSIVE STİL */}
      <style jsx>{`
        .hero-slider-cinema-v2 {
          width: 100vw;
          max-width: 100vw;
          min-height: 45vw;
          height: 46vw;
          max-height: 63vh;
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        @media (min-width: 1600px) {
          .hero-slider-cinema-v2 {
            min-height: 32vw;
            height: 33vw;
            max-height: 640px;
          }
        }
        @media (max-width: 1200px) {
          .hero-slider-cinema-v2 {
            min-height: 38vw;
            height: 45vw;
            max-height: 52vw;
          }
        }
        @media (max-width: 900px) {
          .hero-slider-cinema-v2 {
            min-height: 27vw;
            height: 44vw;
            max-height: 300px;
          }
        }
        @media (max-width: 700px) {
          .hero-slider-cinema-v2 {
            min-height: 160px;
            height: 44vw;
            max-height: 230px;
          }
        }
        @media (max-width: 450px) {
          .hero-slider-cinema-v2 {
            min-height: 95px;
            height: 52vw;
            max-height: 128px;
          }
        }
      `}</style>
    </section>
  );
}

// === Dosya SONU: components/HeroSlider.jsx ===
