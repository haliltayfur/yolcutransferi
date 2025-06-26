import { Suspense } from "react";
import RezervasyonForm from "./RezervasyonForm";

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-[#19160a] to-[#302811] flex items-center justify-center">
      <div className="w-full max-w-4xl mx-auto">
        <Suspense fallback={<div>Yükleniyor...</div>}>
          <RezervasyonForm />
        </Suspense>
      </div>
    </main>
  );
}
