const versionUtils = require('../version-utils');
const filePath = "pubspec.yaml";
const fs = require('fs');
jest.mock('fs');

describe('bumpBuildNumber', () => {
    test('should bump the build number', () => {
        fs.readFileSync.mockReturnValue("version: 1.0.0+2");
        const build = versionUtils.bumpBuildNumber(filePath);
        expect(build).toEqual(3);
    });

    test('should bump the build number', () => {
        fs.readFileSync.mockReturnValue("version: 1.0.0");
        const build = versionUtils.bumpBuildNumber(filePath);
        expect(build).toEqual(1);
    });

    test('should fail if version has invalid format', () => {
        fs.readFileSync.mockReturnValue("version: 1.0.0+2+3");
        expect(() => versionUtils.bumpBuildNumber(filePath)).toThrow();
    })
});

describe('bumpVersion', () => {
    test('should bump version with strategy patch', () => {
        fs.readFileSync.mockReturnValue("version: 1.0.0+1");
        const version = versionUtils.bumpVersion(filePath, 'patch');
        expect(version).toEqual("1.0.1+1");
    });

    test('should bump version with strategy minor', () => {
        fs.readFileSync.mockReturnValue("version: 1.0.0+1");
        const version = versionUtils.bumpVersion(filePath, 'minor');
        expect(version).toEqual("1.1.0+1");
    });

    test('should bump version with strategy major', () => {
        fs.readFileSync.mockReturnValue("version: 1.0.0+1");
        const version = versionUtils.bumpVersion(filePath, 'major');
        expect(version).toEqual("2.0.0+1");
    });

    test('should fail if version cannot be found', () => {
        fs.readFileSync.mockReturnValue("");
        expect(() => versionUtils.bumpVersion(filePath, 'major')).toThrow();
    });

    test('should return current version for strategy none', () => {
        fs.readFileSync.mockReturnValue("version: 1.0.0");
        const version = versionUtils.bumpVersion(filePath, 'none');
        expect(version).toEqual("1.0.0");
    });
});

describe('getBuildNumber', () => {
    test('should extract build number from version', () => {
        fs.readFileSync.mockReturnValue("version: 1.0.0+10");
        const build = versionUtils.getBuildNumber(filePath);
        expect(build).toEqual(10);
    });

    test('should use 0 if build number is not set', () => {
        fs.readFileSync.mockReturnValue("version: 1.0.0");
        const build = versionUtils.getBuildNumber(filePath);
        expect(build).toEqual(0);
    });

    test('should fail if version has invalid format', () => {
        fs.readFileSync.mockReturnValue("version: 1.0.0+1+beta");
        expect(() => versionUtils.getBuildNumber(filePath)).toThrow();
    });
});

describe('readVersion', () => {
    test('should fail if version cannot be found', () => {
        fs.readFileSync.mockReturnValue("");
        expect(() => versionUtils.readVersion(filePath)).toThrow();
    });

    test('should return version from yaml', () => {
        fs.readFileSync.mockReturnValue("version: whatever");
        const version = versionUtils.readVersion(filePath);
        expect(version).toEqual('whatever');
    });
});

describe('getShortVersion', () => {
    test('should fail if version cannot be found', () => {
        fs.readFileSync.mockReturnValue("");
        expect(() => versionUtils.getShortVersion(filePath)).toThrow();
    });

    test('should return version without build number', () => {
        fs.readFileSync.mockReturnValue("version: 1.0.0+1");
        const version = versionUtils.getShortVersion(filePath);
        expect(version).toEqual('1.0.0');
    });

    test('should not fail if build number is not set', () => {
        fs.readFileSync.mockReturnValue("version: 1.0.0");
        const version = versionUtils.getShortVersion(filePath);
        expect(version).toEqual('1.0.0');
    });
});

