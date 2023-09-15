import { browser } from '$app/environment';

export const openCookieBanner = () => {
	if (browser && window.cc) {
		window.cc.showSettings();
	}
};
