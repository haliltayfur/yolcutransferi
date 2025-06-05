"use client";
import Image from "next/image";
import Link from "next/link";

export default function SehirlerArasi() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      {/* Sarı kahverengi çerçeve */}
      <div className="border-4 border-[#6e5a1e] rounded-[10px] bg-black/60 p-6 md:p-10 shadow-lg">
        <Image
          src="/sehirler-arasi-banner.png"
          alt="Şehirler Arası Transfer"
          width={900}
          height={320}
          className="w-full rounded-[6px] mb-6 object-cover"
          priority
        />
        <h1 className="text-3xl font-extrabold text-[#6e5a1e] mb-4">Şehirler Arası Transfer</h1>
        <p className="mb-6 text-gray-200">
          İstanbul, Bodrum, Antalya, İzmir ve Türkiye'nin dört bir yanında; iş, tatil veya özel yolculuklarınız için güvenilir, konforlu ve sigortalı şehirler arası transfer hizmeti sunuyoruz.
        </p>
        <p className="mb-6 text-gray-200">
          YolcuTransferi ile<br />
          - Kişiye özel araç ve profesyonel sürücü ayrıcalığı<br />
          - Kapıdan kapıya, kesintisiz ve zamanında ulaşım<br />
          - Tüm ek hizmetleri rezervasyon sırasında seçebilme kolaylığı<br />
          - 7/24 canlı destek ve yolculuk boyunca güvence<br />
          Sizi ve sevdiklerinizi Türkiye’nin her noktasına rahatça ulaştırıyoruz.
        </p>
      </div>

      {/* Buton ayrı */}
      <Link href="https://yolcutransferi-halil-tayfurs-projects.vercel.app/rezervasyon">
        <button className="bg-[#6e5a1e] hover:bg-[#8c7327] text-white font-bold py-3 px-8 rounded-xl mt-10 w-full text-lg shadow">
          Rezervasyon Yap
        </button>
      </Link>
    </main>
  );
}
