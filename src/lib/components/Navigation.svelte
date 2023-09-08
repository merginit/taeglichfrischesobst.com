<script lang="ts">
	import NavigationLinks from '$component/NavigationLinks.svelte';
	import Icon from '@iconify/svelte';
	import IconLoader from '$script/icons';

	export let page = 'home';

	const iconLoaderInstance = IconLoader.getInstance();
	const iconLoaded = iconLoaderInstance.iconLoaded;

	$: outerWidth = 0; // for responsiveness, if media query is not enough
</script>

<svelte:window bind:outerWidth />

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<!-- svelte-ignore a11y-label-has-associated-control -->
<nav class="sticky top-0 z-40">
	<div class="relative z-20 bg-neutral" id="navigation">
		{#if outerWidth > 1135}
			<ul class="flex justify-center gap-16 py-4 overflow-x-auto text-secondary">
				<NavigationLinks {page} />
			</ul>
		{:else}
			<div class="flex items-center pt-8 ml-12 h-9">
				<div class="dropdown dropdown-bottom">
					<label tabindex="0" class="iconify-icon">
						<Icon
							on:load={() => iconLoaded()}
							icon="charm:menu-hamburger"
							color="hsl(var(--s))"
							width={'28px'}
						/>
					</label>
					<!-- prettier-ignore -->
					<ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 border-2 border-primary rounded-box w-fit text-secondary">
						<NavigationLinks {page} />
					</ul>
				</div>
			</div>
		{/if}
	</div>

	<div class="overflow-hidden">
		<!-- prettier-ignore -->
		<svg class="absolute top-[2rem] sm:top-[1rem] lg:top-[0.5rem] pointer-events-none" version="1.1" id="Ebene_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1440 320" style="enable-background:new 0 0 1440 320;" xml:space="preserve"><path class="fill-neutral" d="M0,162.6l30-11.6c30-11.6,90-34.8,150-27.1c60,7.5,120,46.7,180,46.4c60,0.2,120-39,180-69.7c60-31,120-54.2,180-38.8c60,15.7,120,69.4,180,85.2c60,15.5,120-7.8,180-7.8s120,23.2,180,38.7c60,15.7,120,23,150,27.1l30,3.8V0h-30c-30,0-90,0-150,0s-120,0-180,0S960,0,900,0S780,0,720,0S600,0,540,0S420,0,360,0S240,0,180,0S60,0,30,0H0V162.6z"/></svg>
	</div>
</nav>
