import { Suspense } from "react";
import RezervasyonForm from "./RezervasyonForm";

export default function Page() {
  return (
    <section className="flex justify-center items-center min-h-[92vh] bg-gradient-to-br from-black via-[#19160a] to-[#302811] py-10">
      <div className="w-full max-w-2xl mx-auto border border-[#bfa658] rounded-3xl shadow-2xl bg-black/90 px-4 md:px-10 py-8 md:py-14">
        <Suspense fallback={<div>Yükleniyor...</div>}>
          <RezervasyonForm />
        </Suspense>
      </div>
    </section>
  );
}
