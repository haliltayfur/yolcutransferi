"use client";
import { useEffect, useRef, useState } from "react";

export default function HeroVideo() {
  const videoRef = useRef(null);
  const [userHasUnmuted, setUserHasUnmuted] = useState(false);

  // Intersection Observer (scroll ile pause/play + mute kontrolü)
  useEffect(() => {
    let observer;
    if (videoRef.current) {
      observer = new window.IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            // Video en az %50 görünüyorsa devam et
            videoRef.current.play().catch(() => {});
            // Kullanıcı sesi açtıysa, sesi açık devam
            if (userHasUnmuted) {
              videoRef.current.muted = false;
              videoRef.current.volume = 1;
            } else {
              videoRef.current.muted = true;
            }
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
  }, [userHasUnmuted]);

  // Kullanıcı videoya tıkladıysa veya mouse ile üzerine geldiyse baştan ve sesli başlat
  const handleUnmuteAndRestart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.muted = false;
      videoRef.current.volume = 1;
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
      muted
      className="w-[400px] h-[600px] object-cover rounded-2xl bg-black"
      style={{ border: "none", cursor: "pointer" }}
      onMouseEnter={handleUnmuteAndRestart}
      onClick={handleUnmuteAndRestart}
    />
  );
}
