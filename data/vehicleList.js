// PATH: /data/vehicleList.js

export const vehicles = [
  // === EKONOMİK SEGMENT ===
  {
    value: "ford_tourneo_courier",
    label: "Ford Tourneo Courier",
    max: 3,
    luggage: 2,
    segment: "Ekonomik",
    description: "Ekonomik minivan, şehir içi ve kısa mesafe için ideal.",
    image: "/vehicles/ford_tourneo_courier.jpg"
  },
  {
    value: "vw_caddy",
    label: "VW Caddy",
    max: 3,
    luggage: 2,
    segment: "Ekonomik",
    description: "Pratik ve ekonomik hafif ticari.",
    image: "/vehicles/vw_caddy.jpg"
  },
  {
    value: "skoda_superb",
    label: "Skoda Superb",
    max: 3,
    luggage: 2,
    segment: "Ekonomik",
    description: "Modern sedan, konforlu ve ekonomik.",
    image: "/vehicles/skoda_superb.jpg"
  },
  {
    value: "vw_transporter",
    label: "VW Transporter",
    max: 6,
    luggage: 4,
    segment: "Ekonomik",
    description: "Grup transferleri için pratik minivan.",
    image: "/vehicles/vw_transporter.jpg"
  },
  {
    value: "ford_tourneo_custom",
    label: "Ford Tourneo Custom",
    max: 6,
    luggage: 3,
    segment: "Ekonomik",
    description: "Geniş aileler ve grup transferleri için.",
    image: "/vehicles/ford_tourneo_custom.jpg"
  },
  {
    value: "renault_trafic",
    label: "Renault Trafic",
    max: 7,
    luggage: 4,
    segment: "Ekonomik",
    description: "Çoklu yolcu taşımaya uygun minivan.",
    image: "/vehicles/renault_trafic.jpg"
  },
  {
    value: "ford_transit_minibus",
    label: "Ford Transit Minibus",
    max: 12,
    luggage: 6,
    segment: "Ekonomik",
    description: "Kalabalık gruplar için minibüs.",
    image: "/vehicles/ford_transit_minibus.jpg"
  },
  {
    value: "iveco_daily_minibus",
    label: "Iveco Daily Minibus",
    max: 15,
    luggage: 9,
    segment: "Ekonomik",
    description: "Uzun mesafe büyük grup transferleri için.",
    image: "/vehicles/iveco_daily_minibus.jpg"
  },
  {
    value: "temsa_prestij_vip",
    label: "Temsa Prestij VIP",
    max: 25,
    luggage: 15,
    segment: "Ekonomik",
    description: "VIP midibüs, kurumsal organizasyonlar için.",
    image: "/vehicles/temsa_prestij_vip.jpg"
  },
  {
    value: "isuzu_novo_ultra_vip",
    label: "Isuzu Novo Ultra VIP",
    max: 25,
    luggage: 15,
    segment: "Ekonomik",
    description: "Ultra VIP midibüs.",
    image: "/vehicles/isuzu_novo_ultra_vip.jpg"
  },

  // === LÜKS SEGMENT ===
  {
    value: "mercedes_eclass",
    label: "Mercedes E-Class",
    max: 3,
    luggage: 3,
    segment: "Lüks",
    description: "Lüks sedan, konfor ve prestij.",
    image: "/vehicles/mercedes_eclass.jpg"
  },
  {
    value: "mercedes_vito",
    label: "Mercedes Vito",
    max: 5,
    luggage: 4,
    segment: "Lüks",
    description: "Konforlu VIP minivan, iş ve özel yolculuklar için.",
    image: "/vehicles/mercedes_vito.jpg"
  },
  {
    value: "mercedes_vclass",
    label: "Mercedes V-Class",
    max: 5,
    luggage: 4,
    segment: "Lüks",
    description: "Lüks minivan, aile ve grup için şık seçim.",
    image: "/vehicles/mercedes_vclass.jpg"
  },
  {
    value: "mercedes_sprinter",
    label: "Mercedes Sprinter",
    max: 12,
    luggage: 5,
    segment: "Lüks",
    description: "Lüks minibüs, geniş grup transferi.",
    image: "/vehicles/mercedes_sprinter.jpg"
  },
  {
    value: "vw_crafter",
    label: "VW Crafter",
    max: 12,
    luggage: 5,
    segment: "Lüks",
    description: "Şık ve geniş minibüs.",
    image: "/vehicles/vw_crafter.jpg"
  },

  // === PRIME+ SEGMENT ===
  {
    value: "mercedes_sclass",
    label: "Mercedes S-Class",
    max: 2,
    luggage: 2,
    segment: "Prime+",
    description: "Ultra VIP sedan, üst düzey misafirler için.",
    image: "/vehicles/mercedes_sclass.jpg"
  },
  {
    value: "bmw_7_serisi",
    label: "BMW 7 Serisi",
    max: 2,
    luggage: 2,
    segment: "Prime+",
    description: "Premium lüks sedan.",
    image: "/vehicles/bmw_7_serisi.jpg"
  },
  {
    value: "tesla_suv",
    label: "Tesla SUV",
    max: 3,
    luggage: 2,
    segment: "Prime+",
    description: "Elektrikli ultra lüks SUV.",
    image: "/vehicles/tesla_suv.jpg"
  },
  {
    value: "dron_taksi",
    label: "Dron Taksi (konsept)",
    max: 2,
    luggage: 1,
    segment: "Prime+",
    description: "Geleceğin hava transfer konsepti.",
    image: "/vehicles/dron_taksi.jpg"
  },
  {
    value: "mercedes_vito_vip",
    label: "Mercedes Vito VIP",
    max: 4,
    luggage: 4,
    segment: "Prime+",
    description: "Ekstra donanımlı VIP minivan.",
    image: "/vehicles/mercedes_vito_vip.jpg"
  },
  {
    value: "mercedes_vclass_exclusive",
    label: "Mercedes V-Class Exclusive",
    max: 4,
    luggage: 4,
    segment: "Prime+",
    description: "Lüks minivan, Exclusive donanım.",
    image: "/vehicles/mercedes_vclass_exclusive.jpg"
  },
  {
    value: "cadillac_escalade",
    label: "Cadillac Escalade",
    max: 5,
    luggage: 3,
    segment: "Prime+",
    description: "Premium SUV, ABD tarzı konfor.",
    image: "/vehicles/cadillac_escalade.jpg"
  },
  {
    value: "mercedes_maybach",
    label: "Mercedes Maybach",
    max: 2,
    luggage: 3,
    segment: "Prime+",
    description: "Lüksün zirvesi, özel misafirler için.",
    image: "/vehicles/mercedes_maybach.jpg"
  },
  {
    value: "vw_crafter_vip",
    label: "VW Crafter VIP",
    max: 6,
    luggage: 5,
    segment: "Prime+",
    description: "VIP minibüs, lüks grup transferi.",
    image: "/vehicles/vw_crafter_vip.jpg"
  },
  {
    value: "chrysler_300c_limo",
    label: "Chrysler 300C Limo",
    max: 6,
    luggage: 2,
    segment: "Prime+",
    description: "Prestij Limuzin sedan.",
    image: "/vehicles/chrysler_300c_limo.jpg"
  },
  {
    value: "hummer_limousine",
    label: "Hummer Limousine",
    max: 6,
    luggage: 3,
    segment: "Prime+",
    description: "Amerikan lüksü, büyük limuzin.",
    image: "/vehicles/hummer_limousine.jpg"
  },
  {
    value: "mercedes_sprinter_vip",
    label: "Mercedes Sprinter VIP",
    max: 10,
    luggage: 6,
    segment: "Prime+",
    description: "VIP minibüs, üst düzey grup transferi.",
    image: "/vehicles/mercedes_sprinter_vip.jpg"
  },
  {
    value: "mercedes_sprinter_ultra_vip",
    label: "Mercedes Sprinter Ultra VIP",
    max: 10,
    luggage: 5,
    segment: "Prime+",
    description: "Ultra VIP minibüs, özel yolculuklar için.",
    image: "/vehicles/mercedes_sprinter_ultra_vip.jpg"
  }
];
