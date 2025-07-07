"use client";
import dynamic from "next/dynamic";
const VipTransferForm = dynamic(() => import("./VipTransferForm"), { ssr: false });

export default function RezervasyonHero() {
  return (
    <section className="w-full flex flex-col items-center justify-center mt-8 md:mt-14 mb-8 md:mb-14">
      <div
        className={`
          w-full
          mx-auto
          flex
          flex-col
          md:flex-row
          md:items-start
          justify-center
          gap-y-8
          md:gap-x-10
          px-1 md:px-0
        `}
        style={{
          maxWidth: "1300px",
          alignItems: "flex-start", // ÜSTTEN BİREBİR HİZA
        }}
      >
        {/* FORM */}
        <div
          className={`
            flex flex-col justify-center
            w-full
            md:w-[800px]
            max-w-[800px]
            min-w-[320px]
            h-[600px]
            md:h-[600px]
            items-center
            md:items-start
          `}
          style={{
            boxSizing: "border-box",
            marginLeft: 0,
            marginRight: 0,
            paddingLeft: 0,
            paddingRight: 0,
          }}
        >
          <div
            className="w-full h-full flex flex-col"
            style={{
              width: "100%",
              height: "100%",
              maxWidth: 800,
              minHeight: 600,
              justifyContent: "center",
            }}
          >
            <VipTransferForm />
          </div>
        </div>
        {/* VİDEO */}
        <div
          className={`
            hidden md:flex justify-end items-start
            border-2 border-[#bfa658]
            rounded-3xl
            bg-[#232323e7]
            shadow-xl
            w-[400px]
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
      {/* MOBİLDE video yok */}
      <style>{`
        @media (max-width: 900px) {
          .md\\:flex-row { flex-direction: column !important; }
          .w-full.md\\:w-\\[800px\\] { width: 95vw !important; max-width: 99vw !important; min-width: 0 !important;}
          .hidden.md\\:flex { display: none !important; }
          form { width: 95vw !important; margin-left: auto !important; margin-right: auto !important; min-width: 0 !important; max-width: 99vw !important; }
        }
      `}</style>
    </section>
  );
}
