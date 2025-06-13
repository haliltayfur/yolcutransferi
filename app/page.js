import HeroSlider from "../components/HeroSlider";
import VipTransferForm from "../components/VipTransferForm";
import AdvantagesBar from "../components/AdvantagesBar";
import TestimonialsSlider from "../components/TestimonialsSlider";

export default function Home() {
  return (
    <main>
      <HeroSlider />
      <VipTransferForm />
      <section className="w-full flex flex-col items-center mb-8 mt-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gold text-center drop-shadow">
          Neden YolcuTransferi?
        </h2>
        {/* Sadece avantaj kutuları */}
        <AdvantagesBar />
      </section>
      <TestimonialsSlider />
    </main>
  );
}
