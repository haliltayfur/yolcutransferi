// === Dosya: components/HeroSlider.jsx ===

"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const heroImages = [
  "/Hero1.png", "/Hero2.png", "/Hero3.png", "/Hero4.png", "/Hero5.png",
  "/Hero6.png", "/Hero7.png", "/Hero8.png", "/Hero9.png"
];
const ASPECT_RATIO = 16 / 7; // Geniş sinema görünümü, gerekirse 2.35 deneyebilirsin

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
      {/* Header'dan sonra 1rem boşluk */}
      <div className="w-full h-4 block md:h-6"></div>
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
        {/* Modern kare dot'lar: 9 tane, dalgalanır */}
        <div className="absolute bottom-4 left-0 w-full flex justify-center z-20 gap-2 select-none">
          {heroImages.map((_, i) => (
            <div
              key={i}
              className={`slider-dot ${i === currentSlide ? "active" : ""}`}
              style={{
                transition: "all 0.33s cubic-bezier(.68,-0.55,.27,1.55)",
                transform: i === currentSlide ? "scale(1.35) translateY(-5px)" : "scale(1) translateY(0)",
                background: i === currentSlide
                  ? "linear-gradient(135deg, #FFD700 60%, #fff60088 100%)"
                  : "rgba(60,60,60,0.24)",
                boxShadow: i === currentSlide ? "0 2px 10px #FFD70088" : "none",
                border: i === currentSlide ? "2.1px solid #FFD700" : "1.2px solid #555",
                width: i === currentSlide ? "19px" : "13px",
                height: i === currentSlide ? "19px" : "13px",
                borderRadius: "7px",
                margin: "0 3px"
              }}
            ></div>
          ))}
        </div>
        {/* Ok butonları */}
        <button
          onClick={() => handleNav("left")}
          aria-label="Önceki"
          className="slider-arrow slider-arrow-left"
        >
          <FaChevronLeft size={23} />
        </button>
        <button
          onClick={() => handleNav("right")}
          aria-label="Sonraki"
          className="slider-arrow slider-arrow-right"
        >
          <FaChevronRight size={23} />
        </button>
      </div>
      <style jsx>{`
        .hero-cinema {
          background: #000;
        }
        .hero-img-box {
          position: relative;
          width: 97vw;
          max-width: 1920px;
          aspect-ratio: ${ASPECT_RATIO};
          min-height: 260px;
          max-height: 69vh;
          margin: 0 auto;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 3px 28px #0009, 0 1.5px 8px #FFD70011;
        }
        .hero-image {
          transition: opacity .7s;
        }
        .slider-dot {
          display: inline-block;
          transition: all 0.33s cubic-bezier(.68,-0.55,.27,1.55);
        }
        .slider-dot.active {
          animation: bounceDot 0.72s;
        }
        @keyframes bounceDot {
          0% { transform: scale(1) translateY(0);}
          40% { transform: scale(1.5) translateY(-8px);}
          80% { transform: scale(1.2) translateY(-3px);}
          100% { transform: scale(1.35) translateY(-5px);}
        }
        .slider-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 30;
          width: 52px;
          height: 52px;
          background: rgba(28,28,32,0.42);
          border: 2.2px solid #FFD700;
          border-radius: 15px;
          color: #FFD700;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.85;
          transition: all .2s cubic-bezier(.4,0,.2,1);
          cursor: pointer;
          box-shadow: 0 3px 16px #FFD70012;
          outline: none;
        }
        .slider-arrow:hover {
          background: #FFD700;
          color: #181818;
          border-color: #fffbe6;
          transform: translateY(-50%) scale(1.17);
          box-shadow: 0 2px 14px #FFD70066;
        }
        .slider-arrow-left { left: 24px; }
        .slider-arrow-right { right: 24px; }

        @media (max-width: 1450px) {
          .hero-img-box { max-width: 99vw; }
          .slider-arrow-left { left: 10px; }
          .slider-arrow-right { right: 10px; }
        }
        @media (max-width: 1100px) {
          .hero-img-box { max-width: 99vw; min-height: 170px; }
        }
        @media (max-width: 700px) {
          .hero-img-box {
            max-width: 100vw;
            aspect-ratio: 1.78;
            min-height: 135px;
            border-radius: 10px;
            max-height: 65vw;
          }
          .slider-arrow {
            width: 39px; height: 39px; border-radius: 10px; font-size: 1.1rem;
          }
          .slider-arrow-left { left: 7px; }
          .slider-arrow-right { right: 7px; }
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
