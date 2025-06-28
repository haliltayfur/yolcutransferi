// === Dosya: components/TestimonialsSlider.jsx ===

"use client";

import { useState, useEffect } from "react";
import { testimonials } from "../data/testimonials";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return isMobile;
}

export default function TestimonialsSlider() {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex(idx =>
        isMobile
          ? (idx + 1) % testimonials.length
          : (idx + 3) % testimonials.length
      );
    }, 10000);
    return () => clearInterval(interval);
  }, [isMobile, testimonialIndex]);

  const getVisibleTestimonials = () => {
    if (isMobile) return [testimonials[testimonialIndex % testimonials.length]];
    return [
      testimonials[testimonialIndex % testimonials.length],
      testimonials[(testimonialIndex + 1) % testimonials.length],
      testimonials[(testimonialIndex + 2) % testimonials.length],
    ];
  };

  return (
    <section className="w-full max-w-6xl mx-auto py-7 mb-3 px-2 flex flex-col items-center">
      <h2 className="text-4xl font-bold mb-2.5 text-gold text-center">
        Müşteri Deneyimleri & Yorumları
      </h2>
      <div className={`flex ${isMobile ? "flex-col items-center" : "flex-row"} gap-5 justify-center transition-all`}>
        {getVisibleTestimonials().map((item, idx) => (
          <div
            key={idx}
            className="bg-[#181818] border border-gold/20 rounded-2xl px-6 py-5 shadow flex flex-col justify-between min-h-[158px] max-w-sm w-full transition-all"
            style={{
              minHeight: 158,
              maxHeight: 158,
              height: 158,
              boxShadow: "0 3px 18px #bfa65820",
            }}
          >
            <p
              className="text-base font-medium mb-4"
              style={{
                lineHeight: "1.35em",
                height: "3.7em",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
              }}
            >
              {item.comment}
            </p>
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
      <style jsx>{`
        @media (max-width: 640px) {
          .text-4xl { font-size: 1.4rem !important; }
          .max-w-sm { max-width: 98vw !important; }
          .px-6 { padding-left: 10px !important; padding-right: 10px !important; }
        }
        @media (max-width: 400px) {
          .text-4xl { font-size: 1.13rem !important; }
          .px-6 { padding-left: 6px !important; padding-right: 6px !important; }
        }
      `}</style>
    </section>
  );
}

// === Dosya SONU: components/TestimonialsSlider.jsx ===
