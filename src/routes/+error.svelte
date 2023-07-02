<script lang="ts">
	import { page } from '$app/stores';
</script>

<section class="flex flex-col items-center justify-center text-center h-screen">
	<h1 class="text-8xl">{$page.status} {$page?.error?.message}</h1>
	<p class="text-4xl text-secondary mb-4">Pfad: {$page.url.pathname}</p>
	<a href="/" class="btn btn-lg btn-error">Home</a>
</section>
