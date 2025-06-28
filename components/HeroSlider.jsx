// === Dosya: components/HeroSlider.jsx ===

"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const heroImages = [
  "/Hero1.png", "/Hero2.png", "/Hero3.png", "/Hero4.png", "/Hero5.png",
  "/Hero6.png", "/Hero7.png", "/Hero8.png", "/Hero9.png"
];

// * Sağ-sol efektli ve kaydırmalı slider için*
export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState("right"); // transition yönü
  const [animating, setAnimating] = useState(false);

  // Oto-ileri
  useEffect(() => {
    const timer = setTimeout(() => handleNav("right"), 8000);
    return () => clearTimeout(timer);
  }, [current]);

  // Kaydırma fonksiyonu
  function handleNav(direction) {
    if (animating) return;
    setDir(direction);
    setAnimating(true);
    setTimeout(() => {
      setCurrent((old) => {
        if (direction === "right") return (old + 1) % heroImages.length;
        else return (old - 1 + heroImages.length) % heroImages.length;
      });
      setAnimating(false);
    }, 500); // animasyon süresi ile eşit
  }

  // Önceki ve sonraki indexler
  const prevIdx = (current - 1 + heroImages.length) % heroImages.length;
  const nextIdx = (current + 1) % heroImages.length;

  // Mobilde önceki gibi tam ekran kalsın (senin istediğin buydu)
  const isMobile = typeof window !== "undefined" && window.innerWidth < 700;
  if (isMobile) {
    return (
      <section className="relative w-full flex flex-col items-center overflow-x-hidden select-none hero-cinema">
        <div className="w-full h-3 block"></div>
        <div className="relative w-full mx-auto mob-slider-box">
          <Image
            src={heroImages[current]}
            alt=""
            fill
            className="object-cover rounded-xl shadow-lg transition-all"
            priority
            draggable={false}
            style={{ borderRadius: "10px" }}
          />
          <div className="absolute left-2 top-1/2 -translate-y-1/2 z-30">
            <button
              aria-label="Sol"
              className="mob-arrow"
              onClick={() => handleNav("left")}
            >&#8592;</button>
          </div>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 z-30">
            <button
              aria-label="Sağ"
              className="mob-arrow"
              onClick={() => handleNav("right")}
            >&#8594;</button>
          </div>
        </div>
        <style jsx>{`
          .mob-slider-box { aspect-ratio: 1.78; min-height: 120px; }
          .mob-arrow {
            background: #FFD700;
            border-radius: 100%;
            border: none;
            font-size: 1.5rem;
            padding: 7px 13px;
            color: #111;
            box-shadow: 0 1px 8px #FFD70033;
          }
        `}</style>
      </section>
    );
  }

  // DESKTOP: büyük, “sinema” gibi ve sağ/sol blur/uzatma + animasyon
  return (
    <section className="relative w-full flex flex-col items-center select-none">
      <div className="w-full h-8 block"></div>
      <div className="cinema-slider-container">
        {/* Önceki resim uzatma/fade */}
        <div className="side-img side-left" onClick={() => handleNav("left")}>
          <Image
            src={heroImages[prevIdx]}
            alt=""
            fill
            className="object-cover blur-[3px]"
            style={{
              opacity: 0.23,
              filter: "brightness(.75) blur(3.5px) grayscale(.18)"
            }}
            draggable={false}
          />
        </div>
        {/* Sonraki resim uzatma/fade */}
        <div className="side-img side-right" onClick={() => handleNav("right")}>
          <Image
            src={heroImages[nextIdx]}
            alt=""
            fill
            className="object-cover blur-[3px]"
            style={{
              opacity: 0.23,
              filter: "brightness(.75) blur(3.5px) grayscale(.18)"
            }}
            draggable={false}
          />
        </div>
        {/* Asıl ana slider görseli */}
        <div
          className={
            `main-img-zone ${animating ? (dir === "right" ? "anim-right" : "anim-left") : ""}`
          }
        >
          <Image
            src={heroImages[current]}
            alt=""
            fill
            className="object-contain main-img"
            priority
            draggable={false}
          />
        </div>
        {/* Dotlar */}
        <div className="absolute bottom-7 left-0 w-full flex justify-center z-30 gap-2 select-none">
          {heroImages.map((_, i) => (
            <div
              key={i}
              className={`slider-dot ${i === current ? "active" : ""}`}
              style={{
                transition: "all 0.23s cubic-bezier(.68,-0.55,.27,1.55)",
                transform: i === current ? "scale(1.25) translateY(-2px)" : "scale(1) translateY(0)",
                background: i === current
                  ? "linear-gradient(135deg, #FFD700 60%, #fff60099 100%)"
                  : "rgba(60,60,60,0.16)",
                boxShadow: i === current ? "0 2px 10px #FFD70066" : "none",
                border: i === current ? "2px solid #FFD700" : "1.1px solid #555",
                width: i === current ? "16px" : "10px",
                height: i === current ? "16px" : "10px",
                borderRadius: "7px",
                margin: "0 3px"
              }}
              onClick={() => setCurrent(i)}
            ></div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .cinema-slider-container {
          width: 98vw; max-width: 1900px; aspect-ratio: 2.45;
          min-height: 430px; max-height: 72vh;
          position: relative;
          display: flex; align-items: center; justify-content: center;
          background: #131212;
          border-radius: 29px;
          overflow: visible;
          box-shadow: 0 6px 36px #000a, 0 2.5px 16px #FFD70024;
        }
        .side-img {
          position: absolute;
          top: 0; width: 17vw; min-width: 90px; max-width: 220px;
          height: 100%; z-index: 2;
          cursor: pointer; border-radius: 26px;
          transition: opacity .28s;
          overflow: hidden;
        }
        .side-left { left: -6px; box-shadow: -4px 0 18px #0005; }
        .side-right { right: -6px; box-shadow: 4px 0 18px #0005; }
        .main-img-zone {
          position: relative;
          width: 74vw; max-width: 1440px; height: 100%; aspect-ratio: 2.45;
          z-index: 4; border-radius: 28px;
          overflow: hidden;
          background: #181817;
          box-shadow: 0 3px 24px #FFD70014;
          transition: box-shadow .22s;
        }
        .main-img {
          object-fit: contain !important;
          width: 100%; height: 100%;
          border-radius: 28px;
          box-shadow: 0 2.5px 15px #FFD70012;
        }
        /* Animasyonlar */
        .anim-right { animation: slideRight .5s; }
        .anim-left { animation: slideLeft .5s; }
        @keyframes slideRight {
          from { transform: translateX(54%); opacity: 0.3;}
          to   { transform: translateX(0); opacity: 1;}
        }
        @keyframes slideLeft {
          from { transform: translateX(-54%); opacity: 0.3;}
          to   { transform: translateX(0); opacity: 1;}
        }
        .slider-dot { display: inline-block; cursor: pointer;}
        .slider-dot.active { animation: bounceDot 0.45s; }
        @keyframes bounceDot {
          0% { transform: scale(1) translateY(0);}
          40% { transform: scale(1.4) translateY(-8px);}
          80% { transform: scale(1.2) translateY(-2px);}
          100% { transform: scale(1.25) translateY(-2px);}
        }
        @media (max-width: 900px) {
          .cinema-slider-container { width: 99vw; aspect-ratio: 2; }
          .main-img-zone { width: 85vw; max-width: 98vw; }
          .side-img { min-width: 50px; }
        }
        @media (max-width: 600px) {
          .main-img-zone { border-radius: 14px; }
          .side-img { border-radius: 12px; }
        }
      `}</style>
    </section>
  );
}

// === Dosya SONU: components/HeroSlider.jsx ===
