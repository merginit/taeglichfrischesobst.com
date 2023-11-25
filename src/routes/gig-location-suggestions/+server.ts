// Variables and Types
import type { RequestHandler } from './$types';
import { client } from '$server/postgres';
import { verifyAsync } from '$server/jwt';
import { JWT_SECRET } from '$env/static/private';

export const POST = (async ({ request }) => {
	const data = await request.json();
  const key = data?.storedKey;

  try {
    await verifyAsync(key, JWT_SECRET);

    const query = `--sql
    SELECT message, country, city, email FROM Gig`;

    const res = await client.query(query);

    return new Response(
      JSON.stringify({
        success: true,
        response: 'Aktion erfolgreich!',
        objres: res.rows,
      }))
  } catch (err) {
    return new Response(
      JSON.stringify({
        success: false,
        response: 'Token ist ungültig!',
        objres: null,
      }))
  }
}) satisfies RequestHandler;
