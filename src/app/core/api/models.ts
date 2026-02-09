export type Sensor = {
  id: string;
  name: string;
  avgTempC: number;
  readingCount: number;
};

export type DashboardMetrics = {
  activeSensors: number;
  messagesPerMinute: number;
};

export type ReadingPoint = {
  ts: string; // ISO string
  tempC: number;
};
