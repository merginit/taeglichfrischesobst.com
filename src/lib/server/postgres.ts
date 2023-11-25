import { POSTGRES_CONNECTION } from '$env/static/private';
import pg from 'pg'

export const client = new pg.Client(POSTGRES_CONNECTION);

await client.connect();
console.log('Connected to PostgresDB!');

// await client.end();
