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
    const { sensorId } = req.params;
    const readings = store.getLiveReadings(sensorId!);

    if (readings === null) {
      res.json([]);
      return;
    }

    res.json(readings);
  });

  return router;
}
