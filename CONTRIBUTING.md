# Package Manager

We use [Yarn 4](https://yarnpkg.com/getting-started/install) as a package manager.

## Configure Project

- `corepack enable`
- `yarn install`

## Configure VSCode

- `yarn dlx @yarnpkg/sdks vscode`

Ref: https://yarnpkg.com/getting-started/editor-sdks

You may need to reload/restart your VSCode after this to put the changes in effect.

# Linting & Formatting

We use [Biome](https://biomejs.dev) to enforce linting rules and format our code.

## Configure VSCode

Add below JSON configuration in your workspace settings (`./.vscode/settings.json`) in your local git repository.

This file is ignored in git version control. So it won't be committed. It's for you to configure your workspace settings in VSCode.

```json
{
	...

	"editor.codeActionsOnSave": {
		"quickfix.biome": true,
		"source.organizeImports.biome": true
	},
	"editor.formatOnSave": true,
	"[json]": {
		"editor.defaultFormatter": "biomejs.biome"
	},
	"[javascript]": {
		"editor.defaultFormatter": "biomejs.biome"
	},
	"[javascriptreact]": {
		"editor.defaultFormatter": "biomejs.biome"
	},
	"[typescript]": {
		"editor.defaultFormatter": "biomejs.biome"
	},
	"[typescriptreact]": {
		"editor.defaultFormatter": "biomejs.biome"
	}

	...
}
```
