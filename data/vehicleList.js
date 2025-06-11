// /data/vehicles.js

export const vehicles = [
  {
    value: "vw_transporter",
    label: "VW Transporter",
    max: 6,
    segment: "Ekonomik",
    transferTypes: ["Havalimanı", "Şehirlerarası", "Kurumsal"],
    extras: ["su", "kola", "sandvic", "kuruyemis", "cocuk_koltugu", "telefon_sarj_kiti"]
  },
  {
    value: "skoda_superb",
    label: "Skoda Superb",
    max: 4,
    segment: "Ekonomik",
    transferTypes: ["Havalimanı", "Kurumsal"],
    extras: ["su", "kola", "sandvic", "kuruyemis", "cocuk_koltugu", "telefon_sarj_kiti"]
  },
  {
    value: "ford_tourneo_custom",
    label: "Ford Tourneo Custom",
    max: 6,
    segment: "Ekonomik",
    transferTypes: ["Havalimanı", "Şehirlerarası", "Kurumsal"],
    extras: ["su", "kola", "sandvic", "kuruyemis", "cocuk_koltugu", "telefon_sarj_kiti"]
  },
  {
    value: "renault_trafic",
    label: "Renault Trafic",
    max: 6,
    segment: "Ekonomik",
    transferTypes: ["Havalimanı", "Şehirlerarası", "Kurumsal"],
    extras: ["su", "kola", "sandvic", "kuruyemis", "cocuk_koltugu", "telefon_sarj_kiti"]
  },
  {
    value: "ford_tourneo_courier",
    label: "Ford Tourneo Courier",
    max: 3,
    segment: "Ekonomik",
    transferTypes: ["Özel Etkinlik", "Kurumsal"],
    extras: ["su", "kola", "sandvic", "kuruyemis", "cocuk_koltugu", "telefon_sarj_kiti"]
  },
  {
    value: "vw_caddy",
    label: "VW Caddy",
    max: 3,
    segment: "Ekonomik",
    transferTypes: ["Özel Etkinlik", "Kurumsal"],
    extras: ["su", "kola", "sandvic", "kuruyemis", "cocuk_koltugu", "telefon_sarj_kiti"]
  },
  {
    value: "mercedes_vito",
    label: "Mercedes Vito",
    max: 6,
    segment: "Lüks",
    transferTypes: ["Havalimanı", "Şehirlerarası", "Kurumsal"],
    extras: ["su", "kola", "sandvic", "kuruyemis", "cocuk_koltugu", "wifi", "tablet", "telefon_sarj_kiti", "mini_bar", "gazete"]
  },
  {
    value: "mercedes_vito_vip",
    label: "Mercedes Vito VIP",
    max: 5,
    segment: "Prime+",
    transferTypes: ["Havalimanı", "Şehirlerarası", "Kurumsal", "Prime+"],
    extras: ["su", "kola", "sandvic", "kuruyemis", "cocuk_koltugu", "wifi", "tablet", "mini_bar", "bira_3lu", "sampanya", "viski", "hostes", "ozel_karsilama", "cicek", "gazete", "telefon_sarj_kiti"]
  },
  {
    value: "mercedes_vclass",
    label: "Mercedes V-Class",
    max: 6,
    segment: "Lüks",
    transferTypes: ["Havalimanı", "Kurumsal", "Tur & Gezi"],
    extras: ["su", "kola", "sandvic", "kuruyemis", "cocuk_koltugu", "wifi", "tablet", "telefon_sarj_kiti", "mini_bar", "gazete"]
  },
  {
    value: "mercedes_vclass_exclusive",
    label: "Mercedes V-Class Exclusive",
    max: 6,
    segment: "Prime+",
    transferTypes: ["Havalimanı", "Kurumsal", "Prime+"],
    extras: ["su", "kola", "sandvic", "kuruyemis", "cocuk_koltugu", "wifi", "tablet", "mini_bar", "bira_3lu", "sampanya", "viski", "hostes", "ozel_karsilama", "cicek", "gazete", "telefon_sarj_kiti"]
  },
  {
    value: "mercedes_eclass",
    label: "Mercedes E-Class",
    max: 4,
    segment: "Lüks",
    transferTypes: ["Havalimanı", "Kurumsal", "Özel Etkinlik"],
    extras: ["su", "kola", "sandvic", "kuruyemis", "cocuk_koltugu", "gazete", "telefon_sarj_kiti"]
  },
  {
    value: "mercedes_sclass",
    label: "Mercedes S-Class",
    max: 4,
    segment: "Prime+",
    transferTypes: ["Havalimanı", "Kurumsal", "Özel Etkinlik", "Prime+"],
    extras: ["su", "kola", "sandvic", "kuruyemis", "gazete", "telefon_sarj_kiti", "mini_bar", "sampanya", "viski", "cicek", "ozel_karsilama"]
  },
  {
    value: "bmw_7_serisi",
    label: "BMW 7 Serisi",
    max: 4,
    segment: "Prime+",
    transferTypes: ["Havalimanı", "Kurumsal", "Özel Etkinlik", "Prime+"],
    extras: ["su", "kola", "sandvic", "kuruyemis", "gazete", "telefon_sarj_kiti", "mini_bar", "sampanya", "viski", "cicek", "ozel_karsilama"]
  },
  {
    value: "tesla_model_x",
    label: "Tesla Model X",
    max: 4,
    segment: "Prime+",
    transferTypes: ["Havalimanı", "Kurumsal", "Drone Yolcu Transferi"],
    extras: ["su", "kola", "sandvic", "kuruyemis", "wifi", "telefon_sarj_kiti"]
  },
  {
    value: "cadillac_escalade",
    label: "Cadillac Escalade",
    max: 6,
    segment: "Prime+",
    transferTypes: ["Havalimanı", "Kurumsal", "Prime+"],
    extras: ["su", "kola", "sandvic", "kuruyemis", "wifi", "mini_bar", "bira_3lu", "sampanya", "viski", "cocuk_koltugu", "gazete", "telefon_sarj_kiti"]
  },
  {
    value: "mercedes_sprinter",
    label: "Mercedes Sprinter",
    max: 13,
    segment: "Lüks",
    transferTypes: ["Şehirlerarası", "Tur & Gezi", "Kurumsal"],
    extras: ["su", "kola", "sandvic", "kuruyemis", "cocuk_koltugu", "wifi", "tablet", "telefon_sarj_kiti", "gazete", "ozel_karsilama", "welcoming"]
  },
  {
    value: "mercedes_sprinter_vip",
    label: "Mercedes Sprinter VIP",
    max: 11,
    segment: "Prime+",
    transferTypes: ["Şehirlerarası", "Tur & Gezi", "Kurumsal", "Prime+"],
    extras: ["su", "kola", "sandvic", "kuruyemis", "cocuk_koltugu", "wifi", "tablet", "mini_bar", "hostes", "ogle_yemegi", "gazete", "ozel_karsilama", "welcoming", "cicek"]
  },
  {
    value: "mercedes_sprinter_ultra_vip",
    label: "Mercedes Sprinter Ultra VIP",
    max: 11,
    segment: "Prime+",
    transferTypes: ["Tur & Gezi", "Kurumsal", "Prime+"],
    extras: ["su", "kola", "sandvic", "kuruyemis", "cocuk_koltugu", "wifi", "tablet", "mini_bar", "hostes", "ogle_yemegi", "gazete", "ozel_karsilama", "welcoming", "cicek"]
  },
  {
    value: "vw_crafter",
    label: "VW Crafter",
    max: 13,
    segment: "Lüks",
    transferTypes: ["Şehirlerarası", "Tur & Gezi"],
    extras: ["su", "kola", "sandvic", "kuruyemis", "cocuk_koltugu", "telefon_sarj_kiti", "wifi", "gazete", "ozel_karsilama", "welcoming"]
  },
  {
    value: "vw_crafter_vip",
    label: "VW Crafter VIP",
    max: 13,
    segment: "Prime+",
    transferTypes: ["Tur & Gezi", "Kurumsal", "Prime+"],
    extras: ["su", "kola", "sandvic", "kuruyemis", "cocuk_koltugu", "wifi", "tablet", "mini_bar", "hostes", "ogle_yemegi", "gazete", "ozel_karsilama", "welcoming", "cicek"]
  },
  {
    value: "ford_transit_minibus",
    label: "Ford Transit Minibus",
    max: 15,
    segment: "Ekonomik",
    transferTypes: ["Tur & Gezi", "Şehirlerarası", "Kurumsal"],
    extras: ["su", "kola", "sandvic", "kuruyemis", "cocuk_koltugu", "telefon_sarj_kiti"]
  },
  {
    value: "iveco_daily_minibus",
    label: "Iveco Daily Minibus",
    max: 16,
    segment: "Ekonomik",
    transferTypes: ["Tur & Gezi", "Şehirlerarası", "Kurumsal"],
    extras: ["su", "kola", "sandvic", "kuruyemis", "cocuk_koltugu", "telefon_sarj_kiti"]
  },
  {
    value: "temsa_prestij_vip",
    label: "Temsa Prestij VIP",
    max: 27,
    segment: "Prime+",
    transferTypes: ["Tur & Gezi", "Kurumsal", "Toplu Transfer", "Prime+"],
    extras: ["su", "kola", "sandvic", "kuruyemis", "cocuk_koltugu", "wifi", "hostes", "ogle_yemegi", "gazete", "ozel_karsilama", "welcoming", "cicek"]
  },
  {
    value: "isuzu_novo_ultra_vip",
    label: "Isuzu Novo Ultra VIP",
    max: 27,
    segment: "Prime+",
    transferTypes: ["Tur & Gezi", "Kurumsal", "Toplu Transfer", "Prime+"],
    extras: ["su", "kola", "sandvic", "kuruyemis", "cocuk_koltugu", "wifi", "hostes", "ogle_yemegi", "gazete", "ozel_karsilama", "welcoming", "cicek"]
  },
  {
    value: "chrysler_300c_limo",
    label: "Chrysler 300C Limo",
    max: 7,
    segment: "Prime+",
    transferTypes: ["Özel Etkinlik", "Düğün", "Prime+"],
    extras: ["su", "kola", "bira_3lu", "sampanya", "viski", "sandvic", "kuruyemis", "hostes", "ozel_karsilama", "cicek", "gazete", "mini_bar"]
  },
  {
    value: "hummer_limousine",
    label: "Hummer Limousine",
    max: 15,
    segment: "Prime+",
    transferTypes: ["Özel Etkinlik", "Düğün", "Prime+"],
    extras: ["su", "kola", "bira_3lu", "sampanya", "viski", "sandvic", "kuruyemis", "hostes", "ozel_karsilama", "cicek", "gazete", "mini_bar"]
  },
  {
    value: "helikopter",
    label: "Helikopter",
    max: 5,
    segment: "Prime+",
    transferTypes: ["Drone Yolcu Transferi", "Özel Etkinlik"],
    extras: ["su", "kola", "sampanya", "kuruyemis", "rehber", "drone_kamerasi"]
  },
  {
    value: "lilium_jet_konsept",
    label: "Lilium Jet (konsept)",
    max: 4,
    segment: "Prime+",
    transferTypes: ["Drone Yolcu Transferi", "Prime+"],
    extras: ["su", "kola", "sampanya", "kuruyemis", "rehber", "drone_kamerasi"]
  }
];
