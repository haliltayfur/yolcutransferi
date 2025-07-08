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

  // === RESPONSIVE ===
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 900);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // === AUTO SLIDE (desktopta) ===
  useEffect(() => {
    if (isMobile) return;
    const timer = setTimeout(() => setCurrent(prev => (prev + 1) % heroImages.length), 9000);
    return () => clearTimeout(timer);
  }, [current, isMobile]);

  // === MANUEL KONTROL ===
  function goNext() { setCurrent(prev => (prev + 1) % heroImages.length); }
  function goPrev() { setCurrent(prev => (prev - 1 + heroImages.length) % heroImages.length); }

  // === TIKLAMA & SWIPE ===
  // -- Mobil swipe için
  let touchStartX = null;
  let touchMove = false;

  function handleTouchStart(e) {
    if (e.touches.length === 1) {
      touchStartX = e.touches[0].clientX;
      touchMove = false;
    }
  }
  function handleTouchMove(e) {
    if (e.touches.length === 1 && touchStartX !== null) {
      const deltaX = e.touches[0].clientX - touchStartX;
      if (Math.abs(deltaX) > 40 && !touchMove) { // 1 kere swipe
        if (deltaX < 0) goNext();
        else goPrev();
        touchMove = true;
      }
    }
  }
  function handleTouchEnd(e) {
    touchStartX = null;
    touchMove = false;
  }

  // -- Mouse click
  function handleSliderClick(e) {
    if (!sliderRef.current) return;
    const bounds = sliderRef.current.getBoundingClientRect();
    let x;
    if (e.touches) { // mobile tap (not swipe)
      if (e.touches.length > 1) return;
      x = e.touches[0].clientX - bounds.left;
    } else {
      x = e.clientX - bounds.left;
    }
    if (x > bounds.width * 0.5) goNext();
    else goPrev();
  }

  // DOT (bottom indicator)
  const goTo = i => setCurrent(i);

  return (
    <section className="relative w-full select-none flex flex-col items-center">
      {/* Header'dan sonra küçük boşluk */}
      <div className="w-full" style={{height: isMobile ? 12 : 20}} />
      <div
        ref={sliderRef}
        className="cinema-slider-desktop relative flex items-center justify-center overflow-hidden rounded-3xl cursor-pointer"
        style={{
          width: "min(100vw, 2000px)",
          height: isMobile ? "min(90vw, 270px)" : "min(78vw, 670px)",
          minHeight: isMobile ? 120 : 380,
          maxHeight: isMobile ? 270 : 670,
          boxShadow: "0 10px 34px #000b, 0 4px 24px #FFD70018",
          margin: "0 auto",
        }}
        onClick={e => {
          // Mouse tıklama
          if (!isMobile) handleSliderClick(e);
        }}
        onTouchStart={e => {
          handleTouchStart(e);
        }}
        onTouchMove={e => {
          handleTouchMove(e);
        }}
        onTouchEnd={e => {
          // Tap ise: resmin sağı/solu kontrol (swipe olmadıysa)
          if (!touchMove && e.changedTouches?.[0]) handleSliderClick(e);
          handleTouchEnd(e);
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
      `}</style>
    </section>
  );
}
