"use client";
import { useEffect, useRef } from "react";

export default function HeroVideo() {
  const videoRef = useRef(null);

  useEffect(() => {
    // Video sesi açık başlatma (çoğu tarayıcıda otomatik sesi açık başlatmaya izin vermez, kullanıcı tıklar tıklamaz ses açılır)
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.volume = 1;
      videoRef.current.play().catch(() => {
        // Eğer sesli başlatamazsa, kullanıcı play tuşuna tıkladığında ses açılır
      });
    }
  }, []);

  return (
    <video
      ref={videoRef}
      src="/reklam.mp4"
      controls
      className="w-[300px] h-[600px] object-cover rounded-2xl bg-black"
      style={{ border: "none" }}
    />
  );
}
