"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ByteBuffer = void 0;
class ByteBuffer {
    /**
     * Constructs the instance.
     * @param size The amount of bytes to reserve, defaults to 8KB.
     */
    constructor(size = 8192) {
        Object.defineProperty(this, "written", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "data", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.data = Buffer.allocUnsafe(size);
    }
    /**
     * Gets the written data.
     */
    get length() {
        return this.written;
    }
    /**
     * Resets the data.
     * @note This does not de-allocate the data, instead, it sets the {@link ByteBuffer.written position} to zero.
     */
    reset() {
        this.written = 0;
    }
    /**
     * Writes a single byte into the buffer.
     * @param byte The byte to write, between `0x00` and `0xFF`.
     */
    writeByte(byte) {
        this.ensureByte();
        this.data[this.written++] = byte;
    }
    /**
     * Writes the `byte` value `times` times.
     * @param byte The byte to write `times` times.
     * @param times The amount of times to write the `byte`.
     */
    writeTimes(byte, times) {
        this.ensureBytes(times);
        for (let i = 0; i < times; i++) {
            this.data[this.written++] = byte;
        }
    }
    /**
     * Writes `bytes` into the data.
     * @param bytes The bytes to write.
     */
    writeBytes(bytes, start = 0, end = bytes.length) {
        this.ensureBytes(end - start);
        for (let i = start; i < end; i++) {
            this.data[this.written++] = bytes[i];
        }
    }
    /**
     * Gets a sub-array of what was written so far.
     * @returns The written section of the data.
     */
    toArray() {
        return this.data.subarray(0, this.written);
    }
    /**
     * Fills the data with the `byte` value given a range.
     * @param byte The value to write.
     * @param start The start index, defaults to `0`.
     * @param end The end index, defaults to {@link Uint8Array.length `this.data.length`}.
     */
    fill(byte, start, end) {
        this.data.fill(byte, start, end);
    }
    ensureByte() {
        if (this.written + 1 >= this.data.length) {
            const size = this.data.length * 2;
            this.data = this.copyBytes(size);
        }
    }
    ensureBytes(n) {
        if (this.written + n >= this.data.length) {
            const size = Math.pow(2, Math.ceil(Math.log(this.written + n) / Math.log(2)));
            this.data = this.copyBytes(size);
        }
    }
    copyBytes(size) {
        const data = Buffer.allocUnsafe(size);
        for (let i = 0; i < this.written; ++i) {
            data[i] = this.data[i];
        }
        return data;
    }
}
exports.ByteBuffer = ByteBuffer;
//# sourceMappingURL=ByteBuffer.js.map