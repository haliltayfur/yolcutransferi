//app/admin/page.js
"use client";
import { useEffect, useState } from "react";
import {
  FaUser, FaMoneyBillWave, FaUserCheck, FaUsers, FaListAlt, FaEnvelope, FaUserShield, FaCog
} from "react-icons/fa";
import Link from "next/link";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

// Renkler
const COLORS = ["#bfa658", "#ffeec2", "#f5ca74", "#e5dbb8", "#d8ae5e"];

export default function AdminPanel() {
  const [kpis, setKpis] = useState({
    bugunCiro: 0, buAyCiro: 0, bugunZiyaretci: 0, bugunRez: 0,
    bugunIsler: [], yeniUyeler: { musteri: 0, sofor: 0, firma: 0, isbirligi: 0 }
  });
  const [pieData, setPieData] = useState([]);
  const [detayList, setDetayList] = useState([]);
  const [detayBaslik, setDetayBaslik] = useState("");

  // Tüm datayı paralel çek
  useEffect(() => {
    async function fetchData() {
      const [res1, res2, res3, res4, res5] = await Promise.all([
        fetch("/api/rezervasyon"),
        fetch("/api/visitors"),
        fetch("/api/uyelikler"),
        fetch("/api/iletisim"),
        fetch("/api/kvkk/forms")
      ]);
      const rez = await res1.json();
      const vis = await res2.json();
      const uye = await res3.json();
      const ile = await res4.json();
      const kvkk = await res5.json();

      // Bugünkü ve bu ayki ciro
      const now = new Date();
      const today = now.toISOString().slice(0, 10);
      const ayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
      let bugunCiro = 0, buAyCiro = 0, bugunRez = 0, bugunIsler = [];
      (rez.items || []).forEach(r => {
        const trf = new Date(r.transferTarihi);
        const odendi = r.odemeDurumu === "tamamlandi";
        const tarihStr = trf.toISOString().slice(0, 10);
        if (odendi && tarihStr === today) {
          bugunCiro += r.tutar;
          bugunRez++;
          bugunIsler.push(r);
        }
        if (odendi && trf.toISOString().slice(0, 7) === ayStr) {
          buAyCiro += r.tutar;
        }
      });

      // Yeni Üyeler (bu ay)
      const yeniUyeler = { musteri: 0, sofor: 0, firma: 0, isbirligi: 0 };
      (uye.items || []).forEach(u => {
        if (u.createdAt && u.createdAt.slice(0, 7) === ayStr) {
          yeniUyeler[u.tip] = (yeniUyeler[u.tip] || 0) + 1;
        }
      });

      // İl dağılımı (üyelerin iline göre)
      const ilSayim = {};
      (uye.items || []).forEach(u => {
        if (u.il) ilSayim[u.il] = (ilSayim[u.il] || 0) + 1;
      });
      const pie = Object.entries(ilSayim).map(([il, count]) => ({ name: il, value: count }));

      setKpis({
        bugunCiro, buAyCiro, bugunZiyaretci: vis.count,
        bugunRez, bugunIsler, yeniUyeler
      });
      setPieData(pie);
    }
    fetchData();
  }, []);

  // Tıklanınca detay listesi açan handler
  function handleDetay(baslik, arr) {
    setDetayBaslik(baslik);
    setDetayList(arr);
  }

  return (
    <main className="flex flex-col gap-8">
      {/* KPI Cards */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
        {/* Bugünkü & Bu Ayki Ciro */}
        <div
          onClick={() => handleDetay("Bugünkü Ciro Detayı", kpis.bugunIsler)}
          className="flex items-center gap-4 rounded-2xl shadow-xl p-6 bg-gradient-to-br from-[#bfa658] to-[#ffeec2] border border-[#bfa658]/60 cursor-pointer"
        >
          <span className="text-3xl"><FaMoneyBillWave /></span>
          <div>
            <div className="text-xl font-extrabold text-black">{kpis.bugunCiro.toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}</div>
            <div className="text-sm font-semibold text-[#3a2f13]">Bugünkü Ciro</div>
          </div>
        </div>
        <div
          onClick={() => handleDetay("Bu Ayki Ciro Detayı", [])}
          className="flex items-center gap-4 rounded-2xl shadow-xl p-6 bg-gradient-to-br from-[#ffeec2] to-[#bfa658] border border-[#bfa658]/60 cursor-pointer"
        >
          <span className="text-3xl"><FaMoneyBillWave /></span>
          <div>
            <div className="text-xl font-extrabold text-black">{kpis.buAyCiro.toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}</div>
            <div className="text-sm font-semibold text-[#3a2f13]">Bu Ay Ciro</div>
          </div>
        </div>
        {/* Ziyaretçi */}
        <div
          onClick={() => handleDetay("Bugünkü Ziyaretçi", [])}
          className="flex items-center gap-4 rounded-2xl shadow-xl p-6 bg-gradient-to-br from-[#bfa658] to-[#ffeec2] border border-[#bfa658]/60 cursor-pointer"
        >
          <span className="text-3xl"><FaUsers /></span>
          <div>
            <div className="text-xl font-extrabold text-black">{kpis.bugunZiyaretci}</div>
            <div className="text-sm font-semibold text-[#3a2f13]">Bugünkü Ziyaretçi</div>
          </div>
        </div>
        {/* Bugünkü Rezervasyon */}
        <div
          onClick={() => handleDetay("Bugünkü Rezervasyon", kpis.bugunIsler)}
          className="flex items-center gap-4 rounded-2xl shadow-xl p-6 bg-gradient-to-br from-[#ffeec2] to-[#bfa658] border border-[#bfa658]/60 cursor-pointer"
        >
          <span className="text-3xl"><FaUserCheck /></span>
          <div>
            <div className="text-xl font-extrabold text-black">{kpis.bugunRez}</div>
            <div className="text-sm font-semibold text-[#3a2f13]">Bugünkü Rezervasyon</div>
          </div>
        </div>
        {/* Yeni Üye */}
        <div
          onClick={() => handleDetay("Yeni Üyeler", Object.entries(kpis.yeniUyeler).map(([tip, count]) => ({ tip, count })))}
          className="flex items-center gap-4 rounded-2xl shadow-xl p-6 bg-gradient-to-br from-[#ffeec2] to-[#bfa658] border border-[#bfa658]/60 cursor-pointer col-span-2 md:col-span-4"
        >
          <span className="text-3xl"><FaUser /></span>
          <div>
            <div className="text-xl font-extrabold text-black">
              {["musteri", "sofor", "firma", "isbirligi"].map(tip => `${tip}: ${kpis.yeniUyeler[tip] || 0}`).join(" / ")}
            </div>
            <div className="text-sm font-semibold text-[#3a2f13]">Yeni Üye</div>
          </div>
        </div>
      </section>

      {/* İllere Göre Üyeler */}
      <section className="flex flex-col md:flex-row gap-8">
        <div className="bg-black/70 rounded-2xl shadow-lg border border-[#bfa658]/30 flex-1 min-w-0 p-6">
          <div className="font-bold text-gold mb-2 text-lg">İllere Göre Üyeler</div>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={65}
                innerRadius={35}
                label={({ name, percent }) =>
                  `${name} (${(percent * 100).toFixed(0)}%)`
                }
              >
                {pieData.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Kısa Yol Kutuları */}
      <section className="flex flex-col md:flex-row gap-8 mt-2">
        <Link
          href="/admin/rezervasyonlar"
          className="flex-1 bg-[#bfa658] text-black rounded-2xl shadow-xl flex items-center gap-4 px-8 py-6 text-lg font-extrabold hover:scale-[1.03] transition"
        >
          <FaListAlt className="text-2xl" />
          Rezervasyon Talepleri
        </Link>
        <Link
          href="/admin/iletisim"
          className="flex-1 bg-[#bfa658] text-black rounded-2xl shadow-xl flex items-center gap-4 px-8 py-6 text-lg font-extrabold hover:scale-[1.03] transition"
        >
          <FaEnvelope className="text-2xl" />
          İletişimden Gelenler
        </Link>
        <Link
          href="/admin/kvkk"
          className="flex-1 bg-[#bfa658] text-black rounded-2xl shadow-xl flex items-center gap-4 px-8 py-6 text-lg font-extrabold hover:scale-[1.03] transition"
        >
          <FaUserShield className="text-2xl" />
          KVKK Başvuruları
        </Link>
        <Link
          href="/admin/uyelikler"
          className="flex-1 bg-[#bfa658] text-black rounded-2xl shadow-xl flex items-center gap-4 px-8 py-6 text-lg font-extrabold hover:scale-[1.03] transition"
        >
          <FaUsers className="text-2xl" />
          Üyelikler
        </Link>
      </section>

      {/* Detay Popup */}
      {detayBaslik && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center" onClick={() => setDetayBaslik("")}>
          <div className="bg-white text-black rounded-xl p-8 max-w-2xl w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{detayBaslik}</h2>
              <button className="text-3xl text-gray-400 hover:text-black" onClick={() => setDetayBaslik("")}>×</button>
            </div>
            <div>
              {/* Ciro ve rezervasyon detayı örneği */}
              {detayList.length === 0
                ? <div className="text-lg text-gray-600">Detay verisi yok.</div>
                : (
                  <table className="w-full text-sm">
                    <thead>
                      <tr>
                        {Object.keys(detayList[0]).map((k) => <th key={k} className="p-1 border-b">{k}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {detayList.map((r, i) => (
                        <tr key={i}>
                          {Object.values(r).map((v, idx) => <td key={idx} className="p-1 border-b">{String(v)}</td>)}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
//app/admin/page.js
