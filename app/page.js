"use client";
import HeroSlider from "../components/HeroSlider";
import dynamic from "next/dynamic";
const VipTransferForm = dynamic(() => import("../components/VipTransferForm"), { ssr: false });

export default function Home() {
  // Responsive width
  const maxContainer = 1260; // px
  const formWidth = 800;
  const videoWidth = 400;
  const rowGap = 38; // px

  return (
    <main className="w-full flex flex-col items-center bg-black min-h-screen">
      {/* HERO SLIDER */}
      <div
        className="flex flex-col items-center w-full"
        style={{
          width: "100%",
          maxWidth: `${maxContainer}px`,
          margin: "0 auto",
        }}
      >
        <HeroSlider />
      </div>
      {/* --- REZERVASYON: FORM + VIDEO --- */}
      <div
        className="w-full flex flex-row items-start justify-center"
        style={{
          maxWidth: `${maxContainer}px`,
          margin: "0 auto",
          marginTop: `${rowGap}px`,
          gap: "32px",
        }}
      >
        {/* FORM */}
        <div
          className="border-2 border-[#bfa658] rounded-3xl bg-[#19160ae9] shadow-2xl flex flex-col"
          style={{
            width: `${formWidth}px`,
            minHeight: "600px",
            height: "600px",
            boxSizing: "border-box",
            padding: "40px 36px",
            justifyContent: "center",
          }}
        >
          <VipTransferForm />
        </div>
        {/* VIDEO */}
        <div
          className="border-2 border-[#bfa658] rounded-3xl bg-[#232323e7] shadow-xl flex justify-end items-start overflow-hidden"
          style={{
            width: `${videoWidth}px`,
            height: "600px",
            minHeight: "600px",
            boxSizing: "border-box",
            marginLeft: "0",
            marginRight: "0",
          }}
        >
          <video
            src="/reklam.mp4"
            controls
            style={{
              borderRadius: "24px",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              background: "#1c1c1c",
            }}
            preload="metadata"
          />
        </div>
      </div>
      {/* --- MOBILE --- */}
      <style jsx>{`
        @media (max-width: 1200px) {
          .form-video-row {
            flex-direction: column !important;
            gap: 20px !important;
            align-items: center !important;
          }
        }
        @media (max-width: 900px) {
          .form-video-row {
            flex-direction: column !important;
            gap: 0 !important;
          }
          .mobile-form {
            width: 96vw !important;
            min-width: 0 !important;
            padding: 15px 4vw !important;
            margin: 0 auto !important;
            border-radius: 20px !important;
          }
          .mobile-hide {
            display: none !important;
          }
        }
      `}</style>
    </main>
  );
}
