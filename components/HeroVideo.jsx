"use client";
import { useEffect, useRef, useState } from "react";

export default function HeroVideo() {
  const videoRef = useRef(null);
  const [firstClickDone, setFirstClickDone] = useState(false);

  // Intersection Observer: %25 görünürlükte play/pause
  useEffect(() => {
    let observer;
    if (videoRef.current) {
      observer = new window.IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
            videoRef.current.play().catch(() => {});
          } else {
            videoRef.current.pause();
          }
        },
        { threshold: [0, 0.25, 0.5, 1] }
      );
      observer.observe(videoRef.current);
    }
    return () => observer && observer.disconnect();
  }, []);

  // Sadece ilk tıklamada: başa sar, sesi aç, volume 0.9, sonraki tıklamalar standart
  const handleFirstClick = (e) => {
    if (!firstClickDone && videoRef.current) {
      e.preventDefault(); // Tıklamanın varsayılan etkisini durdur
      videoRef.current.currentTime = 0;
      videoRef.current.muted = false;
      videoRef.current.volume = 0.9;
      videoRef.current.play();
      setFirstClickDone(true);
    }
    // Sonraki tıklamalar video üzerindeki normal kontrollere bırakılır
  };

  return (
    <video
      ref={videoRef}
      src="/reklam.mp4"
      controls
      autoPlay
      muted={!firstClickDone}
      className="w-[400px] h-[600px] object-cover rounded-2xl bg-black"
      style={{ border: "none", cursor: "pointer" }}
      onClick={handleFirstClick}
    />
  );
}
