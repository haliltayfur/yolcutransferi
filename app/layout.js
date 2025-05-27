// app/layout.js (Next.js 13/14 için)
import "./globals.css";
import { Metadata } from 'next';
import Script from "next/script";

export const metadata = {
  title: "YolcuTransferi.com | VIP Transfer, Havalimanı, Tur & Dron",
  description: "Türkiye genelinde VIP transfer, havalimanı transferi, şehirler arası tur transfer, dron transfer ve daha fazlası. Lüks, güvenli ve hızlı ulaşım.",
  keywords: "VIP transfer, havalimanı transfer, şehirler arası transfer, İstanbul transfer, tur transfer, shuttle, dron transfer, özel araç transferi, transfer rezervasyon, en uygun transfer, ekonomik transfer, lüks transfer",
  openGraph: {
    title: "YolcuTransferi.com | VIP Transfer",
    description: "Türkiye genelinde VIP ve havalimanı transferinin lideri.",
    images: ["/og-image.jpg"],
    url: "https://yolcutransferi.com",
    type: "website"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <head>
        {/* Meta & SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content="VIP transfer, havalimanı transfer, şehirler arası transfer, İstanbul transfer, tur transfer, shuttle, dron transfer, özel araç transferi, transfer rezervasyon, en uygun transfer, ekonomik transfer, lüks transfer" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="YolcuTransferi.com | VIP Transfer, Havalimanı, Tur & Dron" />
        <meta property="og:description" content="Türkiye genelinde VIP ve havalimanı transferinin lideri." />
        <meta property="og:image" content="/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="YolcuTransferi.com | VIP Transfer" />
        <meta name="twitter:description" content="VIP, havalimanı ve şehirler arası transferde yeni dönem." />
        <meta name="twitter:image" content="/og-image.jpg" />
        {/* Structured Data (Schema.org LocalBusiness) */}
        <Script id="structured-data" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "YolcuTransferi.com",
            "image": "https://yolcutransferi.com/og-image.jpg",
            "telephone": "+90 539 526 75 69",
            "email": "info@yolcutransferi.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Ümraniye Plazalar, İstanbul",
              "addressLocality": "İstanbul",
              "addressRegion": "TR",
              "postalCode": "34768",
              "addressCountry": "Turkey"
            },
            "url": "https://yolcutransferi.com",
            "description": "VIP transfer, havalimanı transferi, dron transfer ve tur transfer hizmetleri Türkiye genelinde.",
            "areaServed": "Turkey"
          })}
        </Script>
      </head>
      <body>
        {children}
        {/* --- Footer’da gizli anahtar kelimeler için küçük bir blok --- */}
        <div style={{display: "none"}}>
          VIP transfer, havalimanı transfer, shuttle, tur transfer, İstanbul transfer, İzmir transfer, Antalya transfer, dron transfer, Türkiye transfer, ekonomik transfer, lüks transfer, ucuz transfer, Mercedes Vito transfer, Maybach transfer, minibüs transfer, kurumsal transfer, transfer rezervasyon
        </div>
      </body>
    </html>
  );
}
