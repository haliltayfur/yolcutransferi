import { Suspense } from "react";
import RezervasyonForm from "./RezervasyonForm";

export default function Page() {
  return (
    <section className="w-full min-h-[88vh] flex items-center justify-center bg-gradient-to-br from-black via-[#19160a] to-[#302811] py-12">
      <div className="w-full max-w-2xl border border-[#bfa658] rounded-3xl shadow-2xl bg-black/90 px-4 sm:px-10 py-10 sm:py-12 flex flex-col justify-center">
        <Suspense fallback={<div>Yükleniyor...</div>}>
          <RezervasyonForm />
        </Suspense>
      </div>
    </section>
  );
}
