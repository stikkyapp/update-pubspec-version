# Update pubspec.yaml version action

This action updates the version in pubspec.yaml file. It allows for incrementing the build number or the version by a major, minor or patch version.

## Inputs

| Input         | Description                                                           | Required | Default          |
|---------------|-----------------------------------------------------------------------|----------|------------------|
| `strategy`    | The versioning strategy. Can be `major`, `minor`, `patch`, or `none`. | false    | `none`           |
| `bump-build`  | Whether to bump the build number.                                     | false    | `false`          |
| `path`        | The path to the `pubspec.yaml` file.                                  | false    | `./pubspec.yaml` |

## Outputs

### `old-version`

The old version of the project.

### `new-version`

The new version of the project.

## Example usage

```yaml
uses: stikkyapp/update-pubspec-version@v1
with:
  strategy: 'patch'
  bump-build: true
  path: './pubspec.yaml'
```