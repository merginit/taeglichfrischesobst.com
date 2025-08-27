<script lang="ts">
	import type { PageData } from './$types';
	import { DataHandler, Datatable, Th } from '@vincjo/datatables';
	import GigRow from '$component/storyBlok/GigRow.svelte';

	export let data: PageData;

	// @ts-ignore
	const handler = new DataHandler(data?.gigs, { rowsPerPage: 50 });
	const gigs = handler.getRows();
</script>

<svelte:head>
	<link rel="canonical" href="https://taeglichfrischesobst.com/gigs" />
	<title>Gigs & Termine | Täglich frisches Obst – Konzerte, Tourdaten, Tickets</title>
	<meta name="description" content="Alle kommenden und vergangenen Gigs von Täglich frisches Obst: Termine, Orte, Uhrzeiten und Ticketlinks auf einen Blick." />
	<meta name="keywords" content="Täglich frisches Obst, Gigs, Termine, Konzerte, Tour, Tourdaten, Live, Tickets, Linz, Österreich, Indie‑Pop" />
	<meta name="robots" content="index,follow" />

	<meta property="og:type" content="website" />
	<meta property="og:locale" content="de_DE" />
	<meta property="og:url" content="https://taeglichfrischesobst.com/gigs" />
	<meta property="og:title" content="Gigs & Termine | Täglich frisches Obst" />
	<meta property="og:description" content="Kommende und vergangene Konzerte – mit Ort, Datum, Uhrzeit und Ticketlinks." />
	<meta property="og:image" content="/assets/images/logo.png" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Gigs & Termine | Täglich frisches Obst" />
	<meta name="twitter:description" content="Alle Konzerte von Täglich frisches Obst – Termine, Orte und Tickets." />
	<meta name="twitter:image" content="/assets/images/logo.png" />
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
