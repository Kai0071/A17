/// <reference types="node" />
export declare class ByteBuffer {
    private written;
    private data;
    /**
     * Constructs the instance.
     * @param size The amount of bytes to reserve, defaults to 8KB.
     */
    constructor(size?: number);
    /**
     * Gets the written data.
     */
    get length(): number;
    /**
     * Resets the data.
     * @note This does not de-allocate the data, instead, it sets the {@link ByteBuffer.written position} to zero.
     */
    reset(): void;
    /**
     * Writes a single byte into the buffer.
     * @param byte The byte to write, between `0x00` and `0xFF`.
     */
    writeByte(byte: number): void;
    /**
     * Writes the `byte` value `times` times.
     * @param byte The byte to write `times` times.
     * @param times The amount of times to write the `byte`.
     */
    writeTimes(byte: number, times: number): void;
    /**
     * Writes `bytes` into the data.
     * @param bytes The bytes to write.
     */
    writeBytes(bytes: ArrayLike<number>, start?: number, end?: number): void;
    /**
     * Gets a sub-array of what was written so far.
     * @returns The written section of the data.
     */
    toArray(): Buffer;
    /**
     * Fills the data with the `byte` value given a range.
     * @param byte The value to write.
     * @param start The start index, defaults to `0`.
     * @param end The end index, defaults to {@link Uint8Array.length `this.data.length`}.
     */
    fill(byte: number, start?: number, end?: number): void;
    private ensureByte;
    private ensureBytes;
    private copyBytes;
}
//# sourceMappingURL=ByteBuffer.d.ts.map