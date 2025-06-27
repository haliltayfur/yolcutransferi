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
          justify-center items-center
          gap-8 md:gap-16
          w-full max-w-[1200px] mx-auto
          px-2 md:px-0
          mt-8 md:mt-12
          mb-8 md:mb-14
          transition-all
        "
      >
        {/* FORM */}
        <div className="w-full max-w-[810px] flex items-center justify-center">
          <VipTransferForm />
        </div>
        {/* VIDEO sadece desktop */}
        <div className="hidden md:flex w-[370px] h-[600px] items-center justify-center rounded-2xl overflow-hidden shadow-xl border border-[#bfa658] bg-black/90">
          <HeroVideo />
        </div>
      </section>
      <AdvantagesBar />
      <TestimonialsSlider />
    </main>
  );
}
