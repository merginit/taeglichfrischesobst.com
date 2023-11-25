export const compareDates = (a: string, b: string) => {
	const dateA = new Date(a.split('.').reverse().join('-'));
	const dateB = new Date(b.split('.').reverse().join('-'));
	return dateB.getTime() - dateA.getTime();
};

export const isFutureDate = (date: string) => {
	const currentDate = new Date();
	return new Date(date.split('.').reverse().join('-')) > currentDate;
};

export const dateOfString = (date: string) => {
	const parts = date.split('.');
	const year = parseInt(parts[2], 10);
	const month = parseInt(parts[1], 10) - 1;
	const day = parseInt(parts[0], 10);
	const final_date = new Date(year, month, day);

	return final_date;
};

export const hslToHex = (h: number, s: number, l: number) => {
	l /= 100;
	const a = (s * Math.min(l, 1 - l)) / 100;
	const f = (n: number) => {
		const k = (n + h / 30) % 12;
		const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
		return Math.round(255 * color)
			.toString(16)
			.padStart(2, '0'); // convert to Hex and prefix "0" if needed
	};
	return `#${f(0)}${f(8)}${f(4)}`;
};

export function setCookie(name: string, value: string, hours: number): void {
	const date = new Date();
	date.setTime(date.getTime() + hours * 60 * 60 * 1000);
	const expires = "expires=" + date.toUTCString();
	document.cookie = name + "=" + value + "; " + expires + "; path=/";
}

export function getCookie(name: string): string | null {
	const decodedCookie = decodeURIComponent(document.cookie);
	const cookies = decodedCookie.split(';');
	for (let i = 0; i < cookies.length; i++) {
		const cookie = cookies[i].trim();
		if (cookie.startsWith(name + '=')) {
			return cookie.substring(name.length + 1);
		}
	}
	return null;
}