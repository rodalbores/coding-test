import { Router, Request, Response } from 'express';
import { SensorStore } from '../sensor-store.js';

export function createApiRouter(store: SensorStore): Router {
  const router = Router();

  router.get('/metrics', (_req: Request, res: Response) => {
    res.json(store.getMetrics());
  });

  router.get('/sensors', (_req: Request, res: Response) => {
    res.json(store.listSensors());
  });

  router.get('/sensors/:sensorId/readings/live', (req: Request, res: Response) => {
    const sensorIdParam = req.params.sensorId;
    const sensorId = typeof sensorIdParam === 'string' ? sensorIdParam : sensorIdParam?.[0];
    if (!sensorId) {
      res.status(400).json({ error: 'Invalid sensor ID' });
      return;
    }
    const readings = store.getLiveReadings(sensorId);

    if (readings === null) {
      res.json([]);
      return;
    }

    res.json(readings);
  });

  return router;
}
