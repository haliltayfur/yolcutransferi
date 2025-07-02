"use client";
import React, { useState, useEffect, useRef } from "react";
import { format } from "date-fns";

export default function AdminIletisim() {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalForm, setModalForm] = useState(null);

  useEffect(() => {
    fetchForms();
  }, []);

  async function fetchForms() {
    setLoading(true);
    const res = await fetch("/api/admin/iletisim");
    const data = await res.json();
    setForms(data.forms || []);
    setLoading(false);
  }

  return (
    <main className="max-w-6xl mx-auto px-2 py-8">
      <h1 className="text-3xl font-bold text-[#bfa658] mb-8">İletişimden Gelenler</h1>
      <div className="overflow-x-auto bg-black/80 rounded-2xl border-2 border-[#bfa658]">
        <table className="min-w-full text-sm border-separate border-spacing-0">
          <thead>
            <tr className="bg-black text-[#bfa658]">
              <th className="p-2 border-b border-[#bfa658]">Kayıt No</th>
              <th className="p-2 border-b border-[#bfa658]">Tarih</th>
              <th className="p-2 border-b border-[#bfa658]">Ad Soyad</th>
              <th className="p-2 border-b border-[#bfa658]">Telefon</th>
              <th className="p-2 border-b border-[#bfa658]">E-posta</th>
              <th className="p-2 border-b border-[#bfa658]">Mesaj</th>
              <th className="p-2 border-b border-[#bfa658]">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="7" className="text-center py-4">Yükleniyor...</td></tr>
            ) : forms.length === 0 ? (
              <tr><td colSpan="7" className="text-center py-4">Hiç kayıt bulunamadı.</td></tr>
            ) : forms.map((form) => (
              <tr key={form._id}>
                <td className="p-2 border-b border-[#bfa658]">{form.kayitNo}</td>
                <td className="p-2 border-b border-[#bfa658]">{format(new Date(form.createdAt), "dd.MM.yyyy HH:mm")}</td>
                <td className="p-2 border-b border-[#bfa658]">{form.ad} {form.soyad}</td>
                <td className="p-2 border-b border-[#bfa658]">{form.telefon}</td>
                <td className="p-2 border-b border-[#bfa658]">{form.email}</td>
                <td className="p-2 border-b border-[#bfa658]">{form.mesaj.slice(0,30)}...</td>
                <td className="p-2 border-b border-[#bfa658]">
                  <button
                    onClick={() => setModalForm(form)}
                    className="bg-[#bfa658] px-2 py-1 rounded text-xs font-semibold hover:bg-yellow-500"
                  >Oku</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalForm && (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
          <div className="bg-white text-black rounded-lg p-4 w-full max-w-xl relative">
            <h2 className="text-xl font-bold mb-4">Mesaj Detayı</h2>
            <p><strong>Gönderen:</strong> {modalForm.ad} {modalForm.soyad}</p>
            <p><strong>Telefon:</strong> {modalForm.telefon}</p>
            <p><strong>Email:</strong> {modalForm.email}</p>
            <p><strong>İletişim Nedeni:</strong> {modalForm.neden}</p>
            <p><strong>Mesaj:</strong> {modalForm.mesaj}</p>
            <p><strong>İletişim Tercihi:</strong> {modalForm.iletisimTercihi}</p>
            <p><strong>KVKK Onay:</strong> {modalForm.kvkkOnay ? "Evet" : "Hayır"}</p>
            {modalForm.ek && <p><strong>Ek Dosya:</strong> <a href={modalForm.ek} target="_blank" className="text-blue-600">Görüntüle/İndir</a></p>}
            <button
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
              onClick={() => setModalForm(null)}
            >Kapat</button>
          </div>
        </div>
      )}
    </main>
  );
}
