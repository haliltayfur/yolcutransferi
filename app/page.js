"use client";
import HeroSlider from "../components/HeroSlider";
import dynamic from "next/dynamic";
import AdvantagesBar from "../components/AdvantagesBar";
import TestimonialsSlider from "../components/TestimonialsSlider";
const VipTransferForm = dynamic(() => import("../components/VipTransferForm"), { ssr: false });

export default function Home() {
  return (
    <main className="w-full flex flex-col items-center bg-black min-h-screen">
      {/* === SLIDER + ALT SATIR ORTAK CONTAINER === */}
      <div
        className="mx-auto w-full"
        style={{
          maxWidth: "1920px",  // Desktopta slider ile form+video hizalı!
          width: "100vw",
        }}
      >
        {/* === SLIDER === */}
        <HeroSlider />

        {/* === FORM + VIDEO ROW === */}
        <div
          className="flex flex-row items-start mt-10"
          style={{
            width: "100%",
            gap: "2%",
            minHeight: "600px",
          }}
        >
          {/* FORM */}
          <div
            style={{
              width: "68%",
              minWidth: "350px",
              background: "#19160ae9",
              border: "2px solid #bfa658",
              borderRadius: "24px",
              boxShadow: "0 10px 34px #000b, 0 4px 24px #FFD70018",
              padding: "42px 36px",
              minHeight: "600px",
              height: "600px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <VipTransferForm />
          </div>
          {/* VIDEO */}
          <div
            style={{
              width: "30%",
              minWidth: "260px",
              background: "#232323e7",
              border: "2px solid #bfa658",
              borderRadius: "24px",
              boxShadow: "0 6px 30px #000b, 0 2px 15px #FFD70018",
              overflow: "hidden",
              minHeight: "600px",
              height: "600px",
              display: "flex",
              justifyContent: "end",
              alignItems: "flex-start",
            }}
          >
            <video
              src="/reklam.mp4"
              controls
              style={{
                borderRadius: "20px",
                width: "100%",
                height: "100%",
                objectFit: "cover",
                background: "#1c1c1c",
              }}
              preload="metadata"
            />
          </div>
        </div>
      </div>

      {/* === ALT BİLEŞENLER === */}
      <div
        className="mx-auto w-full flex flex-col items-center"
        style={{
          maxWidth: "1920px",
          width: "100vw",
          marginTop: "32px",
        }}
      >
        <AdvantagesBar />
        <TestimonialsSlider />
      </div>

      {/* === RESPONSIVE STYLES === */}
      <style jsx>{`
        @media (max-width: 1200px) {
          .flex-row {
            flex-direction: column !important;
            gap: 24px !important;
          }
        }
        @media (max-width: 900px) {
          .flex-row {
            flex-direction: column !important;
            gap: 12px !important;
          }
          .video-hide-mobile {
            display: none !important;
          }
        }
      `}</style>
    </main>
  );
}
