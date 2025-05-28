import "./globals.css";
export const metadata = {
  title: 'YolcuTransferi.com',
  description: 'VIP Transfer Hizmeti',
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
