"use client";
import { useEffect, useRef } from "react";

export default function HeroVideo() {
  const videoRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Eğer kullanıcı başka bir işlem yapmadıysa otomatik başlat (muted)
      if (videoRef.current && videoRef.current.paused) {
        videoRef.current.muted = true;
        videoRef.current.play().catch(() => {});
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full md:w-[320px] h-[200px] rounded-2xl shadow-lg overflow-hidden bg-black flex items-center justify-center">
      <video
        ref={videoRef}
        src="/reklam.mp4"
        controls
        className="w-full h-full object-contain rounded-2xl bg-black"
        style={{ maxWidth: 320, maxHeight: 200 }}
        // otomatik başlamıyor, 5 sn sonra useEffect ile başlatılacak
      />
    </div>
  );
}
