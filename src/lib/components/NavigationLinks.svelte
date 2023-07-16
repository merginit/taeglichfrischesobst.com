<script lang="ts">
	import { browser } from '$app/environment';

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
</script>

<svelte:window bind:scrollY bind:outerHeight />

<li class="text-xl sm:text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl font-bold">
	<!-- prettier-ignore -->
	<a
		href="#gigs"
		on:click={handleClick}
		class="navigation-link link 
		{active === 'gigs' || (scrollY >= section_01 && scrollY <= section_02) ? '' : 'link-hover'}">Gigs
	</a>
</li>
<li class="text-xl sm:text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl font-bold">
	<!-- prettier-ignore -->
	<a
		href="#music"
		on:click={handleClick}
		class="navigation-link link 
		{active === 'music' || (scrollY >= section_02 && scrollY <= section_03) ? '' : 'link-hover'}">Musik
	</a>
</li>
<li class="text-xl sm:text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl font-bold">
	<!-- prettier-ignore -->
	<a
		href="#videos"
		on:click={handleClick}
		class="navigation-link link 
		{active === 'videos' || (scrollY >= section_03 && scrollY <= section_04) ? '' : 'link-hover'}">Videos
	</a>
</li>
<li class="text-xl sm:text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl font-bold">
	<!-- prettier-ignore -->
	<a
		href="#gallery"
		on:click={handleClick}
		class="navigation-link link 
		{active === 'gallery' || (scrollY >= section_04 && scrollY <= section_05) ? '' : 'link-hover'}">Galerie
	</a>
</li>
<li class="text-xl sm:text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl font-bold">
	<!-- prettier-ignore -->
	<a
		href="#contact"
		on:click={handleClick}
		class="navigation-link link 
		{active === 'contact' || (scrollY >= section_05) ? '' : 'link-hover'}">Kontakt
	</a>
</li>
