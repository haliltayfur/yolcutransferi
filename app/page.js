import HeroSlider from "../components/HeroSlider";
import VipTransferForm from "../components/VipTransferForm";
import HeroVideo from "../components/HeroVideo";
import AdvantagesBar from "../components/AdvantagesBar";
import TestimonialsSlider from "../components/TestimonialsSlider";

export default function Home() {
  return (
    <main>
      <HeroSlider />
      <section className="flex flex-col md:flex-row justify-center items-center gap-6 px-4 max-w-5xl mx-auto mt-10 mb-12">
        <div className="h-[320px] md:w-[400px] w-full flex items-center justify-center">
          <VipTransferForm />
        </div>
        <div className="h-[320px] md:w-[220px] w-full flex items-center justify-center">
          <HeroVideo />
        </div>
      </section>
      <AdvantagesBar />
      <TestimonialsSlider />
    </main>
  );
}
