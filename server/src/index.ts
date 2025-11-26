// server/src/index.ts
import 'dotenv/config'; // already loaded by config.ts but safe to keep
import app from './app';
import { connectDB } from './db';
import { PORT } from './config';

async function start() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

start();
