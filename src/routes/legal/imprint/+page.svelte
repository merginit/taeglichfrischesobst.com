<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<meta property="og:url" content="https://taeglichfrischesobst.vercel.app/legal/imprint" />
	<meta property="og:title" content="Impressum" />
	<meta property="og:description" content="Impressum" />

	<meta name="description" content="Impressum" />
	<meta name="keywords" content="imprint" />
	<title>Impressum</title>
</svelte:head>

<div class="flex gap-4">
	<ul class="not-prose menu bg-base-200 w-56 rounded-box h-fit">
		<li class="menu-title">Rechtliches</li>
		<li><a href="/legal/imprint" class="active">Impressum</a></li>
		<li><a href="/legal/privacy-policy">Datenschutz & Cookies</a></li>
	</ul>

	<h1 class="pt-2 mb-2 self-center break-words">Impressum</h1>
</div>

<div class="bg-base-200 w-full rounded-xl px-2 py-1">
	<strong>Stand: 23.07.2023</strong>
</div>
