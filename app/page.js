"use client";
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp, FaInstagram, FaTimes } from "react-icons/fa";

export default function Home() {
  // Kapatma butonuna tıklayınca WhatsApp ve Instagram'ın görünmesini kaldırmak için state kullanılabilir (isteğe bağlı).
  // Şimdilik sadece ikonları gösteriyorum.
  return (
    <main className="bg-[#101820] text-white min-h-screen flex flex-col">
      {/* HEADER */}
      <header className="flex items-center justify-between px-5 md:px-20 py-3 bg-black sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Image src="/logo-vip.png" alt="Logo" width={45} height={45} className="mr-2" />
          <span className="text-2xl font-bold text-yellow-400">YolcuTransferi.com</span>
        </div>
        <nav className="flex items-center gap-7 text-base font-medium">
          <Link href="/" className="hover:text-yellow-400">Anasayfa</Link>
          <Link href="/hizmetler" className="hover:text-yellow-400">Hizmetlerimiz</Link>
          <Link href="/araclar" className="hover:text-yellow-400">Araçlar</Link>
          <Link href="/rezervasyon" className="hover:text-yellow-400">Rezervasyon</Link>
          <Link href="/sss" className="hover:text-yellow-400">SSS</Link>
          <Link href="/iletisim" className="hover:text-yellow-400">İletişim</Link>
          <a
            href="https://wa.me/905395267569"
            target="_blank"
            rel="noopener"
            className="flex items-center gap-1 text-green-400 border px-2 py-1 rounded hover:bg-green-400 hover:text-black ml-4"
          >
            <FaWhatsapp /> WhatsApp
          </a>
          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noopener"
            className="flex items-center gap-1 text-pink-500 border px-2 py-1 rounded hover:bg-pink-200 hover:text-black"
          >
            <FaInstagram /> Instagram
          </a>
          <button
            className="ml-2 px-2 py-1 rounded bg-gray-800 hover:bg-red-600 text-white flex items-center"
            onClick={() => window.close()} // Tarayıcıda sekmeyi kapatmaz ama örnek için burada.
            title="Kapat"
          >
            <FaTimes />
          </button>
        </nav>
      </header>

      {/* HERO */}
      <section className="relative w-full h-[52vw] max-h-[600px] flex items-end justify-center overflow-hidden bg-black">
        <Image
          src="/hero-bg.jpg"
          alt="VIP Transfer"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
          quality={98}
          className="opacity-95"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-start z-10 px-5 pt-16 md:pt-20">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white text-center drop-shadow-xl mb-2">
            Türkiye'nin Lider VIP Transfer Ağı
          </h1>
          <p className="text-base md:text-lg font-medium text-gray-200 text-center max-w-2xl mb-4 drop-shadow-lg">
            Rakiplerine iş veren, her şehirde, 7/24 VIP transfer, drone taksi ve ultra lüks araçlar.<br />
            <span className="font-bold text-yellow-400">Şimdi Anında Fiyat Al!</span>
          </p>
        </div>
      </section>

      {/* REZERVASYON KUTUSU */}
      <section className="flex justify-center -mt-12 z-20">
        <div className="bg-white/98 border-2 border-yellow-400 rounded-xl shadow-2xl px-8 py-5 w-[97vw] max-w-4xl flex flex-col md:flex-row md:items-end gap-4 backdrop-blur">
          <div className="flex flex-col flex-1 min-w-[140px]">
            <label className="font-bold text-xs mb-1 text-yellow-900">Nereden?</label>
            <input type="text" placeholder="Şehir / İlçe / Mahalle" className="rounded-lg border border-gray-300 px-3 py-2 bg-white/90 text-black" />
          </div>
          <div className="flex flex-col flex-1 min-w-[140px]">
            <label className="font-bold text-xs mb-1 text-yellow-900">Nereye?</label>
            <input type="text" placeholder="Şehir / İlçe / Mahalle" className="rounded-lg border border-gray-300 px-3 py-2 bg-white/90 text-black" />
          </div>
          <div className="flex flex-col flex-1 min-w-[100px]">
            <label className="font-bold text-xs mb-1 text-yellow-900">Tarih</label>
            <input type="date" className="rounded-lg border border-gray-300 px-3 py-2 bg-white/90 text-black" />
          </div>
          <div className="flex flex-col flex-1 min-w-[90px]">
            <label className="font-bold text-xs mb-1 text-yellow-900">Saat</label>
            <input type="time" className="rounded-lg border border-gray-300 px-3 py-2 bg-white/90 text-black" />
          </div>
          <div className="flex flex-col w-24 min-w-[60px]">
            <label className="font-bold text-xs mb-1 text-yellow-900">Kişi</label>
            <select className="rounded-lg border border-gray-300 px-3 py-2 bg-white/90 text-black">
              {[...Array(10)].map((_, i) => (
                <option key={i + 1}>{i + 1}</option>
              ))}
              <option value="other">Diğer</option>
            </select>
          </div>
          <button className="bg-yellow-400 text-black font-bold px-8 py-3 rounded-lg shadow-lg hover:bg-yellow-500 transition mt-4 md:mt-0 md:self-end text-lg">
            Ara
          </button>
        </div>
      </section>

      {/* FOOTER (KISACA) */}
      <footer className="w-full bg-black/90 flex flex-col md:flex-row items-center justify-between gap-4 px-8 py-5 mt-auto border-t border-gray-800">
        <div className="flex items-center gap-3 text-gray-300 text-sm">
          &copy; 2025 YolcuTransferi.com
        </div>
        <div className="flex gap-5 items-center">
          <Link href="/gizlilik" className="text-xs underline text-gray-300">Gizlilik</Link>
          <Link href="/sozlesme" className="text-xs underline text-gray-300">Sözleşme</Link>
        </div>
      </footer>
    </main>
  );
}
