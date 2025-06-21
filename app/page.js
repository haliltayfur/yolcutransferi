import HeroSlider from "../components/HeroSlider";
import HeroVideo from "../components/HeroVideo";   // <--- Yeni ekle
import VipTransferForm from "../components/VipTransferForm";
import AdvantagesBar from "../components/AdvantagesBar";
import TestimonialsSlider from "../components/TestimonialsSlider";

export default function Home() {
  return (
    <main>
      <HeroSlider />
      <HeroVideo />   {/* Videon burada, ister slider'dan önce ister sonra koyabilirsin */}
      <VipTransferForm />
      <AdvantagesBar />
      <TestimonialsSlider />
    </main>
  );
}
