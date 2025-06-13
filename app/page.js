import HeroSlider from "../components/HeroSlider";
import VipTransferForm from "../components/VipTransferForm";
import AdvantagesBar from "../components/AdvantagesBar";
import TestimonialsSlider from "../components/TestimonialsSlider";

export default function Home() {
  return (
    <main>
      <HeroSlider />
      <VipTransferForm />

      {/* Neden YolcuTransferi Alanı */}
      <section className="w-full flex flex-col items-center mt-8 mb-12">
        <h2 className="text-4xl font-bold mb-2.5 text-gold text-center">
          Neden YolcuTransferi?
        </h2>
        <AdvantagesBar />
      </section>

      {/* Müşteri Deneyimleri Alanı */}
      <section className="w-full flex flex-col items-center mt-8 mb-12">
        <h2 className="text-4xl font-bold mb-2.5 text-gold text-center">
          Müşteri Deneyimleri & Yorumları
        </h2>
        <TestimonialsSlider />
      </section>
    </main>
  );
}
