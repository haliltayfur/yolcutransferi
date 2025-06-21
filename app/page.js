import HeroSlider from "../components/HeroSlider";
import HeroVideo from "../components/HeroVideo";
import VipTransferForm from "../components/VipTransferForm";
import AdvantagesBar from "../components/AdvantagesBar";
import TestimonialsSlider from "../components/TestimonialsSlider";

export default function Home() {
  return (
    <main>
      <HeroSlider />
      {/* Transfer Planlama + Video Yan Yana */}
      <section className="flex flex-col md:flex-row justify-center items-start gap-8 px-4 max-w-6xl mx-auto mt-10 mb-12">
        <div className="flex-1">
          <VipTransferForm />
        </div>
        <div className="w-full md:w-[300px] flex justify-end">
          <HeroVideo />
        </div>
      </section>
      <AdvantagesBar />
      <TestimonialsSlider />
    </main>
  );
}
