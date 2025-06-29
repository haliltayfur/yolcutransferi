// app/tekne-yat/page.jsx

"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link"
const images = [
  "/Flux_Dev_A_luxurious_yacht_on_the_Bosphorus_in_Istanbul_elegan_1.jpg",
  "/Flux_Dev_A_luxurious_yacht_on_the_Bosphorus_in_Istanbul_elegan_3.jpg",
  "/Flux_Dev_A_luxurious_yacht_on_the_Bosphorus_in_Istanbul_elegan_0.jpg",
  "/Flux_Dev_A_luxurious_yacht_on_the_Bosphorus_in_Istanbul_elegan_3 (1).jpg",
  "/Flux_Dev_very_big_A_modern_yacht_on_the_Bosphorus_a_group_of_t_3.jpg",
  "/Flux_Dev_A_modern_yacht_on_the_Bosphorus_a_group_of_tourists_e_0.jpg",
  // İstersen buraya "/tekne1.jpg", "/Flux_Dev_very_big_A_modern_yacht_on_the_Bosphorus_a_group_of_t_0.jpg", "/Flux_Dev_A_modern_big_yacht_on_the_Bosphorus_a_group_of_touris_3.jpg" da ekleyebilirsin.
];

export default function TekneYat() {
  const [showModal, setShowModal] = useState(false);
  const [current, setCurrent] = useState(0);

  const openModal = (idx) => {
    setCurrent(idx);
    setShowModal(true);
  };
  const closeModal = () => setShowModal(false);
  const prevImg = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const nextImg = () => setCurrent((c) => (c + 1) % images.length);

  return (
    <main className="flex justify-center items-center min-h-[90vh] bg-black">
      <section className="w-full max-w-4xl mx-auto border border-[#bfa658] rounded-3xl shadow-2xl px-6 md:px-12 py-12 bg-gradient-to-br from-black via-[#19160a] to-[#302811] mt-16 mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#bfa658] mb-5 text-center tracking-tight">
          Tekne / Yat Kiralama & Boğazda Lüks Etkinlikler
        </h1>
        <p className="text-base md:text-lg text-[#ecd9aa] font-normal leading-relaxed mb-8 text-center">
          İstanbul Boğazı’nda, lüks yatlarımızla evlilik teklifi, kurumsal buluşmalar, grup gezileri, doğum günü ve her türlü VIP davet için unutulmaz anlar sunuyoruz.  
          Farklı kapasite, menü ve rota seçenekleriyle, özel organizasyonlarınızı profesyonel ekibimizle hayata geçiriyoruz.
        </p>

        {/* Görsel Galeri */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-7">
          {images.map((src, idx) => (
            <button
              type="button"
              key={src}
              className="group relative aspect-[3/2] rounded-xl border-2 border-[#bfa65899] overflow-hidden shadow-lg hover:scale-105 transition"
              onClick={() => openModal(idx)}
              aria-label="Görseli büyüt"
            >
              <Image
                src={src}
                alt="Tekne / Yat Albüm Görseli"
                fill
                className="object-cover group-hover:brightness-90"
                sizes="(max-width: 768px) 50vw, 240px"
                quality={80}
                placeholder="blur"
                blurDataURL="/teknede-evlilik-banner.png"
              />
            </button>
          ))}
        </div>

        {/* Modal - Lightbox */}
        {showModal && (
          <div className="fixed z-50 inset-0 bg-black/80 flex items-center justify-center">
            <button
              className="absolute top-8 right-8 text-[#ecd9aa] text-3xl font-bold focus:outline-none hover:text-[#ffd700] transition"
              onClick={closeModal}
              aria-label="Kapat"
            >
              ×
            </button>
            <button
              className="absolute left-4 md:left-10 text-4xl text-[#ecd9aa] font-bold px-3 py-1 rounded-full hover:bg-[#2d2614] transition"
              onClick={prevImg}
              aria-label="Önceki görsel"
            >
              ‹
            </button>
            <div className="relative w-[90vw] max-w-2xl h-[50vw] max-h-[80vh] flex items-center justify-center">
              <Image
                src={images[current]}
                alt="Tekne Albüm Büyük Görsel"
                fill
                className="object-contain rounded-2xl"
                quality={100}
                sizes="(max-width: 768px) 80vw, 700px"
              />
            </div>
            <button
              className="absolute right-4 md:right-10 text-4xl text-[#ecd9aa] font-bold px-3 py-1 rounded-full hover:bg-[#2d2614] transition"
              onClick={nextImg}
              aria-label="Sonraki görsel"
            >
              ›
            </button>
          </div>
        )}

        {/* Açıklama ve CTA */}
        <div className="text-center mt-12">
          <Link href="/rezervasyon" className="inline-block">
            <button className="bg-gradient-to-tr from-[#cbb26a] to-[#bfa658] text-black font-bold text-lg px-8 py-4 rounded-xl shadow-lg border border-[#fff6ce] hover:scale-105 hover:from-[#e6d199] hover:to-[#c4ad5f] transition">
              Tekne & Yat İçin Rezervasyon Yap
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
