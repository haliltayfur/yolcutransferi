import HeroSlider from "../components/HeroSlider";
import VipTransferForm from "../components/VipTransferForm";
import HeroVideo from "../components/HeroVideo";
import AdvantagesBar from "../components/AdvantagesBar";
import TestimonialsSlider from "../components/TestimonialsSlider";

export default function Home() {
  return (
    <main>
      <HeroSlider />
      {/* Desktop: form+video yan yana, mobile: sadece form */}
      <section
        className="
          flex flex-col items-center
          md:flex-row md:justify-center md:items-start
          gap-0 md:gap-[10px]
          px-2 md:px-0
          max-w-[1200px] mx-auto
          mt-8 md:mt-12
          mb-8 md:mb-14
        "
      >
        {/* FORM */}
        <div
          className="
            w-full max-w-[340px] md:max-w-[840px] 
            md:h-[600px]
            flex items-center justify-center
            rounded-2xl
            border border-[#bfa658]
            bg-black/80
            shadow-xl
            py-8 md:py-0 px-2 md:px-0
            transition-all
          "
        >
          <VipTransferForm />
        </div>
        {/* VIDEO sadece desktop */}
        <div
          className="hidden md:block w-[380px] h-[600px] flex-shrink-0 overflow-hidden"
        >
          <HeroVideo />
        </div>
      </section>
      <AdvantagesBar />
      <TestimonialsSlider />
    </main>
  );
}
