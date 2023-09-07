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
		<svg class="absolute top-[2rem] sm:top-[1rem] lg:top-[0.5rem] pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path class="fill-neutral" fill-opacity="1" d="M0,224L30,208C60,192,120,160,180,170.7C240,181,300,235,360,234.7C420,235,480,181,540,138.7C600,96,660,64,720,85.3C780,107,840,181,900,202.7C960,224,1020,192,1080,192C1140,192,1200,224,1260,245.3C1320,267,1380,277,1410,282.7L1440,288L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"></path></svg>
	</div>
</nav>
