// PATH: /app/page.js

import HeroSlider from "../components/HeroSlider";
import dynamic from "next/dynamic";
import HeroVideo from "../components/HeroVideo";
import AdvantagesBar from "../components/AdvantagesBar";
import TestimonialsSlider from "../components/TestimonialsSlider";

// SSR devre dışı, client-side
const VipTransferForm = dynamic(() => import("../components/VipTransferForm"), { ssr: false });

export default function Home() {
  return (
    <main>
      <HeroSlider />
      <section
        className="
          flex flex-col md:flex-row
          justify-center items-start
          gap-8 md:gap-16
          w-full max-w-[1200px] mx-auto
          px-2 md:px-0
          mt-8 md:mt-14
          mb-10 md:mb-20
          transition-all
        "
      >
        {/* FORM */}
        <div
          className="
            w-full max-w-[480px]
            min-h-[530px]
            flex flex-col justify-center
            bg-black/80 border border-[#bfa658]
            rounded-2xl shadow-2xl
            p-7 md:p-8
            mx-auto
            "
          style={{
            boxShadow: "0 12px 40px 0 #0008",
            minHeight: 530,
          }}
        >
          <VipTransferForm />
        </div>
        {/* VIDEO sadece desktop */}
        <div
          className="
            hidden md:flex
            items-center justify-center
            rounded-2xl overflow-hidden shadow-2xl border border-[#bfa658]
            bg-black/90
            ml-2
            w-[340px] h-[530px] min-w-[270px]
          "
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
