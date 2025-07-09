"use client";
import VipTransferForm from "./VipTransferForm";
import { useRef, useEffect } from "react";

export default function RezervasyonHero({ onlyForm }) {
  const videoRef = useRef();

  useEffect(() => {
    // Video visibility (görünmezse durdur!)
    let wasPlaying = false;
    function handleVisibility() {
      const rect = videoRef.current?.getBoundingClientRect();
      const inView = rect && rect.top < window.innerHeight && rect.bottom > 0;
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

  // Desktop: Form ve video
  return (
    <section className="w-full flex flex-col items-center justify-center" style={{ padding: 0 }}>
      <div className="hidden md:flex flex-row items-center justify-center w-full" style={{ marginTop: 0 }}>
        {/* FORM */}
        <div
          className="bg-[#19160a] border-2 border-[#bfa658] rounded-3xl shadow-2xl flex flex-col justify-center px-16 py-10"
          style={{
            minHeight: "660px",
            height: "660px",
            width: "770px", // +%10
            boxSizing: "border-box",
            marginRight: "66px", // boşluk kadar sola yaslandı
            transition: "width 0.3s",
          }}
        >
          <VipTransferForm />
        </div>
        {/* VİDEO */}
        <div
          style={{
            height: "660px",
            width: "440px", // +%10 genişletildi
            borderRadius: "24px",
            overflow: "hidden",
            boxShadow: "0 0 16px #0008",
            border: "2px solid #bfa658",
            background: "#1c1c1c",
            display: "block"
          }}
        >
          <video
            ref={videoRef}
            src="/reklam.mp4"
            controls // Youtube gibi tam kontrol
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
