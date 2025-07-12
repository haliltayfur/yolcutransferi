"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Kvkk() {
  // Üye bilgisini localStorage'dan oku
  const [uye, setUye] = useState({
    ad: "",
    soyad: "",
    email: "",
    telefon: ""
  });

  useEffect(() => {
    // localStorage sadece client'ta çalışır
    if (typeof window !== "undefined") {
      const u = localStorage.getItem("user") || localStorage.getItem("uye_bilgi");
      if (u) {
        try {
          const usr = JSON.parse(u);
          setUye({
            ad: usr.ad || usr.name || "",
            soyad: usr.soyad || usr.surname || "",
            email: usr.email || "",
            telefon: usr.telefon || usr.phone || ""
          });
        } catch (e) {
          // JSON parse hatası olursa ignore
          setUye({
            ad: "",
            soyad: "",
            email: "",
            telefon: ""
          });
        }
      }
    }
  }, []);

  return (
    <main className="flex justify-center items-center min-h-[90vh] bg-black">
      <section className="w-full max-w-4xl mx-auto border border-[#bfa658] rounded-3xl shadow-2xl px-6 md:px-12 py-14 bg-gradient-to-br from-black via-[#19160a] to-[#302811] mt-16 mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#bfa658] tracking-tight mb-1 text-center">
          KVKK Politikası
        </h1>
        <div className="text-lg text-[#ffeec2] font-semibold text-center mb-8">
          Kişisel Verileriniz Güvende, Tüm Haklarınız Bizimle Güvende!
        </div>
        <div className="text-base md:text-lg text-[#ecd9aa] leading-relaxed font-normal space-y-6">
          {/* KVKK içerikleri buraya */}
          <p>
            YolcuTransferi.com olarak, kişisel verilerinizi sadece transfer işlemlerinizin gerçekleştirilmesi ve yasal yükümlülüklerimizin yerine getirilmesi amacıyla işleriz.
            Hiçbir şekilde 3. şahıs veya kurumlarla izniniz olmadan paylaşmayız. Verilerinizin güvenliği için uluslararası standartlara uygun şekilde koruma sağlanır.
          </p>
          <p>
            Dilediğiniz zaman bize başvurarak kişisel verilerinizin silinmesini, düzeltilmesini veya işlenmesinin kısıtlanmasını talep edebilirsiniz.
          </p>
          <ul className="list-disc ml-6">
            <li>İşlenen veriler: Ad, soyad, e-posta, telefon, transfer bilgileri</li>
            <li>Veri saklama süresi: Yasal süreler ile sınırlı</li>
            <li>Veri güvenliği: 256 bit SSL, şifreli veri depolama</li>
            <li>Başvuru ve detaylı bilgi için bizimle iletişime geçebilirsiniz.</li>
          </ul>
          <p>
            Detaylı KVKK metni ve başvuru haklarınız için <b>Başvuru Formu</b> kullanabilirsiniz.
          </p>
        </div>
        {/* KVKK Başvuru Butonu */}
        <div className="flex justify-start mt-8">
          <Link
            href={{
              pathname: "/kvkk/form",
              query: {
                ad: uye.ad || "",
                soyad: uye.soyad || "",
                email: uye.email || "",
                telefon: uye.telefon || ""
              }
            }}
            className="bg-gradient-to-tr from-[#cbb26a] to-[#bfa658] text-black font-bold text-lg px-7 py-3 rounded-xl shadow-md transition hover:scale-105 hover:from-[#e6d199] hover:to-[#c4ad5f] border border-[#fff6ce] focus:outline-none"
          >
            Başvuru Formu Doldur
          </Link>
        </div>
      </section>
    </main>
  );
}
