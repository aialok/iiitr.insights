import { MongoClient } from "mongodb";
var mongoClientPromise;

export async function connectToMongoDB() {
  try {
    const MONGODB_ATLAS_URI = process.env.MONGODB_ATLAS_URI;
    const options = {};

    let client;

    if (!MONGODB_ATLAS_URI) {
      throw new Error("Please add your Mongo URI to .env.local");
    }

    if (process.env.NODE_ENV === "development") {
      // In development mode, use a global variable so that the value
      // is preserved across module reloads caused by HMR (Hot Module Replacement).
      if (!global._mongoClientPromise) {
        client = new MongoClient(MONGODB_ATLAS_URI, options);
        global._mongoClientPromise = client.connect();
      }
      mongoClientPromise = global._mongoClientPromise;
      console.log("Connected to MongoDB");
    } else {
      // In production mode, it's best to not use a global variable.
      client = new MongoClient(MONGODB_ATLAS_URI, options);
      mongoClientPromise = client.connect();
      console.log("Connected to MongoDB");
    }

    return mongoClientPromise;
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
}
