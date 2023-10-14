import { writable, derived } from 'svelte/store';

export const navigationHeight = writable(0);

export const sectionMarginTop = derived(
	navigationHeight,
	($navigationHeight) => $navigationHeight / 8
);

export const gigsSectionHeight = writable(0);
export const musicSectionHeight = writable(0);
export const videosSectionHeight = writable(0);
export const gallerySectionHeight = writable(0);
export const infoSectionHeight = writable(0);
export const contactSectionHeight = writable(0);
