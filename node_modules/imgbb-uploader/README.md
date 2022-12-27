# imgbb-uploader

Lightweight Nodejs module to upload pictures to imgBB (or other chevereto-based APIs) and get display URLs in response.  
Primary use is letting imgBB handle the hosting & serving of images.

[![https://nodei.co/npm/imgbb-uploader.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/imgbb-uploader.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/imgbb-uploader)
[![Known Vulnerabilities](https://snyk.io/test/github/TheRealBarenziah/imgbb-uploader/badge.svg?targetFile=package.json)](https://snyk.io/test/github/TheRealBarenziah/imgbb-uploader?targetFile=package.json)
[![dependencies](https://img.shields.io/badge/dependencies-0-brightgreen)](https://www.npmjs.com/package/imgbb-uploader?activeTab=dependencies)
[![DeepScan grade](https://deepscan.io/api/teams/17873/projects/21210/branches/601598/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=17873&pid=21210&bid=601598)
![Test suite](https://github.com/TheRealBarenziah/imgbb-uploader/actions/workflows/tests.yml/badge.svg)

## Install

```bash
npm install imgbb-uploader
```

## Compatibility:

**Node >= 8** ( [Promises/await](https://node.green/) ) _ESM projects are supported from 1.5 onward_
_Care: this module uses `fs` under the hood. **It WON'T work outside the node environment !**_

**Want to use this client-side?** [Click here](https://stackoverflow.com/a/63669049/11894221)

**Formats supported by ImgBB API:** `.jpg`, `.png`,`.bmp`,`.gif`, `base64`, `url`.

## We also support Chevereto v3 & v4!

Did you know? imgBB is based on **Chevereto**, a software written by [rodber](https://github.com/rodber) that [you can easily host yourself](https://github.com/TheRealBarenziah/imgbb-uploader/blob/master/CONTRIBUTING.md#docker-container-run-chevereto).

**[To use with Chevereto, click here](https://github.com/TheRealBarenziah/imgbb-uploader/blob/master/USE_WITH_CHEVERETO.md)**!

## Upload to imgBB with two string params (legacy)

- I) [Get a free API key from imgbb](https://api.imgbb.com/) ( estimated time ~1 minute )
- II) [Put that in an environment variable](https://www.npmjs.com/package/dotenv)
- III) **imgbbUploader takes _exactly two_ String arguments** : your API key, and the path to your image :

```javascript
const imgbbUploader = require("imgbb-uploader");
/* or use import in ESM projects:
import { imgbbUploader } from "imgbb-uploader"; 
*/

imgbbUploader("your-imgbb-api-key-string", "path/to/your/image.png")
  .then((response) => console.log(response))
  .catch((error) => console.error(error));
```

## `.then((response) => console.log(response))` output example :

```javascript
{
  id: '26Sy9tM',
  title: '5e7599f65f27',
  url_viewer: 'https://ibb.co/26Sy9tM',
  url: 'https://i.ibb.co/z5FrMR2/5e7599f65f27.png',
  display_url: 'https://i.ibb.co/z5FrMR2/5e7599f65f27.png',
  size: 260258,
  time: '1609336605',
  expiration: '0',
  image: {
    filename: '5e7599f65f27.png',
    name: '5e7599f65f27',
    mime: 'image/png',
    extension: 'png',
    url: 'https://i.ibb.co/z5FrMR2/5e7599f65f27.png'
  },
  thumb: {
    filename: '5e7599f65f27.png',
    name: '5e7599f65f27',
    mime: 'image/png',
    extension: 'png',
    url: 'https://i.ibb.co/26Sy9tM/5e7599f65f27.png'
  },
   medium: {
   filename: '5e7599f65f27.png',
    name: '5e7599f65f27',
    mime: 'image/png',
    extension: 'png',
    url: 'https://i.ibb.co/14kK0tt/5e7599f65f27.png'
  },
  delete_url: 'https://ibb.co/26Sy9tM/087a7edaaac26e1c940283df07d0b1d7'
}
```

_**Note about imgBB API:** the `medium` Object will only be returned for `.png` and `base64` files !_

## With options object (more features, yay! )

From version 1.2.0 onward, you can pass an options object as param.  
Use it to customize filename and/or a set duration after which the image will be deleted, [cf their docs](https://api.imgbb.com/).

The key you'll use for your image depends on its nature. **One of these must be defined:**

- `imagePath` in case of a local file
- `imageUrl` in case of an URL string
- `base64string` in case of base64-encoded image

```javascript
const imgbbUploader = require("imgbb-uploader");
/* or use import in ESM projects:
import { imgbbUploader } from "imgbb-uploader"; 
*/

const options = {
  apiKey: process.env.IMGBB_API_KEY, // MANDATORY

  imagePath: "./your/image/path", // OPTIONAL: pass a local file (max 32Mb)

  name: "yourCustomFilename", // OPTIONAL: pass a custom filename to imgBB API

  expiration: 3600 /* OPTIONAL: pass a numeric value in seconds.
  It must be in the 60-15552000 range.
  Enable this to force your image to be deleted after that time. */,

  imageUrl: "https://placekitten.com/500/500", // OPTIONAL: pass an URL to imgBB (max 32Mb)

  base64string:
    "iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAEklEQVR42mNcLVNbzwAEjDAGACcSA4kB6ARiAAAAAElFTkSuQmCC",
  // OPTIONAL: pass base64-encoded image (max 32Mb)
};

imgbbUploader(options)
  .then((response) => console.log(response))
  .catch((error) => console.error(error));
```

**This module is tiny & totally unlicensed: to better fit your need, please fork away !**  
[Basic instructions for tweaking](https://github.com/TheRealBarenziah/imgbb-uploader/blob/master/CONTRIBUTING.md)

#### Another example: handling buffer with option object

```javascript
const imgbbUploader = require("imgbb-uploader");

// Some buffer we need to upload
const data = "definitely-not-an-image-binary";

// Some promise of base64 data
const bufferToBase64 = (buffer) =>
  new Promise((resolve) => {
    const buff = new Buffer(buffer);
    const base64string = buff.toString("base64"); // https://nodejs.org/api/buffer.html#buftostringencoding-start-end
    return setTimeout(() => {
      resolve(base64string);
    }, 1000);
  });

// Some async function
const getDisplayUrl = async (buffer, name = "Default-filename") => {
  return await imgbbUploader({
    apiKey: "definitely-not-a-valid-key",
    base64string: await bufferToBase64(buffer),
    name,
  })
    .then((res) => {
      console.log(`Handle success: ${res.url}`);
      return res.url;
    })
    .catch((e) => {
      console.error(`Handle error: ${e}`);
      return "http://placekitten.com/300/300";
    });
};

const myUrl = getDisplayUrl(data, "Dolunay_Obruk-Sama_<3");
```

## Working with directories/arrays

_This module don't_ **and won't** directly _support array uploads_. Only you can pick the best solution for your usecase.  
For example, to upload local directories of pictures, I enjoy working with [fs.readdir](https://nodejs.org/api/fs.html#fspromisesreaddirpath-options).  
I usually create an `imagesDir.js` file wherever it suits me:

```javascript
module.exports = require("path").join(__dirname);
```

Then `require` that elsewhere and use `path.join(imagesDir, relevantSubfolder)` to dig into directories.  
Once there, iterate using `fs.readdir` and `forEach` as needed.

If you need more inspiration [Stack Overflow should have you covered](https://www.google.com/search?q=site%3Astackoverflow.com+promise.all)!

## Contributing

Issues & PRs are very welcome!  
[Get started with local development](https://github.com/TheRealBarenziah/imgbb-uploader/blob/master/CONTRIBUTING.md)

[CHANGELOG](https://github.com/TheRealBarenziah/imgbb-uploader/blob/master/CHANGELOG.md)
