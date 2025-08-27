import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'; // import preprocess from 'svelte-preprocess';
import seqPreprocessor from 'svelte-sequential-preprocessor';
import { preprocessThrelte } from '@threlte/preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	build: {
		sourcemap: true
	},
	compilerOptions: {
		enableSourcemap: true
	},
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: seqPreprocessor([
		vitePreprocess({
			sourceMap: true
		}),
		preprocessThrelte()
	]),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		alias: {
			$store: 'src/lib/stores',
			$script: 'src/lib/scripts',
			$server: 'src/lib/server',
			$component: 'src/lib/components',
			$email: 'src/lib/emails',
			$asset: 'src/lib/assets',
			$image: 'src/lib/assets/images',
			$model: 'src/lib/assets/models',
			$main: 'src',
			'@storyblok/svelte': './node_modules/@storyblok/svelte'
		}
	}
};

export default config;
