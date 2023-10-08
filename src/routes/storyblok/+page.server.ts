import { redirect } from '@sveltejs/kit';

export const load = async () => {
  throw redirect('https://app.storyblok.com/#/login', 301);
};