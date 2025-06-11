import { Suspense } from "react";
import RezervasyonForm from "./RezervasyonForm";

export default function Page() {
  return (
    <Suspense>
      <RezervasyonForm />
    </Suspense>
  );
}
