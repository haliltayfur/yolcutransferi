// PATH: utils/calcTransferPrice.js

const priceTable = [
  { km: 5,    eko: 1100, vip: 1500, prime: 9000, "8": 2500, "9+": 12000 },
  { km: 33,   eko: 1500, vip: 2500, prime: 17000, "8": 3400, "9+": 12000 },
  { km: 85,   eko: 3000, vip: 4000, prime: 20000, "8": 7000, "9+": 12000 },
  { km: 142,  eko: 6500, vip: 8000, prime: 40000, "8": 20000, "9+": 35000 },
];

function getSegmentKey(segment) {
  if (!segment) return "vip";
  const lower = segment.toLowerCase();
  if (lower.includes("eko")) return "eko";
  if (lower.includes("prime")) return "prime";
  if (lower.includes("lüks") || lower.includes("vip")) return "vip";
  if (segment.includes("8")) return "8";
  if (segment.includes("9") || lower.includes("plus") || lower.includes("+")) return "9+";
  return "vip";
}

function interpolate(km, seg) {
  priceTable.sort((a, b) => a.km - b.km);
  if (km <= priceTable[0].km) return priceTable[0][seg] || priceTable[0]["vip"];
  if (km >= priceTable[priceTable.length-1].km) return priceTable[priceTable.length-1][seg] || priceTable[priceTable.length-1]["vip"];
  for (let i = 0; i < priceTable.length - 1; i++) {
    let curr = priceTable[i];
    let next = priceTable[i + 1];
    if (km >= curr.km && km <= next.km) {
      const ratio = (km - curr.km) / (next.km - curr.km);
      const priceCurr = curr[seg] || curr["vip"];
      const priceNext = next[seg] || next["vip"];
      return Math.round(priceCurr + (priceNext - priceCurr) * ratio);
    }
  }
  return priceTable[0][seg] || priceTable[0]["vip"];
}

export default function calcTransferPrice(km, segment, people, hour) {
  km = Number(km || 0);
  people = Number(people || 1);
  const seg = getSegmentKey(segment);

  let price = interpolate(km, seg);

  if (people > 1) {
    price *= 1 + ((people - 1) * 0.05);
  }

  let hourNum = 12;
  if (typeof hour === "string" && hour.length >= 2) {
    hourNum = Number(hour.split(":")[0]);
  }
  if ((hourNum >= 22 || hourNum < 7)) {
    price *= 1.10;
  }
  return Math.round(price);
}
