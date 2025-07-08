"use client";
import VipTransferForm from "./VipTransferForm";

export default function RezervasyonHero({ onlyForm }) {
  return (
    <section
      className="w-full flex flex-col items-center justify-center"
      style={{
        minHeight: "600px",
        height: "600px",
        background: "transparent",
        border: "none",
        boxShadow: "none",
        padding: 0,
      }}
    >
      <div
        className="bg-[#19160a] border-2 border-[#bfa658] rounded-3xl shadow-2xl flex flex-col justify-center p-10"
        style={{
          minHeight: "600px",
          height: "600px",
          boxSizing: "border-box",
          width: "100%",
          maxWidth: 600,
        }}
      >
        <VipTransferForm />
      </div>
    </section>
  );
}
