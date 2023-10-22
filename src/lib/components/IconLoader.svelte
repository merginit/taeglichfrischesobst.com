<script lang="ts">
	import { loadIcon, type IconifyIconName } from '@iconify/svelte';
	import Icon from '@iconify/svelte';
	export let icon: string | IconifyIconName;
	export let color: string;
	export let width = '50px';
</script>

{#await loadIcon(icon)}
	<slot>{icon}</slot>
{:then data}
	<Icon icon={data} {color} {width} />
{:catch}
	404
{/await}
