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

  // Otomatik geçiş (desktopta)
  useEffect(() => {
    if (isMobile) return;
    const timer = setTimeout(() => {
      setCurrent(prev => (prev + 1) % heroImages.length);
    }, 9000);
    return () => clearTimeout(timer);
  }, [current, isMobile]);

  // Slider tıklama (SAĞA = ileri, SOLA = geri) — her tıklamada sadece bir hareket!
  function handleSliderClick(e) {
    if (!sliderRef.current) return;
    let x, w;
    if (e.touches) {
      // Mobil dokunma
      const touch = e.touches[0];
      const bounds = sliderRef.current.getBoundingClientRect();
      x = touch.clientX - bounds.left;
      w = bounds.width;
    } else {
      const bounds = sliderRef.current.getBoundingClientRect();
      x = e.clientX - bounds.left;
      w = bounds.width;
    }
    if (x > w * 0.5) {
      setCurrent(prev => (prev + 1) % heroImages.length);
    } else {
      setCurrent(prev => (prev - 1 + heroImages.length) % heroImages.length);
    }
  }

  // Dot üzerinden seç
  const goTo = i => setCurrent(i);

  return (
    <section className="relative w-full select-none flex flex-col items-center">
      <div className="w-full h-4 block" /> {/* Header'dan hemen sonra tek boşluk */}
      <div
        ref={sliderRef}
        onClick={handleSliderClick}
        onTouchStart={e => {
          // Tek dokunuşta 1 geçiş için
          if (e.touches.length === 1) handleSliderClick(e);
        }}
        className="cinema-slider-desktop relative flex items-center justify-center overflow-hidden rounded-3xl cursor-pointer"
        style={{
          width: "min(100vw, 2000px)",
          height: "min(78vw, 670px)",
          minHeight: "380px",
          maxHeight: "670px",
          boxShadow: "0 10px 34px #000b, 0 4px 24px #FFD70018",
          margin: "0 auto"
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
        {/* Dotlar */}
        <div className="absolute bottom-5 left-0 w-full flex justify-center z-30 gap-2 select-none">
          {heroImages.map((_, i) => (
            <div
              key={i}
              className={`slider-dot ${i === current ? "active" : ""}`}
              onClick={e => {
                e.stopPropagation();
                goTo(i);
              }}
            />
          ))}
        </div>
      </div>
      <style jsx>{`
        .cinema-slider-desktop { }
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
