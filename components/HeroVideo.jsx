"use client";
import { useEffect, useRef } from "react";

export default function HeroVideo() {
  const videoRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (videoRef.current && videoRef.current.paused) {
        // İlk olarak sesi açık başlatmayı dene (ama çoğu tarayıcı muted olmadan izin vermez)
        videoRef.current.muted = false;
        videoRef.current.volume = 1;
        videoRef.current.play().catch(() => {
          // Eğer otomatik sesli başlatmaya izin vermezse, muted ile tekrar dene (fallback)
          videoRef.current.muted = true;
          videoRef.current.play().catch(() => {});
        });
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-full rounded-2xl shadow-lg overflow-hidden bg-black flex items-center justify-center">
      <video
        ref={videoRef}
        src="/reklam.mp4"
        controls
        className="w-full h-full object-contain rounded-2xl bg-black"
        style={{ maxWidth: "220px", maxHeight: "320px" }}
        // Kontroller açık, video 5 sn sonra başlatılıyor
      />
    </div>
  );
}
