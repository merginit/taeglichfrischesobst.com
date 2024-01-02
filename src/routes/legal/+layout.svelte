<script lang="ts">
	import '$main/app.css';
	import { themeChange } from 'theme-change';
	import { onMount } from 'svelte';
	import { Toaster } from 'svelte-french-toast';
	import Navigation from '$component/Navigation.svelte';
	import LegalMain from '$component/LegalMain.svelte';
	import Footer from '$component/Footer.svelte';
	import Socials from '$component/Socials.svelte';
	import Logo from '$component/Logo.svelte';

	onMount(() => {
		themeChange(false);
	});
</script>

<header class="relative flex flex-col justify-between w-full">
	<Logo />
	<Socials />
</header>

<Navigation page={'legal'} />

<LegalMain>
	<Toaster />
	<slot />
</LegalMain>

<Footer />
