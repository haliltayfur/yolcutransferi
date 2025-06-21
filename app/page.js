import HeroSlider from "../components/HeroSlider";
import VipTransferForm from "../components/VipTransferForm";
import HeroVideo from "../components/HeroVideo";
import AdvantagesBar from "../components/AdvantagesBar";
import TestimonialsSlider from "../components/TestimonialsSlider";

export default function Home() {
  return (
    <main>
      <HeroSlider />
      {/* Orta şerit ikiye bölünmüş büyük kutu */}
      <section className="flex flex-col md:flex-row justify-center items-center gap-8 px-4 max-w-6xl mx-auto mt-12 mb-14">
        {/* Sol kutu: Form */}
        <div className="w-full md:w-1/2 max-w-xl h-[320px] flex items-center justify-center">
          <VipTransferForm />
        </div>
        {/* Sağ kutu: Video */}
        <div className="w-full md:w-1/2 max-w-xl h-[320px] flex items-center justify-center">
          <HeroVideo />
        </div>
      </section>
      <AdvantagesBar />
      <TestimonialsSlider />
    </main>
  );
}
