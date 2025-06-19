import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "yolcutransferi"; // 📌 Default DB adı

const options = {};

let client;
let clientPromise;

if (!uri) {
  throw new Error("❌ MongoDB URI tanımlı değil. .env dosyasını kontrol et.");
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function connectToDatabase() {
  const client = await clientPromise;
  const db = client.db(dbName); // ✅ DB adı burada açık
  return db;
}
