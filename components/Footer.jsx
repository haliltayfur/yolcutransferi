import SocialMediaBar from "./SocialMediaBar";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 pt-10 pb-6 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-lg font-semibold mb-2">Explore</h2>
          <ul className="space-y-1">
            <li>Business Class</li>
            <li>Family Packages</li>
            <li>Airport Transfers</li>
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Services</h2>
          <ul className="space-y-1">
            <li>VIP Transfers</li>
            <li>Corporate Transfers</li>
            <li>Individual Transfers</li>
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Contact Us</h2>
          <p className="text-sm">info@yolcutransferi.com</p>
          <p className="text-sm mt-2">Whatsapp: <a href="https://wa.me/905395267569" className="underline">+90 539 526 75 69</a></p>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Subscribe to our Newsletter</h2>
          <form className="flex">
            <input type="email" placeholder="Enter your email" className="rounded-l px-3 py-1 w-full text-black"/>
            <button className="bg-yellow-400 text-black rounded-r px-4 font-semibold">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-700 pt-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-xs">© 2025 YolcuTransferi.com. All rights reserved.</p>
        <div className="flex gap-3 mt-2 md:mt-0">
          <a href="#" className="hover:underline text-xs">Terms-and-conditions</a>
          <span>|</span>
          <a href="#" className="hover:underline text-xs">Privacy-policy</a>
        </div>
        <SocialMediaBar />
      </div>
    </footer>
  );
}
