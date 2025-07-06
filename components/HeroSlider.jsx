// === Dosya: /components/HeroSlider.jsx ===

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
    const timer = setTimeout(() => setCurrent((prev) => (prev + 1) % heroImages.length), 9000);
    return () => clearTimeout(timer);
  }, [current, isMobile]);

  // Click ile slide değişimi
  function handleClick(e) {
    if (!sliderRef.current) return;
    const bounds = sliderRef.current.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const w = bounds.width;
    if (x > w * 0.5) setCurrent((prev) => (prev + 1) % heroImages.length);
    else setCurrent((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  }

  // Mobil
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
            onClick={handleClick}
          />
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

  // Desktop
  return (
    <section className="relative w-full select-none flex flex-col items-center">
      <div className="w-full h-8 block" />
      <div
        ref={sliderRef}
        onClick={handleClick}
        className="cinema-slider-desktop relative flex items-center justify-center overflow-hidden rounded-3xl cursor-pointer"
        style={{
          width: "min(100vw, 2000px)",
          height: "min(78vw, 670px)",
          minHeight: "380px",
          maxHeight: "670px",
          boxShadow: "0 10px 34px #000b, 0 4px 24px #FFD70018",
        }}
        title="İleri/geri gitmek için slayda tıklayın"
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
        {/* Dotlar */}
        <div className="absolute bottom-5 left-0 w-full flex justify-center z-30 gap-2 select-none">
          {heroImages.map((_, i) => (
            <div
              key={i}
              className={`slider-dot ${i === current ? "active" : ""}`}
              onClick={e => { e.stopPropagation(); setCurrent(i); }}
            />
          ))}
        </div>
      </div>
      <style jsx>{`
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
          .cinema-slider-desktop { height: min(75vw, 480px) !important; }
        }
        @media (max-width: 900px) {
          .cinema-slider-desktop { height: min(90vw, 270px) !important; }
        }
      `}</style>
    </section>
  );
}

// === Dosya SONU: /components/HeroSlider.jsx ===
