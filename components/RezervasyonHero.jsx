"use client";
import { useState, useRef, useEffect } from "react";
import VipTransferForm from "./VipTransferForm";

export default function RezervasyonHero({ onlyForm }) {
  const [formData, setFormData] = useState({});
  const videoRef = useRef();

  // Video ekranda görünmüyorsa durdur, geri gelince devam et
  useEffect(() => {
    let wasPlaying = false;
    function handleVisibility() {
      const rect = videoRef.current?.getBoundingClientRect();
      const inView = rect &&
        rect.top < window.innerHeight &&
        rect.bottom > 0;
      if (!inView && videoRef.current && !videoRef.current.paused) {
        wasPlaying = true;
        videoRef.current.pause();
      } else if (inView && videoRef.current && wasPlaying) {
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

  // --- Responsive width ayarı
  const isMobile = typeof window !== "undefined" && window.innerWidth < 700;

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
      <div
        className="flex flex-row items-center justify-center"
        style={{
          width: "100%",
          margin: "0 auto",
        }}
      >
        {/* FORM */}
        <div
          className="bg-[#19160a] border-2 border-[#bfa658] rounded-3xl shadow-2xl flex flex-col justify-center p-10"
          style={{
            minHeight: "600px",
            height: "600px",
            width: isMobile ? "98vw" : "1100px", // *** ÇERÇEVE 2 KAT ***
            boxSizing: "border-box",
            marginRight: onlyForm ? "0px" : "10px",
            transition: "width 0.3s"
          }}
        >
          <VipTransferForm onComplete={handleFormComplete} />
        </div>
        {/* VIDEO */}
        {!onlyForm && (
          <div
            style={{
              height: "600px",
              width: isMobile ? 0 : "340px",
              borderRadius: "24px",
              overflow: "hidden",
              boxShadow: "0 0 12px #0008",
              border: "2px solid #bfa658",
              background: "#1c1c1c",
              marginLeft: onlyForm ? "0px" : "0px",
              display: isMobile ? "none" : "block",
            }}
          >
            <video
              ref={videoRef}
              src="/reklam.mp4"
              controls // tüm kontroller açık
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
    </section>
  );
}
