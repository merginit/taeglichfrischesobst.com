<script lang="ts">
	import ThreeDimensional from '$component/ThreeDimensional.svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import mobile from 'is-mobile';
	let isMobile = true;

	onMount(() => {
		isMobile = mobile({ tablet: true });
	});
</script>

<section
	class="relative flex flex-col items-center justify-center h-screen overflow-hidden text-center"
>
	{#if isMobile}
		<!-- 3D objects only load on desktop PCs to decrease load time. -->
	{:else}
		<div class="absolute top-[-25%] w-screen h-screen -z-10">
			<ThreeDimensional />
		</div>
	{/if}

	<h1 class="text-8xl">{$page.status} {$page?.error?.message}</h1>
	<p class="mb-4 text-4xl text-secondary">Pfad: {$page.url.pathname}</p>
	<a href="/" class="btn btn-lg btn-error">Home</a>
</section>
