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
    <section className="relative w-full min-h-[370px] md:min-h-[480px] flex items-center justify-center overflow-hidden select-none">
      {heroImages.map((src, idx) => (
        <Image
          key={src}
          src={src}
          alt={`VIP Transfer ${idx + 1}`}
          fill
          className={`object-cover object-center transition-opacity duration-1000 ${currentSlide === idx ? "opacity-100 z-10" : "opacity-0 z-0"}`}
          priority={idx === 0}
          sizes="100vw"
          draggable={false}
        />
      ))}
      <button
        onClick={() => handleNav("left")}
        aria-label="Önceki"
        className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-30 bg-black/25 hover:bg-gold/40 transition rounded-full w-11 h-11 flex items-center justify-center text-white opacity-60 hover:opacity-90 text-2xl"
        style={{outline: "none", border: "none"}}
      >
        &#8592;
      </button>
      <button
        onClick={() => handleNav("right")}
        aria-label="Sonraki"
        className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-30 bg-black/25 hover:bg-gold/40 transition rounded-full w-11 h-11 flex items-center justify-center text-white opacity-60 hover:opacity-90 text-2xl"
        style={{outline: "none", border: "none"}}
      >
        &#8594;
      </button>
    </section>
  );
}
