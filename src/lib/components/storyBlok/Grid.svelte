<script lang="ts">
	import { storyblokEditable, StoryblokComponent, type SbBlokData } from '@storyblok/svelte';

	export let blok: SbBlokData;
</script>

<div
	use:storyblokEditable={blok}
	class="container grid gap-16 mx-auto md:grid-cols-3 place-items-center"
>
	{#each blok.columns as blok}
		<div class="flex-auto px-6">
			<StoryblokComponent {blok} />
		</div>
	{/each}
</div>
