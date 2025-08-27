<script lang="ts">
	import { page } from '$app/stores';
</script>

<svelte:head>
	<link rel="canonical" href="https://taeglichfrischesobst.com/legal" />
	<title>Rechtliches | Datenschutz & Impressum | Täglich frisches Obst</title>
	<meta name="description" content="Übersichtsseite für rechtliche Informationen: Datenschutz & Cookies sowie Impressum der Indie‑Pop Band Täglich frisches Obst." />
	<meta name="keywords" content="Rechtliches, Datenschutz, Cookies, Impressum, Rechtliche Hinweise, Kontakt, Täglich frisches Obst, Band, Linz" />
	<meta name="robots" content="index,follow" />

	<meta property="og:type" content="website" />
	<meta property="og:locale" content="de_DE" />
	<meta property="og:url" content="https://taeglichfrischesobst.com/legal" />
	<meta property="og:title" content="Rechtliches | Datenschutz & Impressum | Täglich frisches Obst" />
	<meta property="og:description" content="Legal‑Übersicht mit Links zu Datenschutz & Cookies sowie Impressum." />
	<meta property="og:image" content="/assets/images/logo.png" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Rechtliches | Datenschutz & Impressum | Täglich frisches Obst" />
	<meta name="twitter:description" content="Übersichtsseite: Datenschutz, Cookies, Impressum." />
	<meta name="twitter:image" content="/assets/images/logo.png" />
</svelte:head>

<section class="flex flex-col items-center h-screen text-center">
	<h1 class="text-8xl">{$page.status} {$page?.error?.message ?? 'verlaufen?'}</h1>
	<p class="mb-4 text-4xl text-secondary">Pfad: {$page.url.pathname}</p>
	<div class="flex flex-col gap-2">
		<a href="/" class="btn btn-lg btn-warning">Home</a>
		<a href="/legal/privacy-policy" class="btn btn-lg btn-warning">Datenschutz & Cookies</a>
		<a href="/legal/imprint" class="btn btn-lg btn-warning">Impressum</a>
	</div>
</section>
