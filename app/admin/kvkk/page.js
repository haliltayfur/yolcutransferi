// ... importlar ve useState, useEffect kodları aynı ...

function kisaAciklama(str) {
  if (!str) return "";
  return str.length > 15 ? str.slice(0, 15) + "..." : str;
}

export default function AdminKvkk() {
  // ...state ve fetch kodları...
  const [modalAciklama, setModalAciklama] = useState(null);

  // ...fetch, sayfalama vs aynı...
  // forms.map ile dönerken:

  return (
    <main className="...">
      {/* ...üst kısım ve butonlar... */}
      <table>
        <thead>...</thead>
        <tbody>
          {forms.map((form) => (
            <tr key={form._id}>
              <td>{form.kayitNo || "-"}</td>
              {/* ...diğer sütunlar... */}
              <td>
                {kisaAciklama(form.aciklama)}
                {form.aciklama && form.aciklama.length > 15 && (
                  <button
                    className="ml-2 underline text-[#FFD700] cursor-pointer text-xs"
                    onClick={() => setModalAciklama(form.aciklama)}
                  >
                    Oku
                  </button>
                )}
              </td>
              {/* ...kaldır butonu... */}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal açıklama kutusu */}
      {modalAciklama && (
        <div
          className="fixed left-0 top-0 w-full h-full bg-black/80 flex items-center justify-center z-50"
          onClick={() => setModalAciklama(null)}
        >
          <div
            className="bg-white text-black p-6 rounded-lg max-w-xl w-full"
            onClick={e => e.stopPropagation()}
          >
            <div className="mb-2 font-bold text-lg">Tüm Açıklama</div>
            <div className="whitespace-pre-line">{modalAciklama}</div>
            <button
              className="mt-4 px-4 py-2 bg-black text-white rounded-lg"
              onClick={() => setModalAciklama(null)}
            >
              Kapat
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
