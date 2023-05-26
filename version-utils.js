function readVersion(path) {
    const fs = require('fs');
    const fileContents = fs.readFileSync(path, 'utf8');
    for (const line of fileContents.split("\n")) {
        if (line.startsWith("version:")) {
            return line.replace("version:", "").trim();
        }
    }
    throw new Error("Version not found");
}

function writeVersion(path, version) {
    const fs = require('fs');
    const fileContents = fs.readFileSync(path, 'utf8');
    const lines = fileContents.split("\n");
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith("version:")) {
            lines[i] = "version: " + version;
        }
    }
    fs.writeFileSync(path, lines.join("\n"), 'utf8');
}

function getShortVersion(path) {
    const version = readVersion(path);
    const split = version.split("+");
    return split[0];
}

function getBuildNumber(path) {
    const version = readVersion(path);
    const versionSplit = version.split("+");
    if (versionSplit.length === 1) {
        return 0;
    } else if (versionSplit.length === 2) {
        return parseInt(versionSplit[1]);
    }
    throw new Error("Invalid version format");
}

function bumpVersion(path, strategy, bumpBuild) {
    if (strategy === "none") {
        return readVersion(path);
    }
    let version = getShortVersion(path);
    if (strategy !== "none") {
        const semverInc = require('semver/functions/inc')
        version = semverInc(version, strategy);
    }
    let build = getBuildNumber(path);
    if (bumpBuild) {
        build++;
    }
    const newVersion = version + "+" + build.toString();
    writeVersion(path, newVersion);
    return newVersion;
}


module.exports = {
    readVersion,
    getShortVersion,
    getBuildNumber,
    bumpVersion,
}