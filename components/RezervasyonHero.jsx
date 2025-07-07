"use client";
import dynamic from "next/dynamic";
const VipTransferForm = dynamic(() => import("./VipTransferForm"), { ssr: false });

export default function RezervasyonHero() {
  return (
    <section className="w-full flex flex-col items-center justify-center my-10">
      <div
        className="
          w-full
          max-w-[1580px]  /* eskiye göre büyüdü! */
          flex flex-col md:flex-row
          gap-y-8 md:gap-x-12
          px-1 md:px-0
          items-start
          justify-start
        "
        style={{ marginLeft: "0", marginRight: "auto" }}
      >
        {/* FORM alanı */}
        <div
          className="
            flex flex-col justify-center
            border-2 border-[#bfa658]
            rounded-3xl
            bg-[#19160ae9]
            shadow-2xl
            w-full md:w-[1050px]  /* %25 daha geniş */
            h-[600px]
            px-4 md:px-16
            py-7 md:py-14
            box-border
            md:mr-0
          "
          style={{ marginLeft: 0 }}
        >
          <VipTransferForm />
        </div>
        {/* VIDEO */}
        <div
          className="
            hidden md:flex
            justify-end items-start
            border-2 border-[#bfa658]
            rounded-3xl
            bg-[#232323e7]
            shadow-xl
            w-[520px]   /* %30 daha geniş */
            h-[600px]
            overflow-hidden
            ml-auto
          "
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
