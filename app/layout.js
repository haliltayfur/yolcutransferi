import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer"; // Footer'ı da ayrı bileşen olarak ekliyoruz

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
        <Footer /> {/* VIP zengin Footer sadece burada! */}
      </body>
    </html>
  );
}
