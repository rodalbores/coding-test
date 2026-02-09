import { SensorStore } from './sensor-store.js';

const SENSOR_COUNT = 42;
const INTERVAL_MS = 500;

const BASE_TEMPS: Record<number, number> = {
  0: 20.4, 1: 22.3, 2: 21.2, 3: 25.6, 4: 25.8,
  5: 24.9, 6: 23.4, 7: 27.2, 8: 19.6, 9: 21.7,
};

// Track the last temperature per sensor so readings drift smoothly
const lastTemp = new Map<number, number>();

let timer: ReturnType<typeof setInterval> | null = null;

function getBaseTemp(sensorId: number): number {
  return BASE_TEMPS[sensorId % 10] ?? 22;
}

function nextTemp(sensorId: number): number {
  const base = getBaseTemp(sensorId);
  const prev = lastTemp.get(sensorId) ?? base;

  // Small drift from previous value, gently pulled back toward base
  const drift = (Math.random() - 0.5) * 0.8;
  const anchor = (base - prev) * 0.05; // mean-reversion
  const temp = Number((prev + drift + anchor).toFixed(1));

  lastTemp.set(sensorId, temp);
  return temp;
}

export function startSimulator(store: SensorStore): void {
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

export function stopSimulator(): void {
  if (timer) {
    clearInterval(timer);
    timer = null;
    console.log('[simulator] Stopped.');
  }
}
