"use client";
import { useEffect, useRef, useState } from "react";

export default function HeroVideo() {
  const videoRef = useRef(null);
  const [userHasUnmuted, setUserHasUnmuted] = useState(false);

  // Intersection Observer: sadece play/pause için, mute kontrolü için değil!
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
        { threshold: [0, 0.5, 1] }
      );
      observer.observe(videoRef.current);
    }
    return () => observer && observer.disconnect();
  }, []);

  // Sadece tıklayınca: sesi aç, başa sar, userHasUnmuted'ı bir daha değişme
  const handleUnmuteAndRestart = () => {
    if (!userHasUnmuted && videoRef.current) {
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
      muted={!userHasUnmuted}
      className="w-[400px] h-[600px] object-cover rounded-2xl bg-black"
      style={{ border: "none", cursor: "pointer" }}
      onClick={handleUnmuteAndRestart}
    />
  );
}
