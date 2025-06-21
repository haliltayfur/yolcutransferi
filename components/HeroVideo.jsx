"use client";

export default function HeroVideo() {
  return (
    <section className="relative w-full flex justify-center items-center min-h-[320px] md:min-h-[500px] bg-black overflow-hidden rounded-2xl shadow-2xl mt-8 mb-10">
      <video
        src="/reklam.mp4"
        controls
        autoPlay
        loop
        muted
        className="w-full h-full object-cover rounded-2xl"
        style={{ maxHeight: 500 }}
      />
      {/* Üzerine logo veya kısa slogan eklemek istersen aşağıyı açabilirsin */}
      {/* <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <img src="/LOGO.png" alt="Logo" className="w-32 mb-4" />
        <h2 className="text-2xl md:text-3xl font-bold text-white drop-shadow-xl">Her yolculukta ayrıcalık</h2>
      </div> */}
    </section>
  );
}
