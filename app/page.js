import HeroSlider from "../components/HeroSlider";
import VipTransferForm from "../components/VipTransferForm";
import AdvantagesBar from "../components/AdvantagesBar";
import TestimonialsSlider from "../components/TestimonialsSlider";

export default function Home() {
  return (
    <main>
      <HeroSlider />
      <VipTransferForm />

      {/* Neden YolcuTransferi alanı */}
     <section className="w-full flex flex-col items-center mt-6 mb-12">
  <h2 className="text-3xl md:text-4xl font-bold mb-[10px] text-gold text-center drop-shadow">
    Neden YolcuTransferi?
  </h2>
  <AdvantagesBar />
</section>

<section className="w-full flex flex-col items-center mt-6 mb-12">
  <h2 className="text-3xl md:text-4xl font-bold mb-[10px] text-gold text-center drop-shadow">
    Müşteri Deneyimleri & Yorumları
  </h2>
  <TestimonialsSlider />
</section>

    </main>
  );
}
