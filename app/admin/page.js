// app/admin/page.js
"use client";
import { 
  FaUser, 
  FaMoneyBillWave, 
  FaUserCheck, 
  FaUsers, 
  FaMapMarkerAlt, 
  FaListAlt, 
  FaEnvelope, 
  FaUserShield 
} from "react-icons/fa";
import Link from "next/link";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import React from "react";

// Demo KPI verileri
const kpis = [
  {
    label: "Bugünkü Ciro",
    value: "₺15.230",
    icon: <FaMoneyBillWave />,
    color: "from-[#bfa658] to-[#ffeec2]",
  },
  {
    label: "Bugünkü Ziyaretçi",
    value: "184",
    icon: <FaUsers />,
    color: "from-[#ffeec2] to-[#bfa658]",
  },
  {
    label: "Bugünkü Rezervasyon",
    value: "32",
    icon: <FaUserCheck />,
    color: "from-[#bfa658] to-[#ffeec2]",
  },
  {
    label: "Yeni Üye",
    value: "7",
    icon: <FaUser />,
    color: "from-[#ffeec2] to-[#bfa658]",
  },
];

// Demo ciro saatlik data
const ciroSaatlik = [
  { saat: "00", ciro: 0 },
  { saat: "04", ciro: 450 },
  { saat: "08", ciro: 1800 },
  { saat: "12", ciro: 4000 },
  { saat: "16", ciro: 5000 },
  { saat: "20", ciro: 3800 },
  { saat: "24", ciro: 180 },
];

// Demo il ziyaretçi dağılımı
const ziyaretIl = [
  { il: "İstanbul", ziyaret: 102 },
  { il: "Ankara", ziyaret: 31 },
  { il: "İzmir", ziyaret: 25 },
  { il: "Bursa", ziyaret: 11 },
  { il: "Antalya", ziyaret: 6 },
];

const COLORS = ["#bfa658", "#ffeec2", "#f5ca74", "#e5dbb8", "#d8ae5e"];

export default function AdminPanel() {
  // Giriş kontrolü ve demo dummy veri ile başlatıyoruz

  return (
    <main className="flex flex-col gap-8">
      {/* KPI Cards */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
        {kpis.map((k, i) => (
          <div
            key={i}
            className={`flex items-center gap-4 rounded-2xl shadow-xl p-6 bg-gradient-to-br ${k.color} border border-[#bfa658]/60`}
          >
            <span className="text-3xl">{k.icon}</span>
            <div>
              <div className="text-xl font-extrabold text-black drop-shadow">{k.value}</div>
              <div className="text-sm font-semibold text-[#3a2f13]">{k.label}</div>
            </div>
          </div>
        ))}
      </section>

      {/* Grafikler ve ziyaretçi istatistiği */}
      <section className="flex flex-col md:flex-row gap-8">
        {/* Saatlik ciro grafiği */}
        <div className="bg-black/70 rounded-2xl shadow-lg border border-[#bfa658]/30 flex-1 min-w-0 p-6">
          <div className="font-bold text-gold mb-2 text-lg">Günlük Saatlik Ciro</div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={ciroSaatlik}>
              <XAxis dataKey="saat" stroke="#ffeec2" fontSize={12} />
              <YAxis stroke="#ffeec2" fontSize={12} />
              <Tooltip />
              <Line type="monotone" dataKey="ciro" stroke="#bfa658" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        {/* Ziyaretçi iller */}
        <div className="bg-black/70 rounded-2xl shadow-lg border border-[#bfa658]/30 flex-1 min-w-0 p-6">
          <div className="font-bold text-gold mb-2 text-lg">İllere Göre Ziyaretçi</div>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={ziyaretIl}
                dataKey="ziyaret"
                nameKey="il"
                cx="50%"
                cy="50%"
                outerRadius={65}
                innerRadius={35}
                label={({ il, percent }) =>
                  `${il} (${(percent * 100).toFixed(0)}%)`
                }
              >
                {ziyaretIl.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Kısa yol linkleri */}
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
    </main>
  );
}

// app/admin/page.js
