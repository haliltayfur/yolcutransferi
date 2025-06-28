// PATH: /app/page.js

import HeroSlider from "../components/HeroSlider";
import dynamic from "next/dynamic";
import AdvantagesBar from "../components/AdvantagesBar";
import TestimonialsSlider from "../components/TestimonialsSlider";
import AdresAutoComplete from "@/components/AdresAutoComplete";

const VipTransferForm = dynamic(() => import("../components/VipTransferForm"), { ssr: false });

export default function Home() {
  return (
    <main>
      <HeroSlider />
      <section
        className="
          flex flex-col md:flex-row justify-center items-start
          gap-[10px]
          w-full max-w-[1260px] mx-auto
          px-2 md:px-0
          mt-12 md:mt-16
          mb-10 md:mb-16
          min-h-[600px]
        "
      >
        {/* FORM */}
        <div
          className="
            flex flex-col justify-center
            bg-black/85 border border-[#bfa658]
            rounded-2xl shadow-2xl
            p-0
            w-full md:w-[800px] min-w-0
          "
          style={{
            maxWidth: 800,
            minHeight: 600,
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
            w-[400px] min-w-[400px] h-[600px] min-h-[600px] box-border"
        >
          {/* Mobilde video asla gösterilmeyecek! */}
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

// PATH: /app/page.js
