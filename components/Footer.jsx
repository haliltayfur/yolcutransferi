"use client";
import Image from "next/image";
import { FaWhatsapp, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { SiX } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-200 pt-14 pb-10 px-3 border-t border-[#FFD70022] font-sans">
      {/* ÜST 4'LÜ BLOK */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-14 gap-y-16 mb-20">
        {/* Sütun 1: Slogan + Açıklama + Kartlar */}
        <div className="flex flex-col gap-5 min-w-0 items-start">
          <h3 className="text-gold text-[1.2rem] font-bold mb-2">VIP transferde ayrıcalık ve güven.</h3>
          <div className="text-gray-300 text-[1.06rem] font-normal leading-relaxed mb-1">
            Türkiye’nin lider VIP ve kurumsal yolcu taşıma platformu.<br />
            7/24 profesyonel, lisanslı ve güvenli transfer hizmeti.
          </div>
          <div className="flex flex-row items-center gap-5 mt-2">
            <Image src="/tursab.png" alt="TÜRSAB" width={54} height={26} className="bg-white rounded-lg p-1" />
            <Image src="/mastercard.png" alt="MasterCard" width={54} height={26} className="bg-white rounded-lg p-1" />
            <Image src="/visa.png" alt="Visa" width={54} height={26} className="bg-white rounded-lg p-1" />
            <Image src="/Troy.png" alt="TROY" width={54} height={26} className="bg-white rounded-lg p-1" />
          </div>
        </div>
        {/* Sütun 2: VIP Hizmetler */}
        <div className="flex flex-col gap-4 min-w-0 items-start">
          <h3 className="text-gold text-[1.14rem] font-bold mb-2">VIP Hizmetler</h3>
          <ul className="flex flex-col gap-1.5">
            <li><a href="/hizmetler" className="text-gray-200 hover:text-gold transition">Havalimanı VIP Transfer</a></li>
            <li><a href="/hizmetler" className="text-gray-200 hover:text-gold transition">Şehirlerarası Transfer</a></li>
            <li><a href="/hizmetler" className="text-gray-200 hover:text-gold transition">Kurumsal Transfer</a></li>
            <li><a href="/araclar" className="text-gray-200 hover:text-gold transition">VIP Araçlar</a></li>
            <li><a href="/rezervasyon" className="text-gray-200 hover:text-gold transition">Online Rezervasyon</a></li>
            <li><a href="/sofor-basvuru" className="text-gray-200 hover:text-gold transition">Şoför Başvurusu</a></li>
          </ul>
        </div>
        {/* Sütun 3: Kurumsal & Yasal */}
        <div className="flex flex-col gap-4 min-w-0 items-start">
          <h3 className="text-gold text-[1.14rem] font-bold mb-2">Kurumsal & Yasal</h3>
          <ul className="flex flex-col gap-1.5">
            <li><a href="/hakkimizda" className="text-gray-200 hover:text-gold transition">Hakkımızda</a></li>
            <li><a href="/kvkk" className="text-gray-200 hover:text-gold transition">KVKK Politikası</a></li>
            <li><a href="/gizlilik-politikasi" className="text-gray-200 hover:text-gold transition">Gizlilik Politikası</a></li>
            <li><a href="/kullanim-sartlari" className="text-gray-200 hover:text-gold transition">Kullanım Şartları</a></li>
            <li><a href="/mesafeli-satis" className="text-gray-200 hover:text-gold transition">Mesafeli Satış</a></li>
            <li><a href="/iptal-iade" className="text-gray-200 hover:text-gold transition">İptal ve İade</a></li>
            <li><a href="/sss" className="text-gray-200 hover:text-gold transition">S.S.S.</a></li>
          </ul>
        </div>
        {/* Sütun 4: İletişim */}
        <div className="flex flex-col gap-5 min-w-0 items-start">
          <h3 className="text-gold text-[1.14rem] font-bold mb-2">İletişim</h3>
          <div className="flex flex-col gap-2 mb-2">
            <div className="flex items-center gap-2">
              <FaPhoneAlt className="text-gold" size={18} />
              <a href="tel:+905395267569" className="text-gray-200 hover:text-gold transition">+90 539 526 75 69</a>
            </div>
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-gold" size={18} />
              <a href="mailto:info@yolcutransferi.com" className="text-gray-200 hover:text-gold transition">info@yolcutransferi.com</a>
            </div>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-gold" size={18} />
              <span className="text-gray-300">Türkiye Geneli 7/24 Hizmet</span>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-2">
            <a href="https://wa.me/905395267569" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
              className="text-gold bg-neutral-900 rounded-full p-2 shadow-lg hover:bg-gold/80 hover:text-black transition-all duration-200">
              <FaWhatsapp size={22} />
            </a>
            <a href="https://www.instagram.com/yolcutransferi/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
              className="text-gold bg-neutral-900 rounded-full p-2 shadow-lg hover:bg-gold/80 hover:text-black transition-all duration-200">
              <FaInstagram size={21} />
            </a>
            <a href="https://x.com/yolcutransferi" target="_blank" rel="noopener noreferrer" aria-label="X"
              className="text-gold bg-neutral-900 rounded-full p-2 shadow-lg hover:bg-gold/80 hover:text-black transition-all duration-200">
              <SiX size={21} />
            </a>
          </div>
        </div>
      </div>
      {/* ALT BOŞLUK, ALT ÇİZGİ, ALT BANT */}
      <div className="h-16"></div>
      <div className="border-t border-[#FFD70044]"></div>
      <div className="max-w-7xl mx-auto pt-5 flex flex-col md:flex-row justify-between items-center text-[15px] text-gray-400 gap-4">
        <div>
          © {new Date().getFullYear()} <span className="text-gold font-semibold">YolcuTransferi.com</span> • Tüm hakları saklıdır.
        </div>
        <div className="flex gap-3 mt-1 md:mt-0">
          <a href="/kvkkkkkkkk" className="hover:text-gold">KVKK</a>
          <span>|</span>
          <a href="/gizlilik-politikasi" className="hover:text-gold">Gizlilik</a>
          <span>|</span>
          <a href="/kullanim-sartlari" className="hover:text-gold">Kullanım Şartları</a>
        </div>
      </div>
    </footer>
  );
}
