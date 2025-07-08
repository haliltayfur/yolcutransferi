"use client";
import VipTransferForm from "./VipTransferForm";

export default function RezervasyonHero() {
  return (
    <div
      className="bg-[#19160a] border-2 border-[#bfa658] rounded-3xl shadow-2xl px-6 py-8 md:px-12 md:py-14"
      style={{
        width: "100%",
        maxWidth: 900,
        minHeight: 600,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }}
    >
      <VipTransferForm />
    </div>
  );
}
