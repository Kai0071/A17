<div align="center">

# @skyra/gifenc

**A very fast server-side animated GIF generation for Node.js**

[![GitHub](https://img.shields.io/github/license/skyra-project/gifenc)](https://github.com/skyra-project/gifenc/blob/main/LICENSE.md)

[![npm](https://img.shields.io/npm/v/@skyra/gifenc?color=crimson&label=NPM&logo=npm)](https://www.npmjs.com/package/@skyra/gifenc)
![npm bundle size minified (scoped)](https://img.shields.io/bundlephobia/min/@skyra/gifenc?label=minified&logo=webpack)
![npm bundle size minzipped (scoped)](https://img.shields.io/bundlephobia/minzip/@skyra/gifenc?label=minified&logo=webpack)

[![Support Server](https://discord.com/api/guilds/254360814063058944/embed.png?style=banner2)](https://join.skyra.pw)

</div>

---

## Features

-   @skyra/gifenc is a GIF encoding utility library to build your next GIFs.
-   Supports CommonJS and ES Module.
-   Heavily based on [`gifencoder`](https://github.com/eugeneware/gifencoder), this module wouldn't have existed without its author.

## Installation

You can use the following command to install this package, or replace `npm install` with your package manager of choice.

```sh
npm install @skyra/gifenc
```

## Usage

> `@skyra/gifenc` is very close to a drop-in replacement for [`gifencoder`](https://www.npmjs.com/package/gifencoder). There are only 2 differences to account for. First of all, the encoder class is named `GifEncoder` and not `GIFEncoder`, and secondly, the metadata methods are chainable.

### Streaming API - Writing to a file

```js
const { GifEncoder } = require('@skyra/gifenc');
const { createWriteStream } = require('node:fs');

const encoder = new GifEncoder(400, 400);
	// Set the repeat mode: 0 for repeat, -1 for no-repeat:
	.setRepeat(0)
	// Set the frame delay in milliseconds:
	.setDelay(500)
	// Set the image quality, 10 is default:
	.setQuality(10);

// Create a read stream and pipe it into a file write stream:
encoder.createReadStream()
	.pipe(createWriteStream('my-file.gif'));

encoder.start();

// `getFrames` enumerates over frames
for (const frame of getFrames()) {
	encoder.addFrame(frame);
}

encoder.finish();
```

### Streaming API - Get resulting Buffer

We can use [`streamConsumers.buffer()`](https://nodejs.org/dist/latest-v16.x/docs/api/webstreams.html#streamconsumersbufferstream) from Node.js to convert the stream into a buffer starting with Node.js v16.7.0, if you're using an older version, consider making a function using stream's async iterator (Node.js v10+) or use a package.

```js
const { GifEncoder } = require('@skyra/gifenc');
const { buffer } = require('node:stream/consumers');

const encoder = new GifEncoder(400, 400);

const stream = encoder.createReadStream();
encoder.setRepeat(0).setDelay(500).setQuality(10).start();

// `getFrames` enumerates over frames
for (const frame of getFrames()) {
	encoder.addFrame(frame);
}

encoder.finish();
const result = await buffer(stream);
```

### Using with canvas-constructor

```js
const { GifEncoder } = require('@skyra/gifenc');
const { Canvas } = require('canvas-constructor/skia');
// const { Canvas } = require('canvas-constructor/cairo');

const canvas = new Canvas(400, 400);
const encoder = new GifEncoder(400, 400);

const stream = encoder.createReadStream();
encoder.setRepeat(0).setDelay(500).setQuality(10).start();

const colors = ['#98DDCA', '#D5ECC2', '#FFD3B4', '#FFAAA7'];
for (const color of colors) {
	canvas.setColor(color).printRectangle(0, 0, 400, 400);
	encoder.addFrame(canvas);
}

// ...
```

### Using with ECMAScript Modules

`@skyra/gifenc` supports ESM out of the box. To import the `GifEncoder` class, you use the following statement:

```ts
import { GifEncoder } from '@skyra/gifenc';
```

## Buy us some doughnuts

Skyra Project is open source and always will be, even if we don't get donations. That said, we know there are amazing people who
may still want to donate just to show their appreciation. Thanks you very much in advance!

We accept donations through Patreon, BitCoin, Ethereum, and Litecoin. You can use the buttons below to donate through your method of choice.

| Donate With |         QR         |                                                                  Address                                                                  |
| :---------: | :----------------: | :---------------------------------------------------------------------------------------------------------------------------------------: |
|   Patreon   | ![PatreonImage][]  |                                               [Click Here](https://www.patreon.com/kyranet)                                               |
|   PayPal    |  ![PayPalImage][]  |                     [Click Here](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=CET28NRZTDQ8L)                      |
|   BitCoin   | ![BitcoinImage][]  |         [3JNzCHMTFtxYFWBnVtDM9Tt34zFbKvdwco](bitcoin:3JNzCHMTFtxYFWBnVtDM9Tt34zFbKvdwco?amount=0.01&label=Skyra%20Discord%20Bot)          |
|  Ethereum   | ![EthereumImage][] | [0xcB5EDB76Bc9E389514F905D9680589004C00190c](ethereum:0xcB5EDB76Bc9E389514F905D9680589004C00190c?amount=0.01&label=Skyra%20Discord%20Bot) |
|  Litecoin   | ![LitecoinImage][] |         [MNVT1keYGMfGp7vWmcYjCS8ntU8LNvjnqM](litecoin:MNVT1keYGMfGp7vWmcYjCS8ntU8LNvjnqM?amount=0.01&label=Skyra%20Discord%20Bot)         |

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/kyranet"><img src="https://avatars0.githubusercontent.com/u/24852502?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Antonio Román</b></sub></a><br /><a href="https://github.com/skyra-project/gifenc/commits?author=kyranet" title="Code">💻</a> <a href="#ideas-kyranet" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-kyranet" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    <td align="center"><a href="https://favware.tech/"><img src="https://avatars.githubusercontent.com/u/4019718?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jeroen Claassens</b></sub></a><br /><a href="#infra-Favna" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-Favna" title="Maintenance">🚧</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

<!-- LINK DUMP -->

[patreonimage]: https://cdn.skyra.pw/gh-assets/patreon.png
[paypalimage]: https://cdn.skyra.pw/gh-assets/paypal.png
[bitcoinimage]: https://cdn.skyra.pw/gh-assets/bitcoin.png
[ethereumimage]: https://cdn.skyra.pw/gh-assets/ethereum.png
[litecoinimage]: https://cdn.skyra.pw/gh-assets/litecoin.png
