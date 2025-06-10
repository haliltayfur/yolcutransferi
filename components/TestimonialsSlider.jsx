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
    <section className="w-full max-w-6xl mx-auto py-7 mb-3 px-2">
      <h2 className="text-2xl font-bold text-gold mb-7 text-center">Müşterilerimizin Yorumları</h2>
      <div className={`flex ${isMobile ? "flex-col items-center" : "flex-row"} gap-5 justify-center transition-all`}>
        {getVisibleTestimonials().map((item, idx) => (
          <div key={idx} className="bg-[#181818] border border-gold/18 rounded-2xl px-7 py-6 shadow flex flex-col justify-between min-h-[158px] max-w-sm w-full" style={{ minHeight: 158, maxHeight: 158, height: 158 }}>
            <p className="text-base font-medium mb-4" style={{ lineHeight: "1.35em", height: "3.7em", overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}>
              {item.comment}
            </p>
            <div className="flex items-center gap-3 mt-2">
              <div className="w-9 h-9 rounded-full bg-gold text-black flex items-center justify-center text-lg font-bold">
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
    </section>
  );
}
