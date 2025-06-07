import "./globals.css";
import Header from "./components/Header"; // Bu dosya: app/components/Header.jsx

export const metadata = {
  title: "YolcuTransferi.com",
  description: "VIP Transfer | Dron Transfer | Türkiye Geneli",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className="bg-black text-white min-h-screen flex flex-col font-poppins overflow-x-hidden">
        <Header />
        <main className="flex-grow">{children}</main>
        <footer className="w-full px-8 py-6 bg-black/90 flex flex-col md:flex-row items-center justify-between gap-3 mt-auto">
          <span className="text-sm text-gray-400">© 2025 YolcuTransferi.com</span>
          <div className="flex gap-6 items-center">
            <a href="/sozlesme" className="text-sm underline text-gray-400">Sözleşme</a>
            <a href="/gizlilik" className="text-sm underline text-gray-400">Gizlilik</a>
          </div>
        </footer>
      </body>
    </html>
  );
}
