"use client";
import { useEffect, useRef, useState } from "react";

export default function HeroVideo() {
  const videoRef = useRef(null);
  const [userHasUnmuted, setUserHasUnmuted] = useState(false);

  // Intersection Observer: %25 görünürlük kontrolü
  useEffect(() => {
    let observer;
    if (videoRef.current) {
      observer = new window.IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
            videoRef.current.play().catch(() => {});
            if (userHasUnmuted) {
              videoRef.current.muted = false;
              videoRef.current.volume = 0.9;
            } else {
              videoRef.current.muted = true;
            }
          } else {
            videoRef.current.pause();
          }
        },
        { threshold: [0, 0.25, 0.5, 1] }
      );
      observer.observe(videoRef.current);
    }
    return () => observer && observer.disconnect();
  }, [userHasUnmuted]);

  // TIKLAMA: Her tıklamada başa sar, sesi aç, volume 0.9 yap ve flag'i ayarla
  const handleUnmuteAndRestart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.muted = false;
      videoRef.current.volume = 0.9;
      videoRef.current.play();
      setUserHasUnmuted(true);
    }
  };

  return (
    <video
      ref={videoRef}
      src="/reklam.mp4"
      controls
      autoPlay
      muted={!userHasUnmuted}
      className="w-[400px] h-[600px] object-cover rounded-2xl bg-black"
      style={{ border: "none", cursor: "pointer" }}
      onClick={handleUnmuteAndRestart}
    />
  );
}
