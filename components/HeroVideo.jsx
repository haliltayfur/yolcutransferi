"use client";
import { useEffect, useRef } from "react";

export default function HeroVideo() {
  const videoRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (videoRef.current && videoRef.current.paused) {
        videoRef.current.muted = false;
        videoRef.current.volume = 1;
        videoRef.current.play().catch(() => {
          videoRef.current.muted = true;
          videoRef.current.play().catch(() => {});
        });
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <video
      ref={videoRef}
      src="/reklam.mp4"
      controls
      className="w-full h-full object-contain rounded-2xl bg-black"
      style={{ maxWidth: "220px", maxHeight: "320px" }}
    />
  );
}
