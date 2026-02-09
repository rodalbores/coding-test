import { DashboardMetrics, ReadingPoint, Sensor } from '../models';

export const MOCK_SENSORS: Sensor[] = [
  { id: 'sensor-000', name: 'Sensor #0', avgTempC: 20.4, readingCount: 703 },
  { id: 'sensor-001', name: 'Sensor #1', avgTempC: 22.3, readingCount: 463 },
  { id: 'sensor-002', name: 'Sensor #2', avgTempC: 21.2, readingCount: 423 },
  { id: 'sensor-003', name: 'Sensor #3', avgTempC: 25.6, readingCount: 981 },
  { id: 'sensor-004', name: 'Sensor #4', avgTempC: 25.8, readingCount: 123 },
  { id: 'sensor-005', name: 'Sensor #5', avgTempC: 24.9, readingCount: 570 },
  { id: 'sensor-006', name: 'Sensor #6', avgTempC: 23.4, readingCount: 714 },
  { id: 'sensor-007', name: 'Sensor #7', avgTempC: 27.2, readingCount: 308 },
  { id: 'sensor-008', name: 'Sensor #8', avgTempC: 19.6, readingCount: 812 },
  { id: 'sensor-009', name: 'Sensor #9', avgTempC: 21.7, readingCount: 654 },
];

export const MOCK_METRICS: DashboardMetrics = {
  activeSensors: 42,
  messagesPerMinute: 1284,
};

const baseTempBySensorId: Record<string, number> = Object.fromEntries(
  MOCK_SENSORS.map((s) => [s.id, s.avgTempC])
);

/**
 * Generates mock readings for a given sensor ID.
 * @param sensorId - The ID of the sensor to generate readings for.
 * @param count - The number of readings to generate.
 * @returns An array of mock readings.
 */

export function generateMockReadings(sensorId: string, count = 40): ReadingPoint[] {
  const base = baseTempBySensorId[sensorId] ?? 22.0;
  const now = Date.now();

  const readings: ReadingPoint[] = [];
  for (let i = 0; i < count; i++) {
    const t = i / 6;
    const wave = Math.sin(t) * 1.2 + Math.sin(t / 2) * 0.6;
    const noise = (Math.random() - 0.5) * 0.6;
    const tempC = base + wave + noise;

    readings.push({
      ts: new Date(now - (count - i) * 60_000).toISOString(),
      tempC: Number(tempC.toFixed(1)),
    });
  }

  return readings;
}

export function nextMockReading(sensorId: string, lastTempC?: number): ReadingPoint {
  const base = baseTempBySensorId[sensorId] ?? 22.0;
  const drift = (Math.random() - 0.5) * 0.8;
  const anchored = lastTempC ?? base;
  const tempC = anchored + drift;

  return {
    ts: new Date().toISOString(),
    tempC: Number(tempC.toFixed(1)),
  };
}
