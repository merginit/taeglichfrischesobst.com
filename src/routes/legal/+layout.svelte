<script lang="ts">
	import type { LayoutData } from './$types';
	export let data: LayoutData;

	import '$main/app.css';
	import { themeChange } from 'theme-change';
	import { onMount } from 'svelte';
	import Navigation from '$component/Navigation.svelte';
	import Footer from '$component/Footer.svelte';
	import IconLoader from '$script/icons';
	import Icon from '@iconify/svelte';
	import LegalMain from '$component/LegalMain.svelte';

	onMount(() => {
		// Theme Changer
		themeChange(false);
	});

	const iconLoaderInstance = IconLoader.getInstance();
	const iconLoaded = iconLoaderInstance.iconLoaded;
</script>

<header class="relative flex flex-col justify-between w-full parallax-header">
	<!-- svelte-ignore a11y-invalid-attribute -->
	<a class="fixed top-0 z-50 -left-4 rotate-12" href="">
		<img class="w-14 2xl:w-28 shaking" src="/favicon.png" alt="logo" />
	</a>

	<!-- prettier-ignore -->
	<div id="socials" class="fixed top-0 right-0 z-50 flex items-center justify-center gap-2 m-4">
		<a href="https://www.youtube.com/channel/UCM6LtE6jYUv7wEHvgB83_Qw" target="_blank" class="cursor-pointer transition-opacity hover:opacity-90 iconify-icon"><Icon on:load={() => iconLoaded()} icon="mdi:youtube" color="hsl(var(--s))" width={'35px'} /></a>
		<a href="https://www.instagram.com/taeglichfrischesobst/" target="_blank" class="cursor-pointer transition-opacity hover:opacity-90 iconify-icon"><Icon on:load={() => iconLoaded()} icon="ri:instagram-fill" color="hsl(var(--s))" width={'25px'} /></a>
		<a href="https://www.tiktok.com/@taeglichfrischesobst" target="_blank" class="cursor-pointer transition-opacity hover:opacity-90 iconify-icon"><Icon on:load={() => iconLoaded()} icon="ic:baseline-tiktok" color="hsl(var(--s))" width={'28px'} /></a>
		<a href="https://www.facebook.com/taeglichfrischesobst/" target="_blank" class="cursor-pointer transition-opacity hover:opacity-90 iconify-icon"><Icon on:load={() => iconLoaded()} icon="ri:facebook-fill" color="hsl(var(--s))" width={'25px'} /></a>
	</div>
</header>

<Navigation page={'legal'} />

<LegalMain>
	<slot />
</LegalMain>

<Footer />
