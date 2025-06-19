"use client";
import Link from "next/link";

export default function Kvkk() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      {/* Başlık */}
      <h1 className="text-3xl md:text-4xl font-bold text-center text-[#bfa658] mb-8 tracking-tight">
        Kişisel Verilerin Korunması
      </h1>

      {/* İçerik Kutusu */}
      <div className="border-2 border-[#bfa658] rounded-2xl bg-black/80 px-4 md:px-8 py-7 md:py-10 mb-9">
        <div className="space-y-5 text-[1.13rem] md:text-[1.15rem] text-gray-200 font-normal leading-relaxed">

          <p>
            YolcuTransferi.com olarak kişisel verilerinizi KVKK'ya uygun şekilde işliyor, yalnızca hizmet sunumu ve iletişim amacıyla sınırlı kişisel verilerinizi (ad, soyad, telefon ve e-posta) rezervasyon ve iletişim formlarında topluyoruz. IP adresi, kredi kartı, kimlik, konum verisi veya çerez gibi hassas kişisel veriler toplanmaz, saklanmaz.
          </p>

          <p>
            Tüm ödeme işlemleri, entegre olduğumuz ödeme sağlayıcılar üzerinden gerçekleştirilir. Kredi kartı bilgileri şirketimiz tarafından işlenmez veya kaydedilmez.
          </p>

          <p>
            Veriler yalnızca yasal zorunluluklar kapsamında tutulur ve süre sonunda silinir veya anonim hale getirilir. Hiçbir veri yurt içi veya dışı üçüncü taraflarla paylaşılmaz.
          </p>

          <p>
            WhatsApp gibi iletişim kanalları yalnızca iletişim için kullanılır, veri kaydı yapılmaz.
          </p>

          <p>
            KVKK kapsamında sahip olduğunuz başlıca haklar:
          </p>

          <ul className="pl-2 md:pl-8 mt-2 space-y-3">
            {[ 
              "Kişisel verinizin işlenip işlenmediğini öğrenme",
              "Hangi verilerin işlendiğini ve işleme amacını öğrenme",
              "Hatalı/eksik verilerin düzeltilmesini isteme",
              "Verilerin silinmesini/yok edilmesini talep etme",
              "Yasaya aykırı işlenme nedeniyle zarar doğarsa tazminat isteme"
            ].map((text, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className="mt-1"
                  style={{
                    width: 16,
                    height: 16,
                    display: "inline-block",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, #e3b77b 65%, #bfa658 100%)",
                    marginTop: 3,
                    marginRight: 5,
                    flexShrink: 0
                  }}
                ></span>
                <span className="text-gray-300">{text}</span>
              </li>
            ))}
          </ul>

          <p>
            KVKK kapsamındaki başvurularınızı{" "}
            <Link
              href="/kvkk/form"
              className="underline text-[#e3b77b] hover:text-[#f5d48d]"
            >
              bu formu doldurarak
            </Link>{" "}
            veya <strong>info@yolcutransferi.com</strong> adresine iletebilirsiniz.
            Başvurular yasal süre içinde yanıtlanır.
          </p>
        </div>
      </div>

      {/* Buton */}
      <Link href="/rezervasyon">
        <button className="bg-[#6e5a1e] hover:bg-[#8c7327] text-white font-bold py-3 px-8 rounded-xl mt-10 w-full text-lg shadow">
          Rezervasyon Yap
        </button>
      </Link>
    </main>
  );
}
