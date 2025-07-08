"use client";
import { useRef, useEffect, useState } from "react";
import HeroSlider from "../components/HeroSlider";
import RezervasyonHero from "../components/RezervasyonHero";
import AdvantagesBar from "../components/AdvantagesBar";
import TestimonialsSlider from "../components/TestimonialsSlider";

export default function Home() {
  // Slider genişliği takibi
  const sliderOuterRef = useRef();
  const [sliderWidth, setSliderWidth] = useState(1200);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function updateWidth() {
      if (sliderOuterRef.current) {
        setSliderWidth(sliderOuterRef.current.offsetWidth);
      }
      setIsMobile(window.innerWidth < 900);
    }
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // ORANLAR (toplam %100)
  const formW = sliderWidth * 0.63;
  const gapW = 1; // px
  const videoW = sliderWidth * 0.37 - gapW;

  return (
    <main className="w-full flex flex-col items-center bg-black min-h-screen">
      {/* === SLIDER === */}
      <div
        ref={sliderOuterRef}
        style={{
          width: "min(100vw, 2000px)",
          margin: "0 auto",
        }}
      >
        <HeroSlider />
      </div>

      {/* === ALT GRID (sadece desktop) === */}
      {!isMobile && (
        <div
          className="flex flex-row items-start justify-center"
          style={{
            width: sliderWidth,
            maxWidth: "2000px",
            margin: "0 auto",
            marginTop: "32px",
          }}
        >
          {/* FORM */}
          <div
            style={{
              width: formW,
              minWidth: 350,
              maxWidth: "100%",
              transition: "width 0.3s",
            }}
          >
            <RezervasyonHero onlyForm />
          </div>
          {/* BOŞLUK */}
          <div style={{ width: gapW, minWidth: 1 }} />
          {/* VIDEO */}
          <div
            style={{
              width: videoW,
              minWidth: 240,
              maxWidth: 600,
              height: "600px",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-end",
            }}
          >
            <video
              src="/reklam.mp4"
              style={{
                width: "100%",
                height: "600px",
                objectFit: "cover",
                borderRadius: "22px",
                background: "#1c1c1c",
                border: "2px solid #bfa658"
              }}
              controls={false}
              preload="metadata"
              playsInline
              autoPlay
              loop
              muted
              onClick={e => {
                e.target.muted = false;
                e.target.currentTime = 0;
                e.target.play();
                e.target.volume = 1;
              }}
            />
          </div>
        </div>
      )}

      {/* === MOBİLDE SADECE FORM === */}
      {isMobile && (
        <div className="w-full flex flex-col items-center">
          <div
            style={{
              width: "98vw",
              minWidth: 200,
              maxWidth: 420,
              margin: "32px auto 0 auto",
            }}
          >
            <RezervasyonHero onlyForm />
          </div>
        </div>
      )}

      {/* === ALT KISIM === */}
      <AdvantagesBar />
      <TestimonialsSlider />
    </main>
  );
}
