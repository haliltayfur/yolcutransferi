"use client";
import HeroSlider from "../components/HeroSlider";
import dynamic from "next/dynamic";
import AdvantagesBar from "../components/AdvantagesBar";
import TestimonialsSlider from "../components/TestimonialsSlider";

const VipTransferForm = dynamic(() => import("../components/VipTransferForm"), { ssr: false });

export default function Home() {
  return (
    <main>
      <HeroSlider />
      <section
        className="w-full flex flex-col items-center justify-center mt-10 md:mt-14 mb-10 md:mb-16"
        style={{ width: "100%" }}
      >
        <div
          className="w-full flex flex-col items-center justify-center"
          style={{ width: "100%" }}
        >
          {/* ANA CONTAINER */}
          <div
            className="w-full max-w-[1260px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10"
            style={{
              width: "min(100vw, 1260px)",
              margin: "0 auto",
              marginTop: 0,
              alignItems: "stretch",
              justifyContent: "center",
            }}
          >
            {/* FORM */}
            <div
              className="flex flex-col justify-center"
              style={{
                width: "100%",
                height: 600,
                background: "rgba(25,22,10,0.98)",
                borderRadius: 32,
                border: "2px solid #bfa658",
                boxSizing: "border-box",
              }}
            >
              <VipTransferForm />
            </div>
            {/* VIDEO */}
            <div
              className="hidden md:flex justify-center items-center"
              style={{
                width: "100%",
                height: 600,
                background: "#171717",
                borderRadius: 32,
                overflow: "hidden",
                boxSizing: "border-box",
              }}
            >
              {typeof window !== "undefined" && window.innerWidth >= 768 && (
                require("../components/HeroVideo").default()
              )}
            </div>
          </div>
        </div>
      </section>
      <AdvantagesBar />
      <TestimonialsSlider />
    </main>
  );
}
