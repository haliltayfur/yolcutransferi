// utils/getDistance.js
let lastQueryTime = 0;
let lastQuery = "";

export default async function getDistance(from, to, setError) {
  if (typeof window === "undefined" || !window.google || !window.google.maps) {
    setError && setError("Google Maps yüklenemedi");
    return { km: "", min: "", error: "Google Maps yüklenemedi" };
  }
  // Aynı anda spam sorgu atmayı engelle
  const now = Date.now();
  const q = from + "___" + to;
  lastQueryTime = now;
  lastQuery = q;

  return new Promise((resolve) => {
    setTimeout(() => {
      // Eğer kullanıcı o arada başka bir arama yaptıysa, eskiyi iptal et
      if (lastQuery !== q) return;
      const service = new window.google.maps.DirectionsService();
      service.route(
        {
          origin: from,
          destination: to,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === "OK" && result.routes[0]) {
            const leg = result.routes[0].legs[0];
            resolve({
              km: (leg.distance.value / 1000).toFixed(1),
              min: leg.duration.text,
              error: "",
            });
          } else {
            // Hata: Ama anında basma, önce 10 sn bekle
            setTimeout(() => {
              // Eğer bu 10 sn içinde hala aynı query ise göster
              if (lastQuery === q) {
                setError && setError("Mesafe/süre hesaplanamadı. Lütfen adresi kontrol edin.");
                resolve({ km: "", min: "", error: "Mesafe/süre hesaplanamadı" });
              }
            }, 10000);
          }
        }
      );
    }, 500); // Yarım saniye debounce (klavye ile yazarken spamı engeller)
  });
}
