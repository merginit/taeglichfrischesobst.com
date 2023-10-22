<script lang="ts">
	import { storyblokEditable, type SbBlokData } from '@storyblok/svelte';

	export let blok: SbBlokData;
</script>

<div use:storyblokEditable={blok}>
	{blok.event}
	{blok.location}
	{blok.date}
	{blok.time}
	{#if blok.tickets !== null && typeof blok.tickets === 'object' && 'url' in blok.tickets}
		{blok.tickets?.url ?? null}
	{/if}
</div>
