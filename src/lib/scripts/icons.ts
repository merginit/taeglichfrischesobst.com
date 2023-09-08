import { browser } from '$app/environment';

class IconLoader {
	private static instance: IconLoader;
	private remainingIcons = -1;

	public static getInstance(): IconLoader {
		if (!IconLoader.instance) {
			IconLoader.instance = new IconLoader();
		}

		IconLoader.instance.getTotalIcons();

		return IconLoader.instance;
	}

	public getTotalIcons(): void {
		if (browser && this.remainingIcons === -1) {
			this.remainingIcons = document.getElementsByClassName('iconify-icon').length;
			console.log(this.remainingIcons);
		}
	}

	public iconLoaded(): void {
		this.remainingIcons -= 1;

		if (this.remainingIcons === 0) {
			console.log('all icons loaded');
		}
	}
}

export default IconLoader;
