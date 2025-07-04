// PATH: app/admin/page.js
"use client";
import { useEffect, useState } from "react";
import {
  FaUser, FaMoneyBillWave, FaUsers, FaUserCheck, FaEnvelope, FaListAlt, FaUserShield, FaCog
} from "react-icons/fa";
import Link from "next/link";

export default function AdminDashboard() {
  const [data, setData] = useState({
    bugunCiro: 0,
    buAyCiro: 0,
    ziyaretci: 0,
    rezervasyon: 0,
    yeniUyeler: { musteri: 0, sofor: 0, firma: 0, isbirligi: 0 },
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const [rez, ziyaretci, uyeler] = await Promise.all([
          fetch("/api/rezervasyon").then(res => res.json()),
          fetch("/api/visitors").then(res => res.json()),
          fetch("/api/uyelikler").then(res => res.json()),
        ]);
        const now = new Date();
        const today = now.toISOString().slice(0, 10);
        const ayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

        let bugunCiro = 0, buAyCiro = 0, bugunRez = 0;
        (rez.items || []).forEach(r => {
          const odendi = r.odemeDurumu === "tamamlandi";
          let trfTarih = "";
          try {
            trfTarih = r.transferTarihi ? new Date(r.transferTarihi).toISOString().slice(0, 10) : "";
          } catch { trfTarih = ""; }
          if (odendi && trfTarih === today) {
            bugunCiro += Number(r.tutar) || 0;
            bugunRez++;
          }
          if (odendi && trfTarih.slice(0, 7) === ayStr) {
            buAyCiro += Number(r.tutar) || 0;
          }
        });

        const yeniUyeler = { musteri: 0, sofor: 0, firma: 0, isbirligi: 0 };
        (uyeler.items || []).forEach(u => {
          let kayitAy = "";
          try {
            kayitAy = u.createdAt ? u.createdAt.slice(0, 7) : "";
          } catch { kayitAy = ""; }
          if (kayitAy === ayStr) {
            yeniUyeler[u.tip] = (yeniUyeler[u.tip] || 0) + 1;
          }
        });

        setData({
          bugunCiro,
          buAyCiro,
          ziyaretci: ziyaretci.count || 0,
          rezervasyon: bugunRez,
          yeniUyeler,
        });
      } catch (err) {
        setData({
          bugunCiro: 0,
          buAyCiro: 0,
          ziyaretci: 0,
          rezervasyon: 0,
          yeniUyeler: { musteri: 0, sofor: 0, firma: 0, isbirligi: 0 },
        });
      }
    }
    fetchData();
  }, []);

  return (
    <main className="flex flex-col gap-8 p-4">
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-yellow-600 to-yellow-400 text-black rounded-xl p-4 shadow cursor-pointer">
          <FaMoneyBillWave size={30} />
          <h3 className="text-xl font-bold">₺{data.bugunCiro}</h3>
          <p>Bugünkü Ciro</p>
        </div>
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black rounded-xl p-4 shadow cursor-pointer">
          <FaMoneyBillWave size={30} />
          <h3 className="text-xl font-bold">₺{data.buAyCiro}</h3>
          <p>Bu Ay Ciro</p>
        </div>
        <div className="bg-gradient-to-r from-yellow-600 to-yellow-400 text-black rounded-xl p-4 shadow cursor-pointer">
          <FaUsers size={30} />
          <h3 className="text-xl font-bold">{data.ziyaretci}</h3>
          <p>Bugünkü Ziyaretçi</p>
        </div>
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black rounded-xl p-4 shadow cursor-pointer">
          <FaUserCheck size={30} />
          <h3 className="text-xl font-bold">{data.rezervasyon}</h3>
          <p>Bugünkü Rezervasyon</p>
        </div>
        <div className="col-span-2 md:col-span-4 bg-gradient-to-r from-yellow-600 to-yellow-400 text-black rounded-xl p-4 shadow cursor-pointer">
          <FaUser size={30} />
          <h3 className="text-xl font-bold">
            Müşteri: {data.yeniUyeler.musteri} /
            Şoför: {data.yeniUyeler.sofor} /
            Firma: {data.yeniUyeler.firma} /
            İş Birliği: {data.yeniUyeler.isbirligi}
          </h3>
          <p>Yeni Üye (Bu Ay)</p>
        </div>
      </section>
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link href="/admin/rezervasyonlar" className="bg-[#bfa658] rounded-xl shadow flex items-center gap-2 p-3">
          <FaListAlt size={20} /> Rezervasyonlar
        </Link>
        <Link href="/admin/uyelikler" className="bg-[#bfa658] rounded-xl shadow flex items-center gap-2 p-3">
          <FaUsers size={20} /> Üyelikler
        </Link>
        <Link href="/admin/iletisim" className="bg-[#bfa658] rounded-xl shadow flex items-center gap-2 p-3">
          <FaEnvelope size={20} /> İletişim
        </Link>
        <Link href="/admin/kvkk" className="bg-[#bfa658] rounded-xl shadow flex items-center gap-2 p-3">
          <FaUserShield size={20} /> KVKK
        </Link>
        <Link href="/admin/ayarlar" className="bg-[#bfa658] rounded-xl shadow flex items-center gap-2 p-3 col-span-2 md:col-span-4">
          <FaCog size={20} /> Ayarlar
        </Link>
      </section>
    </main>
  );
}
// PATH: app/admin/page.js
