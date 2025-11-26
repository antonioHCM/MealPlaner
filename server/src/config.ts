// server/src/config.ts
import dotenv from 'dotenv';
import path from 'path';

// Load .env files depending on NODE_ENV. This is simple and explicit.
const env = process.env.NODE_ENV || 'development';

// Load base .env first, then override with .env.<env> if present
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
dotenv.config({ path: path.resolve(process.cwd(), `.env.${env}`) });

export const NODE_ENV = env;
export const PORT = Number(process.env.PORT || 4000);

// Primary URI (used for development / production)
export const MONGO_URI = process.env.MONGO_URI || '';

// Optional: separate test URI
export const MONGO_URI_TEST = process.env.MONGO_URI_TEST || '';

// Helper to return the appropriate URI
export function getMongoUri(): string {
  if (NODE_ENV === 'test' && MONGO_URI_TEST) return MONGO_URI_TEST;
  return MONGO_URI;
}
