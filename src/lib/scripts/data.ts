import type { Gig } from '$script/types';

export const gigs: Gig[] = [
	{
		date: '25.05.2022',
		time: null,
		location: 'Linz',
		event: 'Kultur HOF - "PMI Spotlight"',
		tickets: null
	},
	{
		date: '03.06.2022',
		time: null,
		location: 'Leonding',
		event: 'Rathauskeller',
		tickets: null
	},
	{
		date: '12.06.2022',
		time: null,
		location: 'Linz',
		event: 'Domplatz',
		tickets: null
	},
	{
		date: '23.09.2022',
		time: null,
		location: 'Linz',
		event: 'Hauptplatz - Globaler Klimastreik von Fridays for Future',
		tickets: null
	},
	{
		date: '29.09.2022',
		time: null,
		location: 'Linz',
		event: 'Smaragd',
		tickets: null
	},
	{
		date: '09.12.2022',
		time: null,
		location: 'Linz',
		event: 'Ann and Pat',
		tickets: null
	},
	{
		date: '10.12.2022',
		time: null,
		location: 'Linz',
		event: '"Voice Up"',
		tickets: null
	},
	{
		date: '06.01.2023',
		time: null,
		location: 'Ottensheim',
		event: 'Alter Bauhof',
		tickets: null
	},
	{
		date: '27.01.2023',
		time: null,
		location: 'Linz',
		event: 'Kultur HOF',
		tickets: null
	},
	{
		date: '11.03.2023',
		time: null,
		location: 'Wieselburg-Land (Bodensdorf)',
		event: 'Ballonwirt Aigner',
		tickets: null
	},
	{
		date: '31.03.2023',
		time: null,
		location: 'Wien',
		event: 'Kramladen',
		tickets: null
	},
	{
		date: '18.05.2023',
		time: null,
		location: 'Wien',
		event: 'Club1019',
		tickets: null
	},
	{
		date: '15.07.2023',
		time: '20:00',
		location: 'Gramastetten',
		event: 'Friendsfestival',
		tickets: null
	},
	{
		date: '04.08.2023',
		time: null,
		location: 'Operschall Wien',
		event: 'G5-Event Operschall',
		tickets: 'https://ticket1389.tickethome.at/g5-musicgroup&ref=tfo'
	},
	{
		date: '01.12.2023',
		time: null,
		location: 'Linz',
		event: 'Kultur HOF',
		tickets: null
	}
];

const band_image_path = '/assets/images/band/';
const image_file_extension = 'webp';
export const images = [
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
	},
	{
		URL: `${band_image_path}Still Musikvideo Auf dem Dach ©Niko Nopp.${image_file_extension}`,
		width: 1600,
		height: 1200
	}
];

export const videos = [
	{ videoUrl: 'https://www.youtube-nocookie.com/embed/KpJbtTYWm5Y' },
	{ videoUrl: 'https://www.youtube-nocookie.com/embed/60cndafDX34' }
];
