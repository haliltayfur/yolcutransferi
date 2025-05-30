export default function SocialMediaBar() {
  return (
    <div className="flex gap-4 ml-4">
      <a href="https://wa.me/905395267569" target="_blank" title="WhatsApp" rel="noopener noreferrer">
        <img src="/icons/whatsapp.svg" alt="WhatsApp" className="w-6 h-6"/>
      </a>
      <a href="https://instagram.com/yolcutransferi" target="_blank" title="Instagram" rel="noopener noreferrer">
        <img src="/icons/instagram.svg" alt="Instagram" className="w-6 h-6"/>
      </a>
      <a href="https://x.com/yolcutransferi" target="_blank" title="X" rel="noopener noreferrer">
        <img src="/icons/x.svg" alt="Twitter/X" className="w-6 h-6"/>
      </a>
    </div>
  );
}
