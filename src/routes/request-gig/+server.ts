// Variables and Types
import type { RequestHandler } from './$types';
import { client } from '$server/postgres';

export const POST = (async ({ request }) => {
	const data = await request.json();
	const values = data?.values;

	const query = `--sql
	INSERT INTO Gig (message, country, city, email) VALUES ($1, $2, $3, $4)`;

	if (Array.isArray(values) && values.length === 4) {
		try {
			const res = await client.query(query, values);

			return new Response(
				JSON.stringify({
					success: true,
					response: 'Dein Vorschlag wurde eingereicht!',
					objres: res.rows[0]
				})
			);
		} catch (err) {
			console.error('PostgresDB Error!', err);
			return new Response(
				JSON.stringify({
					success: false,
					response: 'Fehler beim Einreichen des Vorschlags!',
					objres: null
				})
			);
		} finally {
			// await client.end();
		}
	} else {
		return new Response(
			JSON.stringify({ success: false, response: 'Ungültiger Vorschlag!', objres: null })
		);
	}
}) satisfies RequestHandler;
