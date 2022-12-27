#!/usr/bin/env node
const { version, repository } = require("../package.json");
const args = process.argv.slice(2).map(parseArgs);

function parseArgs(arg) {
    if (arg.includes("=")) {
        const [k, v] = arg.split("=");
        return { [k]: v };
    }
    return { [arg]: arg };
}

function getArgs(name) {
    const found = args.find(x => x[name]);
    if (found) return found[name];
}

const assetsBuilder = (force) => import("../scripts/assets/build.mjs").then(res => res.build(force));
const chalkImport = import("chalk").then(res => res.default || res);
/**
 * @type {import("chalk").default}
 */
let chalk;

async function main() {
    if (!chalk) chalk = await chalkImport;
    const helpMessage = `Commands usage: ${chalk.grey(`${chalk.yellow("canvacord")} ${chalk.blue("<command_name>")} [options]`)}
${chalk.blue("help")}               : shows this menu
${chalk.blue("rebuild")} ${chalk.grey(`[--force]`)}  : rebuilds assets
${chalk.blue("version")}            : shows canvacord version info
${chalk.blue("github")}             : returns github repository url for canvacord

${chalk.cyanBright(`Canvacord v${version}`)}`;
    if (getArgs("rebuild")) {
        if (getArgs("--help")) return console.log(`Rebuilds assets cache.\n\nExamples:\n${chalk.blue("canvacord")} ${chalk.blue("rebuild")}\n${chalk.blue("canvacord")} ${chalk.blue("rebuild")} ${chalk.grey("--force")}`);
        return await assetsBuilder(!!getArgs("--force"));
    }
    if (getArgs("version")) return console.log(chalk.cyan(`Canvacord v${version}`));
    if (getArgs("github")) return console.log(chalk.blue(repository.url.replace("git+", "")));
    console.log(helpMessage);
}

main();