// app/tekne-yat/page.jsx

"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

// ...images aynı...

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
      <section className="w-full max-w-4xl mx-auto border border-[#bfa658] rounded-3xl shadow-2xl px-4 md:px-12 py-10 bg-gradient-to-br from-black via-[#19160a] to-[#302811] mt-16 mb-10">

        {/* Responsive Tek Satırda, Otomatik Küçülen Başlık */}
        <h1
          className="font-extrabold text-[#bfa658] text-center mb-5 leading-tight"
          style={{
            fontSize: "clamp(1.6rem, 4vw, 2.8rem)", // min 1.6rem, max 2.8rem arası
            textShadow: "0 2px 10px #000, 0 0 3px #ffd700aa",
            letterSpacing: "0.01em",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            width: "100%",
            display: "block"
          }}
          title="Tekne / Yat Kiralama & Boğazda Lüks Etkinlikler"
        >
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

        {/* Modal - Lightbox (Aynı) */}
        {showModal && (
          <div className="fixed z-[1000] inset-0 bg-black/80 flex items-center justify-center">
            <button
              className="absolute top-6 right-6 md:top-10 md:right-10 text-[#ffeec2] text-4xl md:text-5xl font-bold p-2 hover:bg-[#23201b] rounded-full focus:outline-none transition"
              onClick={closeModal}
              aria-label="Kapat"
            >
              ×
            </button>
            <button
              className="absolute left-2 md:left-8 text-3xl md:text-5xl text-[#ecd9aa] font-bold px-2 py-1 rounded-full hover:bg-[#2d2614] transition"
              onClick={prevImg}
              aria-label="Önceki görsel"
            >
              ‹
            </button>
            <div
              className={`
                relative flex items-center justify-center
                w-[95vw] h-[55vw] max-w-[640px] max-h-[90vh]
                md:w-[60vw] md:h-[38vw] md:max-w-[980px] md:max-h-[70vh]
              `}
            >
              <Image
                src={images[current]}
                alt="Tekne Albüm Büyük Görsel"
                fill
                className="object-contain rounded-2xl bg-black"
                quality={100}
                sizes="(max-width: 768px) 95vw, 60vw"
              />
            </div>
            <button
              className="absolute right-2 md:right-8 text-3xl md:text-5xl text-[#ecd9aa] font-bold px-2 py-1 rounded-full hover:bg-[#2d2614] transition"
              onClick={nextImg}
              aria-label="Sonraki görsel"
            >
              ›
            </button>
          </div>
        )}

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
