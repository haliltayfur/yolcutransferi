"use client";
import VipTransferForm from "./VipTransferForm";
import { useRef, useEffect } from "react";

export default function RezervasyonHero({ onlyForm }) {
  const videoRef = useRef();

  // Video kontrolleri ve visibility (isteğe bağlı gelişmiş)
  useEffect(() => {
    let wasPlaying = false;
    function handleVisibility() {
      const rect = videoRef.current?.getBoundingClientRect();
      const inView = rect &&
        rect.top < window.innerHeight &&
        rect.bottom > 0;
      if (!inView && !videoRef.current.paused) {
        wasPlaying = true;
        videoRef.current.pause();
      } else if (inView && wasPlaying) {
        videoRef.current.play();
        wasPlaying = false;
      }
    }
    window.addEventListener("scroll", handleVisibility);
    return () => window.removeEventListener("scroll", handleVisibility);
  }, []);

  return (
    <section
      className="w-full flex flex-col items-center justify-center"
      style={{
        minHeight: onlyForm ? "600px" : undefined,
        height: onlyForm ? "600px" : undefined,
        background: "transparent",
        border: "none",
        boxShadow: "none",
        padding: 0,
      }}
    >
      {/* Desktop */}
      <div className="hidden md:flex flex-row items-center justify-center w-full" style={{ marginTop: 0 }}>
        {/* FORM */}
        <div
          className="bg-[#19160a] border-2 border-[#bfa658] rounded-3xl shadow-2xl flex flex-col justify-center px-12 py-10"
          style={{
            minHeight: "600px",
            height: "600px",
            width: "700px", // %40 daha geniş (ör: 500px ise 700px yapıldı)
            boxSizing: "border-box",
            marginRight: "48px", // 3cm (yaklaşık 48px)
            transition: "width 0.3s",
          }}
        >
          <VipTransferForm />
        </div>
        {/* VİDEO */}
        <div
          style={{
            height: "600px",
            width: "400px",
            borderRadius: "24px",
            overflow: "hidden",
            boxShadow: "0 0 12px #0008",
            border: "2px solid #bfa658",
            background: "#1c1c1c",
          }}
        >
          <video
            ref={videoRef}
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
      </div>
      {/* Mobil */}
      <div className="flex md:hidden flex-col items-center justify-center w-full">
        <div
          className="bg-[#19160a] border-2 border-[#bfa658] rounded-3xl shadow-2xl flex flex-col justify-center px-5 py-8"
          style={{
            width: "98vw",
            minWidth: 200,
            maxWidth: 420,
            margin: "0 auto",
            marginBottom: 24,
            boxSizing: "border-box"
          }}
        >
          <VipTransferForm />
        </div>
      </div>
    </section>
  );
}
