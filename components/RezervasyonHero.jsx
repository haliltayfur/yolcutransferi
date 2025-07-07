"use client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";

// --- SLIDER ---
const heroImages = [
  "/Hero1.png", "/Hero2.png", "/Hero3.png", "/Hero4.png", "/Hero5.png",
  "/Hero6.png", "/Hero7.png", "/Hero8.png", "/Hero9.png"
];

function HeroSlider({ outerRef }) {
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

  function handleClick(e) {
    if (!sliderRef.current) return;
    let x, w;
    if (e.touches) {
      const touch = e.touches[0];
      const bounds = sliderRef.current.getBoundingClientRect();
      x = touch.clientX - bounds.left;
      w = bounds.width;
    } else {
      const bounds = sliderRef.current.getBoundingClientRect();
      x = e.clientX - bounds.left;
      w = bounds.width;
    }
    if (x > w * 0.5) setCurrent((prev) => (prev + 1) % heroImages.length);
    else setCurrent((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  }

  return (
    <section ref={outerRef} className="relative w-full flex flex-col items-center select-none">
      <div className="w-full h-8 block" />
      <div
        ref={sliderRef}
        onClick={handleClick}
        onTouchStart={handleClick}
        className="cinema-slider-desktop relative flex items-center justify-center overflow-hidden rounded-3xl cursor-pointer"
        style={{
          width: "min(100vw, 2000px)",
          height: "min(78vw, 670px)",
          minHeight: "380px",
          maxHeight: "670px",
          boxShadow: "0 10px 34px #000b, 0 4px 24px #FFD70018",
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

// --- FORM BİLEŞENİ ---
function VipForm() {
  return (
    <div className="bg-[#19160a] border-2 border-[#bfa658] rounded-3xl shadow-2xl p-10 h-full flex flex-col justify-center"
      style={{ minHeight: 420 }}>
      <h2 className="text-3xl font-bold text-[#bfa658] mb-6">VIP Transfer Rezervasyonu</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <input className="bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl px-4 py-3" placeholder="Nereden?" />
        <input className="bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl px-4 py-3" placeholder="Nereye?" />
        <input className="bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl px-4 py-3" placeholder="Kişi Sayısı" />
        <input className="bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl px-4 py-3" placeholder="Segment" />
        <input className="bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl px-4 py-3" placeholder="Transfer Türü" />
        <input className="bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl px-4 py-3" placeholder="Tarih" />
      </div>
      <button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold py-4 rounded-xl text-xl shadow hover:scale-105 transition">Devam Et</button>
    </div>
  );
}

// --- VIDEO ---
function DummyVideo({height}) {
  return (
    <div className="bg-[#232323e7] border-2 border-[#bfa658] rounded-3xl shadow-2xl flex items-center justify-center overflow-hidden"
      style={{ width: "100%", height: height }}>
      <video
        src="/reklam.mp4"
        controls
        style={{
          borderRadius: "24px",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          background: "#1c1c1c",
        }}
        preload="metadata"
      />
    </div>
  );
}

// --- ANA HERO COMPONENT ---
export default function RezervasyonHero() {
  const sliderRef = useRef();
  const [sliderW, setSliderW] = useState(1200);
  const [sliderH, setSliderH] = useState(480);

  useEffect(() => {
    function handleResize() {
      if (sliderRef.current) {
        setSliderW(sliderRef.current.offsetWidth);
        setSliderH(sliderRef.current.offsetHeight);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Oranlar (Slider ile hizalı)
  const formW = sliderW * 0.68;
  const gapW = sliderW * 0.02;
  const videoW = sliderW * 0.30;
  const blockH = sliderH * 0.63; // Yüksekliği slider ile orantılı tut

  // Mobilde tek sütun ve sadece form
  const isMobile = sliderW < 900;

  return (
    <section className="w-full flex flex-col items-center">
      {/* SLIDER */}
      <HeroSlider outerRef={sliderRef} />

      {/* ALT: FORM + VIDEO (Slider ile hizalı ve aynı genişlikte) */}
      <div
        className={`w-full flex ${isMobile ? "flex-col items-center" : "flex-row justify-center"} mt-8`}
        style={{
          maxWidth: sliderW,
          margin: "0 auto",
          gap: isMobile ? 32 : gapW,
        }}
      >
        <div style={{ width: isMobile ? "98vw" : formW, height: blockH }}>
          <VipForm />
        </div>
        {!isMobile &&
          <div style={{ width: videoW, height: blockH, marginLeft: gapW }}>
            <DummyVideo height={blockH} />
          </div>
        }
      </div>
    </section>
  );
}
