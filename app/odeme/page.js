// app/odeme/page.js

"use client";
import { Suspense } from "react";
import OdemeMain from "./OdemeMain";

export default function Page() {
  return (
    <Suspense fallback={<div>Yükleniyor...</div>}>
      <OdemeMain />
    </Suspense>
  );
}

// /app/odeme/page.js
