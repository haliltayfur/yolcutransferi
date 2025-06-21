import HeroSlider from "../components/HeroSlider";
import VipTransferForm from "../components/VipTransferForm";
import HeroVideo from "../components/HeroVideo";
import AdvantagesBar from "../components/AdvantagesBar";
import TestimonialsSlider from "../components/TestimonialsSlider";

export default function Home() {
  return (
    <main>
      <HeroSlider />
      <section className="flex flex-col md:flex-row justify-center items-center gap-8 px-4 max-w-6xl mx-auto mt-12 mb-14">
        {/* Sol: Form (Geniş) */}
        <div className="w-full md:w-[400px] h-[320px] flex items-center justify-center">
          <VipTransferForm />
        </div>
        {/* Sağ: Video (Dar) */}
        <div className="w-full md:w-[220px] h-[320px] flex items-center justify-center">
          <HeroVideo />
        </div>
      </section>
      <AdvantagesBar />
      <TestimonialsSlider />
    </main>
  );
}
