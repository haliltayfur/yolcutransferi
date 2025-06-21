"use client";
import { useEffect, useRef } from "react";

export default function HeroVideo() {
  const videoRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.muted = false;      // Sesi açık dene
        videoRef.current.volume = 1;
        videoRef.current.play().catch(() => {
          // Eğer tarayıcı otomatik sesli oynatmaya izin vermezse muted olarak başlar
          videoRef.current.muted = true;
          videoRef.current.play().catch(() => {});
        });
      }
    }, 2000); // 2 saniye sonra başlat
    return () => clearTimeout(timer);
  }, []);

  return (
    <video
      ref={videoRef}
      src="/reklam.mp4"
      controls
      className="w-[400px] h-[600px] object-cover rounded-2xl bg-black"
      style={{ border: "none" }}
    />
  );
}
