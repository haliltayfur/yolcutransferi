import VipTransferForm from "../components/VipTransferForm";
import HeroVideo from "../components/HeroVideo";
import HeroSlider from "../components/HeroSlider";
import AdvantagesBar from "../components/AdvantagesBar";
import TestimonialsSlider from "../components/TestimonialsSlider";

export default function Home() {
  return (
    <main>
      <HeroSlider />
      <section className="flex flex-col md:flex-row justify-start items-start gap-8 px-4 max-w-6xl mx-auto mt-10 mb-12">
        <VipTransferForm />
        <HeroVideo />
      </section>
      <AdvantagesBar />
      <TestimonialsSlider />
    </main>
  );
}
