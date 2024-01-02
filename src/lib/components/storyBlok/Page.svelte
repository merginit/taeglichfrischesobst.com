<script lang="ts">
	import { storyblokEditable, StoryblokComponent, type SbBlokData } from '@storyblok/svelte';

	export let blok: SbBlokData;
	let body = Array.isArray(blok?.body) ? blok.body : [];
</script>

{#key blok}
	<div use:storyblokEditable={blok} class="px-6">
		{#each body as blok}
			<StoryblokComponent {blok} />
		{/each}
	</div>
{/key}
