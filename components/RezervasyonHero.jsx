// PATH: components/RezervasyonHero.jsx
"use client";
import dynamic from "next/dynamic";
const VipTransferForm = dynamic(() => import("./VipTransferForm"), { ssr: false });

export default function RezervasyonHero() {
  return (
    <section className="w-full flex flex-col items-center justify-center mt-8 md:mt-14 mb-8 md:mb-14">
      <div
        className={`
          w-full
          max-w-[1300px]
          mx-auto
          flex flex-col md:flex-row
          md:gap-x-8
          gap-y-8
          px-2 md:px-0
          items-start
          justify-center
        `}
      >
        {/* FORM alanı */}
        <div
          className={`
            flex flex-col justify-center
            border-2 border-[#bfa658]
            rounded-3xl
            bg-[#19160ae9]
            shadow-2xl
            w-full md:w-[800px]
            h-[600px]
            md:mr-auto
            px-6 md:px-16
            py-7 md:py-16
            box-border
          `}
        >
          <VipTransferForm />
        </div>
        {/* VIDEO */}
        <div
          className={`
            hidden md:flex justify-end items-start
            border-2 border-[#bfa658]
            rounded-3xl
            bg-[#232323e7]
            shadow-xl
            w-[400px]
            h-[600px]
            overflow-hidden
            ml-auto
          `}
        >
          <video
            src="/reklam.mp4"
            controls
            style={{
              borderRadius: "24px",
              width: "100%",
              height: "100%",
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
