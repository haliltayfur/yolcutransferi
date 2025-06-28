// === Dosya: components/HeroSlider.jsx ===

"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const heroImages = [
  "/Hero1.png", "/Hero2.png", "/Hero3.png", "/Hero4.png", "/Hero5.png",
  "/Hero6.png", "/Hero7.png", "/Hero8.png", "/Hero9.png"
];
const ASPECT_RATIO = 16 / 7; // Geniş sinema hissi için

function isMobileScreen() {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 700;
}

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [manualPause, setManualPause] = useState(false);
  const pauseTimeoutRef = useRef();
  const [isMobile, setIsMobile] = useState(isMobileScreen());

  // Ekran boyutunu dinle
  useEffect(() => {
    const onResize = () => setIsMobile(isMobileScreen());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

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

  // Touch için mobil swipe
  const sliderRef = useRef(null);
  let startX = null;
  const handleTouchStart = (e) => { startX = e.touches[0].clientX; };
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

  // Slide index wrap-around
  const prevIndex = (currentSlide - 1 + heroImages.length) % heroImages.length;
  const nextIndex = (currentSlide + 1) % heroImages.length;

  // === DESKTOP SLIDER ===
  if (!isMobile) {
    return (
      <section className="relative w-full flex flex-col items-center overflow-x-hidden select-none hero-cinema">
        <div className="w-full h-6 block"></div>
        <div
          className="relative desktop-hero-img-box group"
          style={{ margin: "0 auto" }}
        >
          {/* Önceki resmin fade-gölge gösterimi */}
          <div
            className="abs-img fade-left"
            onClick={() => handleNav("left")}
            title="Önceki"
          >
            <Image
              src={heroImages[prevIndex]}
              alt="Önceki"
              fill
              draggable={false}
              className="img-fade"
              style={{
                objectFit: "cover",
                objectPosition: "right center",
                filter: "blur(4px) brightness(.6)",
                opacity: 0.28
              }}
            />
          </div>
          {/* Sonraki resmin fade-gölge gösterimi */}
          <div
            className="abs-img fade-right"
            onClick={() => handleNav("right")}
            title="Sonraki"
          >
            <Image
              src={heroImages[nextIndex]}
              alt="Sonraki"
              fill
              draggable={false}
              className="img-fade"
              style={{
                objectFit: "cover",
                objectPosition: "left center",
                filter: "blur(4px) brightness(.6)",
                opacity: 0.28
              }}
            />
          </div>
          {/* Asıl ana görsel */}
          <div className="active-img-container">
            <Image
              src={heroImages[currentSlide]}
              alt={`VIP Transfer ${currentSlide + 1}`}
              fill
              draggable={false}
              priority
              sizes="90vw"
              className="img-main"
              style={{
                objectFit: "contain"
              }}
            />
          </div>
          {/* Dotlar */}
          <div className="absolute bottom-5 left-0 w-full flex justify-center z-30 gap-2 select-none">
            {heroImages.map((_, i) => (
              <div
                key={i}
                className={`slider-dot ${i === currentSlide ? "active" : ""}`}
                style={{
                  transition: "all 0.33s cubic-bezier(.68,-0.55,.27,1.55)",
                  transform: i === currentSlide ? "scale(1.35) translateY(-3px)" : "scale(1) translateY(0)",
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
          .desktop-hero-img-box {
            width: 86vw;
            max-width: 1680px;
            aspect-ratio: ${ASPECT_RATIO};
            min-height: 350px;
            max-height: 66vh;
            border-radius: 24px;
            box-shadow: 0 6px 28px #000c, 0 2.5px 12px #FFD70022;
            position: relative;
            overflow: visible;
            display: flex;
            align-items: center;
            background: #000;
          }
          .active-img-container {
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%; z-index: 10;
            border-radius: 24px;
            overflow: hidden;
          }
          .img-main {
            object-fit: contain !important;
            width: 100%; height: 100%;
            border-radius: 24px;
            box-shadow: 0 1.5px 15px #FFD70018;
            transition: opacity .7s;
          }
          .abs-img {
            position: absolute;
            top: 0; width: 11%; height: 100%;
            min-width: 64px;
            max-width: 120px;
            z-index: 8;
            cursor: pointer;
            transition: opacity .23s;
            overflow: hidden;
            pointer-events: auto;
          }
          .fade-left { left: 0; border-top-left-radius: 24px; border-bottom-left-radius: 24px; }
          .fade-right { right: 0; border-top-right-radius: 24px; border-bottom-right-radius: 24px; }
          .img-fade {
            object-fit: cover !important;
            width: 100%; height: 100%;
            pointer-events: none;
            user-select: none;
          }
          .slider-dot { display: inline-block; cursor: pointer;}
          .slider-dot.active { animation: bounceDot 0.75s; }
          @keyframes bounceDot {
            0% { transform: scale(1) translateY(0);}
            40% { transform: scale(1.5) translateY(-8px);}
            80% { transform: scale(1.2) translateY(-3px);}
            100% { transform: scale(1.35) translateY(-3px);}
          }
        `}</style>
      </section>
    );
  }

  // === MOBILE SLIDER ===
  return (
    <section className="relative w-full flex flex-col items-center overflow-x-hidden select-none hero-cinema">
      <div className="w-full h-4 block"></div>
      <div
        className="relative w-full mx-auto hero-img-box-mob"
        ref={sliderRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {heroImages.map((src, idx) => (
          <Image
            key={src}
            src={src}
            alt={`VIP Transfer ${idx + 1}`}
            fill
            className={`object-cover transition-opacity duration-1000 ${currentSlide === idx ? "opacity-100 z-10" : "opacity-0 z-0"}`}
            priority={idx === 0}
            sizes="100vw"
            draggable={false}
            style={{ borderRadius: "11px", objectFit: "cover" }}
          />
        ))}
        <div className="absolute bottom-3 left-0 w-full flex justify-center z-30 gap-2 select-none">
          {heroImages.map((_, i) => (
            <div
              key={i}
              className={`slider-dot ${i === currentSlide ? "active" : ""}`}
              style={{
                transition: "all 0.33s cubic-bezier(.68,-0.55,.27,1.55)",
                transform: i === currentSlide ? "scale(1.25) translateY(-2px)" : "scale(1) translateY(0)",
                background: i === currentSlide
                  ? "linear-gradient(135deg, #FFD700 60%, #fff60088 100%)"
                  : "rgba(60,60,60,0.19)",
                boxShadow: i === currentSlide ? "0 2px 10px #FFD70066" : "none",
                border: i === currentSlide ? "2px solid #FFD700" : "1.1px solid #555",
                width: i === currentSlide ? "14px" : "8px",
                height: i === currentSlide ? "14px" : "8px",
                borderRadius: "5px",
                margin: "0 2px"
              }}
              onClick={() => setCurrentSlide(i)}
            ></div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .hero-img-box-mob {
          width: 100vw;
          aspect-ratio: 1.78;
          min-height: 100px;
          border-radius: 11px;
          box-shadow: 0 3px 12px #0007, 0 1px 7px #FFD70022;
        }
        @media (max-width: 480px) {
          .hero-img-box-mob { aspect-ratio: 1.72; min-height: 80px; border-radius: 7px; }
        }
      `}</style>
    </section>
  );
}

// === Dosya SONU: components/HeroSlider.jsx ===
