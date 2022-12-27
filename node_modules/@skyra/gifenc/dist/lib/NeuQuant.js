"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NeuQuant = void 0;
/* eslint-disable prefer-destructuring, no-negated-condition */
const learningCycles = 100; // Number of learning cycles.
const maximumColorsSize = 256; // Number of colors used.
const maximumColorsPosition = maximumColorsSize - 1;
// defs for freq and bias
const networkBiasShift = 4; // Bias for color values.
const integerBiasShift = 16; // Bias for fractions.
const integerBias = 1 << integerBiasShift;
const gammaShift = 10;
const betaShift = 10;
const beta = integerBias >> betaShift; // `beta` = 1 / 1024
const betaGamma = integerBias << (gammaShift - betaShift);
// Defaults for decreasing radius factor:
// -> For 256 colors, radius starts at 32.0 biased by 6 bits and decreases by a factor of 1 / 30 each cycle.
const maximumRadius = maximumColorsSize >> 3;
const initialRadiusBiasShift = 6;
const initialRadiusBias = 1 << initialRadiusBiasShift;
const initialRadius = maximumRadius * initialRadiusBias;
const initialRadiusDecrement = 30;
// Defaults for decreasing alpha factor:
// -> Alpha starts at 1.0
const alphaBiasShift = 10;
const initialAlpha = 1 << alphaBiasShift;
// Constants used for radius power calculation:
const radiusBiasShift = 8;
const radiusBias = 1 << radiusBiasShift;
const alphaRadiusBiasShift = alphaBiasShift + radiusBiasShift;
const alphaRadiusBias = 1 << alphaRadiusBiasShift;
// Four primes near 500 - assume no image has a length so large that it is divisible by all four primes:
const prime1 = 499;
const prime2 = 491;
const prime3 = 487;
const prime4 = 503;
const minimumPictureBytes = 3 * prime4;
class NeuQuant {
    /**
     * Creates the neural quantifier instance.
     * @param pixels Array of pixels in RGB format, as such that it's decoded as `[r, g, b, r, g, b, r, g, b, ...]`.
     * @param sampleFactorial Sampling factor from `1` to `30`, where lower is better quality.
     */
    constructor(pixels, sampleFactorial) {
        /**
         * Array of pixels in RGB format, as such that it's decoded as `[r, g, b, r, g, b, r, g, b, ...]`.
         */
        Object.defineProperty(this, "pixels", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * Sampling factor from `1` to `30`, where lower is better quality.
         */
        Object.defineProperty(this, "sampleFactorial", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The neural networks, composed by {@link maximumColorsSize} {@link Float64Array float arrays} of size 4.
         */
        Object.defineProperty(this, "networks", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * Network lookup indexes, composed by 256 indexes.
         */
        Object.defineProperty(this, "networkIndexes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        // bias and freq arrays for learning
        Object.defineProperty(this, "biases", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "frequencies", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "radiusPowers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.pixels = pixels;
        this.sampleFactorial = sampleFactorial;
        this.networks = [];
        this.networkIndexes = new Int32Array(256);
        this.biases = new Int32Array(maximumColorsSize);
        this.frequencies = new Int32Array(maximumColorsSize);
        this.radiusPowers = new Int32Array(maximumColorsSize >> 3);
        this.init();
        this.learn();
        this.unBiasNetwork();
        this.buildIndexes();
    }
    /**
     * Builds the networks' color map.
     * @returns A RGB-encoded {@link Float64Array}.
     */
    getColorMap() {
        const map = new Float64Array(maximumColorsSize * 3);
        const index = new Float64Array(maximumColorsSize);
        for (let i = 0; i < maximumColorsSize; i++) {
            index[this.networks[i][3]] = i;
        }
        for (let l = 0, k = 0; l < maximumColorsSize; l++) {
            const network = this.networks[index[l]];
            map[k++] = network[0];
            map[k++] = network[1];
            map[k++] = network[2];
        }
        return map;
    }
    /**
     * Searches for BGR values 0..255 and returns a color index
     * @param b The blue color byte, between 0 and 255.
     * @param g The green color byte, between 0 and 255.
     * @param r The red color byte, between 0 and 255.
     * @returns The best color index.
     */
    lookupRGB(b, g, r) {
        // Biggest possible distance is 256 * 3, so we will define the biggest as an out-of-bounds number.
        let bestDistance = 1000;
        let best = -1;
        const index = this.networkIndexes[g];
        // Index on `g`
        for (let i = index; i < maximumColorsSize; ++i) {
            const network = this.networks[i];
            // Compare the distance of the green element, break if it's too big:
            let distance = network[1] - g;
            if (distance >= bestDistance)
                break;
            // If `distance` is negative, make it positive:
            if (distance < 0)
                distance = -distance;
            // Compare the distance with the blue element added, continue if it's too big:
            distance += Math.abs(network[0] - b);
            if (distance >= bestDistance)
                continue;
            // Compare the distance with the red element added, continue if it's too big:
            distance += Math.abs(network[2] - r);
            if (distance >= bestDistance)
                continue;
            bestDistance = distance;
            best = network[3];
        }
        // Start at networkIndex[g] and work outwards
        for (let j = index - 1; j >= 0; --j) {
            const network = this.networks[j];
            // Compare the distance of the green element, break if it's too big:
            let distance = g - network[1];
            if (distance >= bestDistance)
                break;
            // If `distance` is negative, make it positive:
            if (distance < 0)
                distance = -distance;
            // Compare the distance with the blue element added, continue if it's too big:
            distance += Math.abs(network[0] - b);
            if (distance >= bestDistance)
                continue;
            // Compare the distance with the red element added, continue if it's too big:
            distance += Math.abs(network[2] - r);
            if (distance >= bestDistance)
                continue;
            bestDistance = distance;
            best = network[3];
        }
        return best;
    }
    /**
     * Initializes the state for the arrays.
     */
    init() {
        for (let i = 0; i < maximumColorsSize; i++) {
            const v = (i << (networkBiasShift + 8)) / maximumColorsSize;
            this.networks[i] = new Float64Array([v, v, v, 0]);
            this.frequencies[i] = integerBias / maximumColorsSize;
            this.biases[i] = 0;
        }
    }
    /**
     * Un-biases network to give byte values 0..255 and record position i to prepare for sort.
     */
    unBiasNetwork() {
        for (let i = 0; i < maximumColorsSize; i++) {
            const network = this.networks[i];
            network[0] >>= networkBiasShift;
            network[1] >>= networkBiasShift;
            network[2] >>= networkBiasShift;
            network[3] = i; // record color number
        }
    }
    /**
     * Moves neuron `i` towards biased (`B`, `G`, `R`) by factor `alpha`.
     * @param alpha The factor at which the neuron `i` should move towards.
     * @param i The neuron's index.
     * @param b The blue color.
     * @param g The green color.
     * @param r The red color.
     */
    alterSingle(alpha, i, b, g, r) {
        const network = this.networks[i];
        network[0] -= (alpha * (network[0] - b)) / initialAlpha;
        network[1] -= (alpha * (network[1] - g)) / initialAlpha;
        network[2] -= (alpha * (network[2] - r)) / initialAlpha;
    }
    /**
     * Moves neurons in a `radius` around index `i` towards biased (`B`, `G`, `R`) by factor
     * {@link NeuQuant.radiusPowers `radiusPower[m]`}.
     * @param radius The radius around `i` to alter.
     * @param i The neuron's index.
     * @param b The blue color.
     * @param g The green color.
     * @param r The red color.
     */
    alterNeighbors(radius, i, b, g, r) {
        const lo = Math.abs(i - radius);
        const hi = Math.min(i + radius, maximumColorsSize);
        let j = i + 1;
        let k = i - 1;
        let m = 1;
        while (j < hi || k > lo) {
            const alpha = this.radiusPowers[m++];
            if (j < hi) {
                const network = this.networks[j++];
                network[0] -= (alpha * (network[0] - b)) / alphaRadiusBias;
                network[1] -= (alpha * (network[1] - g)) / alphaRadiusBias;
                network[2] -= (alpha * (network[2] - r)) / alphaRadiusBias;
            }
            if (k > lo) {
                const network = this.networks[k--];
                network[0] -= (alpha * (network[0] - b)) / alphaRadiusBias;
                network[1] -= (alpha * (network[1] - g)) / alphaRadiusBias;
                network[2] -= (alpha * (network[2] - r)) / alphaRadiusBias;
            }
        }
    }
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
    contest(b, g, r) {
        let bestDistance = ~(1 << 31);
        let bestBiasDistance = bestDistance;
        let bestPosition = -1;
        let bestBiasPosition = bestPosition;
        for (let i = 0; i < maximumColorsSize; i++) {
            const network = this.networks[i];
            const distance = Math.abs(network[0] - b) + Math.abs(network[1] - g) + Math.abs(network[2] - r);
            if (distance < bestDistance) {
                bestDistance = distance;
                bestPosition = i;
            }
            const biasDistance = distance - (this.biases[i] >> (integerBiasShift - networkBiasShift));
            if (biasDistance < bestBiasDistance) {
                bestBiasDistance = biasDistance;
                bestBiasPosition = i;
            }
            const betaFrequency = this.frequencies[i] >> betaShift;
            this.frequencies[i] -= betaFrequency;
            this.biases[i] += betaFrequency << gammaShift;
        }
        this.frequencies[bestPosition] += beta;
        this.biases[bestPosition] -= betaGamma;
        return bestBiasPosition;
    }
    /**
     * Sorts the neural network and builds {@link NeuQuant.networkIndexes `networkIndex[0..255]`}.
     */
    buildIndexes() {
        let previousColor = 0;
        let startPosition = 0;
        for (let i = 0; i < maximumColorsSize; i++) {
            const network = this.networks[i];
            let smallestPosition = i;
            let smallestValue = network[1]; // index on g
            // Find smallest in [i .. maximumColorsSize - 1]
            for (let j = i + 1; j < maximumColorsSize; j++) {
                const q = this.networks[j];
                if (q[1] < smallestValue) {
                    smallestPosition = j;
                    smallestValue = q[1]; // index on g
                }
            }
            // Swap network (i) and q (smallestPosition) entries:
            if (i !== smallestPosition) {
                const q = this.networks[smallestPosition];
                [q[0], network[0]] = [network[0], q[0]];
                [q[1], network[1]] = [network[1], q[1]];
                [q[2], network[2]] = [network[2], q[2]];
                [q[3], network[3]] = [network[3], q[3]];
            }
            // smallestValue entry is now in position i
            if (smallestValue !== previousColor) {
                this.networkIndexes[previousColor] = (startPosition + i) >> 1;
                for (let j = previousColor + 1; j < smallestValue; j++) {
                    this.networkIndexes[j] = i;
                }
                previousColor = smallestValue;
                startPosition = i;
            }
        }
        this.networkIndexes[previousColor] = (startPosition + maximumColorsPosition) >> 1;
        for (let j = previousColor + 1; j < 256; j++) {
            this.networkIndexes[j] = maximumColorsPosition;
        }
    }
    /**
     * Runs the main learning loop.
     */
    learn() {
        const length = this.pixels.length;
        const alphaDecrement = 30 + (this.sampleFactorial - 1) / 3;
        const samplePixels = length / (3 * this.sampleFactorial);
        let delta = ~~(samplePixels / learningCycles);
        let alpha = initialAlpha;
        let radius = initialRadius;
        let localRadius = radius >> initialRadiusBiasShift;
        if (localRadius <= 1)
            localRadius = 0;
        for (let i = 0; i < localRadius; i++) {
            this.radiusPowers[i] = alpha * (((localRadius * localRadius - i * i) * radiusBias) / (localRadius * localRadius));
        }
        let step;
        if (length < minimumPictureBytes) {
            this.sampleFactorial = 1;
            step = 3;
        }
        else if (length % prime1 !== 0) {
            step = 3 * prime1;
        }
        else if (length % prime2 !== 0) {
            step = 3 * prime2;
        }
        else if (length % prime3 !== 0) {
            step = 3 * prime3;
        }
        else {
            step = 3 * prime4;
        }
        let pixelPosition = 0;
        let i = 0;
        while (i < samplePixels) {
            const b = (this.pixels[pixelPosition] & 0xff) << networkBiasShift;
            const g = (this.pixels[pixelPosition + 1] & 0xff) << networkBiasShift;
            const r = (this.pixels[pixelPosition + 2] & 0xff) << networkBiasShift;
            let j = this.contest(b, g, r);
            this.alterSingle(alpha, j, b, g, r);
            if (localRadius !== 0)
                this.alterNeighbors(localRadius, j, b, g, r);
            pixelPosition += step;
            if (pixelPosition >= length)
                pixelPosition -= length;
            if (delta === 0)
                delta = 1;
            ++i;
            if (i % delta !== 0)
                continue;
            alpha -= alpha / alphaDecrement;
            radius -= radius / initialRadiusDecrement;
            localRadius = radius >> initialRadiusBiasShift;
            if (localRadius <= 1)
                localRadius = 0;
            for (j = 0; j < localRadius; j++) {
                this.radiusPowers[j] = alpha * (((localRadius * localRadius - j * j) * radiusBias) / (localRadius * localRadius));
            }
        }
    }
}
exports.NeuQuant = NeuQuant;
//# sourceMappingURL=NeuQuant.js.map