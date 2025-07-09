"use client";
import { useRef, useEffect, useState } from "react";
import HeroSlider from "../components/HeroSlider";
import VipTransferForm from "../components/VipTransferForm";
import AdvantagesBar from "../components/AdvantagesBar";
import TestimonialsSlider from "../components/TestimonialsSlider";

export default function Home() {
  // Slider genişliği için referans ve state
  const sliderOuterRef = useRef();
  const [sliderWidth, setSliderWidth] = useState(1200);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function updateWidth() {
      if (sliderOuterRef.current) {
        setSliderWidth(sliderOuterRef.current.offsetWidth);
      }
      setIsMobile(window.innerWidth < 700);
    }
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Oranlar
  const formW = isMobile ? "98vw" : sliderWidth * 0.56;
  const gapW = isMobile ? 0 : 48;
  const videoW = isMobile ? 0 : sliderWidth * 0.28;

  function handleFormComplete(data) {
    if (typeof window !== "undefined") {
      localStorage.setItem("rezFormData", JSON.stringify(data));
      window.location.href = "/rezervasyon";
    }
  }

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

      {/* === FORM + VIDEO === */}
      <div
        className={`flex ${isMobile ? "flex-col" : "flex-row"} items-start justify-center`}
        style={{
          width: isMobile ? "98vw" : sliderWidth,
          maxWidth: "2000px",
          margin: "0 auto",
          marginTop: isMobile ? 16 : 36,
        }}
      >
        {/* FORM */}
        <div
          className="bg-[#19160a] border-2 border-[#bfa658] rounded-3xl shadow-2xl flex flex-col justify-start items-center relative transition-all"
          style={{
            minHeight: isMobile ? "auto" : "650px",
            height: isMobile ? "auto" : "650px",
            width: formW,
            maxWidth: isMobile ? 600 : 900,
            marginRight: isMobile ? 0 : gapW,
            marginBottom: isMobile ? 20 : 0,
            boxSizing: "border-box",
            padding: isMobile ? "20px 6px" : "44px 48px 22px 48px",
            transition: "width 0.3s",
          }}
        >
          <VipTransferForm onComplete={handleFormComplete} />
        </div>
        {/* VİDEO */}
        {!isMobile && (
          <div
            style={{
              height: "650px",
              width: videoW,
              borderRadius: "24px",
              overflow: "hidden",
              boxShadow: "0 0 16px #0008",
              border: "2px solid #bfa658",
              background: "#1c1c1c",
              display: "block"
            }}
          >
            <video
              src="/reklam.mp4"
              controls
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                background: "#1c1c1c",
                borderRadius: "24px"
              }}
              preload="auto"
              playsInline
              autoPlay
              muted
              loop
            />
          </div>
        )}
      </div>

      {/* === ALT KISIM === */}
      <AdvantagesBar />
      <TestimonialsSlider />
    </main>
  );
}
