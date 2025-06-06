"use client";
import Image from "next/image";
import Link from "next/link";

export default function Dron() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <div className="border-4 border-[#6e5a1e] rounded-[10px] bg-black/60 p-6 md:p-10 shadow-lg">
        <Image
          src="/dron-banner.png"
          alt="Dron Yolcu Transferi"
          width={900}
          height={320}
          className="w-full rounded-[6px] mb-6 object-cover"
          priority
        />
        <h1 className="text-3xl font-extrabold text-[#6e5a1e] mb-4 text-left">
          Dron Yolcu Transferi
        </h1>
        <p className="mb-5 text-white text-left text-lg">
          <span className="font-bold text-[#6e5a1e]">Dron taksiyle gökyüzünde yolculuğa var mısınız?</span><br/>
          Şehrin üzerinde yükselin, alışılmışın çok ötesinde bir ulaşım deneyimi yaşayın!
        </p>
        <p className="mb-4 text-white text-left text-base">
          Özel günlerinizde, sürpriz organizasyonlarda veya sadece kendinizi şımartmak istediğinizde, her transferinizi unutulmaz bir ayrıcalığa dönüştürün.
        </p>
        <p className="mb-2 text-gray-300 text-left text-base">
          Evlilik teklifi, doğum günü, VIP şehir içi buluşmalar... Dron taksiyle kısa mesafeleri zamandan tasarruf ederek, lüks ve modernlikle birleştirin. Hayalini kurduğunuz bu uçuşa, şimdi sahip olun!
        </p>
      </div>

      <Link href="https://yolcutransferi.com/rezervasyon">
        <button className="bg-[#6e5a1e] hover:bg-[#8c7327] text-white font-bold py-3 px-8 rounded-xl mt-10 w-full text-lg shadow">
          Rezervasyon Yap
        </button>
      </Link>
    </main>
  );
}
