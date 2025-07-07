"use client";
import { useRef, useEffect, useState } from "react";

function VipForm({ width }) {
  return (
    <div
      className="bg-[#19160a] border-2 border-[#bfa658] rounded-3xl shadow-2xl p-10 flex flex-col justify-center"
      style={{
        width: width ? width : 680,
        height: 600,
        minWidth: 320,
        boxSizing: "border-box",
        transition: "width 0.2s"
      }}
    >
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

function VipVideo({ width }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play();
    }
  }, []);

  const handleVideoClick = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    video.currentTime = 0;
    video.play();
    video.volume = 1;
  };

  return (
    <div
      className="bg-[#232323e7] border-2 border-[#bfa658] rounded-3xl shadow-2xl flex items-center justify-center overflow-hidden"
      style={{
        width: width ? width : 340,
        height: 600,
        minWidth: 200,
        boxSizing: "border-box",
        cursor: "pointer",
        transition: "width 0.2s"
      }}
      onClick={handleVideoClick}
      tabIndex={0}
      role="button"
      aria-label="Videoyu başlat ve sesi aç"
    >
      <video
        ref={videoRef}
        src="/reklam.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{
          borderRadius: "24px",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          background: "#1c1c1c"
        }}
        preload="auto"
      />
    </div>
  );
}

export default function RezervasyonHero() {
  const [sliderWidth, setSliderWidth] = useState(1200);
  const sliderRef = typeof window !== "undefined" ? document.getElementById("hero-slider-ref") : null;

  // Slider'ın genişliğini al (ve resize olunca güncelle)
  useEffect(() => {
    function updateWidth() {
      const slider = document.getElementById("hero-slider-ref");
      if (slider) {
        setSliderWidth(slider.offsetWidth);
      }
    }
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Oranlar
  const FORM_ORAN = 0.68;
  const BOSLUK_ORAN = 0.02;
  const VIDEO_ORAN = 0.30;
  const formWidth = Math.round(sliderWidth * FORM_ORAN);
  const boslukWidth = Math.round(sliderWidth * BOSLUK_ORAN);
  const videoWidth = Math.round(sliderWidth * VIDEO_ORAN);

  return (
    <section className="w-full flex flex-col items-center py-12">
      <div
        className="flex flex-row items-center justify-center"
        style={{
          width: sliderWidth,
          margin: "0 auto",
          minHeight: 600,
          transition: "width 0.2s"
        }}
      >
        <VipForm width={formWidth} />
        <div style={{ width: boslukWidth, minWidth: 20, maxWidth: 50 }} />
        <VipVideo width={videoWidth} />
      </div>
      <style jsx>{`
        @media (max-width: 900px) {
          .form-area {
            width: 95vw !important;
            margin: 0 auto 0 auto !important;
            max-width: 98vw !important;
          }
          .video-area {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
