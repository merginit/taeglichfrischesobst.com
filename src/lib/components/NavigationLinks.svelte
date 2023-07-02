<script lang="ts">
	import { browser } from '$app/environment';

	$: active = '';
	const handleClick = (event: MouseEvent) => {
		if (browser) {
			const element = event?.target;
			if (element instanceof HTMLAnchorElement) {
				active = element?.href.split('#')[1];
			}
		}
	};
</script>

<li class="text-xl sm:text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl font-bold">
	<a
		href="#gigs"
		on:click={handleClick}
		class="navigation-link link {active === 'gigs' ? '' : 'link-hover'}">Gigs</a
	>
</li>
<li class="text-xl sm:text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl font-bold">
	<a
		href="#music"
		on:click={handleClick}
		class="navigation-link link {active === 'music' ? '' : 'link-hover'}">Musik</a
	>
</li>
<li class="text-xl sm:text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl font-bold">
	<a
		href="#videos"
		on:click={handleClick}
		class="navigation-link link {active === 'videos' ? '' : 'link-hover'}">Videos</a
	>
</li>
<li class="text-xl sm:text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl font-bold">
	<a
		href="#gallery"
		on:click={handleClick}
		class="navigation-link link {active === 'gallery' ? '' : 'link-hover'}">Galerie</a
	>
</li>
<li class="text-xl sm:text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl font-bold">
	<a
		href="#contact"
		on:click={handleClick}
		class="navigation-link link {active === 'contact' ? '' : 'link-hover'}">Kontakt</a
	>
</li>
