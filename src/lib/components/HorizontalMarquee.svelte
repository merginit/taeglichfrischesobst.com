<script lang="ts">
	import Marquee from 'svelte-fast-marquee'; // same result as with the old vanilla version... (reset/loop is visible)
	$: outerWidth = 0; // for responsiveness, if media query is not enough
</script>

<svelte:window bind:outerWidth />

<div class="flex flex-wrap justify-center gap-4">
	<Marquee speed={100} gap={'1rem'} pauseOnHover={true} direction={'left'} class="overflow-clip">
		{#each Array.from({ length: 2 }, (_, i) => i + 1) as i}
			<slot name="top" />
		{:else}
			<span class="loading loading-ball loading-lg" />
		{/each}
	</Marquee>
	<slot name="center" />
	<Marquee speed={100} gap={'1rem'} pauseOnHover={true} direction={'right'} class="overflow-clip">
		{#each Array.from({ length: 2 }, (_, i) => i + 1) as i}
			<slot name="bottom" />
		{:else}
			<span class="loading loading-ball loading-lg" />
		{/each}
	</Marquee>
</div>
