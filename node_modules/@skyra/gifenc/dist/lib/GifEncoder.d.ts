/**
 * GifEncoder
 *
 * Authors
 * - Kevin Weiner (original Java version - kweiner@fmsware.com)
 * - Thibault Imbert (AS3 version - bytearray.org)
 * - Johan Nordberg (JS version - code@johan-nordberg.com)
 * - Eugene Ware (node.js streaming version - eugene@noblesmaurai.com)
 * - Antonio Román (TS version - kyradiscord@gmail.com)
 */
/// <reference types="node" />
import { Duplex, Readable } from 'stream';
/**
 * The disposal method code.
 *
 * - `0`: No disposal specified. The decoder is not required to take any action.
 * - `1`: Do not dispose. The graphic is to be left in place.
 * - `2`: Restore to background color. The area used by the graphic must be restored to the background color.
 * - `3`: Restore to previous. The decoder is required to restore the area overwritten by the graphic with what was
 * there prior to rendering the graphic.
 * - `4` - `7`: To be defined.
 */
export declare type DisposalCode = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
export interface EncoderOptions {
    /**
     * The frame delay in milliseconds.
     * @default 0
     */
    delay?: number;
    /**
     * The frames per second, supersedes {@link EncoderOptions.delay} if set.
     * @default 0
     */
    framerate?: number;
    /**
     * The GIF frame disposal code for the last added frame and any subsequent frames.
     *
     * Defaults to one of the following values:
     * - `0` : If `transparent` is set
     * - `2` : Otherwise
     */
    dispose?: DisposalCode;
    /**
     * The number of times to repeat the GIF, between `0` and `65536`, with two special cases:
     * - `-1`: play once
     * - `0`: repeat indefinitely
     * @default -1
     * @note When set to a value different to `-1`, the GIF will use the Netscape 2.0 extension.
     */
    repeat?: number;
    /**
     * The transparent color for the last added frame and any subsequent frames. Since all colors are subject to
     * modification in the quantization process, the color in the final palette for each frame closest to the given
     * color becomes the transparent color for that frame. May be set to null to indicate no transparent color.
     */
    transparent?: number | null;
    /**
     * The quality of color quantization (conversion of images to the maximum 256 colors allowed by the GIF
     * specification) between `1` and `30`. Lower values (closer to 1) produce better colors but require significantly
     * more resources and processing. `10` is the default value as it produces good color mapping at reasonable speeds.
     *
     * @note Values greater than 20 do not yield significant improvements in speed.
     */
    quality?: number;
}
export declare class GifEncoder {
    /**
     * The GIF image's width, between `1` and `65536`.
     */
    readonly width: number;
    /**
     * The GIF image's height, between `1` and `65536`.
     */
    readonly height: number;
    /**
     * The transparent color, `null` if no transparent color is given.
     */
    private transparent;
    /**
     * The transparent index in the color table.
     */
    private transparentIndex;
    /**
     * Number between `-1` and `65536`, `-1` indicating no repeat (GIF89a specification), otherwise repeating `repeat`
     * times with the exception of `0`, which repeats indefinitely.
     */
    private repeat;
    /**
     * Frame delay in hundredths of a second (1 = 10ms).
     */
    private delay;
    /**
     * The current frame.
     */
    private image;
    /**
     * The BGR byte array from the current frame.
     */
    private pixels;
    /**
     * The converted frame indexed to the palette.
     */
    private indexedPixels;
    /**
     * The number of bit planes.
     */
    private colorDepth;
    /**
     * The RGB palette.
     */
    private colorPalette;
    /**
     * The active palette entries.
     */
    private usedEntry;
    /**
     * The disposal code (`-1` = determine defaults).
     */
    private disposalMode;
    /**
     * Whether or not this is the first frame.
     */
    private firstFrame;
    /**
     * The sample interval for the quantifier.
     */
    private sample;
    /**
     * Whether or not we started encoding.
     */
    private started;
    /**
     * The readable streams.
     */
    private readableStreams;
    /**
     * The output buffer.
     */
    private byteBuffer;
    /**
     * Constructs the GIF encoder.
     * @param width An integer representing the GIF image's width, between `1` and `65536`.
     * @param height An integer representing the GIF image's height, between `1` and `65536`.
     */
    constructor(width: number, height: number);
    /**
     * Creates a readable stream and pushes it to the encoder's {@link GifEncoder.readableStreams readable streams}.
     * @returns The new readable stream.
     * @example
     * ```javascript
     * const encoder = new GifEncoder(320, 240);
     *
     * // Stream the results as they are available into hello.gif
     * encoder.createReadStream().pipe(fs.createWriteStream('hello.gif'));
     * ```
     */
    createReadStream(): Readable;
    /**
     * Uses an existing readable stream and pushes it to the encoder's {@link GifEncoder.readableStreams readable streams}.
     * @param readable The readable stream to use.
     * @returns The given readable stream.
     */
    createReadStream<T extends Readable>(readable: T): T;
    /**
     * Creates a write stream.
     * @param options The options for the write stream.
     * @returns A {@link Duplex}.
     * @example
     * ```typescript
     * const { GifEncoder } = require('@skyra/gifenc');
     * const encoder = new GifEncoder(400, 200);
     *
     * pngStreamGenerator() // A user-defined `Readable`.
     * 	.pipe(encoder.createWriteStream({ repeat: -1, delay: 500, quality: 10 }))
     * 	.pipe(fs.createWriteStream('runningKitten.gif'));
     * ```
     */
    createWriteStream(options?: EncoderOptions): Duplex;
    /**
     * Sets the delay time between each frame, or changes it for subsequent frames (applies to the next frame added).
     * @param delay The delay between frames, in milliseconds. Must be a number between `655360` and `10`.
     */
    setDelay(delay: number): this;
    /**
     * Sets frame rate in frames per second.
     * @param fps The amount of frames per second, maximum is `100` frames per second.
     */
    setFramerate(fps: number): this;
    /**
     * Sets the GIF frame disposal code for the last added frame and any subsequent frames.
     *
     * Defaults to one of the following values:
     * - `0` : If `transparent` is set
     * - `2` : Otherwise
     *
     * @param disposalCode The disposal code.
     * @see {@link DisposalCode}
     */
    setDispose(disposalCode: DisposalCode): this;
    /**
     * Sets the number of times the set of GIF frames should be played.
     * @param repeat The number of times between `-1` and `65536` to repeat the GIF, with two special cases:
     * - `-1` (**default**): play once
     * - `0`: repeat indefinitely
     *
     * @note This method has no effect after the first image was added.
     */
    setRepeat(repeat: number): this;
    /**
     * Sets the transparent color for the last added frame and any subsequent frames. Since all colors are subject to
     * modification in the quantization process, the color in the final palette for each frame closest to the given
     * color becomes the transparent color for that frame. May be set to null to indicate no transparent color.
     * @param color The color to be set in transparent pixels.
     */
    setTransparent(color: number | null): this;
    /**
     * Sets the quality of color quantization (conversion of images to the maximum 256 colors allowed by the GIF
     * specification). Lower values (`minimum` = 1) produce better colors, but slow processing significantly. `10` is
     * the default, and produces good color mapping at reasonable speeds. Values greater than 20 do not yield
     * significant improvements in speed.
     * @param quality A number between `1` and `30`.
     */
    setQuality(quality: number): this;
    /**
     * Adds the next GIF frame. The frame is not written immediately, but is actually deferred until the next frame is
     * received so that timing data can be inserted. Calling {@link GifEncoder.finish} will flush all frames.
     * @param imageData The image data to add into the next frame.
     */
    addFrame(imageData: Pick<CanvasRenderingContext2D, 'getImageData'> | Uint8ClampedArray): void;
    /**
     * Adds final trailer to the GIF stream, if you don't call the finish method the GIF stream will not be valid.
     */
    finish(): void;
    /**
     * Writes the GIF file header
     */
    start(): void;
    private end;
    private emit;
    /**
     * Analyzes current frame colors and creates a color map.
     */
    private analyzePixels;
    /**
     * Returns index of palette color closest to c.
     * @param color The color to compare.
     */
    private findClosest;
    /**
     * Updates {@link GifEncoder.pixels} by creating an RGB-formatted {@link Uint8Array} from the RGBA-formatted data.
     */
    private getImagePixels;
    /**
     * Writes the GCE (Graphic Control Extension).
     */
    private writeGraphicControlExtension;
    /**
     * Writes the ID (Image Descriptor).
     */
    private writeImageDescriptor;
    /**
     * Writes the LSD (Logical Screen Descriptor)
     */
    private writeLogicalScreenDescriptor;
    /**
     * Writes the Netscape application extension to define repeat count.
     */
    private writeNetscapeExtension;
    /**
     * Writes the color table palette.
     */
    private writePalette;
    private writeShort;
    /**
     * Encodes and writes pixel data into {@link GifEncoder.byteBuffer}.
     */
    private writePixels;
}
//# sourceMappingURL=GifEncoder.d.ts.map