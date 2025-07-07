"use client";
import HeroSlider from "@/components/HeroSlider";
import dynamic from "next/dynamic";
const VipTransferForm = dynamic(() => import("@/components/VipTransferForm"), { ssr: false });

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-black flex flex-col items-center justify-start">
      {/* === SLIDER HERO === */}
      <HeroSlider />
      {/* === ARADAKİ BOŞLUK === */}
      <div style={{ height: "32px" }} />
      {/* === FORM + VİDEO === */}
      <div
        className={`
          w-full max-w-[1300px]
          mx-auto
          flex flex-col md:flex-row
          items-center md:items-start
          justify-center
          gap-y-10 md:gap-x-12
        `}
      >
        {/* === FORM === */}
        <div
          className="
            flex flex-col justify-center
            items-center
            bg-[#19160aee]
            border-2 border-[#bfa658]
            rounded-3xl shadow-2xl
            w-[95vw] md:w-[800px]
            min-h-[350px] h-[600px] max-h-[600px]
            mx-auto
          "
          style={{
            maxWidth: 800,
            minWidth: 340,
            boxSizing: "border-box",
          }}
        >
          <div className="w-full h-full flex flex-col justify-center">
            <VipTransferForm />
          </div>
        </div>
        {/* === VİDEO === */}
        <div
          className="
            hidden md:flex justify-center items-center
            bg-[#232323e7]
            border-2 border-[#bfa658]
            rounded-3xl shadow-xl
            w-[400px] max-w-[400px] min-w-[300px]
            min-h-[350px] h-[600px] max-h-[600px]
            overflow-hidden
          "
        >
          <video
            src="/reklam.mp4"
            controls
            style={{
              borderRadius: "24px",
              width: "100%",
              minHeight: "600px",
              maxHeight: "600px",
              objectFit: "cover",
              background: "#1c1c1c",
            }}
            preload="metadata"
          />
        </div>
      </div>
      {/* MOBİL */}
      <style>{`
        @media (max-width: 900px) {
          .md\\:flex-row { flex-direction: column !important; }
          .md\\:items-start { align-items: center !important; }
          .hidden.md\\:flex { display: none !important; }
          .md\\:w-\\[800px\\] { width: 95vw !important; max-width: 99vw !important; min-width: 0 !important;}
        }
      `}</style>
    </main>
  );
}
