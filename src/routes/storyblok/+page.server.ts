import { redirect } from '@sveltejs/kit';

export const load = async () => {
	redirect(301, 'https://app.storyblok.com/#/login');
};
