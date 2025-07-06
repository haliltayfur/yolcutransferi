"use client";
import { useEffect, useRef, useState } from "react";

export default function HeroVideo() {
  const videoRef = useRef(null);
  const [firstClickDone, setFirstClickDone] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(true);
  const [isPageVisible, setIsPageVisible] = useState(true);

  // Intersection Observer: %40 görünürlükte play/pause
  useEffect(() => {
    let observer;
    if (videoRef.current) {
      observer = new window.IntersectionObserver(
        ([entry]) => {
          setIsIntersecting(entry.isIntersecting && entry.intersectionRatio >= 0.40);
        },
        { threshold: [0, 0.25, 0.5, 1] }
      );
      observer.observe(videoRef.current);
    }
    return () => observer && observer.disconnect();
  }, []);

  // Sayfa görünürlük kontrolü (başka sekmeye geçti mi?)
  useEffect(() => {
    const onVisibilityChange = () => {
      setIsPageVisible(document.visibilityState === "visible");
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  // Video oynatma/pause kontrolü
  useEffect(() => {
    if (videoRef.current) {
      if (isIntersecting && isPageVisible) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isIntersecting, isPageVisible]);

  // Sadece ilk tıklamada: başa sar, sesi aç, volume 0.9, sonraki tıklamalar standart
  const handleFirstClick = (e) => {
    if (!firstClickDone && videoRef.current) {
      e.preventDefault();
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
