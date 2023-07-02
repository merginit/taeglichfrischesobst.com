<script lang="ts">
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import Icon from '@iconify/svelte';
	import toast, { Toaster } from 'svelte-french-toast';
	import NavigationLinks from '$component/NavigationLinks.svelte';
	import Gallery from '$component/Gallery.svelte';
	import App from './App.svelte';

	async function subscribeToMailList(event: Event) {
		const form = event.target as HTMLFormElement;
		const data = new FormData(form);
		const email = data.get('email')?.toString();

		if (email && email.trim().length > 0) {
			const response = await fetch('/subscribe-to-maillist', {
				method: 'POST',
				body: JSON.stringify({
					email: email
				}),
				headers: {
					Accept: 'application/json',
					'content-type': 'application/json'
				}
			});

			const responseObject = await response.json();

			console.log(responseObject.response[0].statusCode);

			if (
				responseObject.response[0].statusCode === 200 ||
				responseObject.response[0].statusCode === 201 ||
				responseObject.response[0].statusCode === 202
			) {
				toast.success('Du wurdest erfolgreich zur Mailing Liste hinzugefügt!');
			} else {
				toast.error('Wir konnten dich nicht zur Mailing Liste hinzufügen!');
			}
		}
	}

	function hslToHex(h: number, s: number, l: number) {
		l /= 100;
		const a = (s * Math.min(l, 1 - l)) / 100;
		const f = (n: number) => {
			const k = (n + h / 30) % 12;
			const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
			return Math.round(255 * color)
				.toString(16)
				.padStart(2, '0'); // convert to Hex and prefix "0" if needed
		};
		return `#${f(0)}${f(8)}${f(4)}`;
	}

	onMount(() => {
		// Theme Changer
		themeChange(false);

		// Colors
		const rootStyles = getComputedStyle(document.documentElement);
		const hslColor = rootStyles.getPropertyValue('--s').split(' ');

		const hexColor = hslToHex(parseInt(hslColor[0]), parseInt(hslColor[1]), parseInt(hslColor[2]));
		primary_color = hexColor;
	});

	$: primary_color = '#000';
	$: outerWidth = 0;
</script>

<svelte:head>
	<meta property="og:url" content="https://taeglichfrischesobst.vercel.app/" />
	<meta property="og:title" content="Home" />
</svelte:head>

<svelte:window bind:outerWidth />

<Toaster />

<header class="flex flex-col justify-between w-full relative">
	<!-- svelte-ignore a11y-invalid-attribute -->
	<a class="fixed -left-4 top-0 z-50 rotate-12" href="">
		<img class="w-14 2xl:w-28" src="/favicon.png" alt="logo" />
	</a>

	<!-- prettier-ignore -->
	<svg class="-z-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
	<path class="fill-neutral" fill-opacity="1" d="M0,256L26.7,224C53.3,192,107,128,160,96C213.3,64,267,64,320,85.3C373.3,107,427,149,480,165.3C533.3,181,587,171,640,154.7C693.3,139,747,117,800,133.3C853.3,149,907,203,960,229.3C1013.3,256,1067,256,1120,250.7C1173.3,245,1227,235,1280,240C1333.3,245,1387,267,1413,277.3L1440,288L1440,0L1413.3,0C1386.7,0,1333,0,1280,0C1226.7,0,1173,0,1120,0C1066.7,0,1013,0,960,0C906.7,0,853,0,800,0C746.7,0,693,0,640,0C586.7,0,533,0,480,0C426.7,0,373,0,320,0C266.7,0,213,0,160,0C106.7,0,53,0,27,0L0,0Z"></path></svg>

	<!-- prettier-ignore -->
	<div id="socials" class="fixed top-0 right-0 flex justify-center items-center m-4 gap-2 z-50">
		<a href="https://www.youtube.com/channel/UCM6LtE6jYUv7wEHvgB83_Qw" target="_blank" class="cursor-pointer"><Icon icon="mdi:youtube" color={primary_color} width={'35px'} /></a>
		<a href="https://www.instagram.com/taeglichfrischesobst/" target="_blank" class="cursor-pointer"><Icon icon="ri:instagram-fill" color={primary_color} width={'25px'} /></a>
		<a href="https://www.tiktok.com/@taeglichfrischesobst" target="_blank" class="cursor-pointer"><Icon icon="ic:baseline-tiktok" color={primary_color} width={'28px'} /></a>
		<a href="https://www.facebook.com/taeglichfrischesobst/" target="_blank" class="cursor-pointer"><Icon icon="ri:facebook-fill" color={primary_color} width={'25px'} /></a>
	</div>

	<!-- prettier-ignore -->
	<div id="tfo" class="text-center w-screen max-w-7xl text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl 2xl:text-9xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">Täglich Frisches Obst</div>

	<!-- prettier-ignore -->
	<svg class="-z-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path class="fill-neutral" fill-opacity="1" d="M0,160L34.3,176C68.6,192,137,224,206,234.7C274.3,245,343,235,411,197.3C480,160,549,96,617,85.3C685.7,75,754,117,823,154.7C891.4,192,960,224,1029,213.3C1097.1,203,1166,149,1234,117.3C1302.9,85,1371,75,1406,69.3L1440,64L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"></path></svg>
