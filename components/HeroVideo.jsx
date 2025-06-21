"use client";
import { useEffect, useRef } from "react";

export default function HeroVideo() {
  const videoRef = useRef(null);

  useEffect(() => {
    let observer;
    if (videoRef.current) {
      // Intersection Observer kur
      observer = new window.IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            // Video ekranda %50'den fazla görünüyorsa devam ettir, sesi aç
            videoRef.current.muted = false;
            videoRef.current.volume = 5;
            videoRef.current.play().catch(() => {});
          } else {
            // Video ekranda değilse durdur
            videoRef.current.pause();
          }
        },
        { threshold: [0, 0.5, 1] }
      );
      observer.observe(videoRef.current);
    }
    return () => observer && observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      src="/reklam.mp4"
      controls
      className="w-[400px] h-[600px] object-cover rounded-2xl bg-black"
      style={{ border: "none" }}
      autoPlay
      // muted olmadan başlar, Intersection ile açılır
    />
  );
}
