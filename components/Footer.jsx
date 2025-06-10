import Image from "next/image";
import { FaWhatsapp, FaInstagram, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { SiX } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-[#131313] text-gray-300 pt-12 pb-6 px-4 border-t border-[#FFD70018] mt-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* LOGO & SLOGAN */}
        <div className="flex flex-col items-start gap-2">
          <Image
            src="/LOGO.png"
            alt="YolcuTransferi.com"
            width={160}
            height={52}
            priority
            className="mb-2"
            style={{ objectFit: "contain" }}
          />
          <p className="text-sm text-gray-400 leading-tight font-medium max-w-xs mt-1 mb-2">
            Türkiye'nin lider VIP transfer platformu.<br />Güvenli, lüks ve ayrıcalıklı ulaşım.
          </p>
          {/* Sosyal ikonlar */}
          <div className="flex items-center gap-3 mt-1">
            <a href="https://wa.me/905395267569" target="_blank" rel="noopener noreferrer" aria-label="Whatsapp" className="text-gold hover:text-yellow-400 transition">
              <FaWhatsapp size={24} />
            </a>
            <a href="https://www.instagram.com/yolcutransferi/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gold hover:text-yellow-400 transition">
              <FaInstagram size={24} />
            </a>
            <a href="https://x.com/yolcutransferi" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="text-gold hover:text-yellow-400 transition">
              <SiX size={22} />
            </a>
          </div>
        </div>

        {/* HIZLI MENÜ */}
        <div>
          <h3 className="text-gold text-base font-semibold mb-3">Hızlı Menü</h3>
          <ul className="space-y-2 text-[15px]">
            <li><a href="/" className="hover:text-yellow-400 transition">Anasayfa</a></li>
            <li><a href="/hizmetler" className="hover:text-yellow-400 transition">Hizmetler</a></li>
            <li><a href="/rezervasyon" className="hover:text-yellow-400 transition">Rezervasyon</a></li>
            <li><a href="/araclar" className="hover:text-yellow-400 transition">Araçlar</a></li>
            <li><a href="/sofor-basvuru" className="hover:text-yellow-400 transition">Şoför Başvurusu</a></li>
          </ul>
        </div>

        {/* KURUMSAL */}
        <div>
          <h3 className="text-gold text-base font-semibold mb-3">Kurumsal</h3>
          <ul className="space-y-2 text-[15px]">
            <li><a href="/hakkimizda" className="hover:text-yellow-400 transition">Hakkımızda</a></li>
            <li><a href="/is-birligi" className="hover:text-yellow-400 transition">İş Birliği</a></li>
            <li><a href="/firma-basvuru" className="hover:text-yellow-400 transition">Firma Başvurusu</a></li>
            <li><a href="/araci-basvuru" className="hover:text-yellow-400 transition">Aracı Başvurusu</a></li>
            <li><a href="/sss" className="hover:text-yellow-400 transition">S.S.S.</a></li>
          </ul>
        </div>

        {/* İLETİŞİM */}
        <div>
          <h3 className="text-gold text-base font-semibold mb-3">İletişim</h3>
          <ul className="space-y-2 text-[15px]">
            <li className="flex items-center gap-2">
              <FaPhoneAlt className="text-gold" size={16} />
              <a href="tel:+905395267569" className="hover:text-yellow-400 transition">+90 539 526 75 69</a>
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-gold" size={16} />
              <a href="mailto:info@yolcutransferi.com" className="hover:text-yellow-400 transition">info@yolcutransferi.com</a>
            </li>
            <li className="flex items-center gap-2">
              <FaWhatsapp className="text-gold" size={16} />
              <a href="https://wa.me/905395267569" className="hover:text-yellow-400 transition" target="_blank" rel="noopener noreferrer">Whatsapp ile yaz</a>
            </li>
          </ul>
        </div>
      </div>

      {/* ALT BAND */}
      <div className="max-w-7xl mx-auto mt-8 border-t border-[#FFD70025] pt-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 gap-3">
        <div className="flex flex-row items-center gap-3">
          <a href="/kvkk" className="hover:text-yellow-400 transition">KVKK</a>
          <span className="hidden sm:inline">|</span>
          <a href="/gizlilik-politikasi" className="hover:text-yellow-400 transition">Gizlilik</a>
          <span className="hidden sm:inline">|</span>
          <a href="/kullanim-sartlari" className="hover:text-yellow-400 transition">Kullanım Şartları</a>
        </div>
        <div className="text-xs text-right mt-2 md:mt-0">
          © {new Date().getFullYear()} <span className="text-gold font-semibold">YolcuTransferi.com</span> • Tüm hakları saklıdır.
        </div>
      </div>
      <style jsx>{`
        .text-gold { color: #FFD700; }
      `}</style>
    </footer>
  );
}
