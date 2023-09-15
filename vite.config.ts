import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
/* import basicSsl from '@vitejs/plugin-basic-ssl'; */ /* needed for storyblok dev */

export default defineConfig({
	plugins: [sveltekit()] /* needed for storyblok dev: basicSsl() */,
	ssr: {
		noExternal: ['three', 'troika-three-text']
	},
	server: {
		https: false /* needed for storyblok dev */
	}
});
