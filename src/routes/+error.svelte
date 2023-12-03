<script lang="ts">
	import { page } from '$app/stores';
	import ThreeDimensional from '$component/ThreeDimensional.svelte';
</script>

<section
	class="relative flex flex-col items-center justify-center h-screen overflow-hidden text-center"
>
	<div class="absolute top-[-25%] w-screen h-screen -z-10">
		<ThreeDimensional />
	</div>
	<h1 class="text-8xl">{$page.status} {$page?.error?.message}</h1>
	<p class="mb-4 text-4xl text-secondary">Pfad: {$page.url.pathname}</p>
	<a href="/" class="btn btn-lg btn-error">Home</a>
</section>
