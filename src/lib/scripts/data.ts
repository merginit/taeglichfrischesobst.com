import type { Gig, Image, Video } from '$script/types';

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

const band_image_path = '/assets/images/band/';
const image_file_extension = 'webp';
export const images: Image[] = [
	{
		URL: `${band_image_path}Alter Bauhof Ottensheim 6.1.23 01 F ©Simon Rauch.${image_file_extension}`,
		width: 2048,
		height: 1365
	},
	{
		URL: `${band_image_path}Alter Bauhof Ottensheim 6.1.23 02 F ©Simon Rauch.${image_file_extension}`,
		width: 2048,
		height: 1365
	},
	{
		URL: `${band_image_path}Josef_Jakob_Vinny_Tobi ©Niko Nopp.${image_file_extension}`,
		width: 1600,
		height: 900
	},
	{
		URL: `${band_image_path}Kramladen 31.03.23 _ 01 ©Simon Rauch.${image_file_extension}`,
		width: 2048,
		height: 1365
	},
	{
		URL: `${band_image_path}Kramladen 31.03.23 _ 02 ©Simon Rauch.${image_file_extension}`,
		width: 2048,
		height: 1365
	},
	{
		URL: `${band_image_path}Kramladen 31.03.23 _ 03 ©Simon Rauch.${image_file_extension}`,
		width: 2048,
		height: 1365
	},
	{
		URL: `${band_image_path}Kramladen 31.03.23 _ 04 ©Simon Rauch.${image_file_extension}`,
		width: 3000,
		height: 2000
	},
	{
		URL: `${band_image_path}Kramladen 31.03.23 _ 05 ©Simon Rauch.${image_file_extension}`,
		width: 1796,
		height: 1194
	},
	{
		URL: `${band_image_path}Kramladen 31.03.23 ©Simon Rauch.${image_file_extension}`,
		width: 3000,
		height: 2000
	},
	{
		URL: `${band_image_path}Kultur HOF Linz 27.1.23 01 ©Simon Rauch.${image_file_extension}`,
		width: 2048,
		height: 1365
	},
	{
		URL: `${band_image_path}Kultur HOF Linz 27.1.23 02 ©Simon Rauch.${image_file_extension}`,
		width: 2048,
		height: 1365
	}
];

export const videos: Video[] = [
	{ videoUrl: 'https://www.youtube-nocookie.com/embed/KpJbtTYWm5Y' },
	{ videoUrl: 'https://www.youtube-nocookie.com/embed/60cndafDX34' }
];
