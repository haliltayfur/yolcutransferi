"use client";
import { useRef, useEffect, useState } from "react";
import HeroSlider from "../components/HeroSlider";
import RezervasyonHero from "../components/RezervasyonHero";
import AdvantagesBar from "../components/AdvantagesBar";
import TestimonialsSlider from "../components/TestimonialsSlider";

export default function Home() {
  const sliderRef = useRef();
  const [sliderWidth, setSliderWidth] = useState(1200);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 900);
      if (sliderRef.current) setSliderWidth(sliderRef.current.offsetWidth);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Paint'teki oranlar: 63 + 2 + 35 = 100
  // Form: %63, Gap: %2, Video: %35 (slider ne kadarsa, aynı)
  const formW = isMobile ? "98vw" : `${(sliderWidth * 0.63)}px`;
  const gapW = isMobile ? 0 : `${(sliderWidth * 0.02)}px`;
  const videoW = isMobile ? 0 : `${(sliderWidth * 0.35)}px`;

  return (
    <main className="w-full min-h-screen flex flex-col items-center bg-black">
      {/* === SLIDER === */}
      <div ref={sliderRef}
        style={{
          width: "min(100vw, 2000px)",
          margin: "0 auto"
        }}
      >
        <HeroSlider />
      </div>

      {/* === ALT KISIM: Form + Video === */}
      <div
        className="flex flex-col items-center justify-center w-full"
        style={{ marginTop: 36, marginBottom: 24 }}
      >
        {/* Desktop (Slider altına tam hizalı) */}
        {!isMobile && (
          <div
            className="flex flex-row items-start justify-center"
            style={{
              width: sliderWidth,
              maxWidth: 2000,
              margin: "0 auto"
            }}
          >
            {/* FORM */}
            <div style={{
              width: formW,
              transition: "width 0.3s"
            }}>
              <RezervasyonHero />
            </div>
            {/* GAP */}
            <div style={{
              width: gapW,
              minWidth: 10,
              maxWidth: 40
            }} />
            {/* VIDEO */}
            <div style={{
              width: videoW,
              minWidth: 200,
              maxWidth: 700,
              height: 600,
              transition: "width 0.3s",
              display: "flex",
              alignItems: "center"
            }}>
              <video
                src="/reklam.mp4"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 24,
                  background: "#19160a",
                  objectFit: "cover",
                  border: "2.5px solid #bfa658"
                }}
                autoPlay
                muted
                loop
                playsInline
                onClick={e => { e.currentTarget.muted = false; e.currentTarget.currentTime = 0; e.currentTarget.play(); e.currentTarget.volume = 1; }}
                title="Tıklayınca sesli başlar"
              />
            </div>
          </div>
        )}

        {/* Mobilde: Sadece Form */}
        {isMobile && (
          <div className="flex flex-col w-full items-center justify-center">
            <div style={{
              width: formW,
              maxWidth: 480,
              margin: "0 auto"
            }}>
              <RezervasyonHero />
            </div>
          </div>
        )}
      </div>

      {/* Diğer bileşenler */}
      <AdvantagesBar />
      <TestimonialsSlider />
    </main>
  );
}
