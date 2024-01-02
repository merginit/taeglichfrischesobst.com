import type { Gig, StoryblokImageAsset, Video } from '$script/types';

export const fetchGigs = async function () {
	const response = await fetch('/storyblok?slug=gigs');
	const data = await response.json();
	const fetchedGigs = data.data;

	fetchedGigs.forEach((gig: Gig) => {
		// format date
		if (gig.date) {
			const parsedDate = new Date(gig.date);
			const day = parsedDate.getDate().toString().padStart(2, '0');
			const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0');
			const year = parsedDate.getFullYear();

			gig.date = `${day}.${month}.${year}`;
		}

		// format ticket url
		if (gig.tickets !== null && typeof gig.tickets === 'object' && 'url' in gig.tickets) {
			gig.tickets = gig.tickets.url;
		}
	});

	return fetchedGigs;
};

export const fetchImages = async function () {
	const response = await fetch('/storyblok?slug=images');
	const data = await response.json();
	const fetchedImages = data.data;

	const fetchedImagesAsImagesType = fetchedImages.map((image: StoryblokImageAsset) => {
		const dimensions = (image.webp?.filename || image.png?.filename)?.split('/')[5]?.split('x');
		const splitName = (image.webp?.filename || image.png?.filename)?.split('-');
		const slicedName = splitName.slice(-2);
		const couldBeAuthor = `${slicedName[0]?.replace(' ', '')} ${slicedName[1]?.replace('.webp', '')?.replace('.png', '')}`;

		return {
			width: dimensions ? parseInt(dimensions[0]) : undefined,
			height: dimensions ? parseInt(dimensions[1]) : undefined,
			webp: {
				src: image.webp?.filename,
				copyright: image.webp?.copyright?.trim() === "" ? couldBeAuthor : image.webp?.copyright,
				title: image.webp?.title ?? image.webp?.alt,
				alt: image.webp?.alt ?? image.webp?.title ?? image.webp?.filename?.split('©')[1]?.split('.')[0],
				source: image.webp?.source ?? "a.storyblok.com/f"
			},
			png: {
				src: image.png?.filename,
				copyright: image.webp?.copyright?.trim() === "" ? couldBeAuthor : image.webp?.copyright,
				title: image.png?.title ?? image.png?.alt,
				alt: image.png?.alt ?? image.png?.title ?? image.png?.filename?.split('©')[1]?.split('.')[0],
				source: image.png?.source ?? "a.storyblok.com/f"
			}
		};
	});

	return await fetchedImagesAsImagesType;
};

export const videos: Video[] = [
	{ videoUrl: 'https://www.youtube-nocookie.com/embed/KpJbtTYWm5Y' },
	{ videoUrl: 'https://www.youtube-nocookie.com/embed/60cndafDX34' }
];
