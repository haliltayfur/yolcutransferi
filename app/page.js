import HeroSlider from "../components/HeroSlider";
import VipTransferForm from "../components/VipTransferForm";
import HeroVideo from "../components/HeroVideo";
import AdvantagesBar from "../components/AdvantagesBar";
import TestimonialsSlider from "../components/TestimonialsSlider";

export default function Home() {
  return (
    <main>
      <HeroSlider />
      <section className="flex flex-col md:flex-row justify-center items-center gap-8 px-4 max-w-[1150px] mx-auto mt-12 mb-14">
        {/* Sol blok: Form */}
        <div className="flex items-center justify-center rounded-2xl border border-gold bg-black/80 shadow-lg w-[750px] h-[600px] min-w-[300px]">
          <VipTransferForm />
        </div>
        {/* Sağ blok: Video */}
        <div className="flex items-center justify-center rounded-2xl border border-gold bg-black/80 shadow-lg w-[400px] h-[600px]">
          <HeroVideo />
        </div>
      </section>
      <AdvantagesBar />
      <TestimonialsSlider />
    </main>
  );
}
