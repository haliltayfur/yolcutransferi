import HeroSlider from "../components/HeroSlider";
import VipTransferForm from "../components/VipTransferForm";
import AdvantagesBar from "../components/AdvantagesBar";
import TestimonialsSlider from "../components/TestimonialsSlider";
import WhyUsGrid from "../components/WhyUsGrid";

export default function Home() {
  return (
    <main>
      <HeroSlider />
      <VipTransferForm />
      <AdvantagesBar />
      <TestimonialsSlider />
      <WhyUsGrid />
    </main>
  );
}
