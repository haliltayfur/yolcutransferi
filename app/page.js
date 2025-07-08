"use client";
import { useState, useEffect } from "react";
import HeroSlider from "../components/HeroSlider";
import RezervasyonHero from "../components/RezervasyonHero";
import AdvantagesBar from "../components/AdvantagesBar";
import TestimonialsSlider from "../components/TestimonialsSlider";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 900);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <main className="w-full flex flex-col items-center bg-black min-h-screen">
      {/* SLIDER */}
      <div style={{ width: "min(100vw, 2000px)", margin: "0 auto" }}>
        <HeroSlider />
      </div>

      {/* ALT GRID */}
      {!isMobile && (
        <div
          className="flex flex-row items-start justify-center"
          style={{
            width: "100%",
            margin: "32px auto",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: 0, // BOŞLUK YOK
          }}
        >
          {/* FORM */}
          <div
            style={{
              width: 600,
              minWidth: 380,
              maxWidth: 600,
              height: 600,
              display: "flex",
              alignItems: "center",
            }}
          >
            <RezervasyonHero onlyForm />
          </div>
          {/* VIDEO */}
          <div
            style={{
              width: 600,
              minWidth: 300,
              maxWidth: 600,
              height: 600,
              display: "flex",
              alignItems: "center",
              marginLeft: 0, // BOŞLUK YOK
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
                border: "2px solid #bfa658",
                display: "block",
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

      {/* MOBİL SADECE FORM */}
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

      {/* ALT KISIM */}
      <AdvantagesBar />
      <TestimonialsSlider />
    </main>
  );
}
