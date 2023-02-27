import GlobalsPlugin from 'esbuild-plugin-globals';
import { swcPlugin } from 'esbuild-plugin-swc';
import { esbuildPluginVersionInjector } from 'esbuild-plugin-version-injector';
import { defineConfig, Options } from 'tsup';

export const tsup = defineConfig( {
	clean: true,
	entry: [ 'src/index.tsx' ],
	esbuildPlugins: [
		GlobalsPlugin( {
			react: 'React',
			'react-dom/client': 'ReactDOM',
		} ),
		esbuildPluginVersionInjector( { versionOrCurrentDate: 'current-date' } ),
		swcPlugin(),
	] as unknown as Options['esbuildPlugins'],
	minify: true,
	sourcemap: true,
	splitting: false,
	target: 'chrome109',
} );
