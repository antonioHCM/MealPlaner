// server/src/db.ts
import mongoose from 'mongoose';
import { getMongoUri, NODE_ENV } from './config';

function maskUri(uri?: string): string {
  if (!uri) return '';
  // hide user:pass
  return uri.replace(/\/\/(.*?):(.*?)@/, '//<user>:<hidden>@');
}

export async function connectDB(): Promise<void> {
  const uri = getMongoUri();
  if (!uri) {
    console.error('❌ No Mongo URI found. Set MONGO_URI (and/or MONGO_URI_TEST) in .env files.');
    process.exit(1);
  }

  if (NODE_ENV !== 'production') {
    console.log(`NODE_ENV=${NODE_ENV}`);
    console.log('Using Mongo URI (masked):', maskUri(uri));
  }

  // You can pass mongoose options here if required.
  await mongoose.connect(uri);
  console.log('✅ MongoDB connected');
}

export async function disconnectDB(): Promise<void> {
  await mongoose.disconnect();
  console.log('✅ MongoDB disconnected');
}
