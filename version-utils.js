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

function bumpBuildNumber(path) {
    const build = getBuildNumber(path) + 1;
    const version = getShortVersion(path);
    const newVersion = version + "+" + build.toString();
    writeVersion(path, newVersion);
    return build;
}

function bumpVersion(path, strategy) {
    if (strategy === "none") {
        return readVersion(path);
    }
    const version = getShortVersion(path);
    const build = getBuildNumber(path).toString();
    const semverInc = require('semver/functions/inc')
    const newVersion = semverInc(version, strategy) + "+" + build;
    writeVersion(path, newVersion);
    return newVersion;
}


module.exports = {
    readVersion,
    getShortVersion,
    getBuildNumber,
    bumpBuildNumber,
    bumpVersion,
}