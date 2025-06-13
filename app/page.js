import HeroSlider from "../components/HeroSlider";
import VipTransferForm from "../components/VipTransferForm";
import AdvantagesBar from "../components/AdvantagesBar";
import TestimonialsSlider from "../components/TestimonialsSlider";

export default function Home() {
  return (
    <main>
      <HeroSlider />
      <VipTransferForm />

      {/* Avantajlar kutuları */}
      <section className="w-full flex flex-col items-center mt-8 mb-12">
        <AdvantagesBar />
      </section>

      {/* Yorumlar kutuları */}
      <section className="w-full flex flex-col items-center mt-8 mb-12">
        <TestimonialsSlider />
      </section>
    </main>
  );
}
