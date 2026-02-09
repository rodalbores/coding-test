import { spawn, ChildProcess } from 'node:child_process';
import { parseBuffer } from './message-parser.js';
import { SensorStore } from './sensor-store.js';
import { startSimulator, stopSimulator } from './simulator.js';

let childProcess: ChildProcess | null = null;
let usingSimulator = false;

export function startMeasureTemp(store: SensorStore): void {
  console.log('[measure-temp] Spawning measure_temp process…');

  childProcess = spawn('measure_temp');

  childProcess.stdout?.on('data', (buf: Buffer) => {
    const readings = parseBuffer(buf);
    for (const { sensorId, tempC } of readings) {
      store.addReading(sensorId, tempC);
    }
  });

  childProcess.stderr?.on('data', (data: Buffer) => {
    console.error(`[measure-temp] stderr: ${data.toString()}`);
  });

  childProcess.on('error', (err) => {
    console.error(`[measure-temp] Failed to start: ${err.message}`);
    console.log('[measure-temp] Falling back to simulator…');
    usingSimulator = true;
    startSimulator(store);
  });

  childProcess.on('close', (code) => {
    console.log(`[measure-temp] Process exited with code ${code}`);
    childProcess = null;
  });
}

export function stopMeasureTemp(): void {
  if (usingSimulator) {
    stopSimulator();
    usingSimulator = false;
  }
  if (childProcess) {
    console.log('[measure-temp] Stopping measure_temp process…');
    childProcess.kill();
    childProcess = null;
  }
}
