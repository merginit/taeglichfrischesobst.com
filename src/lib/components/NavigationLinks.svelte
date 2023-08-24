<script lang="ts">
	import { browser } from '$app/environment';

	export let page = 'home';

	const handleClick = (event: MouseEvent) => {
		if (browser) {
			const element = event?.target;
			if (element instanceof HTMLAnchorElement) {
				active = element?.href.split('#')[1];
			}
		}
	};

	$: active = '';
	$: scrollY = 0;
	$: outerHeight = 0;

	$: section_01 = outerHeight;
	$: section_02 = section_01 + outerHeight;
	$: section_03 = section_02 + outerHeight;
	$: section_04 = section_03 + outerHeight;
	$: section_05 = section_04 + outerHeight;
	$: section_06 = section_05 + outerHeight;
</script>

<svelte:window bind:scrollY bind:outerHeight on:scroll={() => (active = '')} />

<li class="text-xl font-bold sm:text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl">
	<!-- prettier-ignore -->
	<a
		href="/home/#gigs"
		on:click={handleClick}
		class="navigation-link link 
		{page !== "legal" ? (active === 'gigs' || (scrollY > section_01 / 1.25 && scrollY <= section_02) ? '' : 'link-hover') : "link-hover"}">Gigs
	</a>
</li>
<li class="text-xl font-bold sm:text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl">
	<!-- prettier-ignore -->
	<a
		href="/home/#music"
		on:click={handleClick}
		class="navigation-link link 
		{page !== "legal" ? (active === 'music' || (scrollY > section_02 && scrollY <= section_03) ? '' : 'link-hover') : "link-hover"}">Musik
	</a>
</li>
<li class="text-xl font-bold sm:text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl">
	<!-- prettier-ignore -->
	<a
		href="/home/#videos"
		on:click={handleClick}
		class="navigation-link link 
		{page !== "legal" ? (active === 'videos' || (scrollY > section_03 && scrollY <= section_04) ? '' : 'link-hover') : "link-hover"}">Videos
	</a>
</li>
<li class="text-xl font-bold sm:text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl">
	<!-- prettier-ignore -->
	<a
		href="/home/#gallery"
		on:click={handleClick}
		class="navigation-link link 
		{page !== "legal" ? (active === 'gallery' || (scrollY > section_04 && scrollY <= section_05) ? '' : 'link-hover') : "link-hover"}">Galerie
	</a>
</li>
<li class="text-xl font-bold sm:text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl">
	<!-- prettier-ignore -->
	<a
		href="/home/#info"
		on:click={handleClick}
		class="navigation-link link 
		{page !== "legal" ? (active === 'info' || (scrollY > section_05 && scrollY <= section_06) ? '' : 'link-hover') : ""}">Info
	</a>
</li>
<li class="text-xl font-bold sm:text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl">
	<!-- prettier-ignore -->
	<a
		href="/home/#contact"
		on:click={handleClick}
		class="navigation-link link 
		{page !== "legal" ? (active === 'contact' || (scrollY > section_06) ? '' : 'link-hover') : "link-hover"}">Kontakt
	</a>
</li>
