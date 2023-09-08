export const compareDates = (a: string, b: string) => {
	const dateA = new Date(a.split('.').reverse().join('-'));
	const dateB = new Date(b.split('.').reverse().join('-'));
	return dateB.getTime() - dateA.getTime();
};

export const isFutureDate = (date: string) => {
	const currentDate = new Date();
	return new Date(date.split('.').reverse().join('-')) > currentDate;
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
