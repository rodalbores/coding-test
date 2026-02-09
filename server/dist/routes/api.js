"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApiRouter = createApiRouter;
const express_1 = require("express");
function createApiRouter(store) {
    const router = (0, express_1.Router)();
    router.get('/metrics', (_req, res) => {
        res.json(store.getMetrics());
    });
    router.get('/sensors', (_req, res) => {
        res.json(store.listSensors());
    });
    router.get('/sensors/:sensorId/readings/live', (req, res) => {
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
//# sourceMappingURL=api.js.map