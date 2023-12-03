<script lang="ts">
	import { page } from '$app/stores';
</script>

<section class="flex flex-col items-center h-screen text-center">
	<h1 class="text-8xl">{$page.status} {$page?.error?.message ?? 'verlaufen?'}</h1>
	<p class="mb-4 text-4xl text-secondary">Pfad: {$page.url.pathname}</p>
	<div class="flex flex-col gap-2">
		<a href="/" class="btn btn-lg btn-warning">Home</a>
		<a href="/legal/privacy-policy" class="btn btn-lg btn-warning">Datenschutz & Cookies</a>
		<a href="/legal/imprint" class="btn btn-lg btn-warning">Impressum</a>
	</div>
</section>
