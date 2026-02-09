interface ReadingPoint {
    ts: string;
    tempC: number;
}
export declare class SensorStore {
    private sensors;
    private readonly startTime;
    private totalMessages;
    addReading(sensorId: number, tempC: number): void;
    getMetrics(): {
        activeSensors: number;
        messagesPerMinute: number;
    };
    listSensors(): {
        id: string;
        name: string;
        avgTempC: number;
        readingCount: number;
    }[];
    getLiveReadings(sensorId: string): ReadingPoint[] | null;
}
export {};
