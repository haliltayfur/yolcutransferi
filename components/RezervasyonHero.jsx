// PATH: components/RezervasyonHero.jsx
"use client";
import { useRef, useEffect, useState } from "react";
import VipTransferForm from "./VipTransferForm";

export default function RezervasyonHero() {
  // Responsive ve video görünürlüğü için
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 900);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Video otomatik oynat & görünürlük, ses kontrolü vs.
  useEffect(() => {
    let lastMuted = true, lastTime = 0;
    function handleScrollOrVis() {
      if (!videoRef.current) return;
      const rect = videoRef.current.getBoundingClientRect();
      const pctVisible = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0)) / rect.height;
      if (pctVisible < 0.2) {
        lastMuted = !videoRef.current.muted;
        lastTime = videoRef.current.currentTime;
        videoRef.current.pause();
      } else {
        videoRef.current.currentTime = lastTime;
        videoRef.current.muted = lastMuted;
        videoRef.current.play().catch(() => {});
      }
    }
    window.addEventListener("scroll", handleScrollOrVis);
    document.addEventListener("visibilitychange", handleScrollOrVis);
    return () => {
      window.removeEventListener("scroll", handleScrollOrVis);
      document.removeEventListener("visibilitychange", handleScrollOrVis);
    };
  }, []);

  // Video üzerinde tıklayınca sesli ve baştan oynat
  function handleVideoClick() {
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  }

  // Genişlikler
  const frameW = isMobile ? "98vw" : "43vw";
  const videoW = isMobile ? 0 : "24vw";
  const gap = isMobile ? 0 : "3vw";

  return (
    <section className="w-full flex flex-col items-center justify-center my-10">
      <div
        className="flex flex-col md:flex-row items-center justify-center"
        style={{
          width: isMobile ? "100vw" : "100%",
          maxWidth: isMobile ? "100vw" : "1650px",
          minHeight: "600px",
          margin: "0 auto"
        }}
      >
        {/* FORM */}
        <div
          className="bg-[#19160a] border-2 border-[#bfa658] rounded-3xl shadow-2xl flex flex-col justify-center p-8 md:p-12"
          style={{
            minHeight: "600px",
            height: "600px",
            width: frameW,
            boxSizing: "border-box",
            marginRight: gap,
            transition: "width 0.3s",
          }}
        >
          <VipTransferForm />
        </div>

        {/* VIDEO */}
        {!isMobile && (
          <div
            className="bg-[#232323e7] border-2 border-[#bfa658] rounded-3xl shadow-2xl flex items-center justify-center overflow-hidden"
            style={{
              width: videoW,
              minWidth: 220,
              maxWidth: "460px",
              height: "600px",
              cursor: "pointer",
              boxSizing: "border-box"
            }}
            onClick={handleVideoClick}
          >
            <video
              ref={videoRef}
              src="/reklam.mp4"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "22px",
                background: "#1c1c1c"
              }}
              controls
              preload="metadata"
              playsInline
              autoPlay
              muted
              loop
            />
          </div>
        )}
      </div>
    </section>
  );
}
