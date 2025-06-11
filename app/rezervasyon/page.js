import { Suspense } from "react";
import RezervasyonForm from "../components/RezervasyonForm";

export default function Page() {
  return (
    <Suspense fallback={<div>Yükleniyor...</div>}>
      <RezervasyonForm />
    </Suspense>
  );
}
