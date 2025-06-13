import HeroSlider from "../components/HeroSlider";
import VipTransferForm from "../components/VipTransferForm";
import AdvantagesBar from "../components/AdvantagesBar";
import TestimonialsSlider from "../components/TestimonialsSlider";
import SectionTitle from "../components/SectionTitle"; // yeni başlık bileşeni

export default function Home() {
  return (
    <main>
      <HeroSlider />
      <VipTransferForm />

      {/* Neden YolcuTransferi alanı */}
      <section className="w-full flex flex-col items-center mt-10 mb-16">
        <SectionTitle>Neden YolcuTransferi?</SectionTitle>
        <AdvantagesBar />
      </section>

      {/* Yorumlar alanı */}
      <section className="w-full flex flex-col items-center mb-16">
        <SectionTitle>Müşterilerimizin Yorumları</SectionTitle>
        <TestimonialsSlider />
      </section>
    </main>
  );
}
