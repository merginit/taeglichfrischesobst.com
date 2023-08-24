<script lang="ts">
	import { storyblokEditable, type SbBlokData } from '@storyblok/svelte';

	export let blok: SbBlokData;
</script>

<div use:storyblokEditable={blok}>
	{blok.event}
	{blok.location}
	{blok.date}
	{blok.time}
	{blok.tickets?.url ?? null}
</div>
