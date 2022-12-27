import fetch from "node-fetch";
import fs from "fs";
import chalk from "chalk";
import { fileURLToPath } from "url";
import { dirname } from "path";

const METADATA_URL = "https://raw.githubusercontent.com/DevAndromeda/canvacord/assets/datasrc.json";
const ASSETS_DIR = "CANVACORD_ASSETS" in process.env ? process.env.CANVACORD_ASSETS : `${dirname(fileURLToPath(import.meta.url))}/../../assets`;

export async function build(force = false) {
    if (!fs.existsSync(ASSETS_DIR)) await fs.promises.mkdir(ASSETS_DIR, { recursive: true });
    if (!fs.existsSync(`${ASSETS_DIR}/fonts`)) await fs.promises.mkdir(`${ASSETS_DIR}/fonts`, { recursive: true });
    if (!fs.existsSync(`${ASSETS_DIR}/images`)) await fs.promises.mkdir(`${ASSETS_DIR}/images`, { recursive: true });

    if (force) console.log(`${chalk.yellowBright("[Canvacord]")} ${chalk.whiteBright("Rebuilding forcefully as --force was supplied!")}`);

    if (fs.existsSync(`${ASSETS_DIR}/meta.json`) && !force) {
        console.log(`${chalk.greenBright("[Canvacord]")} ${chalk.whiteBright(`Assets installation skipped since metadata is already available!`)}`);
        process.exit();
    }

    console.log(`${chalk.yellowBright("[Canvacord]")} ${chalk.whiteBright("Downloading assets...")}`);

    const assetsMeta = await fetch(METADATA_URL, {
        redirect: "follow"
    })
        .then(res => res.json())
        .then(data => {
            if (!data?.data) throw new Error(`Corrupted assets source`);
            return data;
        })
        .catch((e) => {
            console.log(`${chalk.redBright("[Canvacord]")} ${chalk.whiteBright(`Failed to download assets:\n\t${chalk.redBright(e)}`)}`);
        });

    if (!assetsMeta) {
        console.log(`${chalk.redBright("[Canvacord]")} ${chalk.whiteBright(`Failed assets installation!`)}`);
    } else {
        await fs.promises.writeFile(`${ASSETS_DIR}/meta.json`, JSON.stringify(assetsMeta));
        console.log(`${chalk.greenBright("[Canvacord]")} ${chalk.whiteBright(`Successfully downloaded metadata!`)}`);

        console.log(`${chalk.yellowBright("[Canvacord]")} ${chalk.whiteBright("Downloading images...")}`);
        await Promise.all(assetsMeta.data.images.map(m => downloadAsset(m.url, m.name, true)));
        console.log(`${chalk.yellowBright("[Canvacord]")} ${chalk.whiteBright("Downloading fonts...")}`);
        await Promise.all(assetsMeta.data.fonts.map(m => downloadAsset(m.url, m.name, false)));

        async function downloadAsset(url, name, image) {
            const stream = await fetch(url).then(res => {
                if (!res.ok || !res.body) throw new Error(`[HTTP${res.status}] Could not download ${url}!`);
                return res.body;
            });

            const writer = stream.pipe(fs.createWriteStream(`${ASSETS_DIR}/${image ? "images" : "fonts"}/${name}`));

            writer.on("finish", () => {
                console.log(`${chalk.greenBright("[Canvacord]")} ${chalk.whiteBright(`Successfully downloaded ${chalk.cyanBright(name)}`)}`);
            });
        }
    }
}