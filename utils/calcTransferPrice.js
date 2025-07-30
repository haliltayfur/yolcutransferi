// utils/calcTransferPrice.js

const kmTable = [
  { km: 85, eko: 3000, vip: 4000, prime: 20000, "8": 7000, "9+": 12000 },
  { km: 142, eko: 6500, vip: 8000, prime: 40000, "8": 20000, "9+": 35000 },
  { km: 5, eko: 1100, vip: 1500, prime: 9000, "8": 2500, "9+": 12000 },
  { km: 33, eko: 1500, vip: 2500, prime: 17000, "8": 3400, "9+": 12000 },
];

function getSegmentKey(segment) {
  if (segment?.toLowerCase().includes("eko")) return "eko";
  if (segment?.toLowerCase().includes("prime")) return "prime";
  if (segment?.toLowerCase().includes("vip")) return "vip";
  if (segment?.includes("8")) return "8";
  if (segment?.includes("9")) return "9+";
  return "vip"; // fallback
}

export default function calcTransferPrice(kmStr, segment, peopleCount, hour) {
  // kmStr ondalıklı olabilir
  const km = Number(kmStr || 0);
  if (!km || !segment) return 0;
  // En yakın km değerini tablodan bul
  let row = kmTable.reduce((prev, curr) =>
    Math.abs(curr.km - km) < Math.abs(prev.km - km) ? curr : prev
  );
  let key = getSegmentKey(segment);
  let price = row[key] || row["vip"];
  // Kişi başı ek ücret
  let extra = 1 + (Math.max(peopleCount - 1, 0) * 0.05);
  price = price * extra;
  // Gece ücreti
  let hourNum = Number((hour || "00:00").split(":")[0]);
  if (hourNum >= 22 || hourNum < 7) price = price * 1.10;
  return Math.round(price);
}
