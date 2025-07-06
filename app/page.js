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
      <section className="w-full flex justify-center items-center mt-10 md:mt-14 mb-10 md:mb-16">
        <div
          className="flex flex-row md:w-[90vw] w-full max-w-[2000px] min-h-[600px] h-[600px]"
          style={{
            minHeight: 600,
            height: 600,
            width: "90vw",
            maxWidth: 2000,
          }}
        >
          <div
            className="flex flex-col justify-center items-center"
            style={{
              width: "75%",
              height: "100%",
              background: "rgba(25,22,10,0.98)",
              borderTopLeftRadius: 22,
              borderBottomLeftRadius: 22,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            }}
          >
            <VipTransferForm />
          </div>
          <div
            className="hidden md:flex items-center justify-center"
            style={{
              width: "25%",
              height: "100%",
              borderRadius: 0,
              borderTopRightRadius: 22,
              borderBottomRightRadius: 22,
              background: "transparent",
              overflow: "hidden",
              boxShadow: "none",
              border: "none",
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
