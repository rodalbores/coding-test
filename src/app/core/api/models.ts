export interface Sensor {
  id: string;
  name: string;
  avgTempC: number;
  readingCount: number;
};

export interface DashboardMetrics {
  activeSensors: number;
  messagesPerMinute: number;
};

export interface ReadingPoint {
  ts: string; // ISO string
  tempC: number;
};
