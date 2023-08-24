<script lang="ts">
	import { storyblokEditable, type SbBlokData } from '@storyblok/svelte';

	export let blok: SbBlokData;
</script>

<tr use:storyblokEditable={blok}>
	<td>{blok?.event ?? ''}</td>
	<td>{blok?.location ?? ''}</td>
	<td>{blok?.date ?? ''}</td>
	<td>{blok?.time ?? ''}</td>
	<td>{(typeof blok?.tickets === 'object' ? blok?.tickets?.url : blok?.tickets) ?? ''}</td>
</tr>

<style>
	tr td {
		border: 1px solid #f5f5f5;
		padding: 4px 20px;
	}
	tr {
		transition: all, 0.2s;
	}
	tr:hover {
		background: #f5f5f5;
	}
</style>
