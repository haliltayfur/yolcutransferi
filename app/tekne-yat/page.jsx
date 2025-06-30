// app/tekne-yat/page.jsx

"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

export default function TekneYat() {
  const images = [
    "/Flux_Dev_A_luxurious_yacht_on_the_Bosphorus_in_Istanbul_elegan_1.jpg",
    "/Flux_Dev_A_luxurious_yacht_on_the_Bosphorus_in_Istanbul_elegan_3.jpg",
    "/Flux_Dev_A_luxurious_yacht_on_the_Bosphorus_in_Istanbul_elegan_0.jpg",
    "/Flux_Dev_A_luxurious_yacht_on_the_Bosphorus_in_Istanbul_elegan_3 (1).jpg",
    "/Flux_Dev_very_big_A_modern_yacht_on_the_Bosphorus_a_group_of_t_3.jpg",
    "/Flux_Dev_A_modern_yacht_on_the_Bosphorus_a_group_of_tourists_e_0.jpg",
  ];

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
      <section className="w-full max-w-4xl mx-auto border border-[#bfa658] rounded-3xl shadow-2xl px-4 md:px-12 py-10 bg-gradient-to-br from-black via-[#19160a] to-[#302811] mt-16 mb-10">

        {/* ŞEHİRLER ARASI SAYFASIYLA AYNI FONT VE BOYDA BAŞLIK */}
        <h1
          className="text-[2.1rem] md:text-[2.6rem] font-extrabold text-[#bfa658] tracking-tight text-center mb-5 leading-tight"
          style={{
            fontFamily: "Poppins, sans-serif",
            textShadow: "0 2px 10px #000, 0 0 3px #ffd700aa",
            letterSpacing: "0.01em"
          }}
        >
          VIP Tekne ve Yat ile Özel Etkinlikler
        </h1>

        <p className="text-base md:text-lg text-[#ecd9aa] font-normal leading-relaxed mb-8 text-center">
          İstanbul Boğazı’nda, lüks teknelerimiz ve yatlarımızda evlilik teklifi, kurumsal buluşmalar, grup gezileri, doğum günü ve her türlü VIP davet için unutulmaz anlar sunuyoruz. 
          Farklı kapasite, menü ve rota seçenekleriyle organizasyonlarınızı profesyonel ekibimizle hayata geçiriyoruz.
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
          <div className="fixed z-[1000] inset-0 bg-black/80 flex items-center justify-center">
            {/* Modal içindeki büyük görsel */}
            <div
              className={`
                relative flex items-center justify-center
                w-[95vw] h-[55vw] max-w-[640px] max-h-[90vh]
                md:w-[60vw] md:h-[38vw] md:max-w-[980px] md:max-h-[70vh]
              `}
            >
              {/* Sağ üst köşeye yapışık kapat butonu */}
              <button
                className="absolute top-2 right-2 text-[#ffeec2] text-3xl md:text-4xl font-bold bg-black/50 hover:bg-[#23201b] rounded-full p-2 focus:outline-none transition z-10"
                onClick={closeModal}
                aria-label="Kapat"
                style={{ boxShadow: "0 0 10px #000" }}
              >
                ×
              </button>
              <Image
                src={images[current]}
                alt="Tekne Albüm Büyük Görsel"
                fill
                className="object-contain rounded-2xl bg-black"
                quality={100}
                sizes="(max-width: 768px) 95vw, 60vw"
              />
              {/* Sola-sağa kaydırma butonları */}
              <button
                className="absolute left-2 top-1/2 -translate-y-1/2 text-3xl md:text-4xl text-[#ecd9aa] font-bold px-2 py-1 rounded-full hover:bg-[#2d2614] transition z-10"
                onClick={prevImg}
                aria-label="Önceki görsel"
              >
                ‹
              </button>
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 text-3xl md:text-4xl text-[#ecd9aa] font-bold px-2 py-1 rounded-full hover:bg-[#2d2614] transition z-10"
                onClick={nextImg}
                aria-label="Sonraki görsel"
              >
                ›
              </button>
            </div>
          </div>
        )}

        {/* Rezervasyon butonu */}
        <div className="text-center mt-12">
          <Link href="/rezervasyon" className="inline-block">
            <button className="bg-gradient-to-tr from-[#cbb26a] to-[#bfa658] text-black font-bold text-lg px-8 py-4 rounded-xl shadow-lg border border-[#fff6ce] hover:scale-105 hover:from-[#e6d199] hover:to-[#c4ad5f] transition">
              Rezervasyon Yap
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
