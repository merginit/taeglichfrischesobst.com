<script lang="ts">
	import type { PageData } from './$types';
	import { DataHandler, Datatable, Th } from '@vincjo/datatables';
	import GigRow from '$component/storyBlok/GigRow.svelte';

	export let data: PageData;

	// @ts-ignore
	const handler = new DataHandler(data?.gigs, { rowsPerPage: 50 });
	const gigs = handler.getRows();
</script>

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
