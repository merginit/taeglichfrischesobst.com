<script lang="ts">
	/* Only load 3D objects on desktop. */
	import { onMount } from 'svelte';
	import mobile from 'is-mobile';
	let isMobile = true;
	let module: ConstructorOfATypedSvelteComponent;

	onMount(async () => {
		isMobile = mobile({ tablet: true });

		if (!isMobile) {
			const { default: DynamicComponent } = await import('./ThreeDimensionalScene.svelte');
			module = DynamicComponent;
		}
	});
</script>

{#if isMobile}
	<!-- 3D objects only load on desktop PCs to decrease load time. -->
{:else}
	<svelte:component this={module} />
{/if}
