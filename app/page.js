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
          flex flex-col md:flex-row justify-center items-start
          gap-3
          w-full max-w-[2000px] mx-auto
          px-1 md:px-0
          mt-10 md:mt-14
          mb-10 md:mb-16
        "
        style={{minHeight: 600}}
      >
        {/* FORM */}
        <div
          className="
            flex flex-col justify-center
            bg-black/85 border border-[#bfa658]
            rounded-2xl shadow-2xl
            p-0
            w-full
            md:w-[75%]
            max-w-[900px]
            min-w-0
          "
          style={{
            maxWidth: "75%",
            minHeight: 600,
            height: 600,
            boxSizing: "border-box",
          }}
        >
          <VipTransferForm />
        </div>
        {/* VIDEO: SADECE DESKTOPTA */}
        <div
          className="hidden md:flex items-center justify-center
            rounded-2xl overflow-hidden shadow-2xl border border-[#bfa658]
            bg-black/90
            w-[24%] min-w-[240px] max-w-[480px]
            h-[600px] min-h-[600px] box-border"
          style={{
            width: "24%",
            minWidth: 240,
            maxWidth: 480,
            height: 600,
            minHeight: 600,
          }}
        >
          {typeof window !== "undefined" && window.innerWidth >= 768 && (
            require("../components/HeroVideo").default()
          )}
        </div>
      </section>
      <AdvantagesBar />
      <TestimonialsSlider />
    </main>
  );
}
// === Dosya SONU: /app/page.js ===
