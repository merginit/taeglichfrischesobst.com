<script lang="ts">
	import { Toaster } from 'svelte-french-toast';
	import { subscribeToMailList, unsubscribeFromMailList } from '$script/api';
</script>

<svelte:head>
	<link rel="canonical" href="https://taeglichfrischesobst.com/newsletter" />
	<title>Newsletter | Täglich frisches Obst</title>
	<meta name="description" content="Abonniere den Newsletter von Täglich frisches Obst und erfahre als Erste:r von neuen Gigs, Releases und News." />
	<meta name="keywords" content="Newsletter, Anmeldung, E-Mail, Gigs, Releases, Täglich frisches Obst" />
	<meta name="robots" content="index,follow" />

	<meta property="og:type" content="website" />
	<meta property="og:locale" content="de_DE" />
	<meta property="og:url" content="https://taeglichfrischesobst.com/newsletter" />
	<meta property="og:title" content="Newsletter | Täglich frisches Obst" />
	<meta property="og:description" content="Melde dich für den Newsletter an und bleibe über Konzerte, Releases und News auf dem Laufenden." />
	<meta property="og:image" content="/assets/images/logo.png" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Newsletter | Täglich frisches Obst" />
	<meta name="twitter:description" content="Jetzt abonnieren und keine Neuigkeiten mehr verpassen." />
	<meta name="twitter:image" content="/assets/images/logo.png" />
</svelte:head>

<Toaster position="bottom-right" />

<div id="gig-letter" class="p-2 border-2 bg-neutral border-primary rounded-2xl">
	<h3 class="mb-4 text-3xl font-bold text-secondary">Newsletter</h3>
	<p class="mb-2 text-secondary">
		Erfahre als einer der Ersten, <br />
		wann Täglich Frisches Obst wieder auftritt <br />
		oder neue Releases anstehen!
	</p>
	<div class="flex flex-col gap-2">
		<form
			on:submit|preventDefault={subscribeToMailList}
			class="grid grid-rows-1 sm:grid-cols-[1fr_auto] gap-2"
		>
			<input
				type="email"
				name="email"
				class="input input-bordered"
				title="Email"
				placeholder="deine@email.tld"
			/>
			<button type="submit" class="btn-secondary btn">Abonnieren</button>
		</form>
		<form
			on:submit|preventDefault={unsubscribeFromMailList}
			class="grid grid-rows-1 sm:grid-cols-[1fr_auto] gap-2"
		>
			<input
				type="email"
				name="email"
				class="input input-bordered"
				title="Email"
				placeholder="deine@email.tld"
			/>
			<button type="submit" class="btn btn-secondary">Deabonnieren</button>
		</form>
	</div>
</div>