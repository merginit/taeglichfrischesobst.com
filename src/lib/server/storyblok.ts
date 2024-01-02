import { apiPlugin, storyblokInit, useStoryblokApi } from '@storyblok/svelte';
import { STORYBLOK_ACCESS_TOKEN } from '$env/static/private';
import Page from '$component/storyBlok/Page.svelte';
import Gig from '$component/storyBlok/GigRow.svelte';
import Image from '$component/storyBlok/ImageFullWidth.svelte';

storyblokInit({
	accessToken: STORYBLOK_ACCESS_TOKEN,
	use: [apiPlugin],
	apiOptions: {
		region: 'eu',
		cache: {
			type: 'memory',
			clear: 'auto'
		}
	},
	components: {
		page: Page,
		image: Image,
		gig: Gig
	}
});

export const storyblokApi = useStoryblokApi();
