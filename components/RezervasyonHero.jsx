"use client";
import { useRef, useEffect, useState } from "react";

export default function RezervasyonHero() {
  const [isMobile, setIsMobile] = useState(false);

  // Ekran boyutunu sürekli izle
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 900);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Video için
  const videoRef = useRef(null);
  useEffect(() => {
    if (videoRef.current && !isMobile) {
      videoRef.current.muted = true;
      videoRef.current.play();
    }
  }, [isMobile]);
  const handleVideoClick = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = false;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    videoRef.current.volume = 1;
  };

  return (
    <section className="w-full flex flex-col items-center justify-center my-10">
      {/* ---- DESKTOP ---- */}
      {!isMobile && (
        <div
          className="flex flex-row items-center justify-center"
          style={{
            width: "100%",
            maxWidth: "2000px",
            minHeight: "600px",
            margin: "0 auto"
          }}
        >
          {/* FORM */}
          <div
            className="bg-[#19160a] border-2 border-[#bfa658] rounded-3xl shadow-2xl p-12"
            style={{
              width: "50vw",
              minWidth: 340,
              maxWidth: "900px",
              height: "600px",
              boxSizing: "border-box",
              marginRight: 20,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "stretch"
            }}
          >
            <h2 className="text-3xl font-bold text-[#bfa658] mb-6">VIP Transfer Rezervasyonu</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input className="bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl px-4 py-3" placeholder="Nereden?" />
              <input className="bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl px-4 py-3" placeholder="Nereye?" />
              <input className="bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl px-4 py-3" placeholder="Kişi Sayısı" />
              <input className="bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl px-4 py-3" placeholder="Segment" />
              <input className="bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl px-4 py-3 col-span-2" placeholder="Transfer Türü" />
              <input className="bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl px-4 py-3 col-span-2" placeholder="Tarih" />
            </div>
            <button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold py-4 rounded-xl text-xl shadow hover:scale-105 transition">Devam Et</button>
          </div>

          {/* VIDEO */}
          <div
            className="bg-[#232323e7] border-2 border-[#bfa658] rounded-3xl shadow-2xl flex items-center justify-center overflow-hidden"
            style={{
              width: "20vw",
              minWidth: 240,
              maxWidth: "400px",
              height: "600px",
              cursor: "pointer",
              boxSizing: "border-box"
            }}
            onClick={handleVideoClick}
          >
            <video
              ref={videoRef}
              src="/reklam.mp4"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "22px",
                background: "#1c1c1c"
              }}
              controls={false}
              preload="metadata"
              playsInline
              muted
              autoPlay
              loop
            />
          </div>
        </div>
      )}

      {/* ---- MOBİL ---- */}
      {isMobile && (
        <div
          className="bg-[#19160a] border-2 border-[#bfa658] rounded-3xl shadow-2xl p-6"
          style={{
            width: "98vw",
            minWidth: 200,
            maxWidth: 420,
            margin: "0 auto",
            marginBottom: 24,
            boxSizing: "border-box"
          }}
        >
          <h2 className="text-2xl font-bold text-[#bfa658] mb-4">VIP Transfer Rezervasyonu</h2>
          <div className="flex flex-col gap-3 mb-4">
            <input className="bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl px-3 py-2" placeholder="Nereden?" />
            <input className="bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl px-3 py-2" placeholder="Nereye?" />
            <input className="bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl px-3 py-2" placeholder="Kişi Sayısı" />
            <input className="bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl px-3 py-2" placeholder="Segment" />
            <input className="bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl px-3 py-2" placeholder="Transfer Türü" />
            <input className="bg-[#19160a] text-[#ffeec2] border border-[#bfa658] rounded-xl px-3 py-2" placeholder="Tarih" />
          </div>
          <button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold py-3 rounded-xl text-lg shadow hover:scale-105 transition">Devam Et</button>
        </div>
      )}
    </section>
  );
}
