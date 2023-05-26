function readYaml(path) {
    const fs = require('fs');
    const yaml = require('js-yaml');
    const fileContents = fs.readFileSync(path, 'utf8');
    return yaml.load(fileContents);
}

function getLongVersion(path) {
    const pubspec = readYaml(path);
    if (!pubspec.version) {
        throw new Error("Version not found");
    }
    return pubspec.version;
}

function getShortVersion(path) {
    const version = getLongVersion(path);
    const split = version.split("+");
    return split[0];
}

function getBuildNumber(path) {
    const version = getLongVersion(path);
    const versionSplit = version.split("+");
    if (versionSplit.length === 1) {
        return 0;
    } else if (versionSplit.length === 2) {
        return parseInt(versionSplit[1]);
    }
    throw new Error("Invalid version format");
}

function bumpBuildNumber(path) {
    const build = getBuildNumber(path);
    const pubspec = readYaml(path);
    pubspec.version = pubspec.version.split("+")[0] + "+" + (build + 1).toString();
    const fs = require('fs');
    const yaml = require('js-yaml');
    fs.writeFileSync(path, yaml.dump(pubspec));
    return build + 1;
}

function bumpVersion(path, strategy) {
    if (strategy === "none") {
        return getLongVersion(path);
    }
    const pubspec = readYaml(path);
    const version = getShortVersion(path);
    const semverInc = require('semver/functions/inc')
    pubspec.version = semverInc(version, strategy) + "+" + getBuildNumber(path).toString();
    const fs = require('fs');
    const yaml = require('js-yaml');
    fs.writeFileSync(path, yaml.dump(pubspec));
    return pubspec.version;
}


module.exports = {
    readYaml,
    getLongVersion,
    getShortVersion,
    getBuildNumber,
    bumpBuildNumber,
    bumpVersion,
}