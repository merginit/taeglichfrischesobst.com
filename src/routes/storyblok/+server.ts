import { storyblokApi } from '$server/storyblok';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	try {
		const slug = url.searchParams.get('slug');

		const response = await storyblokApi.get(`cdn/stories/${slug}`, {
			version: 'published',
			// @ts-ignore
			cv: 'CURRENT_TIMESTAMP'
		});

		const body = response.data.story.content.body;

		return json({ data: body });
	} catch (error) {
		console.error(error);

		return json({
			// @ts-ignore
			status: error?.status ?? null,
			// @ts-ignore
			response: error?.response ?? null
		});
	}
};
