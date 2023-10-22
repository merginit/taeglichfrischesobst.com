<script lang="ts">
	import { storyblokEditable, type SbBlokData } from '@storyblok/svelte';

	export let blok: SbBlokData;
</script>

<tr use:storyblokEditable={blok}>
	<td>{blok?.event ?? ''}</td>
	<td>{blok?.location ?? ''}</td>
	<td>{blok?.date ?? ''}</td>
	<td>{blok?.time ?? ''}</td>
	{#if blok.tickets !== null && typeof blok.tickets === 'object' && 'url' in blok.tickets}
		<td>{blok?.tickets?.url ?? ''}</td>
	{:else}
		<td>{blok?.tickets ?? ''}</td>
	{/if}
</tr>

<style>
	tr td {
		border: 1px solid #f5f5f5;
		padding: 4px 20px;
	}
	tr {
		transition: all, 0.2s;
	}
	tr:hover {
		background: #f5f5f5;
	}
</style>
