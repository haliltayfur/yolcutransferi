// app/page.js
"use client";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-4xl font-bold text-gold mb-6">YolcuTransferi.com</h1>
      <p className="mb-6">VIP Transfer hizmeti burada başlar.</p>
      <Link href="/rezervasyon" className="bg-gold text-black px-6 py-3 rounded-xl font-semibold">Rezervasyon Yap</Link>
      <Image src="/hero-bg.jpg" alt="VIP Araç" width={480} height={320} className="mt-8 rounded-lg" />
    </main>
  );
}
