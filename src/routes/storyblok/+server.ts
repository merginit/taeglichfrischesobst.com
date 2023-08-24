import { storyblokApi } from '$server/storyblok';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
    try {
        const slug = url.searchParams.get("slug");

        const response = await storyblokApi.get(`cdn/stories/${slug}`, {
            "version": "published",
            "cv": "CURRENT_TIMESTAMP"
        });

        const body = response.data.story.content.body;

        return json({ data: body });
    } catch (error) {
        console.error(error);

        return json({
            status: error?.status ?? null,
            response: error?.response ?? null
        });
    }
};