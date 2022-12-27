/**
 * NeuQuant Neural-Net Quantization Algorithm
 * ------------------------------------------
 *
 * Copyright (c) 1994 Anthony Dekker
 *
 * NEUQUANT Neural-Net quantization algorithm by Anthony Dekker, 1994.
 * See "Kohonen neural networks for optimal colour quantization"
 * in "Network: Computation in Neural Systems" Vol. 5 (1994) pp 351-367.
 * for a discussion of the algorithm.
 * See also  http://members.ozemail.com.au/~dekker/NEUQUANT.HTML
 *
 * Any party obtaining a copy of these files from the author, directly or
 * indirectly, is granted, free of charge, a full and unrestricted irrevocable,
 * world-wide, paid up, royalty-free, nonexclusive right and license to deal
 * in this software and documentation files (the "Software"), including without
 * limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons who receive
 * copies from any such party to do so, with the only requirement being
 * that this copyright notice remain intact.
 *
 * (JavaScript port 2012 by Johan Nordberg)
 * (TypeScript port 2021 by Antonio Román)
 */
export declare class NeuQuant {
    /**
     * Array of pixels in RGB format, as such that it's decoded as `[r, g, b, r, g, b, r, g, b, ...]`.
     */
    private pixels;
    /**
     * Sampling factor from `1` to `30`, where lower is better quality.
     */
    private sampleFactorial;
    /**
     * The neural networks, composed by {@link maximumColorsSize} {@link Float64Array float arrays} of size 4.
     */
    private networks;
    /**
     * Network lookup indexes, composed by 256 indexes.
     */
    private networkIndexes;
    private biases;
    private frequencies;
    private radiusPowers;
    /**
     * Creates the neural quantifier instance.
     * @param pixels Array of pixels in RGB format, as such that it's decoded as `[r, g, b, r, g, b, r, g, b, ...]`.
     * @param sampleFactorial Sampling factor from `1` to `30`, where lower is better quality.
     */
    constructor(pixels: Uint8Array, sampleFactorial: number);
    /**
     * Builds the networks' color map.
     * @returns A RGB-encoded {@link Float64Array}.
     */
    getColorMap(): Float64Array;
    /**
     * Searches for BGR values 0..255 and returns a color index
     * @param b The blue color byte, between 0 and 255.
     * @param g The green color byte, between 0 and 255.
     * @param r The red color byte, between 0 and 255.
     * @returns The best color index.
     */
    lookupRGB(b: number, g: number, r: number): number;
    /**
     * Initializes the state for the arrays.
     */
    private init;
    /**
     * Un-biases network to give byte values 0..255 and record position i to prepare for sort.
     */
    private unBiasNetwork;
    /**
     * Moves neuron `i` towards biased (`B`, `G`, `R`) by factor `alpha`.
     * @param alpha The factor at which the neuron `i` should move towards.
     * @param i The neuron's index.
     * @param b The blue color.
     * @param g The green color.
     * @param r The red color.
     */
    private alterSingle;
    /**
     * Moves neurons in a `radius` around index `i` towards biased (`B`, `G`, `R`) by factor
     * {@link NeuQuant.radiusPowers `radiusPower[m]`}.
     * @param radius The radius around `i` to alter.
     * @param i The neuron's index.
     * @param b The blue color.
     * @param g The green color.
     * @param r The red color.
     */
    private alterNeighbors;
    /**
     * Searches for biased BGR values.
     *
     * - Finds the closest neuron (minimum distance) and updates {@link NeuQuant.frequencies}.
     * - Finds the best neuron (minimum distance-bias) and returns the position.
     *
     * For frequently chosen neurons, {@link NeuQuant.frequencies `frequencies[i]`} is high and
     * {@link NeuQuant.biases `biases[i]`} is negative.
     *
     * The latter is determined by the multiplication of `gamma` with the subtraction of the inverse of
     * {@link maximumColorsSize} with {@link NeuQuant.frequencies `frequencies[i]`}:
     *
     * ```typescript
     * biases[i] = gamma * ((1 / maximumColorsSize) - frequencies[i])
     * ```
     * @param b The blue color.
     * @param g The green color.
     * @param r The red color.
     * @returns The best bias position.
     */
    private contest;
    /**
     * Sorts the neural network and builds {@link NeuQuant.networkIndexes `networkIndex[0..255]`}.
     */
    private buildIndexes;
    /**
     * Runs the main learning loop.
     */
    private learn;
}
//# sourceMappingURL=NeuQuant.d.ts.map