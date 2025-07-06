// PATH: components/RezervasyonHero.jsx
"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";

const VipTransferForm = dynamic(() => import("./VipTransferForm"), { ssr: false });
const HeroVideo = dynamic(() => import("./HeroVideo"), { ssr: false });

export default function RezervasyonHero() {
  const containerRef = useRef(null);

  // Scroll sonrası yukarıdan mesafe ayarı (opsiyonel)
  useEffect(() => {
    if (!containerRef.current) return;
    // containerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full flex justify-center items-start relative"
      style={{
        minHeight: "650px",
        background: "transparent",
        padding: 0,
        marginTop: 0,
        marginBottom: 0,
      }}
    >
      <div
        className="
          w-full max-w-[1260px]
          flex flex-row
          items-start
          justify-between
          gap-10
          px-1 md:px-0
        "
        style={{
          marginTop: 0,
          marginBottom: 0,
          alignItems: "stretch",
        }}
      >
        {/* FORM */}
        <div
          className="
            flex flex-col justify-center
            shadow-2xl
          "
          style={{
            width: "54%",
            minWidth: 390,
            maxWidth: "700px",
            background: "rgba(25,22,10,0.99)",
            borderRadius: 34,
            border: "2px solid #bfa658",
            boxSizing: "border-box",
            minHeight: 608,
            maxHeight: 660,
            padding: "28px 34px 32px 34px",
            zIndex: 3,
            marginLeft: 0,
          }}
        >
          <VipTransferForm />
        </div>

        {/* VIDEO - sadece desktop */}
        <div
          className="
            hidden md:flex flex-col justify-center
            shadow-2xl
          "
          style={{
            width: "46%",
            minWidth: 285,
            maxWidth: "520px",
            background: "#171717",
            borderRadius: 34,
            overflow: "hidden",
            boxSizing: "border-box",
            minHeight: 608,
            maxHeight: 660,
            zIndex: 3,
            marginRight: 0,
          }}
        >
          <HeroVideo />
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 1260px) {
          .max-w-\[1260px\] {
            max-width: 98vw !important;
          }
        }
        @media (max-width: 1000px) {
          .max-w-\[1260px\] {
            gap: 3vw !important;
          }
          div[style*="width: 54%"] { min-width: 260px !important; }
          div[style*="width: 46%"] { min-width: 170px !important; }
        }
        @media (max-width: 800px) {
          .max-w-\[1260px\] {
            flex-direction: column !important;
            gap: 0 !important;
            padding: 0 2vw !important;
          }
          div[style*="width: 54%"] {
            width: 100% !important;
            min-width: 0 !important;
            max-width: 100vw !important;
            margin: 0 auto 20px auto !important;
            border-radius: 20px !important;
            min-height: 520px !important;
            max-height: none !important;
          }
          div[style*="width: 46%"] {
            display: none !important;
          }
        }
        @media (max-width: 550px) {
          div[style*="width: 54%"] {
            padding: 14px 3vw 18px 3vw !important;
            min-height: 390px !important;
            border-radius: 12px !important;
          }
        }
      `}</style>
    </section>
  );
}
// === DOSYA SONU ===
