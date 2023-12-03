// Variables and Types
import type { RequestHandler } from './$types';
import { verifyAsync } from '$server/jwt';
import { JWT_SECRET } from '$env/static/private';
import { redisDB } from '$server/redis';

export const POST = (async ({ request }) => {
	const data = await request.json();
	const key = data?.storedKey;

	try {
		await verifyAsync(key, JWT_SECRET);
		let allKeys: string[];
		let allValues: any[];

		try {
			allKeys = await redisDB.keys('*');
			allValues = await redisDB.mGet(allKeys);
		} catch (err) {
			return new Response(
				JSON.stringify({
					success: false,
					response: (err as any)?.message,
					objres: null
				})
			);
		}

		const objres = allKeys.map((key, index) => ({ key, value: Boolean(allValues[index]) }));

		return new Response(
			JSON.stringify({
				success: true,
				response: 'Aktion erfolgreich!',
				objres: objres
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
}) satisfies RequestHandler;
