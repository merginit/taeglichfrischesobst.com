<script lang="ts">
	import { browser } from '$app/environment';
	import IconLoader from '$component/IconLoader.svelte';
	export let color = 'black';
</script>

<button
	type="button"
	class="absolute cursor-pointer left-2 top-2"
	on:click={() => {
		if (browser) {
			window.history.back();
		}
	}}
>
	<IconLoader icon="mdi:arrow-back-circle" {color} width={'50px'}>zurück</IconLoader>
</button>
