"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startSimulator = startSimulator;
exports.stopSimulator = stopSimulator;
const SENSOR_COUNT = 42;
const INTERVAL_MS = 500;
const BASE_TEMPS = {
    0: 20.4, 1: 22.3, 2: 21.2, 3: 25.6, 4: 25.8,
    5: 24.9, 6: 23.4, 7: 27.2, 8: 19.6, 9: 21.7,
};
// Track the last temperature per sensor so readings drift smoothly
const lastTemp = new Map();
let timer = null;
function getBaseTemp(sensorId) {
    return BASE_TEMPS[sensorId % 10] ?? 22;
}
function nextTemp(sensorId) {
    const base = getBaseTemp(sensorId);
    const prev = lastTemp.get(sensorId) ?? base;
    // Small drift from previous value, gently pulled back toward base
    const drift = (Math.random() - 0.5) * 0.8;
    const anchor = (base - prev) * 0.05; // mean-reversion
    const temp = Number((prev + drift + anchor).toFixed(1));
    lastTemp.set(sensorId, temp);
    return temp;
}
function startSimulator(store) {
    console.log('[simulator] Starting mock sensor data generation…');
    // Seed each sensor with smooth initial history
    for (let id = 0; id < SENSOR_COUNT; id++) {
        for (let i = 0; i < 20; i++) {
            store.addReading(id, nextTemp(id));
        }
    }
    // Continuously generate new readings – one per sensor per tick
    timer = setInterval(() => {
        for (let id = 0; id < SENSOR_COUNT; id++) {
            store.addReading(id, nextTemp(id));
        }
    }, INTERVAL_MS);
}
function stopSimulator() {
    if (timer) {
        clearInterval(timer);
        timer = null;
        console.log('[simulator] Stopped.');
    }
}
//# sourceMappingURL=simulator.js.map