/**
 * LZWEncoder
 *
 * Authors
 * - Kevin Weiner (original Java version - kweiner@fmsware.com)
 * - Thibault Imbert (AS3 version - bytearray.org)
 * - Johan Nordberg (JS version - code@johan-nordberg.com)
 * - Antonio Román (TS version - kyradiscord@gmail.com)
 *
 * Acknowledgements
 * - GIFCOMPR.C - GIF Image compression routines
 * - Lempel-Ziv compression based on 'compress'. GIF modifications by
 * - David Rowley (mgardi@watdcsu.waterloo.edu)
 *   GIF Image compression - modified 'compress'
 *   Based on: compress.c - File compression ala IEEE Computer, June 1984.
 *   By Authors:
 *   - Spencer W. Thomas (decvax!harpo!utah-cs!utah-gr!thomas)
 *   - Jim McKie (decvax!mcvax!jim)
 *   - Steve Davies (decvax!vax135!petsd!peora!srd)
 *   - Ken Turkowski (decvax!decwrl!turtlevax!ken)
 *   - James A. Woods (decvax!ihnp4!ames!jaw)
 *   - Joe Orost (decvax!vax135!petsd!joe)
 */
import type { ByteBuffer } from './ByteBuffer';
/**
 * @summary
 * Algorithm: use open addressing double hashing (no chaining) on the prefix code / next character combination.
 *
 * We do a variant of Knuth's algorithm D (vol. 3, sec. 6.4) along with G. Knott's relatively-prime secondary probe.
 * Here, the modular division first probe is gives way to a faster exclusive-or manipulation. Also do block compression
 * with an adaptive reset, whereby the code table is cleared when the compression ratio decreases, but after the table
 * fills. The variable-length output codes are re-sized at this point, and a special CLEAR code is generated for the
 * decompression.
 *
 * **Late addition**: construct the table according to file size for noticeable speed improvement on small files. Please
 * direct questions about this implementation to ames!jaw.
 */
export declare class LZWEncoder {
    /**
     * The GIF image's width, between `1` and `65536`.
     */
    readonly width: number;
    /**
     * The GIF image's height, between `1` and `65536`.
     */
    readonly height: number;
    private pixels;
    private readonly initCodeSize;
    private currentAccumulator;
    private currentBits;
    private currentPixel;
    private accumulator;
    private firstUnusedEntry;
    private maximumCode;
    private remaining;
    private bitSize;
    private clearFlag;
    private globalInitialBits;
    private clearCode;
    private endOfFrameCode;
    private readonly accumulators;
    private readonly hashes;
    private readonly codes;
    /**
     * Constructs a {@link LZWEncoder} instance.
     * @param width The width of the image.
     * @param height The height of the image.
     * @param pixels The pixel data in RGB format.
     * @param colorDepth The color depth.
     */
    constructor(width: number, height: number, pixels: Uint8Array, colorDepth: number);
    /**
     * Encodes the image into the output.
     * @param output The byte buffer to write to.
     */
    encode(output: ByteBuffer): void;
    /**
     * Compresses the GIF data.
     * @param initialBits The initial bits for the compression.
     * @param output The byte buffer to write to.
     */
    private compress;
    /**
     * Adds a character to the end of the current packet, and if it is at 254 characters, it flushes the packet to disk
     * via {@link LZWEncoder.flushPacket}.
     * @param c The character code to add.
     * @param output The byte buffer to write to.
     */
    private addCharacter;
    /**
     * Clears out the hash table for block compress.
     * @param output The byte buffer to write to.
     */
    private clearCodeTable;
    /**
     * Resets the hash table given an amount of hashes.
     * @param hashSize The amount of hashes to reset.
     */
    private resetHashRange;
    /**
     * Flushes the packet to disk, and reset the accumulator.
     * @param output The byte buffer to write to.
     */
    private flushPacket;
    /**
     * Gets the maximum representable number for a given amount of bits.
     * @param size The bit size to get the number from.
     * @returns The maximum code given a number of bits.
     * @example
     * ```typescript
     * getMaximumCode(6);
     * // ➡ 0b0011_1111
     * ```
     */
    private getMaximumCode;
    /**
     * Gets the next pixel from the image.
     * @returns The next pixel from the image.
     */
    private nextPixel;
    private processOutput;
}
//# sourceMappingURL=LZWEncoder.d.ts.map