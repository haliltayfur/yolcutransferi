// app/layout.js

export const metadata = {
  title: "YolcuTransferi.com | VIP Transfer ve Lüks Ulaşım",
  description: "İstanbul ve tüm Türkiye'de VIP transfer, havalimanı ulaşımı, lüks araç ve özel şoförlü hizmetler.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>
        {children}
      </body>
    </html>
  );
}

// app/layout.js
