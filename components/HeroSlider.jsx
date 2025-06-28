// === Dosya: components/HeroSlider.jsx ===

"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const heroImages = [
  "/Hero1.png", "/Hero2.png", "/Hero3.png", "/Hero4.png", "/Hero5.png",
  "/Hero6.png", "/Hero7.png", "/Hero8.png", "/Hero9.png"
];
const ASPECT_RATIO = 16 / 7;

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [manualPause, setManualPause] = useState(false);
  const pauseTimeoutRef = useRef();

  // Touch swipe için
  const sliderRef = useRef(null);
  let startX = null;

  useEffect(() => {
    if (manualPause) return;
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroImages.length);
    }, 9000);
    return () => clearInterval(interval);
  }, [manualPause, currentSlide]);

  const handleNav = (dir) => {
    setCurrentSlide(dir === "right"
      ? (currentSlide + 1) % heroImages.length
      : (currentSlide - 1 + heroImages.length) % heroImages.length
    );
    setManualPause(true);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => setManualPause(false), 12000);
  };

  // Swipe eventleri
  const handleTouchStart = (e) => {
    startX = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (!startX) return;
    let endX = e.changedTouches[0].clientX;
    let diff = startX - endX;
    if (Math.abs(diff) > 42) {
      if (diff > 0) handleNav("right");
      else handleNav("left");
    }
    startX = null;
  };

  // Sonraki/önceki index (wrap around)
  const prevIndex = (currentSlide - 1 + heroImages.length) % heroImages.length;
  const nextIndex = (currentSlide + 1) % heroImages.length;

  return (
    <section className="relative w-full flex flex-col items-center overflow-x-hidden select-none hero-cinema">
      {/* Header'dan sonra 1rem boşluk */}
      <div className="w-full h-4 block md:h-6"></div>
      <div
        className="relative w-full mx-auto hero-img-box group"
        ref={sliderRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Prev Gölge - Sadece desktop/tablet */}
        <div
          className="absolute z-20 top-0 left-0 h-full prev-img-box cursor-pointer hidden md:block"
          onClick={() => handleNav("left")}
        >
          <Image
            src={heroImages[prevIndex]}
            alt="Önceki"
            fill
            draggable={false}
            className="object-cover object-center opacity-60 blur-[2px] scale-95 grayscale"
            style={{
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20,
              filter: "brightness(.7) blur(1.7px) grayscale(0.58)",
            }}
          />
        </div>
        {/* Next Gölge - Sadece desktop/tablet */}
        <div
          className="absolute z-20 top-0 right-0 h-full next-img-box cursor-pointer hidden md:block"
          onClick={() => handleNav("right")}
        >
          <Image
            src={heroImages[nextIndex]}
            alt="Sonraki"
            fill
            draggable={false}
            className="object-cover object-center opacity-60 blur-[2px] scale-95 grayscale"
            style={{
              borderTopRightRadius: 20,
              borderBottomRightRadius: 20,
              filter: "brightness(.7) blur(1.7px) grayscale(0.58)",
            }}
          />
        </div>
        {/* Aktif ana resim */}
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
        {/* Dotlar */}
        <div className="absolute bottom-4 left-0 w-full flex justify-center z-30 gap-2 select-none">
          {heroImages.map((_, i) => (
            <div
              key={i}
              className={`slider-dot ${i === currentSlide ? "active" : ""}`}
              style={{
                transition: "all 0.33s cubic-bezier(.68,-0.55,.27,1.55)",
                transform: i === currentSlide ? "scale(1.3) translateY(-3px)" : "scale(1) translateY(0)",
                background: i === currentSlide
                  ? "linear-gradient(135deg, #FFD700 60%, #fff60088 100%)"
                  : "rgba(60,60,60,0.18)",
                boxShadow: i === currentSlide ? "0 2px 10px #FFD70088" : "none",
                border: i === currentSlide ? "2px solid #FFD700" : "1.2px solid #555",
                width: i === currentSlide ? "18px" : "12px",
                height: i === currentSlide ? "18px" : "12px",
                borderRadius: "6px",
                margin: "0 3px"
              }}
              onClick={() => setCurrentSlide(i)}
            ></div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .hero-cinema { background: #000; }
        .hero-img-box {
          position: relative;
          width: 97vw;
          max-width: 1920px;
          aspect-ratio: ${ASPECT_RATIO};
          min-height: 260px;
          max-height: 69vh;
          margin: 0 auto;
          border-radius: 20px;
          overflow: visible;
          box-shadow: 0 3px 28px #0009, 0 1.5px 8px #FFD70011;
        }
        .hero-image { transition: opacity .7s; }
        .slider-dot {
          display: inline-block;
          transition: all 0.33s cubic-bezier(.68,-0.55,.27,1.55);
          cursor: pointer;
        }
        .slider-dot.active { animation: bounceDot 0.72s; }
        @keyframes bounceDot {
          0% { transform: scale(1) translateY(0);}
          40% { transform: scale(1.5) translateY(-8px);}
          80% { transform: scale(1.2) translateY(-3px);}
          100% { transform: scale(1.3) translateY(-3px);}
        }
        /* Yan resim kutuları: hover'da parlasın */
        .prev-img-box, .next-img-box {
          width: 60px; min-width: 60px; max-width: 80px;
          height: 100%;
          opacity: 0.95;
          transition: box-shadow .2s, opacity .2s, filter .2s;
        }
        .prev-img-box:hover, .next-img-box:hover {
          box-shadow: 0 2px 14px #FFD70099, 0 0 12px #FFD70022;
          opacity: 1;
          filter: brightness(1) blur(.9px);
        }
        @media (max-width: 900px) {
          .hero-img-box { max-width: 99vw; min-height: 170px; }
          .prev-img-box, .next-img-box { width: 42px; min-width: 32px; }
        }
        @media (max-width: 700px) {
          .hero-img-box {
            max-width: 100vw;
            aspect-ratio: 1.78;
            min-height: 135px;
            border-radius: 10px;
            max-height: 65vw;
          }
          .prev-img-box, .next-img-box { display: none !important; }
        }
        @media (max-width: 480px) {
          .hero-img-box {
            min-height: 86px;
            aspect-ratio: 1.72;
            border-radius: 7px;
          }
        }
      `}</style>
    </section>
  );
}

// === Dosya SONU: components/HeroSlider.jsx ===
