"use client";
import { useRef } from "react";

export default function HeroVideo() {
  const videoRef = useRef(null);

  return (
    <video
      ref={videoRef}
      src="/reklam.mp4"
      controls
      autoPlay
      muted
      className="w-[400px] h-[600px] object-cover rounded-2xl bg-black"
      style={{ border: "none" }}
    />
  );
}
