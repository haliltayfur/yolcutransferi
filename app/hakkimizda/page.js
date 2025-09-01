"use client";
import Link from "next/link";

export default function Hakkimizda() {
  return (
    <main className="flex justify-center items-center min-h-[90vh] bg-black">
      <section className="w-full max-w-4xl mx-auto border border-[#bfa658] rounded-3xl shadow-2xl px-6 md:px-12 py-14 bg-gradient-to-br from-black via-[#19160a] to-[#302811] mt-16 mb-10">
        {/* Başlık ve slogan */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#bfa658] tracking-tight mb-2 text-center">
          Hakkımızda
        </h1>
        <div className="text-lg text-[#ffeec2] font-semibold text-center mb-7">
          VIP transferde ayrıcalık ve teknoloji: YolcuTransferi.com
        </div>

        <div className="text-base md:text-lg text-[#ecd9aa] leading-relaxed font-normal space-y-7">
          <p className="mb-5">
            <span className="font-semibold text-[#ffeec2]">YolcuTransferi.com</span> olarak, Türkiye genelinde VIP ulaşım, havalimanı transferi, şehirler arası taşımacılık ve özel etkinliklerde yüksek standartlı hizmet anlayışıyla faaliyet gösteriyoruz. Gücümüzü; alanında deneyimli şoförler, güvenilir transfer firmaları ve teknolojik altyapımızdan alıyoruz.
          </p>

          <ul className="pl-6 space-y-4 mb-2">
            <li className="flex items-start gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#e3b77b] to-[#bfa658] mt-2"></span>
              <span>
                <span className="text-[#ffeec2] font-semibold">VIP Standartlarda Transfer:</span>{" "}
                Mercedes Vito, Maybach, lüks minivanlar ve kişiye özel araç seçenekleriyle her yolculukta konfor.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#e3b77b] to-[#bfa658] mt-2"></span>
              <span>
                <span className="text-[#ffeec2] font-semibold">Yapay Zeka Destekli Rezervasyon:</span>{" "}
                Talebiniz sisteme düştüğü anda, en uygun araç ve sürücü otomatik olarak atanır. Teklif toplama veya bekleme yok.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#e3b77b] to-[#bfa658] mt-2"></span>
              <span>
                <span className="text-[#ffeec2] font-semibold">Seçkin İş Birlikleri:</span>{" "}
                Her iş ortağımız lisanslı ve profesyonel şoförlerden oluşur. Tüm iş birlikleri özenle seçilir ve düzenli olarak denetlenir.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#e3b77b] to-[#bfa658] mt-2"></span>
              <span>
                <span className="text-[#ffeec2] font-semibold">Sigortalı & Yasal Güvence:</span>{" "}
                Tüm transferler yasal zeminde ve sigortalı olarak gerçekleştirilir. Müşteri memnuniyeti ve güvenliği önceliğimizdir.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#e3b77b] to-[#bfa658] mt-2"></span>
              <span>
                <span className="text-[#ffeec2] font-semibold">Şeffaf & Sabit Fiyatlar:</span>{" "}
                Online ödeme altyapısı ve vergiye tabi faturalandırma ile sonradan ekstra ücret sürprizi yaşanmaz.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#e3b77b] to-[#bfa658] mt-2"></span>
              <span>
                <span className="text-[#ffeec2] font-semibold">7/24 VIP Destek:</span>{" "}
                Tüm transfer sürecinde, rezervasyon öncesi ve sonrası kesintisiz destek ekibimiz yanınızda.
              </span>
            </li>
          </ul>

          <p>
            Yolculuğunuzun her aşamasında tek muhatabınız <b>YolcuTransferi.com</b> olur. İster bireysel ister kurumsal olun; VIP havalimanı, şehirler arası, toplu organizasyon, özel tur veya tekne transferi gibi tüm ayrıcalıklar sadece birkaç tık uzağınızda.
          </p>
          <p>
            Araç sahipleri ve şoförler için <b>iş ortaklığı modeli</b> sunuyoruz. Aracınızla sisteme katıldığınızda, gelen rezervasyonlar otomatik olarak size yönlendirilir ve siz de işinizi büyütme fırsatı yakalarsınız.
          </p>
          <p>
            Kurumsal firmalar için ise; iletişim kanallarımız üzerinden özel transfer talepleri toplayıp, size özel <b>tekliflendirme</b> yapıyoruz. Böylece şirketinizin tüm VIP transfer ihtiyaçlarını güvenle karşılıyoruz.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-start mt-10">
          <Link
            href="/rezervasyon"
            className="bg-gradient-to-tr from-[#cbb26a] to-[#bfa658] text-black font-bold text-lg px-7 py-3 rounded-xl shadow-md border border-[#fff6ce] hover:scale-105 hover:from-[#e6d199] hover:to-[#c4ad5f] transition"
          >
            Rezervasyon Yap
          </Link>
          <Link
            href="/is-ortakligi"
            className="bg-gradient-to-tr from-[#e3b77b] to-[#cfa95f] text-black font-bold text-lg px-7 py-3 rounded-xl shadow-md border border-[#fff6ce] hover:scale-105 hover:from-[#f5db9c] hover:to-[#cfa95f] transition"
          >
            İş Ortağı Ol
          </Link>
          <Link
            href="/iletisim"
            className="bg-gradient-to-tr from-[#ffd97d] to-[#d4a947] text-black font-bold text-lg px-7 py-3 rounded-xl shadow-md border border-[#fff6ce] hover:scale-105 hover:from-[#ffe9ad] hover:to-[#d4a947] transition"
          >
            Kurumsal Teklif Al
          </Link>
        </div>
      </section>
    </main>
  );
}
