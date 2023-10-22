import toast from 'svelte-french-toast';

export const subscribeToMailList = async function (event: Event) {
	await mailListAction(event, 'subscribe-to-maillist');
};

export const unsubscribeFromMailList = async function (event: Event) {
	await mailListAction(event, 'unsubscribe-from-maillist');
};

async function mailListAction(event: Event, endpoint: string) {
	const form = event.target as HTMLFormElement;
	const data = new FormData(form);
	const email = data.get('email')?.toString();

	if (email && email.trim().length > 0) {
		const response = await fetch(`/${endpoint}`, {
			method: 'POST',
			body: JSON.stringify({
				email: email
			}),
			headers: {
				Accept: 'application/json',
				'content-type': 'application/json'
			}
		});

		const res = await response.json();

		if (res.success) {
			toast.success(res.response);
		} else {
			toast.error(res?.response ?? res.message);
		}
	} else {
		toast.error('Bitte gib eine gültige E-Mail Adresse ein!');
	}
}
