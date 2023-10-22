<script lang="ts">
	import { Toaster } from 'svelte-french-toast';
	import { subscribeToMailList, unsubscribeFromMailList } from '$script/api';
</script>

<Toaster position="bottom-right" />

<main class="flex items-center justify-center h-screen">
	<div id="gig-letter" class="p-2 border-2 bg-neutral border-primary rounded-2xl">
		<h3 class="mb-4 text-3xl font-bold text-secondary">Newsletter</h3>
		<p class="mb-2 text-secondary">
			Erfahre als einer der Ersten, <br />
			wann wenn Täglich Frisches Obst wieder auftritt <br />
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
</main>
