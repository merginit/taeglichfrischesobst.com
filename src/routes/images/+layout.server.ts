import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async function ({ fetch }) {
	try {
		const response = await fetch('/storyblok?slug=images');
		const data = await response.json();
		const fetchedImages = data.data;

		return { images: fetchedImages };
	} catch (error) {
		console.error(error);

		return null;
	}
};
