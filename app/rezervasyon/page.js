// app/rezervasyon/page.js

export const dynamic = "force-dynamic";
import { Suspense } from "react";
import RezervasyonForm from "./RezervasyonForm";

export default function Page() {
  return (
    <Suspense fallback={<div>Yükleniyor...</div>}>
      <RezervasyonForm />
    </Suspense>
  );
}
