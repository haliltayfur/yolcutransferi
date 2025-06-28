// === Dosya: components/HeroSlider.jsx ===

"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

// Görseller 16:7 (sinema) oranına yakınsa burayı güncelle
const ASPECT_RATIO = 16 / 7;
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
    <section className="relative w-full flex items-center justify-center overflow-hidden select-none hero-cinema">
      <div className="relative w-full mx-auto hero-img-box">
        {heroImages.map((src, idx) => (
          <Image
            key={src}
            src={src}
            alt={`VIP Transfer ${idx + 1}`}
            fill
            className={`object-contain transition-opacity duration-1000 hero-image ${currentSlide === idx ? "opacity-100 z-10" : "opacity-0 z-0"}`}
            priority={idx === 0}
            sizes="100vw"
            draggable={false}
            style={{
              objectFit: "contain"
            }}
          />
        ))}
        {/* Slider dots */}
        <div className="absolute bottom-2 left-0 w-full flex justify-center z-20 gap-1">
          {heroImages.map((_, i) => (
            <span
              key={i}
              className={`block rounded-full transition-all duration-200 ${i === currentSlide ? "bg-gold w-3 h-3" : "bg-[#ddd8]/60 w-2 h-2"}`}
              style={{
                margin: "0 2px"
              }}
            />
          ))}
        </div>
        {/* Butonlar */}
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
      </div>
      <style jsx>{`
        .hero-cinema {
          min-height: 280px;
          background: #000;
        }
        .hero-img-box {
          position: relative;
          width: 100vw;
          max-width: 1800px;
          aspect-ratio: ${ASPECT_RATIO};
          min-height: 230px;
          max-height: 68vh;
          margin: 0 auto;
        }
        .hero-image {
          /* Fill container without kırpma */
          transition: opacity .7s;
        }
        @media (max-width: 1100px) {
          .hero-img-box {
            max-width: 99vw;
            aspect-ratio: ${ASPECT_RATIO};
            max-height: 54vw;
          }
        }
        @media (max-width: 700px) {
          .hero-img-box {
            min-height: 170px;
            aspect-ratio: 1.78; /* 16:9 oranına yakınlaştır */
            max-height: 45vw;
          }
        }
        @media (max-width: 600px) {
          .hero-img-box {
            max-width: 100vw;
            min-height: 120px;
            aspect-ratio: 1.78;
            max-height: 60vw;
          }
        }
        @media (max-width: 480px) {
          .hero-img-box {
            min-height: 100px;
            aspect-ratio: 1.7;
            max-height: 63vw;
          }
        }
      `}</style>
    </section>
  );
}

// === Dosya SONU: components/HeroSlider.jsx ===
