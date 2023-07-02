import WelcomeEmail from '$email/WelcomeToMaillist.svelte';
import { SENDGRID_API_KEY } from '$env/static/private';
import type { RequestHandler } from './$types';
import { render } from 'svelte-email';
import sendgrid from '@sendgrid/mail';

export const POST = (async ({ request }) => {
    const user = await request.json();
    const email = user?.email;

    sendgrid.setApiKey(SENDGRID_API_KEY);

    const emailHtml = render({
        template: WelcomeEmail,
        props: {
            user: email,
        }
    });

    const options = {
        from: 'Täglich Frisches Obst - Gig-Letter <taeglichfrischesobst.noreply@gmail.com>',
        to: email,
        subject: 'Willkommen auf der Mailingliste von Täglich Frisches Obst!',
        html: emailHtml,
    };

    const response = await sendgrid.send(options);

    return new Response(JSON.stringify({ response }));
}) satisfies RequestHandler;