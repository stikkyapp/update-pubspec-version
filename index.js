const core = require('@actions/core');


try {
    const strategy = core.getInput('strategy');
    const path = core.getInput('path');
    const bumpBuild = core.getInput('bump-build');
    core.debug(`📝 Using strategy ${strategy}`);
    core.debug(`📝 Using bump-build ${bumpBuild}`);
    core.info(`✅ Using pubspec.yaml at ${path}`);
    const versionUtils = require('./version-utils');
    const oldVersion = versionUtils.readVersion(path);
    core.info(`📀 Found version ${oldVersion}`);
    const newVersion = versionUtils.bumpVersion(path, strategy, bumpBuild);
    core.info(`🚀 Successfully bumped version to ${newVersion}`);

    core.setOutput("old-version", oldVersion);
    core.setOutput("new-version", newVersion);
} catch (error) {
    core.setFailed(`❌ ${error.message}`);
}