// PATH: app/api/distance/route.js

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  if (!from || !to) {
    return new Response(JSON.stringify({ error: "Eksik parametre" }), { status: 400 });
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(from)}&destinations=${encodeURIComponent(to)}&language=tr&units=metric&key=${apiKey}`;

  try {
    const result = await fetch(url);
    const data = await result.json();

    if (
      data.status === "OK" &&
      data.rows[0].elements[0].status === "OK"
    ) {
      const elem = data.rows[0].elements[0];
      return new Response(JSON.stringify({
        km: (elem.distance.value / 1000).toFixed(1) + " km",
        min: Math.round(elem.duration.value / 60) + " dk",
        text: elem.duration.text,
        distanceText: elem.distance.text
      }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ error: "Mesafe/süre bulunamadı." }), { status: 404 });
    }
  } catch (e) {
    return new Response(JSON.stringify({ error: "Google API hatası" }), { status: 500 });
  }
}
