"use client";
import { useState, useRef, useEffect } from "react";
import VipTransferForm from "./VipTransferForm";

export default function RezervasyonHero({ onlyForm }) {
  const [formData, setFormData] = useState({});
  const videoRef = useRef();

  // Video kontrollerini tam aç!
  useEffect(() => {
    // Video ekranda görünmüyorsa durdur, geri gelince devam et
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

  // Formdan gelen verileri hafızaya al ve yönlendir
  const handleFormComplete = data => {
    setFormData(data);
    if (typeof window !== "undefined") {
      localStorage.setItem("rezFormData", JSON.stringify(data));
      window.location.href = "/rezervasyon";
    }
  };

  // Layout: Form ve video yan yana, aralarında 10px boşluk
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
      <div className="flex flex-row items-center justify-center">
        {/* FORM */}
        <div
          className="bg-[#19160a] border-2 border-[#bfa658] rounded-3xl shadow-2xl flex flex-col justify-center p-10"
          style={{
            minHeight: "600px",
            height: "600px",
            width: "550px",
            boxSizing: "border-box",
            marginRight: "10px",
          }}
        >
          <VipTransferForm onComplete={handleFormComplete} />
        </div>
        {/* VİDEO */}
        <div
          style={{
            height: "600px",
            width: "340px",
            borderRadius: "24px",
            overflow: "hidden",
            boxShadow: "0 0 12px #0008",
            border: "2px solid #bfa658",
            background: "#1c1c1c",
            display: onlyForm ? "none" : "block"
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
    </section>
  );
}
