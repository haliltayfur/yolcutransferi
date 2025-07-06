// === Dosya BAŞI: /components/VipTransferForm.jsx 
"use client";
import HeroSlider from "../components/HeroSlider";
import dynamic from "next/dynamic";
import AdvantagesBar from "../components/AdvantagesBar";
import TestimonialsSlider from "../components/TestimonialsSlider";

const VipTransferForm = dynamic(() => import("../components/VipTransferForm"), { ssr: false });

export default function Home() {
  return (
    <main>
      <HeroSlider />
      <section className="w-full flex justify-center items-center mt-10 md:mt-14 mb-10 md:mb-16">
        <div
          className="flex flex-row w-full max-w-[2000px] min-h-[600px] h-[600px] gap-0"
          style={{
            minHeight: 600,
            height: 600,
            width: "90vw",
            maxWidth: 2000,
          }}
        >
          {/* FORM */}
          <div
            className="flex flex-col justify-center items-center bg-[rgba(25,22,10,0.98)] rounded-l-[32px]"
            style={{
              width: "65%",
              minWidth: 350,
              height: "100%",
              boxSizing: "border-box",
              paddingLeft: 10,
              paddingRight: 0,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            }}
          >
            <VipTransferForm />
          </div>
          {/* VIDEO */}
          <div
            className="hidden md:flex items-center justify-center rounded-r-[32px]"
            style={{
              width: "35%",
              height: "100%",
              background: "#111", // Veya transparent
              overflow: "hidden",
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              borderTopRightRadius: 32,
              borderBottomRightRadius: 32,
              padding: 0,
              margin: 0,
            }}
          >
            {/* Burası kritik! */}
            {typeof window !== "undefined" && window.innerWidth >= 768 && (
              require("../components/HeroVideo").default()
            )}
          </div>
        </div>
      </section>
      <AdvantagesBar />
      <TestimonialsSlider />
    </main>
  );
}

// === Dosya SONU: /components/VipTransferForm.jsx ===
