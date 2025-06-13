import HeroSlider from "../components/HeroSlider";
import VipTransferForm from "../components/VipTransferForm";
import AdvantagesBar from "../components/AdvantagesBar";
import TestimonialsSlider from "../components/TestimonialsSlider";
// WhyUsGrid kaldırıldı

export default function Home() {
  return (
    <main>
      <HeroSlider />
      <VipTransferForm />
      
      {/* Başlık ve alt açıklama eklemek istersen: */}
      <section className="w-full flex flex-col items-center mb-8 mt-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gold text-center drop-shadow">
          Neden YolcuTransferi?
        </h2>
        <p className="text-lg text-gray-300 mb-8 max-w-2xl text-center">
          VIP transferde ayrıcalık, güven ve şeffaf fiyatlarla Türkiye'nin dört bir yanında hizmet.
        </p>
        {/* Avantaj kutuları */}
        <AdvantagesBar />
      </section>
      
      <TestimonialsSlider />
    </main>
  );
}
