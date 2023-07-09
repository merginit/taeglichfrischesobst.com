// Variables and Types
import { SENDGRID_API_KEY, REDIS_CONNECTION } from '$env/static/private';
import type { RequestHandler } from './$types';

// Email
import EmailTemplate from '$email/UnsubscribedFromMaillist.svelte';
import { render } from 'svelte-email';
import sendgrid from '@sendgrid/mail';

// Redis
import { createClient } from 'redis';
const redisDB = createClient({
    url: REDIS_CONNECTION,
});

redisDB.on("connect", function () {
    console.error("Connected to Redis!");
});

redisDB.on("ready", function () {
    console.error("Redis is ready!");
});

redisDB.on("reconnecting", function () {
    console.error("Redis is reconnecting!");
});

redisDB.on("end", function () {
    console.error("Redis connection has ended!");
});

redisDB.on("error", function (err) {
    console.error(err);
});

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const POST = (async ({ request }) => {
    const user = await request.json();
    const email = user?.email;

    if (emailRegex.test(email)) {
        await redisDB.connect();
        const value = await redisDB.get(email);

        if (value === null) {
            // Write to Database
            await redisDB.del(email);
            // Send Email
            const response = await sendEmail(email);
            const success = response[0]?.statusCode === 200 || response[0]?.statusCode === 201 || response[0]?.statusCode === 202;

            await redisDB.disconnect();
            return new Response(JSON.stringify({ success, response: 'Du wurdest erfolgreich entfernt!', objres: response }));
        } else {
            await redisDB.disconnect();
            return new Response(JSON.stringify({ success: false, response: 'Du bist nicht auf der Liste!', objres: null }));
        }
    } else {
        return new Response(JSON.stringify({ success: false, response: 'Ungültige E-Mail Adresse!', objres: null }));
    }
}) satisfies RequestHandler;

async function sendEmail(email: string) {
    sendgrid.setApiKey(SENDGRID_API_KEY);

    const emailHtml = render({
        template: EmailTemplate,
        props: {
            user: email,
        }
    });

    const options = {
        from: 'Täglich Frisches Obst - Gig-Letter <taeglichfrischesobst.noreply@gmail.com>',
        to: email,
        subject: 'Du wurdest erfolgreich aus der Mailingliste von Täglich Frisches Obst entfernt!',
        html: emailHtml,
    };

    return await sendgrid.send(options);
}
