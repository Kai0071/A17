import { build } from "./assets/build.mjs"

// make sure to build assets if executed through postinstall script
await build(true);