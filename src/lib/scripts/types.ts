export interface StoryblokAsset {
	component: string
	_uid: string
}

export interface StoryblokImageAsset extends StoryblokAsset {
	png: {
		alt: string
		copyright: string
		fieldtype: string
		filename: string
		focus: string
		id: number
		is_external_url: boolean
		is_private: string
		meta_data: Object
		name: string
		source: string
		title: string
	}
	webp: {
		alt: string
		copyright: string
		fieldtype: string
		filename: string
		focus: string
		id: number
		is_external_url: boolean
		is_private: string
		meta_data: Object
		name: string
		source: string
		title: string
	}
}

export interface Gig {
	date: string
	time: string | null
	location: string
	event: string
	tickets: { url: string } | string | boolean | null
}

export interface Image {
	webp: {
		src: string
		copyright: string
		title: string
		alt: string
		source: string
	},
	png: {
		src: string
		copyright: string
		title: string
		alt: string
		source: string
	}
	width: number
	height: number
}

export interface Video {
	videoUrl: string
}
