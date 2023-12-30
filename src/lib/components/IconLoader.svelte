<script lang="ts">
	import { loadIcon, type IconifyIconName } from '@iconify/svelte';
	import Icon from '@iconify/svelte';
	export let icon: string | IconifyIconName;
	export let color: string;
	export let width = '50px';
	export let anchor_href: string | null = null;
	export let anchor_target = '_blank';
	export let anchor_classes = '';
</script>

{#await loadIcon(icon)}
	<slot>{icon}</slot>
{:then data}
	{#if anchor_href}
		<a
			href={anchor_href}
			target={anchor_target}
			class="cursor-pointer iconify-icon {anchor_classes}"
		>
			<Icon icon={data} {color} {width} />
		</a>
	{:else}
		<Icon icon={data} {color} {width} />
	{/if}
{:catch}
	404
{/await}
