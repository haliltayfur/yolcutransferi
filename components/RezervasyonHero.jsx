"use client";
import dynamic from "next/dynamic";
const VipTransferForm = dynamic(() => import("./VipTransferForm"), { ssr: false });

export default function RezervasyonHero() {
  // Responsive: Genişliği window'a göre ayarlayalım
  // (Eğer tailwind yoksa, bu kısmı atlayabilirsin. tailwind ile uyumlu!)
  return (
    <section className="w-full flex flex-col items-center justify-center mt-8 md:mt-14 mb-8 md:mb-14">
      <div
        className={`
          w-full
          mx-auto
          grid
          grid-cols-1
          md:grid-cols-2
          gap-y-8
          md:gap-x-10
          px-1 md:px-0
          `}
        style={{
          maxWidth: "1300px",  // Masaüstü için genişlik limiti
          alignItems: "start",
          justifyContent: "center",
        }}
      >
        {/* FORM alanı */}
        <div
          className={`
            flex flex-col justify-center
            w-full
            items-center
            md:items-start
            `}
          style={{
            maxWidth: 800,
            minWidth: 320,
            height: 600,
            marginLeft: 0,
            marginRight: 0,
            boxSizing: "border-box",
          }}
        >
          <div
            className="w-full h-full flex flex-col"
            style={{
              maxWidth: 800,
              width: "100%",
              height: "100%",
              minHeight: 600,
              justifyContent: "center",
            }}
          >
            <VipTransferForm />
          </div>
        </div>
        {/* VIDEO alanı (sadece desktop) */}
        <div
          className={`
            hidden md:flex justify-end items-start
            border-2 border-[#bfa658]
            rounded-3xl
            bg-[#232323e7]
            shadow-xl
            w-full
            max-w-[400px]
            min-w-[340px]
            min-h-[600px]
            max-h-[600px]
            overflow-hidden
          `}
          style={{
            height: 600,
            marginLeft: "auto",
            marginRight: 0,
            boxSizing: "border-box",
          }}
        >
          <video
            src="/reklam.mp4"
            controls
            style={{
              borderRadius: "24px",
              width: "100%",
              minHeight: "600px",
              maxHeight: "600px",
              objectFit: "cover",
              background: "#1c1c1c",
            }}
            preload="metadata"
          />
        </div>
      </div>
      {/* MOBİLDE video yok! */}
      <style>{`
        @media (max-width: 900px) {
          .max-w-[400px] { max-width: 0 !important; }
          .min-h-[600px], .max-h-[600px] { min-height: 0 !important; max-height: none !important; }
        }
        @media (max-width: 900px) {
          form {
            width: 95vw !important;
            margin-left: auto !important;
            margin-right: auto !important;
            min-width: 0 !important;
            max-width: 99vw !important;
          }
        }
      `}</style>
    </section>
  );
}
