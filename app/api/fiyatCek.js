// /app/api/fiyatCek.js

import axios from "axios";
import cheerio from "cheerio";

const firmalar = [
  { name: "RotaTransfer", url: "https://rotatransfer.com.tr/rezervasyon", selector: ".price" },
  { name: "ATSTransfer", url: "https://atstransfer.com/rezervasyon", selector: ".price" },
  { name: "Progo", url: "https://progotransfer.com/rezervasyon", selector: ".price" },
  { name: "VipTransfer", url: "https://viptransfer.com.tr/rezervasyon", selector: ".price" },
  { name: "IstanbulTransferExpert", url: "https://istanbultransferexpert.com/rezervasyon", selector: ".price" },
  { name: "IstanbulAirportTaxis", url: "https://istanbulairporttaxis.com/rezervasyon", selector: ".price" },
  { name: "VipIstanbulTransfer", url: "https://vipistanbultransfer.net/rezervasyon", selector: ".price" },
  { name: "IstanbulVIPTransferNet", url: "https://istanbulviptransfer.net/rezervasyon", selector: ".price" },
  { name: "AirportTransferIstanbul", url: "https://airporttransferistanbul.com/rezervasyon", selector: ".price" },
  { name: "IstanbulShuttleService", url: "https://istanbulshuttleservice.com/rezervasyon", selector: ".price" },
  { name: "LuxTransfer", url: "https://luxtransfer.com.tr/rezervasyon", selector: ".price" },
  { name: "SawTransfer", url: "https://sawtransfer.com/rezervasyon", selector: ".price" },
  { name: "FlyTransfer", url: "https://flytransfer.com.tr/rezervasyon", selector: ".price" },
  { name: "Transferim", url: "https://transferim.com/rezervasyon", selector: ".price" },
  { name: "TransferGo", url: "https://transfergo.com.tr/rezervasyon", selector: ".price" },
  { name: "IstanbulAirportTransport", url: "https://istanbulairporttransport.com/rezervasyon", selector: ".price" },
  { name: "TransferLine", url: "https://transferline.com.tr/rezervasyon", selector: ".price" },
  { name: "IstanbulAirportShuttle", url: "https://istanbulairportshuttle.com/rezervasyon", selector: ".price" },
  { name: "ReliableTransfer", url: "https://reliabletransfer.com.tr/rezervasyon", selector: ".price" },
  { name: "CheapToursTurkey", url: "https://cheaptoursturkey.com/rezervasyon", selector: ".price" },
  { name: "IstanbulChauffeur", url: "https://istanbulchauffeur.com/rezervasyon", selector: ".price" },
  { name: "TurkeyAirportTransfer", url: "https://turkeyairporttransfer.com/rezervasyon", selector: ".price" },
  { name: "IstanbulAirportTransferX", url: "https://istanbulairporttransferx.com/rezervasyon", selector: ".price" },
  { name: "AirportTransfer365", url: "https://airporttransfer365.com/rezervasyon", selector: ".price" },
  { name: "IstanbulMiniVan", url: "https://istanbulminivan.com/rezervasyon", selector: ".price" },
  { name: "IstanbulAirportEasy", url: "https://istanbulairporteasy.com/rezervasyon", selector: ".price" },
  { name: "AirportTransferComTr", url: "https://airporttransfer.com.tr/rezervasyon", selector: ".price" },
  { name: "ProTransferTurkey", url: "https://protransferturkey.com/rezervasyon", selector: ".price" },
  { name: "Transferium", url: "https://transferium.com.tr/rezervasyon", selector: ".price" },
  { name: "TurkeyTransfer", url: "https://turkeytransfer.com/rezervasyon", selector: ".price" },
  { name: "IstanbulMiniBus", url: "https://istanbulminibus.com/rezervasyon", selector: ".price" },
  { name: "AirportIstanbulTransfer", url: "https://airportistanbultransfer.com/rezervasyon", selector: ".price" },
  { name: "IstanbulShuttlePort", url: "https://istanbulshuttleport.com/rezervasyon", selector: ".price" },
  { name: "AirportTaxiIstanbul", url: "https://airporttaxiistanbul.com/rezervasyon", selector: ".price" },
  { name: "TransferAirportIstanbul", url: "https://transferairportistanbul.com/rezervasyon", selector: ".price" },
  { name: "AirportTaxiTurkey", url: "https://airporttaxiturkey.com/rezervasyon", selector: ".price" },
  { name: "IstanbulTransferTaxi", url: "https://istanbultransfertaxi.com/rezervasyon", selector: ".price" },
  { name: "MyTransferTurkey", url: "https://mytransferturkey.com/rezervasyon", selector: ".price" },
  { name: "HavalimaniTransfer", url: "https://havalimanitransfer.com/rezervasyon", selector: ".price" },
  { name: "TurkeyShuttle", url: "https://turkeyshuttle.com/rezervasyon", selector: ".price" },
  { name: "HavatasIstanbul", url: "https://havatasistanbul.com/rezervasyon", selector: ".price" },
  { name: "IstanbulTransferService", url: "https://istanbultransferservice.com/rezervasyon", selector: ".price" },
  { name: "IstanbulAirportVip", url: "https://istanbulairportvip.com/rezervasyon", selector: ".price" },
  { name: "TurkeyVipTransfer", url: "https://turkeyviptransfer.com/rezervasyon", selector: ".price" },
  { name: "IstanbulChauffeurService", url: "https://istanbulchauffeurservice.com/rezervasyon", selector: ".price" },
  { name: "IstanbulShuttleBus", url: "https://istanbulshuttlebus.com/rezervasyon", selector: ".price" },
  { name: "IstanbulDoorTransfer", url: "https://istanbuldoortransfer.com/rezervasyon", selector: ".price" },
  { name: "IstanbulTransferLine", url: "https://istanbultransferline.com/rezervasyon", selector: ".price" },
  { name: "IstanbulShuttleTaxi", url: "https://istanbulshuttletaxi.com/rezervasyon", selector: ".price" },
  { name: "AirportTaxiVIP", url: "https://airporttaxivip.com.tr/rezervasyon", selector: ".price" }
];

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  const { from, to } = req.body;
  let fiyatlar = [];

  // Her firmadan scraping ile fiyat al!
  for (let firma of firmalar) {
    try {
      // NOT: Bu örnekte GET ile istek atılıyor, gerçek sitelerde bazen POST gerekir.
      const html = (await axios.get(firma.url)).data;
      const $ = cheerio.load(html);
      let fiyatStr = $(firma.selector).first().text().replace(/[^\d]/g, "");
      let fiyat = parseInt(fiyatStr, 10);
      if (fiyat && fiyat > 200 && fiyat < 20000) {
        fiyatlar.push({ firma: firma.name, fiyat });
      }
    } catch (err) {
      // Devam et, hata logla (sustur)
    }
  }

  if (fiyatlar.length > 0) {
    const fiyatDegerleri = fiyatlar.map(f => f.fiyat);
    const ortalamaFiyat = fiyatDegerleri.reduce((a, b) => a + b, 0) / fiyatDegerleri.length;
    const sonFiyat = Math.round(ortalamaFiyat * 1.3 * 1.2);
    res.status(200).json({ sonFiyat, fiyatlar });
  } else {
    res.status(200).json({ message: "Size özel fiyat çalışıyoruz." });
  }
}
