import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import basicSsl from "@vitejs/plugin-basic-ssl";

export default defineConfig({
	plugins: [sveltekit(), basicSsl()],
	ssr: {
		noExternal: ['three', 'troika-three-text']
	},
	server: {
		https: true,
	},
});
