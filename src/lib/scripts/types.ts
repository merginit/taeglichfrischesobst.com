export interface Gig {
	date: string;
	time: string | null;
	location: string;
	event: string;
	tickets: { url: string } | string | boolean | null;
}

export interface Image {
	URL: string;
	width: number;
	height: number;
}

export interface Video {
	videoUrl: string;
}
