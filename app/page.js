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

      <section className="w-full flex flex-col items-center mb-16 mt-8">
        <SectionTitle>Neden YolcuTransferi?</SectionTitle>
        <AdvantagesBar />
      </section>

      <section className="w-full flex flex-col items-center mb-16 mt-8">
        <SectionTitle>Müşterilerimizin Yorumları</SectionTitle>
        <TestimonialsSlider />
      </section>
    </main>
  );
}
