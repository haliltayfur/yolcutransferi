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

// Kutu yüksekliğini, yıldız ve müşteri bilgisiyle birlikte, en uzun yoruma göre ayarla
const maxLen =
  Array.isArray(testimonials) && testimonials.length > 0
    ? testimonials.reduce((max, t) => (t.comment.length > max ? t.comment.length : max), 0)
    : 0;

// Kısa yorumlara fazladan satır ekle
const getPaddedComment = (comment) => {
  const maxLines = Math.ceil(maxLen / 32) + 1;
  const currentLines = Math.ceil(comment.length / 32);
  const lineDiff = maxLines - currentLines;
  return comment + "\n".repeat(lineDiff > 0 ? lineDiff : 0);
};

// Yıldızları çiz: 5 adet star, gerekirse en sonuncu yarım yıldız olur (altın/gri renk ile)
const getStars = (stars) => {
  let output = [];
  const fullStars = Math.floor(stars);
  const hasHalf = stars % 1 !== 0;
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) output.push(<FaStar key={i} color="#bfa658" size={18} />);
    else if (i === fullStars && hasHalf) output.push(<FaStarHalfAlt key={i} color="#bfa658" size={18} />);
    else output.push(<FaStar key={i} color="#444" size={18} />);
  }
  return output;
};

export default function TestimonialsSlider() {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!Array.isArray(testimonials) || testimonials.length === 0) return;
    const interval = setInterval(() => {
      setTestimonialIndex(idx =>
        (idx + (isMobile ? 2 : 3)) % testimonials.length
      );
    }, 8000);
    return () => clearInterval(interval);
  }, [isMobile, testimonialIndex]);

  const getVisibleTestimonials = () => {
    if (!Array.isArray(testimonials) || testimonials.length === 0) return [];
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

  // Min yükseklik: en uzun yorum + yıldız + müşteri bilgisi
  const charPerLine = 32;
  const lineCount = Math.ceil(maxLen / charPerLine) + 2;
  const pxPerLine = 23;
  const minHeight = 85 + lineCount * pxPerLine;

  return (
    <section className="w-full max-w-6xl mx-auto py-7 mb-3 px-2 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-3 text-gold text-center">Müşteri Yorumları</h2>
      <div
        className={`grid ${isMobile ? "grid-cols-2" : "grid-cols-3"} gap-5 justify-center transition-all w-full`}
      >
        {getVisibleTestimonials().map((item, idx) => (
          <div
            key={idx}
            className="bg-[#181818] border border-gold/20 rounded-2xl px-4 py-4 shadow flex flex-col justify-between max-w-sm w-full transition-all"
            style={{
              minHeight,
              maxHeight: minHeight,
              boxShadow: "0 3px 18px #bfa65820",
              display: "flex",
              whiteSpace: "pre-line",
            }}
          >
            {/* YORUM */}
            <p
              className="text-[0.98rem] font-medium flex-1"
              style={{
                lineHeight: "1.45em",
                textAlign: "left",
                whiteSpace: "pre-line",
                marginBottom: "12px",
                overflow: "hidden"
              }}
            >
              {getPaddedComment(item.comment)}
            </p>
            {/* YILDIZLAR */}
            <div className="flex items-center justify-start mb-2 gap-0.5">
              {getStars(item.stars)}
            </div>
            {/* AVATAR ve İSİM */}
            <div className="flex items-center gap-3 mt-1">
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
      <div style={{ height: "1.2em" }} />
      <style jsx>{`
        @media (max-width: 700px) {
          .max-w-sm { max-width: 99vw !important; }
          .px-4 { padding-left: 6px !important; padding-right: 6px !important; }
        }
        @media (max-width: 400px) {
          .text-3xl { font-size: 1.18rem !important; }
          .px-4 { padding-left: 3px !important; padding-right: 3px !important; }
        }
      `}</style>
    </section>
  );
}

// === Dosya SONU: components/TestimonialsSlider.jsx ===
