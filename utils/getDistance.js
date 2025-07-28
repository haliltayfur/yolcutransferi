// Client-side, directions servisi ile
export default async function getDistance(from, to) {
  if (typeof window === "undefined" || !window.google || !window.google.maps) {
    return { km: "", min: "", error: "Google Maps yüklenemedi" };
  }
  return new Promise((resolve) => {
    const service = new window.google.maps.DirectionsService();
    service.route({
      origin: from,
      destination: to,
      travelMode: window.google.maps.TravelMode.DRIVING,
    }, (result, status) => {
      if (status === "OK" && result.routes[0]) {
        const leg = result.routes[0].legs[0];
        resolve({
          km: (leg.distance.value / 1000).toFixed(1),
          min: leg.duration.text,
          error: "",
        });
      } else {
        resolve({ km: "", min: "", error: "Mesafe/süre hesaplanamadı" });
      }
    });
  });
}
