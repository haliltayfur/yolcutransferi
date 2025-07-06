// PATH: components/RezervasyonHero.jsx
"use client";
import dynamic from "next/dynamic";
const VipTransferForm = dynamic(() => import("./VipTransferForm"), { ssr: false });

export default function RezervasyonHero() {
  return (
    <section
      className="w-full flex flex-col items-center justify-center mt-12 md:mt-14 mb-8 md:mb-16"
      style={{ width: "100%" }}
    >
      <div
        className="w-full flex flex-col items-center justify-center"
        style={{ width: "100%" }}
      >
        {/* --- Responsive GRID (Form + Video) --- */}
        <div
          className="
            w-full
            max-w-[1320px]
            mx-auto
            grid
            grid-cols-1
            md:grid-cols-[minmax(420px,580px)_minmax(340px,480px)]
            gap-y-8
            md:gap-x-16
            px-2
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
              px-2 md:px-10
              py-7 md:py-11
            "
            style={{
              minHeight: 560,
              maxWidth: 590,
              marginLeft: 0,
              marginRight: "auto",
              boxSizing: "border-box",
            }}
          >
            <VipTransferForm />
          </div>
          {/* VIDEO: desktop görünümde sağda */}
          <div
            className="
              hidden md:flex justify-end items-start
              border-2 border-[#bfa658]
              rounded-3xl
              bg-[#171717]
              shadow-xl
              w-full
              max-w-[440px]
              min-h-[380px]
              overflow-hidden
            "
          >
            <video
              src="/videolar/vip-musteri.mp4"
              controls
              style={{
                borderRadius: "26px",
                width: "100%",
                maxHeight: 390,
                objectFit: "cover",
                background: "#181818",
              }}
              preload="metadata"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
