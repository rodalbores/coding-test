export interface ParsedReading {
  sensorId: number;
  tempC: number;
}

/**
 * Parses a single 2-byte message from the buffer at the given offset.
 *
 * Bit layout:
 *   Byte 0, bits 0-1: message type (we only care about type 2 = 0b10)
 *   Byte 0, bits 2-7: sensor ID (0-63)
 *   Byte 1:           temperature in °C (unsigned 8-bit)
 *
 * Returns the parsed reading if it's a type-2 message, or null otherwise.
 */
export function parseMessage(buf: Buffer, offset: number): ParsedReading | null {
  if (offset + 1 >= buf.length) return null;

  const byte0 = buf[offset]!;
  const byte1 = buf[offset + 1]!;

  const type = byte0 & 0b11;          // bits 0-1
  if (type !== 2) return null;

  const sensorId = (byte0 >> 2) & 0b111111; // bits 2-7
  const tempC = byte1;                       // unsigned 8-bit

  return { sensorId, tempC };
}

/**
 * Parses an entire buffer of 2-byte messages.
 * Returns only the valid type-2 readings.
 */
export function parseBuffer(buf: Buffer): ParsedReading[] {
  const readings: ParsedReading[] = [];

  for (let i = 0; i + 1 < buf.length; i += 2) {
    const reading = parseMessage(buf, i);
    if (reading) {
      readings.push(reading);
    }
  }

  return readings;
}
