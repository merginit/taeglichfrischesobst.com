import { apiPlugin, storyblokInit, useStoryblokApi } from '@storyblok/svelte';
import { STORYBLOK_ACCESS_TOKEN } from '$env/static/private';
import Page from '$component/storyBlok/Page.svelte';
import Feature from '$component/storyBlok/Feature.svelte';
import Grid from '$component/storyBlok/Grid.svelte';
import Teaser from '$component/storyBlok/Teaser.svelte';
import Gig from '$component/storyBlok/Gig.svelte';

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
		feature: Feature,
		grid: Grid,
		teaser: Teaser,
		gig: Gig
	}
});

export const storyblokApi = useStoryblokApi();
