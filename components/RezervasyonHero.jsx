// PATH: components/RezervasyonHero.jsx
"use client";
import dynamic from "next/dynamic";
const VipTransferForm = dynamic(() => import("./VipTransferForm"), { ssr: false });

export default function RezervasyonHero() {
  return (
    <section
      className="w-full flex flex-col items-center justify-center mt-8 md:mt-14 mb-8 md:mb-14"
    >
      {/* --- GRID START --- */}
      <div
        className="
          w-full
          max-w-[1260px]
          mx-auto
          grid
          grid-cols-1
          md:grid-cols-2
          gap-y-8
          md:gap-x-10
          px-1 md:px-0
        "
        style={{
          alignItems: "start",
          justifyContent: "center",
        }}
      >
        {/* FORM */}
        <div
          className="
            flex flex-col justify-center
            border-2 border-[#bfa658]
            rounded-3xl
            bg-[#19160ae9]
            shadow-2xl
            w-full
            px-3 md:px-9
            py-7 md:py-12
            min-h-[480px]
          "
          style={{
            marginLeft: 0,
            marginRight: 0,
            boxSizing: "border-box",
          }}
        >
          <VipTransferForm />
        </div>
        {/* VIDEO (desktop only) */}
        <div
          className="
            hidden md:flex justify-end items-start
            border-2 border-[#bfa658]
            rounded-3xl
            bg-[#232323e7]
            shadow-xl
            w-full
            max-w-[520px]
            min-h-[350px]
            overflow-hidden
          "
          style={{
            boxSizing: "border-box",
            marginLeft: "auto",
            marginRight: 0,
          }}
        >
          <video
            src="/videolar/vip-musteri.mp4"
            controls
            style={{
              borderRadius: "24px",
              width: "100%",
              minHeight: "320px",
              maxHeight: "390px",
              objectFit: "cover",
              background: "#1c1c1c",
            }}
            preload="metadata"
          />
        </div>
      </div>
    </section>
  );
}
