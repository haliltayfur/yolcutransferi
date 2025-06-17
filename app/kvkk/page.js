"use client";
import Link from "next/link";

export default function Kvkk() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      {/* Başlık */}
      <h1 className="text-3xl md:text-4xl font-bold text-center text-[#bfa658] mb-8 tracking-tight">
        Kişisel Verilerin Korunması
      </h1>
      {/* Slogan */}
      <div className="text-xl md:text-2xl font-semibold text-center mb-8 text-[#bfa658] tracking-tight">
        YolcuTransferi.com olarak kişisel verilerinizi KVKK'ya uygun şekilde işliyoruz.
      </div>
      {/* İçerik Kutusu */}
      <div className="border-2 border-[#bfa658] rounded-2xl bg-black/80 px-4 md:px-8 py-7 md:py-10 mb-9">
        <div className="space-y-5 text-[1.13rem] md:text-[1.15rem] text-gray-200 font-normal leading-relaxed">

          <p>
            YolcuTransferi.com, yalnızca hizmet sunumu ve iletişim amacıyla sınırlı kişisel verilerinizi (ad, soyad, telefon ve e-posta) rezervasyon ve iletişim formlarında toplar. IP adresi, kredi kartı, kimlik, konum veya çerez gibi hassas veriler kesinlikle toplanmaz ve saklanmaz.
          </p>

          <p>
            Tüm ödeme işlemleri, entegre olduğumuz güvenli ödeme hizmet sağlayıcıları (örn. iyzico, PayTR, Craftgate) üzerinden gerçekleştirilir. Kredi kartı bilgileriniz firmamız tarafından görülmez, işlenmez ve saklanmaz.
          </p>

          <p>
            Kişisel verileriniz sadece yasal yükümlülüklerin gerektirdiği süre boyunca saklanır, ardından sistemimizden silinir veya anonim hale getirilir. Hiçbir veri, yurt içi veya yurt dışındaki üçüncü taraflarla paylaşılmaz.
          </p>

          <p>
            WhatsApp ve benzeri iletişim kanallarından tarafımıza ulaşmanız durumunda, bu platformlardan gelen bilgiler veri tabanımıza kaydedilmez. Size sadece iletişim amacıyla geri dönüş yapılır.
          </p>

          <p>
            KVKK kapsamında sahip olduğunuz başlıca haklar:
          </p>

          <ul className="pl-2 md:pl-8 mt-2 space-y-3">
            {[
              "Kişisel verinizin işlenip işlenmediğini öğrenme",
              "Hangi verilerin işlendiğini ve işleme amacını öğrenme",
              "Verilerin düzeltilmesini, silinmesini veya yok edilmesini talep etme",
              "Yasaya aykırı işlenme sebebiyle zarar doğarsa tazminat talep etme"
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
            KVKK kapsamındaki başvurularınızı <strong>info@yolcutransferi.com</strong> adresine iletebilirsiniz. Tüm talepleriniz yasal süre içinde cevaplandırılır.
          </p>
        </div>
      </div>

      {/* Rezervasyon butonu */}
      <Link href="https://yolcutransferi.com/rezervasyon">
        <button className="bg-[#6e5a1e] hover:bg-[#8c7327] text-white font-bold py-3 px-8 rounded-xl mt-10 w-full text-lg shadow">
          Rezervasyon Yap
        </button>
      </Link>
    </main>
  );
}
