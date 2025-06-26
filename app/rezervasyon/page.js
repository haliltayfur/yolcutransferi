import { Suspense } from "react";
import RezervasyonForm from "./RezervasyonForm";

export default function Page() {
  return (
    <section className="flex justify-center items-center min-h-[85vh] bg-gradient-to-br from-black via-[#19160a] to-[#302811] py-6">
      <div className="w-full max-w-lg mx-auto border border-[#bfa658] rounded-3xl shadow-2xl bg-black/90 p-6 sm:p-10">
        <Suspense fallback={<div>Yükleniyor...</div>}>
          <RezervasyonForm />
        </Suspense>
      </div>
    </section>
  );
}