</header>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<!-- svelte-ignore a11y-label-has-associated-control -->
<nav class="sticky top-0 z-10">
	<div class="bg-neutral relative z-20" id="navigation">
		{#if outerWidth > 1135}
			<ul class="flex gap-16 justify-center overflow-x-auto py-4 text-secondary">
				<NavigationLinks />
			</ul>
		{:else}
			<div class="h-9 ml-12 pt-8 flex items-center">
				<div class="dropdown dropdown-bottom">
					<label tabindex="0"
						><Icon icon="charm:menu-hamburger" color={primary_color} width={'28px'} /></label
					>
					<ul
						tabindex="0"
						class="dropdown-content z-[1] menu p-2 shadow bg-base-100 border-2 border-primary rounded-box w-fit text-secondary"
					>
						<NavigationLinks />
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

<main>
	<!-- <App /> -->
	<section id="gigs" class="min-h-screen flex flex-col mt-[15%] scroll-mt-[20rem]">
		<div class="p-16">
			<div class="overflow-x-auto bg-neutral rounded-xl text-secondary">
				<table class="table">
					<!-- head -->
					<thead class="text-lg text-secondary font-bold">
						<tr>
							<th />
							<th>Datum</th>
							<th>Ort</th>
							<th>Veranstaltung</th>
							<th>Aktion</th>
						</tr>
					</thead>
					<tbody class="text-lg">
						<tr>
							<th>1</th>
							<td>8.7.2023</td>
							<td>Linz</td>
							<td>Donauinselfest</td>
							<td>
								<button class="btn btn-success">Tickets</button>
							</td>
						</tr>
						<tr>
							<th>1</th>
							<td>8.7.2023</td>
							<td>Linz</td>
							<td>Donauinselfest</td>
							<td>
								<button class="btn btn-error line-through">Tickets</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl 2xl:text-9xl font-bold">
				Gigs
			</h2>
		</div>
	</section>
	<!-- svelte-ignore a11y-missing-attribute -->
	<section id="music" class="min-h-screen flex flex-col mt-[15%] scroll-mt-[20rem] z-10">
		<div class="flex px-16 flex-wrap gap-4">
			<div class="bg-neutral rounded-2xl p-2 overflow-auto max-h-96">
				<h2 class="text-3xl lg:text-7xl font-bold flex items-center text-secondary">
					<Icon icon="mdi:fire" color={primary_color} width={outerWidth > 1024 ? '80px' : '40px'} />
					NEU:
				</h2>
				<div class="divider before:bg-secondary after:bg-secondary" />
				<div class="flex flex-col gap-2">
					<iframe
						style="border-radius:12px"
						src="https://open.spotify.com/embed/track/6ypAL1XSxjx1sSP2Ibr6pb?utm_source=generator"
						width="100%"
						height="152"
						frameBorder="0"
						allowfullscreen
						allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
						loading="lazy"
					/>
					<iframe
						style="border-radius:12px"
						src="https://open.spotify.com/embed/track/667zFxc0RivFgJ989sq6LH?utm_source=generator"
						width="100%"
						height="152"
						frameBorder="0"
						allowfullscreen
						allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
						loading="lazy"
					/>
					<iframe
						style="border-radius:12px"
						src="https://open.spotify.com/embed/track/1O3l3joweVnJ7ZsJvioPVh?utm_source=generator"
						width="100%"
						height="152"
						frameBorder="0"
						allowfullscreen
						allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
						loading="lazy"
					/>
				</div>
			</div>
			<div class="flex flex-col">
				<!-- prettier-ignore -->
				<div class="flex flex-wrap items-center gap-2">
					<a href="https://www.youtube.com/channel/UCM6LtE6jYUv7wEHvgB83_Qw"
						target="_blank"
						class="cursor-pointer"><Icon icon="mdi:youtube" color={primary_color} width={outerWidth > 1135 ? '140px' : "70px"} /></a>
					<a href="https://www.instagram.com/taeglichfrischesobst/"
						target="_blank"
						class="cursor-pointer"><Icon icon="ri:instagram-fill" color={primary_color} width={outerWidth > 1135 ? '100px' : "50px"} /></a>
					<a href="https://www.tiktok.com/@taeglichfrischesobst"
						target="_blank"
						class="cursor-pointer"
						><Icon icon="ic:baseline-tiktok" color={primary_color} width={outerWidth > 1135 ? '100px' : "50px"} /></a>
					<a href="https://www.facebook.com/taeglichfrischesobst/"
						target="_blank"
						class="cursor-pointer"
						><Icon icon="ri:facebook-fill" color={primary_color} width={outerWidth > 1135 ? '100px' : "50px"} /></a>
				</div>
				<h2
					class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl 2xl:text-9xl font-bold ml-2"
				>
					Musik
				</h2>
				<!-- prettier-ignore -->
				<div class="flex flex-wrap items-center gap-2">
					<a href="https://open.spotify.com/artist/1dnEfTWZekuLgNFkASxQqV" target="_blank" class="cursor-pointer"><Icon icon="mdi:spotify" color={primary_color} width={outerWidth > 1135 ? '100px' : "50px"} /></a>
					<a href="https://music.amazon.de/artists/B0BBSY4YP1/t%C3%A4glich-frisches-obst?marketplaceId=A1PA6795UKMFR9&musicTerritory=DE&ref=dm_sh_AhKPMyUQ5RtLmXouGyIV6Uqxm" target="_blank" class="cursor-pointer"><Icon icon="arcticons:amazon-music" color={primary_color} width={outerWidth > 1135 ? '100px' : "50px"} /></a>
					<a href="https://music.apple.com/us/artist/t%C3%A4glich-frisches-obst/1641480117" target="_blank" class="cursor-pointer"><Icon icon="simple-icons:applemusic" color={primary_color} width={outerWidth > 1135 ? '90px' : "45px"} /></a>
					<a href="https://listen.tidal.com/artist/34019184" target="_blank" class="cursor-pointer"><Icon icon="simple-icons:tidal" color={primary_color} width={outerWidth > 1135 ? '100px' : "50px"} /></a>
					<a href="https://www.deezer.com/de/artist/180952187?ext_publisher_id=1041161&awc=23454_1670112062_0e4fa0035bb449fff233bea5be9de03c" target="_blank" class="cursor-pointer"><Icon icon="fa6-brands:deezer" color={primary_color} width={outerWidth > 1135 ? '100px' : "50px"} /></a>
				</div>
			</div>
		</div>
	</section>
	<section id="videos" class="min-h-screen flex flex-col mt-[15%] scroll-mt-[20rem] z-10">
		<h2
			class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl 2xl:text-9xl font-bold text-center"
		>
			Videos
		</h2>
		<div class="flex flex-wrap justify-center gap-2">
			<iframe
				width="560"
				height="315"
				class="max-w-[90%]"
				src="https://www.youtube-nocookie.com/embed/KpJbtTYWm5Y"
				title="YouTube video player"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				allowfullscreen
			/>
			<iframe
				width="560"
				height="315"
				class="max-w-[90%]"
				src="https://www.youtube-nocookie.com/embed/60cndafDX34"
				title="YouTube video player"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				allowfullscreen
			/>
		</div>
	</section>
	<section id="gallery" class="min-h-screen flex flex-col mt-[15%] scroll-mt-[20rem] z-10">
		<div class="flex mr-2">
			<h2
				class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl 2xl:text-9xl font-bold"
				style="writing-mode:vertical-lr; transform: rotate(-180deg);"
			>
				Fotos
			</h2>
			<Gallery
				galleryID="gallery"
				images={[
					{
						URL: '/assets/images/band/Alter Bauhof Ottensheim 6.1.23 01 F ©Simon Rauch.jpg',
						width: 2048,
						height: 1365
					},
					{
						URL: '/assets/images/band/Alter Bauhof Ottensheim 6.1.23 02 F ©Simon Rauch.jpg',
						width: 2048,
						height: 1365
					},
					{
						URL: '/assets/images/band/Josef_Jakob_Vinny_Tobi ©Niko Nopp.JPG',
						width: 1600,
						height: 900
					},
					{
						URL: '/assets/images/band/Kramladen 31.03.23 _ 01 ©Simon Rauch.jpg',
						width: 1200,
						height: 900
					},
					{
						URL: '/assets/images/band/Kramladen 31.03.23 _ 02 ©Simon Rauch.jpg',
						width: 2048,
						height: 1365
					}
				]}
			/>
		</div>
	</section>
	<section id="contact" class="min-h-screen flex flex-col mt-[15%] scroll-mt-[20rem] z-10 mx-4">
		<h2
			class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl 2xl:text-9xl font-bold px-4 text-center"
		>
			Kontakt
		</h2>
		<div class="flex flex-wrap items-center justify-center gap-4 w-full">
			<div id="contact-form" class="bg-neutral border-2 border-primary p-2 rounded-2xl">
				<h3 class="text-3xl font-bold text-secondary mb-4">Schreibe uns:</h3>
				<form class="block mx-auto">
					<textarea
						placeholder=""
						class="textarea textarea-bordered textarea-lg w-full max-w-xs resize-none"
					/>
					<div class="flex gap-2 flex-wrap">
						<input type="email" name="email" class="input input-bordered" />
						<button type="submit" class="btn btn-secondary">Absenden</button>
					</div>
				</form>
			</div>
			<div id="gig-letter" class="bg-neutral border-2 border-primary p-2 rounded-2xl">
				<h3 class="text-3xl font-bold text-secondary mb-4">Git-Letter</h3>
				<p class="mb-2 text-secondary">
					Erfahre als einer der Ersten, <br /> wann und wo Täglich Frisches Obst <br /> als nächstes
					auftritt!
				</p>
				<form on:submit|preventDefault={subscribeToMailList} class="flex gap-2 flex-wrap">
					<input type="email" name="email" class="input input-bordered" />
					<button type="submit" class="btn btn-secondary">Abonnieren</button>
				</form>
			</div>
		</div>
	</section>
</main>

<div class="relative">
	<input
		type="checkbox"
		class="toggle absolute bottom-0 left-0 m-2 z-50"
		data-toggle-theme="dark,light"
		data-act-class="active-theme"
		data-key="tfo-band"
	/>

	<!-- prettier-ignore -->
	<div id="streaming" class="absolute bottom-0 right-0 z-40 w-full">
		<div class="flex flex-row-reverse m-4 mb-8 gap-2">
			<a href="https://open.spotify.com/artist/1dnEfTWZekuLgNFkASxQqV" target="_blank" class="cursor-pointer"><Icon icon="mdi:spotify" color={primary_color} width={'50px'} /></a>
			<a href="https://music.amazon.de/artists/B0BBSY4YP1/t%C3%A4glich-frisches-obst?marketplaceId=A1PA6795UKMFR9&musicTerritory=DE&ref=dm_sh_AhKPMyUQ5RtLmXouGyIV6Uqxm" target="_blank" class="cursor-pointer"><Icon icon="arcticons:amazon-music" color={primary_color} width={'50px'} /></a>
			<a href="https://music.apple.com/us/artist/t%C3%A4glich-frisches-obst/1641480117" target="_blank" class="cursor-pointer"><Icon icon="simple-icons:applemusic" color={primary_color} width={'45px'} /></a>
			<a href="https://listen.tidal.com/artist/34019184" target="_blank" class="cursor-pointer"><Icon icon="simple-icons:tidal" color={primary_color} width={'50px'} /></a>
			<a href="https://www.deezer.com/de/artist/180952187?ext_publisher_id=1041161&awc=23454_1670112062_0e4fa0035bb449fff233bea5be9de03c" target="_blank" class="cursor-pointer"><Icon icon="fa6-brands:deezer" color={primary_color} width={'50px'} /></a>
		</div>
	</div>

	<!-- prettier-ignore -->
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path class="fill-neutral" fill-opacity="1" d="M0,128L60,160C120,192,240,256,360,250.7C480,245,600,171,720,165.3C840,160,960,224,1080,234.7C1200,245,1320,203,1380,181.3L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
</div>

<style>
	@media only screen and (max-width: 580px) {
		#streaming {
			right: 50%;
			transform: translateX(50%);
		}
	}
</style>
