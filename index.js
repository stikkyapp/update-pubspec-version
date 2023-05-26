const core = require('@actions/core');

function getPubspecPath(parentDirectory) {
    const fs = require('fs');
    const path = require('path');
    const files = fs.readdirSync(parentDirectory);
    core.debug(`📝 Found files ${files}`);
    const pubspec = files.find(file => file === "pubspec.yaml");
    if (pubspec) {
        return path.join(parentDirectory, pubspec);
    }
    throw new Error("pubspec.yaml not found");
}

try {
    const strategy = core.getInput('strategy');
    const path = core.getInput('path');
    const bumpBuild = core.getInput('bump-build');
    const pubspecPath = getPubspecPath(path);
    core.debug(`📝 Using strategy ${strategy}`);
    core.debug(`📝 Using path ${path}`);
    core.debug(`📝 Using bump-build ${bumpBuild}`);
    core.info(`✅ Found pubspec.yaml at ${pubspecPath}`);
    const versionUtils = require('./version-utils');
    const oldVersion = versionUtils.readVersion(pubspecPath);
    core.info(`📀 Found version ${oldVersion}`);
    const newVersion = versionUtils.bumpVersion(pubspecPath, strategy, bumpBuild);
    core.info(`🚀 Successfully bumped version to ${newVersion}`);

    core.setOutput("old-version", oldVersion);
    core.setOutput("new-version", newVersion);
} catch (error) {
    core.setFailed(`❌ ${error.message}`);
}