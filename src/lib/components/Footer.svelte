<script lang="ts">
	import Icon from '@iconify/svelte';
	import IconLoader from '$script/icons';

	const iconLoaderInstance = IconLoader.getInstance();
	const iconLoaded = iconLoaderInstance.iconLoaded;

	$: outerWidth = 0; // for responsiveness, if media query is not enough
</script>

<svelte:window bind:outerWidth />

<footer class="relative">
	<input
		type="checkbox"
		class="absolute bottom-0 {outerWidth < 1435
			? 'left-1/2 transform -translate-x-1/2'
			: 'left-0'} z-50 m-2 toggle"
		data-toggle-theme="dark,light"
		data-act-class="active-theme"
		data-key="tfo-band"
	/>

	{#if outerWidth > 1435}
		<!-- prettier-ignore -->
		<div id="streaming" class="absolute bottom-0 right-0 z-40 w-full">
			<div class="flex flex-row-reverse gap-2 m-4 mb-8">
				<a href="https://open.spotify.com/artist/1dnEfTWZekuLgNFkASxQqV" target="_blank" class="transition-opacity cursor-pointer hover:opacity-90 iconify-icon"><Icon on:load={() => iconLoaded()} icon="mdi:spotify" color="hsl(var(--s))" width={'50px'} /></a>
				<a href="https://music.amazon.de/artists/B0BBSY4YP1/t%C3%A4glich-frisches-obst?marketplaceId=A1PA6795UKMFR9&musicTerritory=DE&ref=dm_sh_AhKPMyUQ5RtLmXouGyIV6Uqxm" target="_blank" class="transition-opacity cursor-pointer hover:opacity-90 iconify-icon"><Icon on:load={() => iconLoaded()} icon="arcticons:amazon-music" color="hsl(var(--s))" width={'50px'} /></a>
				<a href="https://music.apple.com/us/artist/t%C3%A4glich-frisches-obst/1641480117" target="_blank" class="transition-opacity cursor-pointer hover:opacity-90 iconify-icon"><Icon on:load={() => iconLoaded()} icon="simple-icons:applemusic" color="hsl(var(--s))" width={'45px'} /></a>
				<a href="https://listen.tidal.com/artist/34019184" target="_blank" class="transition-opacity cursor-pointer hover:opacity-90 iconify-icon"><Icon on:load={() => iconLoaded()} icon="simple-icons:tidal" color="hsl(var(--s))" width={'50px'} /></a>
				<a href="https://www.deezer.com/de/artist/180952187?ext_publisher_id=1041161&awc=23454_1670112062_0e4fa0035bb449fff233bea5be9de03c" target="_blank" class="transition-opacity cursor-pointer hover:opacity-90 iconify-icon"><Icon on:load={() => iconLoaded()} icon="fa6-brands:deezer" color="hsl(var(--s))" width={'50px'} /></a>
			</div>
		</div>
	{/if}

	<!-- prettier-ignore -->
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path class="pointer-events-none fill-neutral" fill-opacity="1" d="M0,128L60,160C120,192,240,256,360,250.7C480,245,600,171,720,165.3C840,160,960,224,1080,234.7C1200,245,1320,203,1380,181.3L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
</footer>
