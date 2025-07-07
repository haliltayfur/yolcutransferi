"use client";
import { useRef, useEffect } from "react";

function VipForm() {
  return (
    <div
      className="bg-[#19160a] border-2 border-[#bfa658] rounded-3xl shadow-2xl p-10 flex flex-col justify-center"
      style={{
        width: "100%",
        height: 600,
        boxSizing: "border-box"
      }}
    >
      <h2 className="text-3xl font-bold text-[#bfa658] mb-6">VIP Transfer Rezervasyonu</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <input className="bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl px-4 py-3" placeholder="Nereden?" />
        <input className="bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl px-4 py-3" placeholder="Nereye?" />
        <input className="bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl px-4 py-3" placeholder="Kişi Sayısı" />
        <input className="bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl px-4 py-3" placeholder="Segment" />
        <input className="bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl px-4 py-3" placeholder="Transfer Türü" />
        <input className="bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl px-4 py-3" placeholder="Tarih" />
      </div>
      <button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold py-4 rounded-xl text-xl shadow hover:scale-105 transition">Devam Et</button>
    </div>
  );
}

function VipVideo() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play();
    }
  }, []);

  const handleVideoClick = () => {
    const video = videoRef.current;
    if (!video) return;

    // Sesi aç ve baştan başlat
    video.muted = false;
    video.currentTime = 0;
    video.play();
    // Otomatik olarak sesi açmak bazı tarayıcılarda kullanıcı hareketi gerektirir
    video.volume = 1;
  };

  return (
    <div
      className="bg-[#232323e7] border-2 border-[#bfa658] rounded-3xl shadow-2xl flex items-center justify-center overflow-hidden"
      style={{
        width: "100%",
        height: 600,
        boxSizing: "border-box",
        cursor: "pointer"
      }}
      onClick={handleVideoClick}
      tabIndex={0}
      role="button"
      aria-label="Videoyu başlat ve sesi aç"
    >
      <video
        ref={videoRef}
        src="/reklam.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{
          borderRadius: "24px",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          background: "#1c1c1c"
        }}
        preload="auto"
      />
    </div>
  );
}

export default function RezervasyonHero() {
  // Media query: mobilde form tam ortalı, video yok
  return (
    <section className="w-full flex flex-col items-center py-12">
      <div
        className="flex flex-row items-center justify-center w-full"
        style={{
          minHeight: 600,
        }}
      >
        <div
          className="hidden lg:block"
          style={{
            flex: `0 0 calc((100vw - 70vw)/2)`, // iki tarafı ortala (70vw = %50+%20)
            minWidth: 0
          }}
        />
        {/* FORM */}
        <div
          className="form-area"
          style={{
            width: "50vw",
            maxWidth: 800,
            minWidth: 320,
            marginRight: 20,
            transition: "width 0.2s"
          }}
        >
          <VipForm />
        </div>
        {/* VIDEO */}
        <div
          className="video-area hidden md:block"
          style={{
            width: "20vw",
            maxWidth: 500,
            minWidth: 200,
            transition: "width 0.2s"
          }}
        >
          <VipVideo />
        </div>
        <div
          className="hidden lg:block"
          style={{
            flex: `0 0 calc((100vw - 70vw)/2)`,
            minWidth: 0
          }}
        />
      </div>

      {/* MOBİL VERSİYON */}
      <style jsx>{`
        @media (max-width: 900px) {
          .form-area {
            width: 95vw !important;
            margin: 0 auto 0 auto !important;
            max-width: 98vw !important;
          }
          .video-area {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
