// === Dosya: components/HeroSlider.jsx ===

"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const heroImages = [
  "/Hero1.png", "/Hero2.png", "/Hero3.png", "/Hero4.png", "/Hero5.png",
  "/Hero6.png", "/Hero7.png", "/Hero8.png", "/Hero9.png"
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sliderRef = useRef();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 900);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const timer = setTimeout(() => handleNav("right"), 9000);
    return () => clearTimeout(timer);
  }, [current, isMobile]);

  function handleNav(dir) {
    setCurrent(prev =>
      dir === "right"
        ? (prev + 1) % heroImages.length
        : (prev - 1 + heroImages.length) % heroImages.length
    );
  }

  // === MOBILDE FULL-WIDTH, YÜKSEKLİK OTOMATİK, YANA OKLAR BUTONLAR ===
  if (isMobile) {
    return (
      <section className="relative w-full select-none">
        <div className="w-full h-3 block" />
        <div className="relative w-full aspect-[1.78]">
          <Image
            src={heroImages[current]}
            alt=""
            fill
            className="object-cover rounded-xl shadow-lg transition-all"
            priority
            draggable={false}
            style={{ borderRadius: "11px" }}
          />
          <button
            aria-label="Önceki"
            className="slider-arrow left-2"
            style={{ left: 2 }}
            onClick={() => handleNav("left")}
          >&#8592;</button>
          <button
            aria-label="Sonraki"
            className="slider-arrow right-2"
            style={{ right: 2 }}
            onClick={() => handleNav("right")}
          >&#8594;</button>
        </div>
        <div className="flex justify-center gap-1 mt-3">
          {heroImages.map((_, i) => (
            <div
              key={i}
              className={`dot-mob ${i === current ? "active" : ""}`}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>
        <style jsx>{`
          .slider-arrow {
            position: absolute; top: 50%; z-index: 5;
            transform: translateY(-50%);
            background: #FFD700;
            border: none; border-radius: 50%;
            color: #19160a;
            font-size: 1.45rem;
            padding: 7px 12px;
            box-shadow: 0 1px 8px #FFD70035;
            opacity: 0.86;
            cursor: pointer;
          }
          .dot-mob {
            width: 10px; height: 10px;
            border-radius: 50%;
            background: #FFD70070;
            margin: 0 2px;
            cursor: pointer;
          }
          .dot-mob.active {
            background: #FFD700;
            border: 2px solid #fff9;
          }
        `}</style>
      </section>
    );
  }

  // === DESKTOP: FULL-WIDTH SİNEMA SLIDER ===
  return (
    <section className="relative w-full select-none flex flex-col items-center">
      <div className="w-full h-8 block" /> {/* Header'dan boşluk */}
      <div
        ref={sliderRef}
        className="cinema-slider-desktop relative flex items-center justify-center overflow-hidden rounded-3xl"
        style={{
          width: "min(94vw, 1850px)",
          height: "min(70vw, 610px)",
          minHeight: "360px",
          maxHeight: "610px",
          boxShadow: "0 10px 34px #000b, 0 4px 24px #FFD70018"
        }}
      >
        <Image
          src={heroImages[current]}
          alt=""
          fill
          priority
          draggable={false}
          className="object-contain transition-all"
          style={{
            objectFit: "contain",
            width: "100%",
            height: "100%",
            borderRadius: "22px"
          }}
        />
        <button
          aria-label="Önceki"
          className="slider-arrow left-4"
          style={{ left: 14 }}
          onClick={() => handleNav("left")}
        >&#8592;</button>
        <button
          aria-label="Sonraki"
          className="slider-arrow right-4"
          style={{ right: 14 }}
          onClick={() => handleNav("right")}
        >&#8594;</button>
        {/* Dotlar */}
        <div className="absolute bottom-5 left-0 w-full flex justify-center z-30 gap-2 select-none">
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
        .cinema-slider-desktop {
          background: #191919;
        }
        .slider-arrow {
          position: absolute; top: 50%; z-index: 6;
          transform: translateY(-50%);
          background: #FFD700;
          border: none; border-radius: 50%;
          color: #19160a;
          font-size: 2.15rem;
          padding: 11px 17px;
          box-shadow: 0 1px 14px #FFD70045;
          opacity: 0.79;
          cursor: pointer;
          transition: opacity .18s;
        }
        .slider-arrow:hover { opacity: 1; box-shadow: 0 1px 20px #FFD70080; }
        .slider-dot {
          background: #FFD70090;
          border-radius: 50%; width: 14px; height: 14px;
          margin: 0 3.5px; cursor: pointer;
          border: 2.5px solid #FFD70033;
          transition: all 0.17s;
          box-shadow: 0 1.5px 5px #FFD70022;
        }
        .slider-dot.active {
          background: #FFD700;
          box-shadow: 0 3px 15px #FFD70044, 0 1px 7px #FFD70038;
          border: 2.5px solid #fff800;
        }
        @media (max-width: 1200px) {
          .cinema-slider-desktop { height: min(67vw, 420px) !important; }
        }
        @media (max-width: 900px) {
          .cinema-slider-desktop { height: min(80vw, 270px) !important; }
        }
      `}</style>
    </section>
  );
}

// === Dosya SONU: components/HeroSlider.jsx ===
