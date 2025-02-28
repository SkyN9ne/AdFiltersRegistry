/* globals require, __dirname, process */
const { formatDate } = require('./utils/strings');

let whitelist = [];
let blacklist = [];

let args = process.argv.slice(2);
args.forEach(function (val) {
    if (val.startsWith('-i=')) {
        whitelist = whitelist.concat(val.substr(3).split(',').map(x => Number.parseInt(x)));
    }

    if (val.startsWith('-s=')) {
        blacklist = blacklist.concat(val.substr(3).split(',').map(x => Number.parseInt(x)));
    }
});

const fs = require('fs');
const path = require('path');
const compiler = require("adguard-filters-compiler");

const filtersDir = path.join(__dirname, './filters');
const logPath = path.join(__dirname, './log.txt');

let reportPath = path.join(__dirname, './report.txt');
if (whitelist.length > 0 || blacklist.length > 0) {
    // report_DD-MM-YYYY_HH-MM-SS.txt
    reportPath = path.join(__dirname, `./report_${formatDate(new Date())}.txt`);
}

const customPlatformsConfig = require('./custom_platforms.js');
const platformsPath = path.join(__dirname, './platforms');

/**
 * Compiler entry point.
 */
async function main() {
    await compiler.compile(
        filtersDir,
        logPath,
        reportPath,
        platformsPath,
        whitelist,
        blacklist,
        customPlatformsConfig,
    );
}

main();
