"use client";
import { useRef, useEffect, useState } from "react";
import VipTransferForm from "./VipTransferForm"; // Aşağıda güncel kodu var

export default function RezervasyonHero({ onlyForm }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 700);
    handler();
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  // Formdan gelen verileri localStorage'a kaydet ve yönlendir
  function handleFormComplete(data) {
    if (typeof window !== "undefined") {
      localStorage.setItem("rezFormData", JSON.stringify(data));
      window.location.href = "/rezervasyon";
    }
  }

  return (
    <section className="w-full flex flex-col items-center justify-center">
      <div
        className={`flex ${isMobile ? "flex-col" : "flex-row"} items-start justify-center`}
        style={{
          width: "100%",
          maxWidth: "1800px",
          margin: "0 auto",
        }}
      >
        {/* FORM ALANI */}
        <div
          className="bg-[#19160a] border-2 border-[#bfa658] rounded-3xl shadow-2xl flex flex-col justify-start items-center relative transition-all"
          style={{
            minHeight: isMobile ? "auto" : "650px",
            height: isMobile ? "auto" : "650px",
            width: isMobile ? "98vw" : "56vw", // mevcut ölçünün %40 fazlası
            maxWidth: isMobile ? 600 : 900,
            marginRight: isMobile ? 0 : "3cm",
            marginBottom: isMobile ? 30 : 0,
            boxSizing: "border-box",
            padding: isMobile ? "20px 6px" : "44px 48px 22px 48px",
            transition: "width 0.3s",
          }}
        >
          <div className="w-full">
            <h2
              className="text-2xl md:text-3xl font-extrabold text-[#bfa658] font-quicksand text-center"
              style={{
                marginBottom: 4,
                marginTop: 0,
                letterSpacing: 1.2,
                paddingTop: 0,
              }}
            >
              VIP Transfer Rezervasyonu
            </h2>
            {/* ALTIN ÇİZGİ */}
            <div
              style={{
                width: "40%",
                minWidth: 110,
                height: 4,
                background: "linear-gradient(90deg, #FFD700, #bfa658)",
                borderRadius: 8,
                margin: "0 auto 16px auto",
              }}
            />
          </div>
          <div className="w-full flex-1 flex flex-col justify-start">
            {/* Dinamik autocomplete/tahminli form */}
            <VipTransferForm onComplete={handleFormComplete} isMobile={isMobile} />
          </div>
        </div>
        {/* VİDEO */}
        {!isMobile && (
          <div
            style={{
              height: "650px",
              width: "350px",
              borderRadius: "24px",
              overflow: "hidden",
              boxShadow: "0 0 16px #0008",
              border: "2px solid #bfa658",
              background: "#1c1c1c",
              marginLeft: "3cm",
              display: onlyForm ? "none" : "block"
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
    </section>
  );
}
