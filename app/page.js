// === Dosya: /app/page.js ===

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
      <section
        className="
          w-full max-w-[2000px] mx-auto
          flex flex-col md:flex-row justify-center items-start
          px-0 mt-10 md:mt-14 mb-10 md:mb-16
        "
        style={{ minHeight: 600 }}
      >
        {/* FORM + VİDEO: Slider ile birebir aynı genişlik! */}
        <div
          className="flex flex-row w-[90vw] max-w-[2000px] min-h-[600px] h-[600px] mx-auto"
          style={{
            width: "90vw",
            maxWidth: 2000,
            minHeight: 600,
            height: 600,
          }}
        >
          <div className="flex flex-col justify-center items-center bg-black/85 border border-[#bfa658] rounded-2xl shadow-2xl"
            style={{
              width: "75%",
              minHeight: 600,
              height: 600,
              boxSizing: "border-box"
            }}
          >
            <VipTransferForm />
          </div>
          <div
            className="hidden md:flex items-center justify-center rounded-2xl overflow-hidden shadow-2xl border border-[#bfa658] bg-black/90"
            style={{
              width: "25%",
              minWidth: 200,
              minHeight: 600,
              height: 600
            }}
          >
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
// === Dosya SONU: /app/page.js ===
