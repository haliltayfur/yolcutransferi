import HeroSlider from "../components/HeroSlider";
import dynamic from "next/dynamic";
import HeroVideo from "../components/HeroVideo";
import AdvantagesBar from "../components/AdvantagesBar";
import TestimonialsSlider from "../components/TestimonialsSlider";

// ŞU SATIRDA dynamic import!
const VipTransferForm = dynamic(() => import("../components/VipTransferForm"), { ssr: false });

export default function Home() {
  return (
    <main>
      <HeroSlider />
      <section
        className="
          flex flex-col items-center
          md:flex-row md:justify-center md:items-start
          gap-0 md:gap-[5px]
          px-2 md:px-0
          max-w-[1200px] mx-auto
          mt-8 md:mt-12
          mb-8 md:mb-14
        "
      >
        {/* FORM */}
        <div className="w-full max-w-[340px] md:max-w-[810px] flex items-center justify-center transition-all">
          <VipTransferForm />
        </div>
        {/* VIDEO sadece desktop */}
        <div className="hidden md:block w-[380px] h-[600px] flex-shrink-0 overflow-hidden">
          <HeroVideo />
        </div>
      </section>
      <AdvantagesBar />
      <TestimonialsSlider />
    </main>
  );
}
