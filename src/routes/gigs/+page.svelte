<script lang="ts">
	import type { PageData } from './$types';
	import { DataHandler, Datatable, Th } from '@vincjo/datatables';
	import GigRow from '$component/storyBlok/GigRow.svelte';
	import type { Gig } from '$script/types';

	export let data: PageData;

	type GigsData = { gigs?: Gig[] };
	let gigsSource: Gig[] = ((data as unknown as GigsData)?.gigs) ?? [];
	$: gigsSource = ((data as unknown as GigsData)?.gigs) ?? [];

	// @ts-ignore
	const handler = new DataHandler(gigsSource, { rowsPerPage: 50 });
	const gigs = handler.getRows();

	let jsonLdScript: string = '';
 
 $: eventsGraph = (gigsSource || [])
	.filter((gig) => gig?.event && gig?.date)
	.map((gig) => {
		const name = gig?.event ?? '';
		const locationName = gig?.location ?? '';
		const dateStr = gig?.date ?? '';
		const timeStr = gig?.time ?? '';
		let startDate = dateStr;
		let eventDate: Date;
		try {
			const maybe = new Date(timeStr ? `${dateStr}T${timeStr}` : dateStr);
			if (!isNaN(maybe.getTime())) {
				startDate = maybe.toISOString();
				eventDate = maybe;
			} else {
				eventDate = new Date(dateStr);
			}
		} catch (e) {
			eventDate = new Date(dateStr);
		}

		const now = new Date();
		const eventStatus = eventDate < now ? "https://schema.org/EventCompleted" : "https://schema.org/EventScheduled";

		let ticketsUrl: string | undefined = undefined;
		if (gig?.tickets && typeof gig.tickets === 'object' && 'url' in gig.tickets) {
			ticketsUrl = gig.tickets.url as string;
		} else if (typeof gig?.tickets === 'string') {
			ticketsUrl = gig.tickets;
		}

		return {
			"@type": "MusicEvent",
			name,
			startDate,
			url: "https://taeglichfrischesobst.com/gigs",
			performer: {
				"@type": "MusicGroup",
				name: "Täglich frisches Obst"
			},
			organizer: {
				"@type": "Organization",
				name: "Täglich frisches Obst",
				url: "https://taeglichfrischesobst.com"
			},
			eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
			eventStatus,
			...(locationName
				? {
					location: {
						"@type": "Place",
						name: locationName
					}
				}
				: {}),
			...(ticketsUrl
				? {
					offers: {
						"@type": "Offer",
						url: ticketsUrl,
						availability: eventDate < now ? "https://schema.org/SoldOut" : "https://schema.org/InStock"
					}
				}
				: {})
		};
	});

$: jsonLd = {
	"@context": "https://schema.org",
	"@graph": eventsGraph
};

$: jsonLdStr = eventsGraph.length > 0 ? JSON.stringify(jsonLd) : '';
$: {
	if (jsonLdStr) {
		const open = '<script type="application/ld+json">';
		const close = '</' + 'script>';
		const escScriptClose = new RegExp('</' + 'script>', 'gi');
		const escaped = jsonLdStr
			.replace(escScriptClose, '<\\/' + 'script>')
			.replace(/<!--/g, '<\\!--');
		jsonLdScript = `${open}${escaped}${close}`;
	} else {
		jsonLdScript = '';
	}
}
</script>

<svelte:head>
	<link rel="canonical" href="https://taeglichfrischesobst.com/gigs" />
	<title>Gigs & Termine | Täglich frisches Obst – Konzerte, Tourdaten, Tickets</title>
	<meta
		name="description"
		content="Alle kommenden und vergangenen Gigs von Täglich frisches Obst: Termine, Orte, Uhrzeiten und Ticketlinks auf einen Blick."
	/>
	<meta
		name="keywords"
		content="Täglich frisches Obst, Gigs, Termine, Konzerte, Tour, Tourdaten, Live, Tickets, Linz, Österreich, Indie‑Pop"
	/>
	<meta name="robots" content="index,follow" />

	<meta property="og:type" content="website" />
	<meta property="og:locale" content="de_DE" />
	<meta property="og:url" content="https://taeglichfrischesobst.com/gigs" />
	<meta property="og:title" content="Gigs & Termine | Täglich frisches Obst" />
	<meta
		property="og:description"
		content="Kommende und vergangene Konzerte – mit Ort, Datum, Uhrzeit und Ticketlinks."
	/>
	<meta property="og:image" content="/assets/images/logo.png" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Gigs & Termine | Täglich frisches Obst" />
	<meta
		name="twitter:description"
		content="Alle Konzerte von Täglich frisches Obst – Termine, Orte und Tickets."
	/>
	<meta name="twitter:image" content="/assets/images/logo.png" />
	{@html jsonLdScript}
</svelte:head>

<main class="min-h-screen pt-[60px] bg-white">
	<Datatable {handler}>
		<table class="text-black">
			<thead>
				<tr>
					<Th {handler} orderBy="event">Veranstaltung</Th>
					<Th {handler} orderBy="location">Ort</Th>
					<Th {handler} orderBy="date">Datum</Th>
					<Th {handler} orderBy="time">Uhrzeit</Th>
					<Th {handler} orderBy="tickets">Tickets</Th>
				</tr>
			</thead>
			<tbody>
				{#each $gigs as gig}
					<GigRow blok={gig} />
				{:else}
					loading gigs...
				{/each}
			</tbody>
		</table>
	</Datatable>
</main>
