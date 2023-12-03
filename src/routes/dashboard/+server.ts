// Variables and Types
import type { RequestHandler } from './$types';
import { signAsync, verifyAsync } from '$server/jwt';
import { JWT_SECRET, DASHBOARD_PASSWORD } from '$env/static/private';

export const POST = (async ({ request }) => {
	const data = await request.json();
	const password = data?.formData?.password;
	const key = data?.storedKey;

	if (password?.length > 0 && password === DASHBOARD_PASSWORD) {
		if (key !== 'null' && key !== undefined && key !== null) {
			return validateKey(key);
		} else {
			const token = await signAsync({ password: password }, JWT_SECRET, { expiresIn: '1h' });

			return new Response(
				JSON.stringify({
					success: true,
					response: 'Neuer Token wurde erstellt!',
					objres: token
				})
			);
		}
	} else if (key) {
		return validateKey(key);
	} else {
		return new Response(
			JSON.stringify({ success: false, response: 'Ungültiges Passwort!', objres: null })
		);
	}
}) satisfies RequestHandler;

async function validateKey(key: string) {
	try {
		await verifyAsync(key, JWT_SECRET);

		return new Response(
			JSON.stringify({
				success: true,
				response: 'Login erfolgreich!',
				objres: true
			})
		);
	} catch (err) {
		return new Response(
			JSON.stringify({
				success: false,
				response: 'Token ist ungültig!',
				objres: null
			})
		);
	}
}
