import type { Handle } from '@sveltejs/kit';
import { minify } from 'html-minifier';
import { dev } from '$app/environment';

// https://kit.svelte.dev/docs/migrating#integrations-html-minifier
const minification_options = {
	minifyCSS: true,
	decodeEntities: true,
	useShortDoctype: true,
	collapseWhitespace: true,
	trimCustomFragments: true,
	collapseBooleanAttributes: true,
	removeRedundantAttributes: true,
	processConditionalComments: true
};

export const handle: Handle = async function ({ event, resolve }) {
	let page = '';
	return resolve(event, {
		transformPageChunk: ({ html, done }) => {
			page += html;
			if (done) {
				return dev ? page : minify(page, minification_options);
			}
		}
	});
};
