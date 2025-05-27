"use client";
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp, FaInstagram, FaTwitter, FaLock } from "react-icons/fa";

// Menü başlıkları için dizi (kolayca güncellenir)
const NAVS = [
  { label: "Anasayfa", href: "/" },
  { label: "Hizmetlerimiz", href: "/hizmetler" },
  { label: "Araçlar", href: "/araclar" },
  { label: "Rezervasyon", href: "/rezervasyon" },
  { label: "SSS", href: "/sss" },
  { label: "İletişim", href: "/iletisim" },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "Blog", href: "/blog" },
  { label: "Sözleşmeler", href: "/sozlesme" },
];

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col bg-black">
      {/* HERO ARKA PLAN */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/hero-bg.jpg"
          alt="YolcuTransferi VIP Transfer"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
          quality={95}
          sizes="100vw"
        />
        {/* Hafif bir karanlık maske: İstersen kaldırabilirsin */}
        <div className="absolute inset-0 bg-black/35" />
      </div>

      {/* ÜST MENÜ */}
      <header className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-5 bg-black/75 backdrop-blur-md z-20">
        <div className="flex items-center gap-3">
          <Image src="/logo-vip.png" alt="Logo" width={42} height={42} className="mr-2" />
          <span className="text-2xl md:text-3xl font-bold text-gold drop-shadow tracking-wide">YolcuTransferi.com</span>
        </div>
        <nav className="flex flex-wrap gap-5 mt-3 md:mt-0 items-center text-lg">
          {NAVS.map(item => (
            <Link key={item.href} href={item.href}>{item.label}</Link>
          ))}
          <FaWhatsapp className="w-6 h-6 hover:text-green-400 cursor-pointer" title="Whatsapp" />
          <FaInstagram className="w-6 h-6 hover:text-pink-500 cursor-pointer" title="Instagram" />
          <FaTwitter className="w-6 h-6 hover:text-blue-400 cursor-pointer" title="Twitter" />
        </nav>
      </header>

      {/* HERO ve SLOGAN */}
      <section className="flex flex-col items-center justify-center flex-1 pt-24 pb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gold drop-shadow-lg mb-6 text-center">
          Türkiye’nin Her Yerinde VIP Transfer & Dron Transfer
        </h1>
        <p className="max-w-2xl text-lg md:text-2xl text-gray-100 text-center mb-8 drop-shadow">
          İstanbul, Bodrum, Antalya, İzmir ve tüm havalimanları için lüks, güvenli ve hızlı ulaşım.<br />
          Hemen online rezervasyon yap, %100 sigortalı, premium deneyimle yolculuğunu başlat!
        </p>
        <Link href="/rezervasyon">
          <button className="bg-gold text-black font-semibold py-3 px-8 rounded-xl text-lg shadow-lg hover:bg-white transition">
            Transfer Rezervasyonu Yap
          </button>
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="w-full px-8 py-6 bg-black/80 flex flex-col md:flex-row items-center justify-between gap-3 mt-auto z-10">
        <div className="flex items-center gap-3">
          <FaLock className="text-green-400" />
          <span className="text-sm text-gray-300">SSL ile korunuyor</span>
        </div>
        <div className="text-xs text-gray-400">&copy; 2025 YolcuTransferi.com</div>
      </footer>
    </main>
  );
}
