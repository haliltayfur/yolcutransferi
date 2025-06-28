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
    <section className="relative w-full flex items-center justify-center overflow-hidden select-none hero-slider-cinema">
      {heroImages.map((src, idx) => (
        <div
          key={src}
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000
            ${currentSlide === idx ? "opacity-100 z-10" : "opacity-0 z-0"}
          `}
          style={{
            width: "100%",
            height: "100%",
            background: "#000"
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
              transition: "opacity 0.9s",
              background: "#000"
            }}
          />
        </div>
      ))}
      {/* SLIDER BUTTONS */}
      <button
        onClick={() => handleNav("left")}
        aria-label="Önceki"
        className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-30 bg-black/25 hover:bg-gold/40 transition rounded-full w-11 h-11 flex items-center justify-center text-white opacity-60 hover:opacity-90 text-2xl"
        style={{ outline: "none", border: "none" }}
      >
        &#8592;
      </button>
      <button
        onClick={() => handleNav("right")}
        aria-label="Sonraki"
        className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-30 bg-black/25 hover:bg-gold/40 transition rounded-full w-11 h-11 flex items-center justify-center text-white opacity-60 hover:opacity-90 text-2xl"
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
            style={{ display: "inline-block" }}
            onClick={() => { setCurrentSlide(i); setManualPause(true); }}
          />
        ))}
      </div>
      <style jsx>{`
        .hero-slider-cinema {
          min-height: 260px;
          height: 36vw;
          max-height: 540px;
          background: #000;
        }
        @media (max-width: 900px) {
          .hero-slider-cinema {
            min-height: 180px;
            height: 45vw;
            max-height: 340px;
          }
        }
        @media (max-width: 600px) {
          .hero-slider-cinema {
            min-height: 160px;
            height: 48vw;
            max-height: 220px;
          }
        }
        @media (max-width: 420px) {
          .hero-slider-cinema {
            min-height: 118px;
            height: 52vw;
            max-height: 170px;
          }
        }
      `}</style>
    </section>
  );
}

// === Dosya SONU: components/HeroSlider.jsx ===
