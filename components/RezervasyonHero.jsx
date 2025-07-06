// PATH: components/RezervasyonHero.jsx
"use client";
import dynamic from "next/dynamic";
const VipTransferForm = dynamic(() => import("./VipTransferForm"), { ssr: false });

export default function RezervasyonHero() {
  return (
    <section
      className="w-full flex flex-col items-center justify-center mt-8 md:mt-10 mb-10 md:mb-16"
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
            max-w-[1260px]
            mx-auto
            grid
            grid-cols-1
            md:grid-cols-2
            gap-y-7
            md:gap-x-10
            px-2
          "
          style={{
            width: "min(100vw, 1260px)",
            alignItems: "stretch",
            justifyContent: "center",
          }}
        >
          {/* FORM */}
          <div
            className="
              flex flex-col justify-center
              border-2 border-[#bfa658]
              rounded-3xl
              bg-[#19160aF5]
              shadow-2xl
              w-full
              px-3 md:px-8
              py-6 md:py-10
            "
            style={{
              minHeight: 560,
              maxWidth: 550,
              marginLeft: 0,
              marginRight: "auto",
            }}
          >
            <VipTransferForm />
          </div>
          {/* VIDEO: desktop görünümde sağda */}
          <div
            className="
              hidden md:flex justify-center items-center
              border-2 border-[#bfa658]
              rounded-3xl
              bg-[#171717]
              shadow-xl
              w-full
              max-w-[440px]
              min-h-[380px]
            "
            style={{
              marginRight: 0,
              marginLeft: "auto",
              overflow: "hidden",
            }}
          >
            {/* Video burada (örn. public/video.mp4 ya da <img> ile değiştir) */}
            <video
              src="/videolar/vip-musteri.mp4"
              controls
              style={{
                borderRadius: "26px",
                width: "100%",
                maxHeight: 370,
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
