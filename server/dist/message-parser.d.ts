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
export declare function parseMessage(buf: Buffer, offset: number): ParsedReading | null;
/**
 * Parses an entire buffer of 2-byte messages.
 * Returns only the valid type-2 readings.
 */
export declare function parseBuffer(buf: Buffer): ParsedReading[];
