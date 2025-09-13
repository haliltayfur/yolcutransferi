// /lib/mongodb.js
// Node.js (Next.js App Router) için tek noktadan Mongo bağlantı yöneticisi.
// - Tek bağlantı havuzu kullanır (global cache) → gereksiz bağlantıları önler
// - DB adını .env'den (MONGODB_DB) alır; yoksa "yolcutransferi" kullanır
// - API route'larda doğrudan `const db = await connectToDatabase()` şeklinde kullanın.

import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "yolcutransferi";

if (!uri) {
  throw new Error("MONGODB_URI tanımlı değil. .env dosyanızı kontrol edin.");
}

// Havuz ve seçim süreleri: pratik, güvenli varsayılanlar
const options = {
  // Bu değerleri isterseniz .env ile yönetebilirsiniz:
  // MONGODB_MAX_POOL=10 gibi
  maxPoolSize: Number(process.env.MONGODB_MAX_POOL || 10),
  minPoolSize: 0,
  serverSelectionTimeoutMS: Number(process.env.MONGODB_SSM || 5000),
  socketTimeoutMS: Number(process.env.MONGODB_STM || 45000),
  retryWrites: true,
};

const globalForMongo = globalThis;

// Aynı instance içinde tekrar tekrar bağlanmayı engelle (dev/prod fark etmeksizin)
if (!globalForMongo._mongo) {
  const client = new MongoClient(uri, options);

  const clientPromise = client.connect().then(async (conn) => {
    // Opsiyonel "ping" — bağlantı sorunlarını loglamak için
    try {
      await conn.db(dbName).command({ ping: 1 });
      if (process.env.NODE_ENV !== "production") {
        // console.log("[mongo] Bağlantı sağlandı ve ping başarılı.");
      }
    } catch (e) {
      console.error("[mongo] Ping başarısız:", e);
    }
    return conn;
  });

  const dbPromise = clientPromise.then((c) => c.db(dbName));

  globalForMongo._mongo = { clientPromise, dbPromise };
}

const { clientPromise, dbPromise } = globalForMongo._mongo;

/**
 * Veritabanı nesnesini döner.
 * @returns {Promise<import("mongodb").Db>}
 */
export async function connectToDatabase() {
  return dbPromise;
}

/**
 * İhtiyaç halinde ham MongoClient'a erişim.
 * @returns {Promise<import("mongodb").MongoClient>}
 */
export async function getMongoClient() {
  return clientPromise;
}
