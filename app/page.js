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
          className="
            flex flex-row
            w-full
            max-w-[2000px]
            min-h-[600px]
            h-[600px]
            px-0
          "
          style={{
            minHeight: 600,
            height: 600,
            width: "90vw",
            maxWidth: 2000,
          }}
        >
          <div
            className="
              flex flex-col justify-center items-center
              bg-[rgba(25,22,10,0.98)]
              rounded-l-[32px]
            "
            style={{
              width: "50%",
              minWidth: 350,
              boxSizing: "border-box",
              height: "100%",
              paddingLeft: 0,
            }}
          >
            <VipTransferForm />
          </div>
          <div
            className="
              hidden md:flex items-center justify-center
              rounded-r-[32px]
            "
            style={{
              width: "50%",
              height: "100%",
              background: "transparent",
              overflow: "hidden",
              boxShadow: "none",
              border: "none",
              padding: 0,
              margin: 0,
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
