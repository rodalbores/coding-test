"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorStore = void 0;
const MAX_READINGS = 40;
class SensorStore {
    sensors = new Map();
    startTime = Date.now();
    totalMessages = 0;
    addReading(sensorId, tempC) {
        this.totalMessages++;
        let state = this.sensors.get(sensorId);
        if (!state) {
            state = { readings: [], totalTemp: 0, readingCount: 0 };
            this.sensors.set(sensorId, state);
        }
        state.totalTemp += tempC;
        state.readingCount++;
        state.readings.push({ ts: new Date().toISOString(), tempC });
        // Keep only the last MAX_READINGS
        if (state.readings.length > MAX_READINGS) {
            state.readings = state.readings.slice(-MAX_READINGS);
        }
    }
    getMetrics() {
        const elapsedMinutes = (Date.now() - this.startTime) / 60_000;
        const messagesPerMinute = elapsedMinutes > 0
            ? Math.round(this.totalMessages / elapsedMinutes)
            : 0;
        return {
            activeSensors: this.sensors.size,
            messagesPerMinute,
        };
    }
    listSensors() {
        const result = [];
        for (const [sensorId, state] of this.sensors) {
            result.push({
                id: `sensor-${String(sensorId).padStart(3, '0')}`,
                name: `Sensor #${sensorId}`,
                avgTempC: Number((state.totalTemp / state.readingCount).toFixed(1)),
                readingCount: state.readingCount,
            });
        }
        return result.sort((a, b) => a.id.localeCompare(b.id));
    }
    getLiveReadings(sensorId) {
        // sensorId comes as "sensor-001" → extract numeric id
        const match = sensorId.match(/sensor-(\d+)/);
        if (!match)
            return null;
        const numericId = parseInt(match[1], 10);
        const state = this.sensors.get(numericId);
        if (!state)
            return null;
        return state.readings;
    }
}
exports.SensorStore = SensorStore;
//# sourceMappingURL=sensor-store.js.map