import { browser } from '$app/environment';

export const embeddedAccepted = () => {
	if (browser && window.cc) {
		return window.cc.get('level').includes('embedding');
	}
};
