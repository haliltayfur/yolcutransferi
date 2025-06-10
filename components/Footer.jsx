"use client";
import React from "react";
import Image from "next/image";
import { FaWhatsapp, FaInstagram, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { SiX } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-[#151515] text-gray-200 pt-12 pb-7 px-3 border-t border-[#FFD70029] font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-8">

        {/* LOGO + SLOGAN + GÜVEN DAMGASI */}
        <div className="flex flex-col gap-2">
          <Image
            src="/LOGO.png"
            alt="YolcuTransferi.com"
            width={160}
            height={52}
            priority
            className="mb-2"
            style={{ objectFit: "contain" }}
          />
          <p className="text-gold font-semibold text-base mt-2 mb-2 leading-tight">
            “VIP transferde ayrıcalık ve güven.”
          </p>
          <p className="text-xs text-gray-400 mb-3">
            Türkiye’nin lider VIP ve kurumsal yolcu taşıma platformu.<br />
            Tüm Türkiye’de, 7/24 profesyonel, lisanslı ve güvenli transfer hizmeti.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <a href="https://wa.me/905395267569" target="_blank" rel="noopener noreferrer" aria-label="Whatsapp" className="text-gold hover:text-yellow-400 transition">
              <FaWhatsapp size={22} />
            </a>
            <a href="https://www.instagram.com/yolcutransferi/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gold hover:text-yellow-400 transition">
              <FaInstagram size={22} />
            </a>
            <a href="https://x.com/yolcutransferi" target="_blank" rel="noopener noreferrer" aria-label="X" className="text-gold hover:text-yellow-400 transition">
              <SiX size={20} />
            </a>
          </div>
          {/* Güven damgaları */}
          <div className="flex items-center gap-3 mt-5">
            <Image src="/troy.png" alt="TROY" width={48} height={24} />
            <Image src="/tursab.png" alt="TÜRSAB" width={70} height={28} />
          </div>
        </div>

        {/* VIP MENÜ */}
        <div>
          <h3 className="text-gold text-lg font-semibold mb-4">VIP Hizmetler</h3>
          <ul className="space-y-2 text-[15px]">
            <li><a href="/hizmetler" className="hover:text-yellow-400 transition">Havalimanı VIP Transfer</a></li>
            <li><a href="/hizmetler" className="hover:text-yellow-400 transition">Şehirlerarası Transfer</a></li>
            <li><a href="/hizmetler" className="hover:text-yellow-400 transition">Kurumsal Transfer</a></li>
            <li><a href="/araclar" className="hover:text-yellow-400 transition">VIP Araçlar</a></li>
            <li><a href="/rezervasyon" className="hover:text-yellow-400 transition">Online Rezervasyon</a></li>
            <li><a href="/sofor-basvuru" className="hover:text-yellow-400 transition">Şoför Başvurusu</a></li>
          </ul>
        </div>

        {/* KURUMSAL/YASAL MENÜ */}
        <div>
          <h3 className="text-gold text-lg font-semibold mb-4">Kurumsal & Yasal</h3>
          <ul className="space-y-2 text-[15px]">
            <li><a href="/hakkimizda" className="hover:text-yellow-400 transition">Hakkımızda</a></li>
            <li><a href="/kvkk" className="hover:text-yellow-400 transition">KVKK Politikası</a></li>
            <li><a href="/gizlilik-politikasi" className="hover:text-yellow-400 transition">Gizlilik Politikası</a></li>
            <li><a href="/kullanim-sartlari" className="hover:text-yellow-400 transition">Kullanım Şartları</a></li>
            <li><a href="/mesafeli-satis" className="hover:text-yellow-400 transition">Mesafeli Satış</a></li>
            <li><a href="/iptal-iade" className="hover:text-yellow-400 transition">İptal ve İade</a></li>
            <li><a href="/sss" className="hover:text-yellow-400 transition">S.S.S.</a></li>
          </ul>
        </div>

        {/* İLETİŞİM + OFİS */}
        <div>
          <h3 className="text-gold text-lg font-semibold mb-4">İletişim</h3>
          <ul className="space-y-3 text-[15px]">
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
            <li className="flex items-center gap-2 mt-3">
              <FaMapMarkerAlt className="text-gold" size={16} />
              <span className="text-xs text-gray-400">Türkiye Geneli 7/24 Hizmet</span>
            </li>
          </ul>
        </div>
      </div>

      {/* ALT BAND */}
      <div className="max-w-7xl mx-auto mt-8 border-t border-[#FFD70025] pt-4 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 gap-3">
        <div>
          © {new Date().getFullYear()} <span className="text-gold font-semibold">YolcuTransferi.com</span> • Tüm hakları saklıdır.
        </div>
        <div className="flex gap-4 mt-2 md:mt-0">
          <a href="/kvkk" className="hover:text-yellow-400 transition">KVKK</a>
          <span>|</span>
          <a href="/gizlilik-politikasi" className="hover:text-yellow-400 transition">Gizlilik</a>
          <span>|</span>
          <a href="/kullanim-sartlari" className="hover:text-yellow-400 transition">Kullanım Şartları</a>
        </div>
      </div>
      <style jsx>{`
        .text-gold { color: #FFD700; }
      `}</style>
    </footer>
  );
}
