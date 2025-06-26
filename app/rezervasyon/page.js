import { Suspense } from "react";
import RezervasyonForm from "./RezervasyonForm";

export default function Page() {
  return (
    <section className="flex justify-center items-center min-h-screen py-8">
      <div className="w-full max-w-3xl mx-auto">
        <Suspense fallback={<div>Yükleniyor...</div>}>
          <RezervasyonForm />
        </Suspense>
      </div>
    </section>
  );
}
