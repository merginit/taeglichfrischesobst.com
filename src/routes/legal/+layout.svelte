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
		<img loading="eager" class="w-10 2xl:w-24 shaking" src="/assets/images/fruit.png" alt="logo" />
	</a>

	<!-- prettier-ignore -->
	<div id="socials" class="fixed top-0 right-0 z-50 flex items-center justify-center gap-2 mt-1 mr-1">
		<IconLoader anchor_href={"https://www.youtube.com/channel/UCM6LtE6jYUv7wEHvgB83_Qw"} anchor_classes={"transition-opacity hover:opacity-90"} icon="mdi:youtube" color="hsl(var(--s))" width={'35px'}>youtube</IconLoader>
		<IconLoader anchor_href={"https://www.instagram.com/taeglichfrischesobst"} anchor_classes={"transition-opacity hover:opacity-90"} icon="ri:instagram-fill" color="hsl(var(--s))" width={'25px'}>instagram</IconLoader>
		<IconLoader anchor_href={"https://www.tiktok.com/@taeglichfrischesobst"} anchor_classes={"transition-opacity hover:opacity-90"} icon="ic:baseline-tiktok" color="hsl(var(--s))" width={'28px'}>tiktok</IconLoader>
		<IconLoader anchor_href={"https://www.facebook.com/taeglichfrischesobst"} anchor_classes={"transition-opacity hover:opacity-90"} icon="ri:facebook-fill" color="hsl(var(--s))" width={'25px'}>facebook</IconLoader>
	</div>
</header>

<Navigation page={'legal'} />

<LegalMain>
	<Toaster />
	<slot />
</LegalMain>

<Footer />
