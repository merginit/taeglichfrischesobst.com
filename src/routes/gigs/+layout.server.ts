import { gigs } from '$script/data';

export async function load({ fetch }) {
	try {
		const response = await fetch('/storyblok?slug=gigs');
		const data = await response.json();
		const fetchedGigs = data.data;

		const gigsObject = { gigs: fetchedGigs.concat(gigs) };

		return gigsObject;
	} catch (error) {
		console.error(error);

		return null;
	}
}
