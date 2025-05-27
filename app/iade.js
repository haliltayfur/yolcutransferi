export default function Iade() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gold mb-6 text-center">İade Politikası</h1>
      <div className="space-y-6 text-gray-200 text-base">
        <ul className="list-disc ml-6">
          <li>
            Transfer saatinden en az <span className="text-gold font-semibold">6 saat önce</span> yapılan iptallerde, ücretin tamamı iade edilir.
          </li>
          <li>
            Son 6 saat içinde yapılan iptallerde <span className="text-gold font-semibold">herhangi bir iade yapılmaz</span>. 
            (Yolcu için rezervasyon ve şoför için planlama masrafı oluştuğu için)
          </li>
          <li>
            Müşteri, iptal talebini info@yolcutransferi.com adresine e-posta ile iletmelidir.
          </li>
          <li>
            İade işlemleri 1-3 iş günü içinde gerçekleştirilir.
          </li>
        </ul>
        <p>
          Detaylar ve özel durumlar için iletişime geçebilirsiniz.
        </p>
      </div>
    </main>
  );
}
