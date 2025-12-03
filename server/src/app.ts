// server/src/app.ts
import express from 'express';
import cors from 'cors';
import { connection } from 'mongoose';
import authRouter from "./routes/auth";



const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);

app.get('/api/health', (_req, res) => {
  const state = connection.readyState; // 0 disconnected, 1 connected
  const map: Record<number, string> = { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' };
  res.json({ status: 'ok', db: { state, stateText: map[state], host: connection.host || null } });
});

export default app;
