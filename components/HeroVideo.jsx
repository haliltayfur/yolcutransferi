"use client";

export default function HeroVideo() {
  return (
    <div className="w-full md:w-[320px] h-[200px] rounded-2xl shadow-lg overflow-hidden bg-black flex items-center justify-center">
      <video
        src="/reklam.mp4"
        controls
        autoPlay
        loop
        muted
        className="w-full h-full object-contain rounded-2xl bg-black"
        style={{ maxWidth: 320, maxHeight: 200 }}
      />
    </div>
  );
}
