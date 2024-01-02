<script lang="ts">
	import type { PageData } from './$types';
	import Image from '$component/storyBlok/Image.svelte';

	export let data: PageData;
	$: images = data?.images ?? [];
</script>

<main class="min-h-screen pt-[60px] bg-white">
	{#each images as image}
		<Image blok={image} />
	{:else}
		loading images...
	{/each}
</main>
