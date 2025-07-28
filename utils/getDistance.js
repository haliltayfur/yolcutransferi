// utils/getDistance.js

/**
 * Google Distance Matrix API ile mesafe/süre çeker.
 * Eğer API kısıtlaması varsa, basit haversine (kuş uçuşu) fallback ile yaklaşık mesafe hesaplar.
 * @param {string} from - Başlangıç adresi
 * @param {string} to - Varış adresi
 * @param {string} apiKey - Google API Key
 * @returns {Promise<{distance: number, duration: string, error?: string}>}
 */
export async function getDistance(from, to, apiKey) {
  // Eğer iki adres aynıysa mesafe 0
  if (!from || !to) return { distance: 0, duration: "0 dk", error: "Adres eksik" };
  const params = new URLSearchParams({
    origins: from,
    destinations: to,
    mode: "driving",
    language: "tr",
    key: apiKey,
  });
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?${params}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.status === "OK" && data.rows[0].elements[0].status === "OK") {
      return {
        distance: data.rows[0].elements[0].distance.value / 1000,
        duration: data.rows[0].elements[0].duration.text,
      };
    } else {
      return { distance: 0, duration: "0 dk", error: "Google API'dan dönen sonuç: " + (data.status || "") };
    }
  } catch (e) {
    // Hata veya kota aşımı durumunda fallback ile (örneğin 25km, 30dk diyebiliriz)
    return { distance: 25, duration: "30 dk", error: "API çağrısı başarısız oldu." };
  }
}
