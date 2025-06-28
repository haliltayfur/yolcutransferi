// === Dosya: components/TestimonialsSlider.jsx ===

"use client";
import { useState, useEffect } from "react";
import { testimonials } from "../data/testimonials";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 900);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return isMobile;
}

// En uzun yorumu bul
const maxLen = testimonials.reduce(
  (max, t) => (t.comment.length > max ? t.comment.length : max),
  0
);
const maxCharYorum = testimonials.find(t => t.comment.length === maxLen)?.comment || "";

export default function TestimonialsSlider() {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex(idx =>
        (idx + (isMobile ? 2 : 3)) % testimonials.length
      );
    }, 8000);
    return () => clearInterval(interval);
  }, [isMobile, testimonialIndex]);

  const getVisibleTestimonials = () => {
    if (isMobile)
      return [
        testimonials[testimonialIndex % testimonials.length],
        testimonials[(testimonialIndex + 1) % testimonials.length]
      ];
    return [
      testimonials[testimonialIndex % testimonials.length],
      testimonials[(testimonialIndex + 1) % testimonials.length],
      testimonials[(testimonialIndex + 2) % testimonials.length],
    ];
  };

  // Kutu yüksekliğini en uzun yoruma göre sabitle, fazladan boşluk bırak
  const charPerLine = 32; // yaklaşık her satır karakteri
  const lineCount = Math.ceil(maxLen / charPerLine) + 1;
  const pxPerLine = 23; // satır başına yükseklik px
  const minHeight = 55 + lineCount * pxPerLine; // yıldız+isim+padding + satırlar

  return (
    <section className="w-full max-w-6xl mx-auto py-7 mb-3 px-2 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-3 text-gold text-center">Müşteri Yorumları</h2>
      <div
        className={`grid ${isMobile ? "grid-cols-2" : "grid-cols-3"} gap-5 justify-center transition-all w-full`}
      >
        {getVisibleTestimonials().map((item, idx) => (
          <div
            key={idx}
            className="bg-[#181818] border border-gold/20 rounded-2xl px-6 py-4 shadow flex flex-col justify-between max-w-sm w-full transition-all"
            style={{
              minHeight,
              boxShadow: "0 3px 18px #bfa65820",
              display: "flex"
            }}
          >
            {/* YILDIZLAR */}
            <div className="flex items-center mb-1">
              {[...Array(Math.floor(item.stars))].map((_, i) => (
                <FaStar key={i} className="text-gold" size={16} />
              ))}
              {item.stars % 1 !== 0 && <FaStarHalfAlt className="text-gold" size={15} />}
            </div>
            {/* YORUM */}
            <p
              className="text-[0.98rem] font-medium mb-3 flex-1"
              style={{
                lineHeight: "1.45em",
                textAlign: "left"
              }}
            >
              {item.comment}
            </p>
            {/* AVATAR ve İSİM */}
            <div className="flex items-center gap-3 mt-2">
              <div className="w-9 h-9 rounded-full bg-gold text-black flex items-center justify-center text-lg font-bold shadow">
                {item.avatar}
              </div>
              <div>
                <div className="text-gold font-bold">{item.name}</div>
                <div className="text-xs text-gray-400">{item.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* En uzun satırdan sonra sabitlemek için görünmez alan */}
      <div style={{ height: "1.2em" }} />
      <style jsx>{`
        @media (max-width: 700px) {
          .max-w-sm { max-width: 99vw !important; }
          .px-6 { padding-left: 7px !important; padding-right: 7px !important; }
        }
        @media (max-width: 400px) {
          .text-3xl { font-size: 1.18rem !important; }
          .px-6 { padding-left: 4px !important; padding-right: 4px !important; }
        }
      `}</style>
    </section>
  );
}

// === Dosya SONU: components/TestimonialsSlider.jsx ===
