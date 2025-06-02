import Image from "next/image";

export default function Iletisim() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-10">
      <h1 className="text-3xl font-bold mb-6 text-yellow-400">İletişim</h1>
      <div className="flex flex-col md:flex-row gap-10 items-center">
        <div>
          <Image
            src="/iletisim-illustrasyon.png"
            alt="İletişim"
            width={280}
            height={220}
            className="rounded-lg shadow"
          />
        </div>
        <div className="flex flex-col gap-2 text-lg text-gray-300">
          <span>
            <strong>Telefon:</strong> <a href="tel:05395267569" className="hover:underline text-yellow-400">0539 526 75 69</a>
          </span>
          <span>
            <strong>E-posta:</strong> <a href="mailto:byhaliltayfur@hotmail.com" className="hover:underline text-yellow-400">byhaliltayfur@hotmail.com</a>
          </span>
          <span>
            <strong>Instagram:</strong> <a href="https://www.instagram.com/yolcutransferi/" target="_blank" rel="noopener noreferrer" className="hover:underline text-pink-400">@yolcutransferi</a>
          </span>
          <span>
            <strong>X (Twitter):</strong> <a href="https://x.com/yolcutransferi" target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-400">@yolcutransferi</a>
          </span>
          <span>
            <strong>Whatsapp:</strong> <a href="https://wa.me/905395267569" target="_blank" rel="noopener noreferrer" className="hover:underline text-green-400">7/24 Whatsapp Destek</a>
          </span>
        </div>
      </div>
    </div>
  );
}
