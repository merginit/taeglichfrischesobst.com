import { browser } from '$app/environment';

class IconLoader {
	private static instance: IconLoader;
	private remainingIcons = -1;

	private constructor() {
		if (browser && this.remainingIcons === -1) {
			this.remainingIcons = document.getElementsByClassName('iconify-icon').length;
			console.log(this.remainingIcons);
		}
	}

	public static getInstance(): IconLoader {
		if (!IconLoader.instance) {
			IconLoader.instance = new IconLoader();
		}
		return IconLoader.instance;
	}

	public iconLoaded(): void {
		this.remainingIcons -= 1;

		if (this.remainingIcons === 0) {
			console.log('all icons loaded');
		}
	}
}

export default IconLoader;
