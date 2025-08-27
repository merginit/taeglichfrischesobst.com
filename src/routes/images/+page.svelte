<script lang="ts">
	import type { PageData } from './$types';
	import ImageFullWidth from '$component/storyBlok/ImageFullWidth.svelte';

	export let data: PageData;

	// @ts-ignore
	$: images = data?.images ?? [];
</script>

<svelte:head>
	<link rel="canonical" href="https://taeglichfrischesobst.com/images" />
	<title>Fotos & Galerie | Täglich frisches Obst</title>
	<meta
		name="description"
		content="Fotogalerie der Indie‑Pop Band Täglich frisches Obst: Live‑Bilder, Backstage‑Momente und Pressefotos – mit Credits der Fotograf:innen."
	/>
	<meta
		name="keywords"
		content="Fotos, Galerie, Bilder, Konzertfotos, Bandfotos, Live, Backstage, Pressefotos, Indie‑Pop, Täglich frisches Obst, Linz"
	/>
	<meta name="robots" content="index,follow" />

	<meta property="og:type" content="website" />
	<meta property="og:locale" content="de_DE" />
	<meta property="og:url" content="https://taeglichfrischesobst.com/images" />
	<meta property="og:title" content="Fotos & Galerie | Täglich frisches Obst" />
	<meta
		property="og:description"
		content="Live‑Bilder, Backstage‑Momente und Pressefotos – mit Credits der Fotograf:innen."
	/>
	<meta property="og:image" content="/assets/images/logo.png" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Fotos & Galerie | Täglich frisches Obst" />
	<meta
		name="twitter:description"
		content="Fotogalerie: Live‑Bilder, Backstage, Pressefotos – mit Credits."
	/>
	<meta name="twitter:image" content="/assets/images/logo.png" />
</svelte:head>

<main class="min-h-screen bg-white">
	{#each images as image}
		<ImageFullWidth blok={image} />
	{:else}
		loading images...
	{/each}
</main>
