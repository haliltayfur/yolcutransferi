import HeroSlider from "../components/HeroSlider";
import VipTransferForm from "../components/VipTransferForm";
import HeroVideo from "../components/HeroVideo";
import AdvantagesBar from "../components/AdvantagesBar";
import TestimonialsSlider from "../components/TestimonialsSlider";

export default function Home() {
  return (
    <main>
      <HeroSlider />
      {/* Responsive: Mobilde video gizli, form tek başına ortada, çerçeve sade */}
      <section className="flex flex-col md:flex-row justify-center items-stretch gap-5 md:gap-8 px-2 md:px-4 max-w-[1200px] mx-auto mt-8 md:mt-12 mb-8 md:mb-14">
        {/* Form Alanı */}
        <div
          className="
            flex-1 flex items-center justify-center
            rounded-2xl
            border border-[#bfa658] 
            bg-black/70 
            shadow-xl
            min-w-0 w-full
            md:max-w-[440px] 
            py-6 px-3 md:px-8
            transition-all
          "
        >
          <VipTransferForm />
        </div>
        {/* Video Alanı (sadece md ve üzeri ekranda göster) */}
        <div
          className="
            hidden md:flex items-center justify-center 
            flex-1 min-w-0 
            rounded-2xl overflow-hidden
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
