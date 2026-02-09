"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const sensor_store_js_1 = require("./sensor-store.js");
const api_js_1 = require("./routes/api.js");
const measure_temp_js_1 = require("./measure-temp.js");
const PORT = process.env['PORT'] ? parseInt(process.env['PORT'], 10) : 3000;
const app = (0, express_1.default)();
const store = new sensor_store_js_1.SensorStore();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api', (0, api_js_1.createApiRouter)(store));
const server = app.listen(PORT, () => {
    console.log(`[server] Listening on http://localhost:${PORT}`);
    (0, measure_temp_js_1.startMeasureTemp)(store);
});
function shutdown() {
    console.log('\n[server] Shutting down…');
    (0, measure_temp_js_1.stopMeasureTemp)();
    server.close(() => {
        console.log('[server] Closed.');
        process.exit(0);
    });
}
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
//# sourceMappingURL=index.js.map