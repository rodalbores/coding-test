import express from 'express';
import cors from 'cors';
import { SensorStore } from './sensor-store.js';
import { createApiRouter } from './routes/api.js';
import { startMeasureTemp, stopMeasureTemp } from './measure-temp.js';

const PORT = process.env['PORT'] ? parseInt(process.env['PORT'], 10) : 3000;

const app = express();
const store = new SensorStore();

app.use(cors());
app.use(express.json());
app.use('/api', createApiRouter(store));

const server = app.listen(PORT, () => {
  console.log(`[server] Listening on http://localhost:${PORT}`);
  startMeasureTemp(store);
});

function shutdown() {
  console.log('\n[server] Shutting down…');
  stopMeasureTemp();
  server.close(() => {
    console.log('[server] Closed.');
    process.exit(0);
  });
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
