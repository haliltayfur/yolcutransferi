import '../styles/globals.css';

export const metadata = {
  title: 'YolcuTransferi.com',
  description: 'VIP Dijital Yolcu Transferi | Lüks, Kolay, Güvenli!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className="bg-[#171717] font-serif min-h-screen">{children}</body>
    </html>
  );
}
