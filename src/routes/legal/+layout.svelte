<script lang="ts">
	import '$main/app.css';
	import { themeChange } from 'theme-change';
	import { onMount } from 'svelte';
	import { Toaster } from 'svelte-french-toast';
	import IconLoader from '$component/IconLoader.svelte';
	import LegalMain from '$component/LegalMain.svelte';
	import Navigation from '$component/Navigation.svelte';
	import Footer from '$component/Footer.svelte';

	onMount(() => {
		// Theme Changer
		themeChange(false);
	});
</script>

<header class="relative flex flex-col justify-between w-full parallax-header">
	<!-- svelte-ignore a11y-invalid-attribute -->
	<a class="fixed z-50 top-4 left-2 rotate-12" href="/home">
		<img class="w-10 2xl:w-24 shaking" src="/assets/images/fruit.png" alt="logo" />
	</a>

	<!-- prettier-ignore -->
	<div id="socials" class="fixed top-0 right-0 z-50 flex items-center justify-center gap-2 mt-1 mr-1">
		<a href="https://www.youtube.com/channel/UCM6LtE6jYUv7wEHvgB83_Qw" target="_blank" class="transition-opacity cursor-pointer hover:opacity-90 iconify-icon">
			<IconLoader icon="mdi:youtube" color="hsl(var(--s))" width={'35px'}>youtube</IconLoader>
		</a>
		<a href="https://www.instagram.com/taeglichfrischesobst/" target="_blank" class="transition-opacity cursor-pointer hover:opacity-90 iconify-icon">
			<IconLoader icon="ri:instagram-fill" color="hsl(var(--s))" width={'25px'}>instagram</IconLoader>
		</a>
		<a href="https://www.tiktok.com/@taeglichfrischesobst" target="_blank" class="transition-opacity cursor-pointer hover:opacity-90 iconify-icon">
			<IconLoader icon="ic:baseline-tiktok" color="hsl(var(--s))" width={'28px'}>tiktok</IconLoader>
		</a>
		<a href="https://www.facebook.com/taeglichfrischesobst/" target="_blank" class="transition-opacity cursor-pointer hover:opacity-90 iconify-icon">
			<IconLoader icon="ri:facebook-fill" color="hsl(var(--s))" width={'25px'}>facebook</IconLoader>
		</a>
	</div>
</header>

<Navigation page={'legal'} />

<LegalMain>
	<Toaster />
	<slot />
</LegalMain>

<Footer />
