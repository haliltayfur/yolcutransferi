import { Suspense } from "react";
import RezervasyonForm from "./RezervasyonForm";

export default function Page() {
  return (
    <section className="w-full min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-black via-[#19160a] to-[#302811] py-8">
      <div className="w-full max-w-lg border border-[#bfa658] rounded-3xl shadow-2xl bg-black/90 px-4 sm:px-8 py-6 sm:py-10 flex flex-col justify-center">
        <Suspense fallback={<div>Yükleniyor...</div>}>
          <RezervasyonForm />
        </Suspense>
      </div>
    </section>
  );
}
