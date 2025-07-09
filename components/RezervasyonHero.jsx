"use client";
import { useRef, useEffect, useState } from "react";
import VipTransferForm from "./VipTransferForm"; // Bunu aşağıda anlatıldığı gibi güncelleyeceksin

export default function RezervasyonHero({ onlyForm }) {
  // Ekran boyutunu algıla (mobil/desktop için)
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
        className="flex flex-row items-start justify-center"
        style={{
          width: isMobile ? "98vw" : "100%",
          maxWidth: "2000px",
          margin: "0 auto",
        }}
      >
        {/* FORM ALANI */}
        <div
          className="bg-[#19160a] border-2 border-[#bfa658] rounded-3xl shadow-2xl flex flex-col justify-start items-center relative"
          style={{
            minHeight: "600px",
            height: "600px",
            width: isMobile ? "98vw" : "40vw", // %40 genişlik
            minWidth: isMobile ? undefined : 350,
            maxWidth: isMobile ? 600 : undefined,
            marginRight: isMobile ? 0 : "1cm",
            boxSizing: "border-box",
            transition: "width 0.3s"
          }}
        >
          <h2
            className="text-2xl md:text-3xl font-extrabold text-[#bfa658] font-quicksand absolute left-0 right-0 text-center"
            style={{
              top: 28, // çizgiye daha yakın
              position: "absolute",
              marginTop: 0,
              zIndex: 3
            }}
          >
            VIP Transfer Rezervasyonu
          </h2>
          <div style={{ marginTop: 75, width: "100%", flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
            <VipTransferForm onComplete={handleFormComplete} />
          </div>
        </div>
        {/* VİDEO */}
        {!isMobile && (
          <div
            style={{
              height: "600px",
              width: "340px",
              borderRadius: "24px",
              overflow: "hidden",
              boxShadow: "0 0 12px #0008",
              border: "2px solid #bfa658",
              background: "#1c1c1c",
              marginLeft: "1cm",
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
