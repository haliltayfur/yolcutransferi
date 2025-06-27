// PATH: /app/page.js

import HeroSlider from "../components/HeroSlider";
import dynamic from "next/dynamic";
import HeroVideo from "../components/HeroVideo";
import AdvantagesBar from "../components/AdvantagesBar";
import TestimonialsSlider from "../components/TestimonialsSlider";

const VipTransferForm = dynamic(() => import("../components/VipTransferForm"), { ssr: false });

export default function Home() {
  return (
    <main>
      <HeroSlider />
      <section
        className="
          flex flex-row justify-center items-start
          gap-[10px]
          w-full max-w-[1260px] mx-auto
          px-2 md:px-0
          mt-12 md:mt-16
          mb-10 md:mb-16
          min-h-[600px]
        "
        style={{
          minHeight: 600,
        }}
      >
        {/* FORM */}
        <div
          className="
            flex flex-col justify-center
            bg-black/85 border border-[#bfa658]
            rounded-2xl shadow-2xl
            p-0
          "
          style={{
            width: 800,
            height: 600,
            minWidth: 800,
            minHeight: 600,
            boxSizing: "border-box",
          }}
        >
          <VipTransferForm />
        </div>
        {/* VIDEO */}
        <div
          className="
            flex items-center justify-center
            rounded-2xl overflow-hidden shadow-2xl border border-[#bfa658]
            bg-black/90
          "
          style={{
            width: 400,
            height: 600,
            minWidth: 400,
            minHeight: 600,
            boxSizing: "border-box",
          }}
        >
          <HeroVideo />
        </div>
      </section>
      <AdvantagesBar />
      <TestimonialsSlider />
    </main>
  );
}

// PATH: /app/page.js
