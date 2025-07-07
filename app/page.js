"use client";
import HeroSlider from "../components/HeroSlider";
import dynamic from "next/dynamic";
import AdvantagesBar from "../components/AdvantagesBar";
import TestimonialsSlider from "../components/TestimonialsSlider";
const VipTransferForm = dynamic(() => import("../components/VipTransferForm"), { ssr: false });

export default function Home() {
  // Genişlikler
  const maxContainer = 1260;
  const formWidth = 800;
  const videoWidth = 400;
  const gap = 32;

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
      {/* FORM + VIDEO */}
      <div
        className="w-full flex flex-row items-start justify-start"
        style={{
          maxWidth: `${maxContainer}px`,
          margin: "38px auto 0 auto",
          gap: `${gap}px`,
        }}
      >
        {/* FORM */}
        <div
          className="border-2 border-[#bfa658] rounded-3xl bg-[#19160ae9] shadow-2xl flex flex-col"
          style={{
            width: `${formWidth}px`,
            minWidth: `${formWidth}px`,
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
            minWidth: `${videoWidth}px`,
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

      {/* ADVANTAGES BAR + TESTIMONIALS */}
      <div
        className="w-full flex flex-col items-center"
        style={{
          width: "100%",
          maxWidth: `${maxContainer}px`,
          margin: "32px auto 0 auto",
        }}
      >
        <AdvantagesBar />
        <TestimonialsSlider />
      </div>

      {/* Responsive style sadece burada */}
      <style jsx>{`
        @media (max-width: 1300px) {
          .slider-form-row,
          .adv-row {
            max-width: 99vw !important;
          }
        }
        @media (max-width: 950px) {
          .slider-form-row {
            flex-direction: column !important;
            align-items: center !important;
            gap: 22px !important;
          }
          .mobile-form {
            width: 96vw !important;
            min-width: 0 !important;
            padding: 18px 4vw !important;
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
