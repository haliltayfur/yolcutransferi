"use client";
import Image from "next/image";
import Link from "next/link";

export default function KurumsalTransfer() {
  return (
    <main className="flex justify-center items-center min-h-[90vh] bg-black">
      <section className="w-full max-w-3xl mx-auto border border-[#bfa658] rounded-3xl shadow-2xl px-6 md:px-12 py-14 bg-gradient-to-br from-black via-[#19160a] to-[#302811] mt-16 mb-10">
        <Image
          src="/kurumsal-banner.png"
          alt="Kurumsal ve Toplu Transfer"
          width={900}
          height={320}
          className="w-full rounded-xl mb-7 object-cover"
          priority
        />
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#bfa658] mb-5 text-center tracking-tight">
          Kurumsal & Toplu Transfer
        </h1>
        <div className="text-lg md:text-[1.12rem] text-[#ecd9aa] font-normal leading-relaxed space-y-7">
          <p>
            Türkiye genelinde iş toplantıları, seminerler, fuarlar ve tüm kurumsal organizasyonlarınız için güvenilir ve esnek toplu transfer çözümleri sunuyoruz. Talebinize göre araç tipi ve hizmet seçeneklerini kolayca belirleyebilir, personeliniz ve misafirleriniz için konforlu ulaşım sağlayabilirsiniz.
          </p>
          <p>
            Tüm transfer süreçleri, sektörde deneyimli iş ortaklarımız tarafından yasal mevzuata uygun, sigortalı ve gizlilik esaslı şekilde organize edilir. Zamanında ulaşım, rezervasyon sırasında seçilebilen ek hizmetler ve 7/24 destek ile, kurumsal ihtiyaçlarınıza en uygun çözümü üretiyoruz.
          </p>
        </div>
        <Link href="/rezervasyon" className="block">
          <button className="bg-gradient-to-tr from-[#cbb26a] to-[#bfa658] text-black font-bold text-lg px-7 py-3 rounded-xl mt-10 w-full shadow-md border border-[#fff6ce] hover:scale-105 hover:from-[#e6d199] hover:to-[#c4ad5f] transition">
            Rezervasyon Yap
          </button>
        </Link>
        <style jsx>{`
          .policy-link {
            color: #ffeec2;
            text-decoration: underline;
            transition: color .15s;
          }
          .policy-link:hover {
            color: #bfa658;
          }
        `}</style>
      </section>
    </main>
  );
}
