// utils/getDistance.js
export async function getDistance(from, to) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!from || !to) return { km: 0, min: "0 dk", error: "Adres eksik" };
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
        km: (data.rows[0].elements[0].distance.value / 1000).toFixed(1),
        min: data.rows[0].elements[0].duration.text
      };
    } else {
      return { km: 0, min: "0 dk", error: "Google API: " + (data.status || "") };
    }
  } catch (e) {
    return { km: 25, min: "30 dk", error: "API çağrısı başarısız oldu." };
  }
}
export default getDistance;
