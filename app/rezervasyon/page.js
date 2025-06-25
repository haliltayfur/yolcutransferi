// Server Component, Suspense ekle ama dynamic import yok!
import { Suspense } from "react";
import RezervasyonForm from "./RezervasyonForm";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-black via-[#19160a] to-[#302811]">
      <Suspense fallback={<div>Yükleniyor...</div>}>
        <RezervasyonForm />
      </Suspense>
    </div>
  );
}
