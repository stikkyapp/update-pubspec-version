<h1 align="center">
    <a href="https://stikky.co/">
        <img width=100 src="https://avatars.githubusercontent.com/u/99006953">
    </a>
    <br>
    Update pubspec.yaml version action
</h1>

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
uses: stikkyapp/update-pubspec-version@v2
with:
  strategy: 'patch'
  bump-build: true
  path: './pubspec.yaml'
```