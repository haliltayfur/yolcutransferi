"use client";
import { FaWhatsapp, FaInstagram, FaTwitter, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import Image from "next/image";

export default function IletisimPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[80vh] bg-black/30 py-8">
      <section className="w-full max-w-3xl bg-black/70 rounded-2xl shadow-lg px-8 py-10 border border-gold">
        <h1 className="text-2xl md:text-3xl font-bold text-gold mb-4 text-center">
          İletişim Bilgileri
        </h1>
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 mb-8 justify-center items-center">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-lg text-white">
              <FaMapMarkerAlt className="text-gold" />
              Ümraniye Plazalar Bölgesi, İstanbul <br />
              <span className="text-xs text-gray-400">(Detaylı adres ileride güncellenecek)</span>
            </div>
            <div className="flex items-center gap-2 text-lg text-white">
              <FaPhone className="text-gold" />
              <a href="tel:+905395267569" className="underline hover:text-gold transition">0539 526 75 69</a>
            </div>
            <div className="flex items-center gap-2 text-lg text-white">
              <FaEnvelope className="text-gold" />
              <a href="mailto:info@yolcutransferi.com" className="underline hover:text-gold transition">info@yolcutransferi.com</a>
            </div>
          </div>
          <div className="flex flex-col gap-3 items-center">
            <a
              href="https://wa.me/905395267569"
              target="_blank"
              rel="noopener"
              className="flex items-center gap-2 text-green-400 font-semibold hover:underline"
            >
              <FaWhatsapp size={28} /> WhatsApp Destek
            </a>
            <a
              href="https://www.instagram.com/" // gerçek link gelince değiştirirsin
              target="_blank"
              rel="noopener"
              className="flex items-center gap-2 text-pink-400 font-semibold hover:underline"
            >
              <FaInstagram size={28} /> Instagram
            </a>
            <a
              href="https://twitter.com/" // gerçek link gelince değiştirirsin
              target="_blank"
              rel="noopener"
              className="flex items-center gap-2 text-blue-400 font-semibold hover:underline"
            >
              <FaTwitter size={28} /> Twitter
            </a>
          </div>
        </div>
        {/* Harita görseli (placeholder, dilediğinde Google Maps embed ekleyebilirsin) */}
        <div className="w-full rounded-lg overflow-hidden mb-6">
          <Image
            src="https://maps.googleapis.com/maps/api/staticmap?center=Ümraniye,İstanbul&zoom=14&size=600x200&key=AIzaSyDUMMYKEY"
            alt="Harita"
            width={600}
            height={200}
            className="w-full object-cover"
            style={{ background: "#222" }}
          />
        </div>
        {/* Basit iletişim formu */}
        <h2 className="text-xl text-gold font-bold mb-3">Hızlı Mesaj Gönder</h2>
        <form className="flex flex-col gap-4">
          <input
            type="text"
            name="isim"
            required
            placeholder="Ad Soyad"
            className="px-3 py-2 rounded-lg border border-gray-400 focus:ring-2 focus:ring-gold text-black"
          />
          <input
            type="email"
            name="email"
            required
            placeholder="E-posta"
            className="px-3 py-2 rounded-lg border border-gray-400 focus:ring-2 focus:ring-gold text-black"
          />
          <textarea
            name="mesaj"
            required
            rows={3}
            placeholder="Mesajınız"
            className="px-3 py-2 rounded-lg border border-gray-400 focus:ring-2 focus:ring-gold text-black"
          />
          <button
            type="submit"
            className="bg-gold text-black font-bold py-3 rounded-xl text-lg shadow-lg hover:bg-white transition"
          >
            Gönder
          </button>
        </form>
        <p className="text-center text-xs text-gray-400 mt-4">
          Bilgi: İletişim talepleriniz <b>info@yolcutransferi.com</b> adresine iletilir.
        </p>
      </section>
    </main>
  );
}
