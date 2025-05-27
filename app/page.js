"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaWhatsapp, FaInstagram, FaTwitter, FaLock } from "react-icons/fa";
import { MdOutlineSearch } from "react-icons/md";
import { useState } from "react";

const LANGS = [
  { code: "tr", label: "TR" },
  { code: "en", label: "EN" },
  { code: "ru", label: "RU" }
];

export default function Home() {
  const pathname = usePathname();
  const router = useRouter();
  const [locale, setLocale] = useState("tr");

  // Dil seçince yönlendir
  const handleLang = (lang) => {
    setLocale(lang);
    router.push("/" + lang);
  };

  return (
    <main className="relative min-h-screen flex flex-col">
      {/* Responsive arka plan */}
      <div className="fixed inset-0 -z-10">
       <Image
  src="/hero-bg.jpg"
  alt="YolcuTransferi VIP Transfer"
  fill
  style={{ objectFit: "cover", objectPosition: "center top" }} // center'dan "center top" yap!
  priority
  quality={90}
  sizes="100vw"
/>
        <div className="absolute inset-0 bg-black/1" />
      </div>

      {/* HEADER */}
      <header className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-5 bg-black/60 backdrop-blur-md z-20">
        <div className="text-2xl md:text-3xl font-bold text-gold drop-shadow tracking-wide flex gap-2 items-center">
          <Image src="/logo-vip.png" alt="Logo" width={42} height={42} className="mr-2" />
          YolcuTransferi.com
        </div>
        <nav className="flex gap-5 mt-3 md:mt-0 items-center text-lg">
          <Link href="/">Anasayfa</Link>
          <Link href="/hizmetler">Hizmetlerimiz</Link>
          <Link href="/araclar">Araçlar</Link>
          <Link href="/rezervasyon">Rezervasyon</Link>
          <Link href="/sss">SSS</Link>
          <Link href="/iletisim">İletişim</Link>
          <Link href="/hakkimizda">Hakkımızda</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/sozlesme">Sözleşmeler</Link>
          <MdOutlineSearch className="w-6 h-6 hover:text-gold cursor-pointer" title="Ara" />
          <FaWhatsapp className="w-6 h-6 hover:text-green-400 cursor-pointer" title="Whatsapp" />
          <FaInstagram className="w-6 h-6 hover:text-pink-500 cursor-pointer" title="Instagram" />
          <FaTwitter className="w-6 h-6 hover:text-blue-400 cursor-pointer" title="Twitter" />
          <div className="flex gap-2 ml-6">
            {LANGS.map(lang => (
              <button
                key={lang.code}
                className={`px-2 text-sm rounded hover:bg-gold/20 transition ${locale === lang.code ? "font-bold text-gold" : ""}`}
                onClick={() => handleLang(lang.code)}
              >{lang.label}</button>
            ))}
          </div>
        </nav>
      </header>

      {/* Banner + Slogan + Avantajlar */}
      <section className="flex flex-col items-center justify-center pt-16 pb-6 px-4 md:px-0">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gold drop-shadow-lg mb-6 text-center">
          Güvenilir Dijital VIP Transfer
        </h1>
        <p className="max-w-3xl text-lg md:text-xl text-gray-100 text-center mb-6 drop-shadow">
          Türkiye'nin her yerinde VIP yolcu taşımacılığı ve dron transferde yeni çağ! <br />
          Uygun fiyatlarla, 7/24 online rezervasyon ve premium hizmet deneyimi.
        </p>
        <Link href="/rezervasyon">
          <button className="bg-gold text-black font-semibold py-3 px-8 rounded-xl text-lg shadow-lg hover:bg-white transition">Transfer Rezervasyonu Yap</button>
        </Link>
        <div className="flex flex-wrap gap-5 justify-center mt-8">
          <div className="bg-black/70 px-6 py-4 rounded-xl border border-gold/50 flex flex-col items-center min-w-[230px]">
            <span className="font-bold text-lg text-gold">Transfer noktalarını seçin</span>
            <span className="text-gray-300">Tüm şehirler ve havalimanları</span>
          </div>
          <div className="bg-black/70 px-6 py-4 rounded-xl border border-gold/50 flex flex-col items-center min-w-[230px]">
            <span className="font-bold text-lg text-gold">Araç tipinizi belirleyin</span>
            <span className="text-gray-300">Vito, Maybach, Premium, Dron</span>
          </div>
          <div className="bg-black/70 px-6 py-4 rounded-xl border border-gold/50 flex flex-col items-center min-w-[230px]">
            <span className="font-bold text-lg text-gold">Rezervasyonunuzu yapın</span>
            <span className="text-gray-300">Online ödeme ve canlı destek</span>
          </div>
        </div>
        <div className="mt-10 max-w-4xl w-full">
          <h2 className="text-2xl font-bold text-gold mb-2 text-center">Neden YolcuTransferi.com?</h2>
          <ul className="flex flex-wrap justify-center gap-6 text-lg text-gray-100">
            <li className="bg-black/60 px-5 py-2 rounded-xl border border-gold/30">Kolay online rezervasyon</li>
            <li className="bg-black/60 px-5 py-2 rounded-xl border border-gold/30">7/24 müşteri desteği</li>
            <li className="bg-black/60 px-5 py-2 rounded-xl border border-gold/30">Fiyat avantajı ve şeffaflık</li>
            <li className="bg-black/60 px-5 py-2 rounded-xl border border-gold/30">Tüm Türkiye'de hizmet</li>
            <li className="bg-black/60 px-5 py-2 rounded-xl border border-gold/30">VIP ve Dron seçenekleri</li>
            <li className="bg-black/60 px-5 py-2 rounded-xl border border-gold/30">Kurumsal ve özel çözümler</li>
          </ul>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full px-8 py-6 bg-black/70 flex flex-col md:flex-row items-center justify-between gap-3 mt-auto">
        <div className="flex items-center gap-3">
          <FaLock className="text-green-400" />
          <span className="text-sm text-gray-300">SSL ile korunuyor</span>
        </div>
        <div className="flex gap-6 items-center">
          <Image src="/tursab-logo.png" alt="TURSAB" width={60} height={40} className="bg-white rounded-md px-1 py-1 object-contain" />
          <Link href="/sozlesme" className="text-sm underline">Mesafeli Satış Sözleşmesi</Link>
          <Link href="/gizlilik" className="text-sm underline">Gizlilik</Link>
          <Link href="/iade" className="text-sm underline">İade Politikası</Link>
          <Link href="/cerez" className="text-sm underline">Çerez Politikası</Link>
        </div>
        <div className="text-xs text-gray-400">&copy; 2025 YolcuTransferi.com</div>
      </footer>
    </main>
  );
}
