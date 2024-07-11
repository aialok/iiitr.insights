import dotenv from "dotenv";
dotenv.config();

const MONGODB_ATLAS_URI = process.env.MONGODB_ATLAS_URI;
const NODE_ENV = process.env.NODE_ENV;
const GOOGLE_AI_API_KEY = process.env.GOOGLE_AI_API_KEY;

export { MONGODB_ATLAS_URI, NODE_ENV, GOOGLE_AI_API_KEY };
