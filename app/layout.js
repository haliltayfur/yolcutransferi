// app/
import '../styles/globals.css';

export const metadata = {
  title: 'YolcuTransferi.com',
  description: 'VIP Yolcu Taşımacılığı ve Transfer',
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
