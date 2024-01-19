<script lang="ts">
	import { themeChange } from 'theme-change';
	import { onMount } from 'svelte';
	import ThreeDimensional from '$component/ThreeDimensional.svelte';
	import Navigation from '$component/Navigation.svelte';
	import Footer from '$component/Footer.svelte';
	import Socials from '$component/Socials.svelte';
	import Logo from '$component/Logo.svelte';
	import mobile from 'is-mobile';
	let isMobile = true;

	onMount(() => {
		isMobile = mobile({ tablet: true });
		themeChange(false);
	});
</script>

<header class="relative flex flex-col justify-between w-full">
	<Logo />

	<!-- prettier-ignore -->
	<svg class="pointer-events-none -z-10 parallax-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
	<path class="fill-neutral" fill-opacity="1" d="M0,256L26.7,224C53.3,192,107,128,160,96C213.3,64,267,64,320,85.3C373.3,107,427,149,480,165.3C533.3,181,587,171,640,154.7C693.3,139,747,117,800,133.3C853.3,149,907,203,960,229.3C1013.3,256,1067,256,1120,250.7C1173.3,245,1227,235,1280,240C1333.3,245,1387,267,1413,277.3L1440,288L1440,0L1413.3,0C1386.7,0,1333,0,1280,0C1226.7,0,1173,0,1120,0C1066.7,0,1013,0,960,0C906.7,0,853,0,800,0C746.7,0,693,0,640,0C586.7,0,533,0,480,0C426.7,0,373,0,320,0C266.7,0,213,0,160,0C106.7,0,53,0,27,0L0,0Z"></path></svg>

	<Socials />

	<!-- prettier-ignore -->
	<h1 id="tfo" class="absolute flex justify-center w-screen text-2xl font-bold text-center transform -translate-x-1/2 -translate-y-1/2 max-w-7xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl 2xl:text-8xl top-1/2 left-1/2 parallax-text -z-50">
		Täglich Frisches Obst
	</h1>

	{#if isMobile}
		<!-- 3D objects only load on desktop PCs to decrease load time. -->
	{:else}
		<div class="absolute top-0 left-0">
			<ThreeDimensional />
		</div>

		<div class="absolute transform -top-72 left-1/3 -translate-x-1/3">
			<ThreeDimensional />
		</div>

		<div class="absolute bottom-0 right-0">
			<ThreeDimensional />
		</div>
	{/if}

	<!-- prettier-ignore -->
	<svg class="-z-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path class="pointer-events-none fill-neutral" fill-opacity="1" d="M0,160L34.3,176C68.6,192,137,224,206,234.7C274.3,245,343,235,411,197.3C480,160,549,96,617,85.3C685.7,75,754,117,823,154.7C891.4,192,960,224,1029,213.3C1097.1,203,1166,149,1234,117.3C1302.9,85,1371,75,1406,69.3L1440,64L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"></path></svg>
</header>

<Navigation />

<slot />

<Footer />
