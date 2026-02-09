"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startMeasureTemp = startMeasureTemp;
exports.stopMeasureTemp = stopMeasureTemp;
const node_child_process_1 = require("node:child_process");
const message_parser_js_1 = require("./message-parser.js");
const simulator_js_1 = require("./simulator.js");
let childProcess = null;
let usingSimulator = false;
function startMeasureTemp(store) {
    console.log('[measure-temp] Spawning measure_temp process…');
    childProcess = (0, node_child_process_1.spawn)('measure_temp');
    childProcess.stdout?.on('data', (buf) => {
        const readings = (0, message_parser_js_1.parseBuffer)(buf);
        for (const { sensorId, tempC } of readings) {
            store.addReading(sensorId, tempC);
        }
    });
    childProcess.stderr?.on('data', (data) => {
        console.error(`[measure-temp] stderr: ${data.toString()}`);
    });
    childProcess.on('error', (err) => {
        console.error(`[measure-temp] Failed to start: ${err.message}`);
        console.log('[measure-temp] Falling back to simulator…');
        usingSimulator = true;
        (0, simulator_js_1.startSimulator)(store);
    });
    childProcess.on('close', (code) => {
        console.log(`[measure-temp] Process exited with code ${code}`);
        childProcess = null;
    });
}
function stopMeasureTemp() {
    if (usingSimulator) {
        (0, simulator_js_1.stopSimulator)();
        usingSimulator = false;
    }
    if (childProcess) {
        console.log('[measure-temp] Stopping measure_temp process…');
        childProcess.kill();
        childProcess = null;
    }
}
//# sourceMappingURL=measure-temp.js.map