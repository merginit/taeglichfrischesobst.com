<script lang="ts">
	import type { PageData } from './$types';
	import ImageFullWidth from '$component/storyBlok/ImageFullWidth.svelte';

	export let data: PageData;

	// @ts-ignore
	$: images = data?.images ?? [];
</script>

<main class="min-h-screen pt-[60px] bg-white">
	{#each images as image}
		<ImageFullWidth blok={image} />
	{:else}
		loading images...
	{/each}
</main>
