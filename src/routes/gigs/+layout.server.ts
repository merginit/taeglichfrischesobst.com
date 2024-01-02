import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async function ({ fetch }) {
	try {
		const response = await fetch('/storyblok?slug=gigs');
		const data = await response.json();
		const fetchedGigs = data.data;

		return { gigs: fetchedGigs };
	} catch (error) {
		console.error(error);

		return null;
	}
};
