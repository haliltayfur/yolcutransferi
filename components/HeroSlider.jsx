// === Dosya: components/HeroSlider.jsx ===

"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const heroImages = [
  "/Hero1.png", "/Hero2.png", "/Hero3.png", "/Hero4.png", "/Hero5.png",
  "/Hero6.png", "/Hero7.png", "/Hero8.png", "/Hero9.png"
];

// **SVG Fish Scale MASK**
const FishMask = ({ side }) => (
  <svg width="100%" height="100%" style={{position:"absolute",top:0,left:0,pointerEvents:"none",zIndex:9}} viewBox="0 0 100 100" preserveAspectRatio="none">
    <defs>
      <linearGradient id={`fade${side}`} x1={side==="left"?1:0} y1="0" x2={side==="left"?0:1} y2="0">
        <stop offset="0%" stopColor="#fff" stopOpacity="0.04"/>
        <stop offset="60%" stopColor="#fff" stopOpacity="0.35"/>
        <stop offset="85%" stopColor="#fff" stopOpacity="0.86"/>
        <stop offset="100%" stopColor="#fff" stopOpacity="1"/>
      </linearGradient>
      <pattern id={`fish${side}`} patternUnits="userSpaceOnUse" width="16" height="14">
        <ellipse cx="8" cy="7" rx="8" ry="7" fill={`url(#fade${side})`} />
      </pattern>
      <mask id={`fishMask${side}`}>
        <rect width="100" height="100" fill={`url(#fish${side})`} />
      </mask>
    </defs>
    <rect width="100" height="100" fill="#fff" mask={`url(#fishMask${side})`} />
  </svg>
);

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const check = () => setIsMobile(window.innerWidth < 700);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Otomatik geçiş
  useEffect(() => {
    if (isMobile) return;
    const timer = setTimeout(() => handleNav("right"), 9000);
    return () => clearTimeout(timer);
  }, [current, isMobile]);

  function handleNav(direction) {
    setCurrent((old) => {
      if (direction === "right") return (old + 1) % heroImages.length;
      else return (old - 1 + heroImages.length) % heroImages.length;
    });
  }

  const prevIdx = (current - 1 + heroImages.length) % heroImages.length;
  const nextIdx = (current + 1) % heroImages.length;

  // MOBILDE - ELLEME!
  if (isMobile) {
    return (
      <section className="relative w-full flex flex-col items-center overflow-x-hidden select-none hero-cinema">
        <div className="w-full h-3 block"></div>
        <div className="relative w-full mob-slider-box aspect-[1.78]">
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

  // DESKTOP: BALIK DERİSİ EFFECT & MODERN!
  return (
    <section className="relative w-full flex flex-col items-center select-none">
      <div className="w-full h-8 block"></div>
      <div className="fish-cinema-slider">
        {/* Balık derisi parçalı efekti: Sol */}
        <div className="fish-side fish-left" onClick={() => handleNav("left")}>
          <Image
            src={heroImages[prevIdx]}
            alt="Önceki"
            fill
            className="object-cover fish-img"
            draggable={false}
            style={{ filter: "blur(2px) grayscale(20%) brightness(0.75)", opacity: .38 }}
          />
          <FishMask side="left"/>
        </div>
        {/* Balık derisi parçalı efekti: Sağ */}
        <div className="fish-side fish-right" onClick={() => handleNav("right")}>
          <Image
            src={heroImages[nextIdx]}
            alt="Sonraki"
            fill
            className="object-cover fish-img"
            draggable={false}
            style={{ filter: "blur(2px) grayscale(20%) brightness(0.75)", opacity: .38 }}
          />
          <FishMask side="right"/>
        </div>
        {/* Asıl ana slider görseli */}
        <div className="fish-main">
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
        <div className="absolute bottom-8 left-0 w-full flex justify-center z-30 gap-2 select-none">
          {heroImages.map((_, i) => (
            <div
              key={i}
              className={`slider-dot ${i === current ? "active" : ""}`}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>
      </div>
      <style jsx>{`
        .fish-cinema-slider {
          width: 99vw; max-width: 1850px; aspect-ratio: 2.38;
          min-height: 450px; max-height: 76vh;
          position: relative; display: flex; align-items: center; justify-content: center;
          background: #131212; border-radius: 28px;
          overflow: visible;
          box-shadow: 0 6px 32px #000b, 0 2.5px 15px #FFD70028;
        }
        .fish-side {
          position: absolute;
          top: 0; width: 15vw; min-width: 110px; max-width: 200px;
          height: 100%; z-index: 2; cursor: pointer; border-radius: 26px;
          overflow: hidden;
          transition: box-shadow .23s, filter .21s;
        }
        .fish-left { left: -6px; box-shadow: -4px 0 14px #0004; }
        .fish-right { right: -6px; box-shadow: 4px 0 14px #0004; }
        .fish-side:hover { box-shadow: 0 0 24px #FFD70066, 0 0 32px #FFD70022;}
        .fish-img { width:100%;height:100%;object-fit:cover;}
        .fish-main {
          position: relative; z-index: 5;
          width: 78vw; max-width: 1500px; height: 100%; aspect-ratio: 2.38;
          border-radius: 27px; overflow: hidden;
          background: #181817;
        }
        .main-img {
          object-fit: contain !important;
          width: 100%; height: 100%;
          border-radius: 28px;
          box-shadow: 0 2.5px 15px #FFD70012;
        }
        .slider-dot {
          background: #FFD70090;
          border-radius: 50%; width: 12px; height: 12px;
          margin: 0 4px; cursor: pointer;
          border: 2.5px solid #FFD70033;
          transition: all 0.21s;
          box-shadow: 0 1.5px 5px #FFD70020;
        }
        .slider-dot.active {
          background: #FFD700;
          box-shadow: 0 3px 15px #FFD70044, 0 1px 7px #FFD70038;
          border: 2.5px solid #fff800;
        }
        @media (max-width: 1200px) {
          .fish-cinema-slider { min-height: 350px; }
          .fish-main { width: 82vw; }
        }
        @media (max-width: 900px) {
          .fish-cinema-slider { aspect-ratio: 2; min-height: 220px; }
          .fish-main { width: 96vw; }
        }
      `}</style>
    </section>
  );
}

// === Dosya SONU: components/HeroSlider.jsx ===
