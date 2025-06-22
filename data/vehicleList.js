export const vehicles = [
  // EKONOMİK SEGMENT
  {
    value: "ford_tourneo_courier",
    label: "Ford Tourneo Courier",
    max: 3, // sedan hatchback küçük araçlarda 3 yetişkin arka, 1 öne gerekirse
    segment: "Ekonomik",
    transferTypes: [
      "VIP Havalimanı Transferi", "Şehirler Arası Transfer", "Özel Etkinlik", "Kurumsal Etkinlik",
      "Tur & Gezi", "Toplu Transfer", "Düğün vb Organizasyonlar"
    ]
  },
  {
    value: "vw_caddy",
    label: "VW Caddy",
    max: 3,
    segment: "Ekonomik",
    transferTypes: [
      "VIP Havalimanı Transferi", "Şehirler Arası Transfer", "Özel Etkinlik", "Kurumsal Etkinlik",
      "Tur & Gezi", "Toplu Transfer", "Düğün vb Organizasyonlar"
    ]
  },
  {
    value: "skoda_superb",
    label: "Skoda Superb",
    max: 3, // sedan, lüks değilse 3 yetişkin rahat
    segment: "Ekonomik",
    transferTypes: [
      "VIP Havalimanı Transferi", "Şehirler Arası Transfer", "Özel Etkinlik", "Kurumsal Etkinlik",
      "Tur & Gezi", "Toplu Transfer", "Düğün vb Organizasyonlar"
    ]
  },
  {
    value: "vw_transporter",
    label: "VW Transporter",
    max: 6, // van tipi araçlar 6 yetişkin (lüks değil)
    segment: "Ekonomik",
    transferTypes: [
      "VIP Havalimanı Transferi", "Şehirler Arası Transfer", "Özel Etkinlik", "Kurumsal Etkinlik",
      "Tur & Gezi", "Toplu Transfer", "Düğün vb Organizasyonlar"
    ]
  },
  {
    value: "ford_tourneo_custom",
    label: "Ford Tourneo Custom",
    max: 6,
    segment: "Ekonomik",
    transferTypes: [
      "VIP Havalimanı Transferi", "Şehirler Arası Transfer", "Özel Etkinlik", "Kurumsal Etkinlik",
      "Tur & Gezi", "Toplu Transfer", "Düğün vb Organizasyonlar"
    ]
  },
  {
    value: "renault_trafic",
    label: "Renault Trafic",
    max: 6,
    segment: "Ekonomik",
    transferTypes: [
      "VIP Havalimanı Transferi", "Şehirler Arası Transfer", "Özel Etkinlik", "Kurumsal Etkinlik",
      "Tur & Gezi", "Toplu Transfer", "Düğün vb Organizasyonlar"
    ]
  },
  {
    value: "ford_transit_minibus",
    label: "Ford Transit Minibus",
    max: 15,
    segment: "Ekonomik",
    transferTypes: [
      "VIP Havalimanı Transferi", "Şehirler Arası Transfer", "Özel Etkinlik", "Kurumsal Etkinlik",
      "Tur & Gezi", "Toplu Transfer", "Düğün vb Organizasyonlar"
    ]
  },
  {
    value: "iveco_daily_minibus",
    label: "Iveco Daily Minibus",
    max: 16,
    segment: "Ekonomik",
    transferTypes: [
      "VIP Havalimanı Transferi", "Şehirler Arası Transfer", "Özel Etkinlik", "Kurumsal Etkinlik",
      "Tur & Gezi", "Toplu Transfer", "Düğün vb Organizasyonlar"
    ]
  },
  {
    value: "temsa_prestij_vip",
    label: "Temsa Prestij VIP",
    max: 24,
    segment: "Ekonomik",
    transferTypes: [
      "VIP Havalimanı Transferi", "Şehirler Arası Transfer", "Özel Etkinlik", "Kurumsal Etkinlik",
      "Tur & Gezi", "Toplu Transfer", "Düğün vb Organizasyonlar"
    ]
  },
  {
    value: "isuzu_novo_ultra_vip",
    label: "Isuzu Novo Ultra VIP",
    max: 24,
    segment: "Ekonomik",
    transferTypes: [
      "VIP Havalimanı Transferi", "Şehirler Arası Transfer", "Özel Etkinlik", "Kurumsal Etkinlik",
      "Tur & Gezi", "Toplu Transfer", "Düğün vb Organizasyonlar"
    ]
  },

  // LÜKS SEGMENT (konfor için kapasite 1 eksik)
  {
    value: "mercedes_eclass",
    label: "Mercedes E-Class",
    max: 3, // lüks sedan, öne 1 arkaya 2
    segment: "Lüks",
    transferTypes: [
      "VIP Havalimanı Transferi", "Şehirler Arası Transfer", "Özel Etkinlik", "Kurumsal Etkinlik",
      "Tur & Gezi", "Toplu Transfer", "Düğün vb Organizasyonlar"
    ]
  },
  {
    value: "mercedes_vito",
    label: "Mercedes Vito",
    max: 5, // lüks van, rahat oturum için 1 azalt
    segment: "Lüks",
    transferTypes: [
      "VIP Havalimanı Transferi", "Şehirler Arası Transfer", "Özel Etkinlik", "Kurumsal Etkinlik",
      "Tur & Gezi", "Toplu Transfer", "Düğün vb Organizasyonlar"
    ]
  },
  {
    value: "mercedes_vclass",
    label: "Mercedes V-Class",
    max: 5,
    segment: "Lüks",
    transferTypes: [
      "VIP Havalimanı Transferi", "Şehirler Arası Transfer", "Özel Etkinlik", "Kurumsal Etkinlik",
      "Tur & Gezi", "Toplu Transfer", "Düğün vb Organizasyonlar"
    ]
  },
  {
    value: "mercedes_sprinter",
    label: "Mercedes Sprinter",
    max: 12,
    segment: "Lüks",
    transferTypes: [
      "VIP Havalimanı Transferi", "Şehirler Arası Transfer", "Özel Etkinlik", "Kurumsal Etkinlik",
      "Tur & Gezi", "Toplu Transfer", "Düğün vb Organizasyonlar"
    ]
  },
  {
    value: "vw_crafter",
    label: "VW Crafter",
    max: 12,
    segment: "Lüks",
    transferTypes: [
      "VIP Havalimanı Transferi", "Şehirler Arası Transfer", "Özel Etkinlik", "Kurumsal Etkinlik",
      "Tur & Gezi", "Toplu Transfer", "Düğün vb Organizasyonlar"
    ]
  },

  // PRIME+ SEGMENT (premium, ultra rahat)
  {
    value: "mercedes_sclass",
    label: "Mercedes S-Class",
    max: 2, // ultra lüks sedan, arka tam lounge, 2 yetişkin rahat
    segment: "Prime+",
    transferTypes: [
      "VIP Havalimanı Transferi", "Şehirler Arası Transfer", "Özel Etkinlik", "Kurumsal Etkinlik",
      "Tur & Gezi", "Toplu Transfer", "Düğün vb Organizasyonlar"
    ]
  },
  {
    value: "bmw_7_serisi",
    label: "BMW 7 Serisi",
    max: 2,
    segment: "Prime+",
    transferTypes: [
      "VIP Havalimanı Transferi", "Şehirler Arası Transfer", "Özel Etkinlik", "Kurumsal Etkinlik",
      "Tur & Gezi", "Toplu Transfer", "Düğün vb Organizasyonlar"
    ]
  },
  {
    value: "tesla_suv",
    label: "Tesla SUV",
    max: 3,
    segment: "Prime+",
    transferTypes: [
      "VIP Havalimanı Transferi", "Şehirler Arası Transfer", "Özel Etkinlik", "Kurumsal Etkinlik",
      "Tur & Gezi", "Toplu Transfer", "Düğün vb Organizasyonlar"
    ]
  },
  {
    value: "dron_taksi",
    label: "Dron Taksi (konsept)",
    max: 2,
    segment: "Prime+",
    transferTypes: [
      "VIP Havalimanı Transferi", "Şehirler Arası Transfer", "Özel Etkinlik", "Kurumsal Etkinlik",
      "Tur & Gezi", "Toplu Transfer", "Düğün vb Organizasyonlar"
    ]
  },
  {
    value: "mercedes_vito_vip",
    label: "Mercedes Vito VIP",
    max: 4, // ultra lounge
    segment: "Prime+",
    transferTypes: [
      "VIP Havalimanı Transferi", "Şehirler Arası Transfer", "Özel Etkinlik", "Kurumsal Etkinlik",
      "Tur & Gezi", "Toplu Transfer", "Düğün vb Organizasyonlar"
    ]
  },
  {
    value: "mercedes_vclass_exclusive",
    label: "Mercedes V-Class Exclusive",
    max: 4,
    segment: "Prime+",
    transferTypes: [
      "VIP Havalimanı Transferi", "Şehirler Arası Transfer", "Özel Etkinlik", "Kurumsal Etkinlik",
      "Tur & Gezi", "Toplu Transfer", "Düğün vb Organizasyonlar"
    ]
  },
  {
    value: "cadillac_escalade",
    label: "Cadillac Escalade",
    max: 5, // SUV, ultra rahat
    segment: "Prime+",
    transferTypes: [
      "VIP Havalimanı Transferi", "Şehirler Arası Transfer", "Özel Etkinlik", "Kurumsal Etkinlik",
      "Tur & Gezi", "Toplu Transfer", "Düğün vb Organizasyonlar"
    ]
  },
  {
    value: "mercedes_maybach",
    label: "Mercedes Maybach",
    max: 2, // ultra lüks sedan lounge
    segment: "Prime+",
    transferTypes: [
      "VIP Havalimanı Transferi", "Şehirler Arası Transfer", "Özel Etkinlik", "Kurumsal Etkinlik",
      "Tur & Gezi", "Toplu Transfer", "Düğün vb Organizasyonlar"
    ]
  },
  {
    value: "vw_crafter_vip",
    label: "VW Crafter VIP",
    max: 6,
    segment: "Prime+",
    transferTypes: [
      "VIP Havalimanı Transferi", "Şehirler Arası Transfer", "Özel Etkinlik", "Kurumsal Etkinlik",
      "Tur & Gezi", "Toplu Transfer", "Düğün vb Organizasyonlar"
    ]
  },
  {
    value: "chrysler_300c_limo",
    label: "Chrysler 300C Limo",
    max: 6,
    segment: "Prime+",
    transferTypes: [
      "VIP Havalimanı Transferi", "Şehirler Arası Transfer", "Özel Etkinlik", "Kurumsal Etkinlik",
      "Tur & Gezi", "Toplu Transfer", "Düğün vb Organizasyonlar"
    ]
  },
  {
    value: "hummer_limousine",
    label: "Hummer Limousine",
    max: 6,
    segment: "Prime+",
    transferTypes: [
      "VIP Havalimanı Transferi", "Şehirler Arası Transfer", "Özel Etkinlik", "Kurumsal Etkinlik",
      "Tur & Gezi", "Toplu Transfer", "Düğün vb Organizasyonlar"
    ]
  },
  {
    value: "mercedes_sprinter_vip",
    label: "Mercedes Sprinter VIP",
    max: 10, // büyük minibüs lounge
    segment: "Prime+",
    transferTypes: [
      "VIP Havalimanı Transferi", "Şehirler Arası Transfer", "Özel Etkinlik", "Kurumsal Etkinlik",
      "Tur & Gezi", "Toplu Transfer", "Düğün vb Organizasyonlar"
    ]
  },
  {
    value: "mercedes_sprinter_ultra_vip",
    label: "Mercedes Sprinter Ultra VIP",
    max: 10,
    segment: "Prime+",
    transferTypes: [
      "VIP Havalimanı Transferi", "Şehirler Arası Transfer", "Özel Etkinlik", "Kurumsal Etkinlik",
      "Tur & Gezi", "Toplu Transfer", "Düğün vb Organizasyonlar"
    ]
  }
];
