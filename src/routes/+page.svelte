<script lang="ts" context="module" type="module">
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import Icon from '@iconify/svelte';
	import toast, { Toaster } from 'svelte-french-toast';
	import NavigationLinks from '$component/NavigationLinks.svelte';
	import Gallery from '$component/Gallery.svelte';
	import { gigs } from '$script/data';
	import { videos } from '$script/data';
	import { images } from '$script/data';
	import { compareDates } from '$script/utility';
	import App from './App.svelte';
	// import gsap from 'gsap';

	async function mailListAction(event: Event, endpoint: string) {
		const form = event.target as HTMLFormElement;
		const data = new FormData(form);
		const email = data.get('email')?.toString();

		if (email && email.trim().length > 0) {
			const response = await fetch(`/${endpoint}`, {
				method: 'POST',
				body: JSON.stringify({
					email: email
				}),
				headers: {
					Accept: 'application/json',
					'content-type': 'application/json'
				}
			});

			const res = await response.json();
			console.log('res', res, res.success);

			if (res.success) {
				toast.success(res.response);
			} else {
				toast.error(res?.response ?? res.message);
			}
		} else {
			toast.error('Bitte gib eine gültige E-Mail Adresse ein!');
		}
	}

	async function subscribeToMailList(event: Event) {
		await mailListAction(event, 'subscribe-to-maillist');
		console.log('subscribed to mail list');
	}

	async function unsubscribeFromMailList(event: Event) {
		await mailListAction(event, 'unsubscribe-from-maillist');
		console.log('unsubscribed from mail list');
	}

	onMount(() => {
		// Theme Changer
		themeChange(false);

		remainingIcons = document.getElementsByClassName('iconify-icon').length;
		console.log(remainingIcons);
	});

	function iconLoaded() {
		remainingIcons -= 1;

		if (remainingIcons === 0) {
			console.log('all icons loaded');
		}
	}

	let remainingIcons: number = -1;
	$: outerWidth = 0; // for responsiveness, if media query is not enough
</script>

<svelte:head>
	<meta property="og:url" content="https://taeglichfrischesobst.vercel.app/" />
	<meta property="og:title" content="Home" />
</svelte:head>

<svelte:window bind:outerWidth />

<Toaster />

<header class="relative flex flex-col justify-between w-full parallax-header">
	<!-- svelte-ignore a11y-invalid-attribute -->
	<a class="fixed top-0 z-50 -left-4 rotate-12" href="">
		<img class="w-14 2xl:w-28 shaking" src="/favicon.png" alt="logo" />
	</a>

	<!-- prettier-ignore -->
	<svg class="-z-10 parallax-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
	<path class="fill-neutral" fill-opacity="1" d="M0,256L26.7,224C53.3,192,107,128,160,96C213.3,64,267,64,320,85.3C373.3,107,427,149,480,165.3C533.3,181,587,171,640,154.7C693.3,139,747,117,800,133.3C853.3,149,907,203,960,229.3C1013.3,256,1067,256,1120,250.7C1173.3,245,1227,235,1280,240C1333.3,245,1387,267,1413,277.3L1440,288L1440,0L1413.3,0C1386.7,0,1333,0,1280,0C1226.7,0,1173,0,1120,0C1066.7,0,1013,0,960,0C906.7,0,853,0,800,0C746.7,0,693,0,640,0C586.7,0,533,0,480,0C426.7,0,373,0,320,0C266.7,0,213,0,160,0C106.7,0,53,0,27,0L0,0Z"></path></svg>

	<!-- prettier-ignore -->
	<div id="socials" class="fixed top-0 right-0 z-50 flex items-center justify-center gap-2 m-4">
		<a href="https://www.youtube.com/channel/UCM6LtE6jYUv7wEHvgB83_Qw" target="_blank" class="cursor-pointer transition-opacity hover:opacity-90 iconify-icon"><Icon on:load={() => iconLoaded()} icon="mdi:youtube" color="hsl(var(--s))" width={'35px'} /></a>
		<a href="https://www.instagram.com/taeglichfrischesobst/" target="_blank" class="cursor-pointer transition-opacity hover:opacity-90 iconify-icon"><Icon on:load={() => iconLoaded()} icon="ri:instagram-fill" color="hsl(var(--s))" width={'25px'} /></a>
		<a href="https://www.tiktok.com/@taeglichfrischesobst" target="_blank" class="cursor-pointer transition-opacity hover:opacity-90 iconify-icon"><Icon on:load={() => iconLoaded()} icon="ic:baseline-tiktok" color="hsl(var(--s))" width={'28px'} /></a>
		<a href="https://www.facebook.com/taeglichfrischesobst/" target="_blank" class="cursor-pointer transition-opacity hover:opacity-90 iconify-icon"><Icon on:load={() => iconLoaded()} icon="ri:facebook-fill" color="hsl(var(--s))" width={'25px'} /></a>
	</div>

	<!-- prettier-ignore -->
	<h1 id="tfo" class="absolute w-screen text-2xl text-center transform -translate-x-1/2 -translate-y-1/2 max-w-7xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl 2xl:text-9xl top-1/2 left-1/2 parallax-text -z-50 flex justify-center">Täglich Frisches Obst</h1>

	{#if outerWidth > 1775}
		<div class="absolute top-0 left-0">
			<App />
		</div>

		<div class="absolute transform -top-72 left-1/3 -translate-x-1/3">
			<App />
		</div>

		<div class="absolute bottom-0 right-0">
			<App />
		</div>
	{/if}

	<!-- prettier-ignore -->
	<svg class="-z-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path class="fill-neutral" fill-opacity="1" d="M0,160L34.3,176C68.6,192,137,224,206,234.7C274.3,245,343,235,411,197.3C480,160,549,96,617,85.3C685.7,75,754,117,823,154.7C891.4,192,960,224,1029,213.3C1097.1,203,1166,149,1234,117.3C1302.9,85,1371,75,1406,69.3L1440,64L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"></path></svg>
</header>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<!-- svelte-ignore a11y-label-has-associated-control -->
<nav class="sticky top-0 z-10">
	<div class="relative z-20 bg-neutral" id="navigation">
		{#if outerWidth > 1135}
			<ul class="flex justify-center gap-16 py-4 overflow-x-auto text-secondary">
				<NavigationLinks />
			</ul>
		{:else}
			<div class="flex items-center pt-8 ml-12 h-9">
				<div class="dropdown dropdown-bottom">
					<label tabindex="0" class="iconify-icon">
						<Icon
							on:load={() => iconLoaded()}
							icon="charm:menu-hamburger"
							color="hsl(var(--s))"
							width={'28px'}
						/>
					</label>
					<!-- prettier-ignore -->
					<ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 border-2 border-primary rounded-box w-fit text-secondary">
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
	<section id="gigs" class="min-h-screen flex flex-col mt-[20rem] scroll-mt-[20rem]">
		<div class="p-16">
			<div class="overflow-auto max-h-96 bg-neutral rounded-xl text-secondary">
				<table class="table">
					<thead class="text-lg font-bold text-secondary">
						<tr>
							<th />
							<th>Datum</th>
							<th>Ort</th>
							<th>Veranstaltung</th>
							<th>Aktion</th>
						</tr>
					</thead>
					<tbody class="text-lg">
						{#each gigs.sort( (eventA, eventB) => compareDates(eventA.date, eventB.date) ) as gig, index}
							<tr>
								<th>{index + 1}</th>
								<td>{gig.date}{gig.time ? ' (' + gig.time + ')' : ''}</td>
								<td>{gig.location}</td>
								<td>{gig.event}</td>
								<td>
									<!-- prettier-ignore -->
									<a class="btn {gig.tickets ? 'btn-success' : 'btn-error'}" href={gig.tickets && typeof gig.tickets === "string" ? gig.tickets : '#'}>Tickets</a>
								</td>
							</tr>
						{:else}
							<span class="loading loading-ball loading-lg" />
						{/each}
					</tbody>
				</table>
			</div>
			<!-- prettier-ignore -->
			<h2 class="relative -z-40 text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl 2xl:text-9xl bg-image">
				Gigs
				{#if outerWidth > 1535}
					<!-- prettier-ignore -->
					<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="wobble absolute -z-50 top-0 left-0 w-40">
						<path fill="hsl(var(--b2))" d="M41.8,-70C55.9,-64.1,70.5,-56.6,79.5,-44.7C88.5,-32.7,91.8,-16.4,91.2,-0.4C90.6,15.6,85.9,31.3,77.6,44.4C69.3,57.5,57.4,68.2,43.9,76.7C30.3,85.3,15.2,91.8,0.5,90.9C-14.2,90.1,-28.3,81.9,-41.1,72.8C-53.8,63.8,-65.1,53.9,-72.5,41.6C-79.9,29.4,-83.4,14.7,-83.8,-0.2C-84.2,-15.1,-81.5,-30.3,-73.5,-41.6C-65.5,-52.9,-52.3,-60.3,-39.2,-66.8C-26.1,-73.3,-13,-78.9,0.4,-79.6C13.8,-80.2,27.6,-75.9,41.8,-70Z" transform="translate(100 100)" />
					</svg>
				{/if}
			</h2>
		</div>
	</section>
	<!-- svelte-ignore a11y-missing-attribute -->
	<section id="music" class="min-h-screen flex flex-col mt-[20rem] scroll-mt-[20rem] z-10">
		<div class="flex flex-wrap justify-center gap-4 px-16">
			<!-- prettier-ignore -->
			<div class="slider-reverse">
				<div class="slide-track-reverse">
					{#each Array.from({ length: 4 }, (_, i) => i + 1) as iteration}
						<!-- prettier-ignore -->
						<h2 class="ml-2 text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl 2xl:text-9xl slide">
							Socials
						</h2>
						<!-- prettier-ignore -->
						<div class="slide">
							<a href="https://www.youtube.com/channel/UCM6LtE6jYUv7wEHvgB83_Qw"
							target="_blank"
							class="cursor-pointer iconify-icon"><Icon on:load={() => iconLoaded()} icon="mdi:youtube" color="hsl(var(--s))" width={outerWidth > 1135 ? '140px' : "70px"} /></a>
						</div>
						<!-- prettier-ignore -->
						<div class="slide">
							<a href="https://www.instagram.com/taeglichfrischesobst/"
							target="_blank"
							class="cursor-pointer iconify-icon"><Icon on:load={() => iconLoaded()} icon="ri:instagram-fill" color="hsl(var(--s))" width={outerWidth > 1135 ? '100px' : "50px"} /></a>
						</div>
						<!-- prettier-ignore -->

						<div class="slide">
							<a href="https://www.tiktok.com/@taeglichfrischesobst"
							target="_blank"
							class="cursor-pointer iconify-icon"
							><Icon on:load={() => iconLoaded()} icon="ic:baseline-tiktok" color="hsl(var(--s))" width={outerWidth > 1135 ? '100px' : "50px"} /></a>
						</div>
						<!-- prettier-ignore -->
						<div class="slide">
							<a href="https://www.facebook.com/taeglichfrischesobst/"
							target="_blank"
							class="cursor-pointer iconify-icon"
							><Icon on:load={() => iconLoaded()} icon="ri:facebook-fill" color="hsl(var(--s))" width={outerWidth > 1135 ? '100px' : "50px"} /></a>
						</div>
					{:else}
						<span class="loading loading-ball loading-lg"></span>
					{/each}
				</div>
			</div>
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<div
				class="p-2 overflow-auto bg-neutral rounded-2xl songs overflow-y-hidden"
				on:wheel={(event) => {
					event.preventDefault();
					event.currentTarget.scrollLeft += Math.sign(event.deltaY) * 300;
				}}
				tabindex="0"
			>
				<iframe
					class="song"
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
					class="song"
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
					class="song"
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
			<!-- prettier-ignore -->
			<div class="slider">
				<div class="slide-track">
					{#each Array.from({ length: 4 }, (_, i) => i + 1) as iteration}
						<!-- prettier-ignore -->
						<h2 class="ml-2 text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl 2xl:text-9xl slide">
							Musik
						</h2>
						<!-- prettier-ignore -->
						<div class="slide">
							<a href="https://open.spotify.com/artist/1dnEfTWZekuLgNFkASxQqV" target="_blank" class="cursor-pointer iconify-icon"><Icon on:load={() => iconLoaded()} icon="mdi:spotify" color="hsl(var(--s))" width={outerWidth > 1135 ? '100px' : "50px"} /></a>
						</div>
						<!-- prettier-ignore -->
						<div class="slide">
							<a href="https://music.amazon.de/artists/B0BBSY4YP1/t%C3%A4glich-frisches-obst?marketplaceId=A1PA6795UKMFR9&musicTerritory=DE&ref=dm_sh_AhKPMyUQ5RtLmXouGyIV6Uqxm" target="_blank" class="cursor-pointer iconify-icon"><Icon on:load={() => iconLoaded()} icon="arcticons:amazon-music" color="hsl(var(--s))" width={outerWidth > 1135 ? '100px' : "50px"} /></a>
						</div>
						<!-- prettier-ignore -->
						<div class="slide">
							<a href="https://music.apple.com/us/artist/t%C3%A4glich-frisches-obst/1641480117" target="_blank" class="cursor-pointer iconify-icon"><Icon on:load={() => iconLoaded()} icon="simple-icons:applemusic" color="hsl(var(--s))" width={outerWidth > 1135 ? '90px' : "45px"} /></a>
						</div>
						<!-- prettier-ignore -->
						<div class="slide">
							<a href="https://listen.tidal.com/artist/34019184" target="_blank" class="cursor-pointer iconify-icon"><Icon on:load={() => iconLoaded()} icon="simple-icons:tidal" color="hsl(var(--s))" width={outerWidth > 1135 ? '100px' : "50px"} /></a>
						</div>
						<!-- prettier-ignore -->
						<div class="slide">
							<a href="https://www.deezer.com/de/artist/180952187?ext_publisher_id=1041161&awc=23454_1670112062_0e4fa0035bb449fff233bea5be9de03c" target="_blank" class="cursor-pointer iconify-icon"><Icon on:load={() => iconLoaded()} icon="fa6-brands:deezer" color="hsl(var(--s))" width={outerWidth > 1135 ? '100px' : "50px"} /></a>
						</div>
					{:else}
						<span class="loading loading-ball loading-lg"></span>
					{/each}
				</div>
			</div>
		</div>
	</section>
	<section id="videos" class="min-h-screen flex flex-col scroll-mt-0 z-10">
		<!-- prettier-ignore -->
		<div class="carousel w-full h-screen">
			{#each videos as video, index}
			<div id="video-{index}" class="carousel-item relative w-full h-full">
				<iframe src={video.videoUrl}
				title="YouTube video player"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				allowfullscreen
				class="w-full h-full"></iframe>
				<div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
				  <a href="#video-{index-1 < 0 ? videos.length-1 : index-1}" class="btn btn-circle">❮</a>
				  <a href="#video-{index+1 > videos.length-1 ? 0 : index+1}" class="btn btn-circle">❯</a>
				</div>
			  </div>
			{:else}
			  <span class="loading loading-ball loading-lg"></span>
			{/each}
		</div>

		<!-- prettier-ignore -->
		<h2 class="text-2xl font-bold text-center sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl 2xl:text-9xl">
			Videos
		</h2>
	</section>
	<section id="gallery" class="min-h-screen flex flex-col mt-[20rem] scroll-mt-[20rem] z-10">
		<div class="flex mr-2">
			<!-- prettier-ignore -->
			<h2 class="text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl 2xl:text-9xl"
				style="writing-mode:vertical-lr; transform: rotate(-180deg);">
				Fotos
			</h2>
			<Gallery galleryID="gallery" {images} />
		</div>
	</section>
	<!-- prettier-ignore -->
	<section id="contact" class="min-h-screen flex flex-col mt-[15rem] scroll-mt-[15rem] -z-10 mx-4 relative">
		{#if outerWidth > 1535}
			<!-- prettier-ignore -->
			<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2000 2000' class="fill-neutral w-[48rem] max-w-full absolute top-0 left-1/2 transform -translate-x-1/2"><path d='M994 112c-703-2-920.47 400.35-904 905 13.35 409 32.03 946.66 977 861 684-62 792-279 835-777 61.67-714.25-288.33-987.24-908-989Z'></path></svg>
		{/if}

		<div class="absolute top-0 left-1/2 transform -translate-x-1/2">
			<!-- prettier-ignore -->
			<h2 class="px-4 text-2xl font-bold text-center sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl 2xl:text-9xl text-secondary">
				Kontakt
			</h2>
			<div class="flex flex-col items-center justify-center w-full gap-4">
				<div id="contact-form" class="p-2 border-2 bg-neutral border-primary rounded-2xl">
					<h3 class="mb-4 text-3xl font-bold text-secondary">Schreibe uns:</h3>
					<form class="flex flex-col gap-2">
						<textarea
							placeholder="Deine Nachricht..."
							value="Hey Täglich Frisches Obst,"
							class="w-full max-w-xs p-2 pt-1 resize-none textarea textarea-bordered textarea-lg"
							title="Nachricht"
							disabled
						/>
						<div class="flex flex-wrap gap-2">
							<input
								type="email"
								name="email"
								class="input input-bordered"
								title="Email"
								placeholder="deine@email.tld"
								disabled
							/>
							<button type="submit" class="btn btn-secondary btn-disabled" disabled>Absenden</button
							>
						</div>
					</form>
				</div>
				<div id="gig-letter" class="p-2 border-2 bg-neutral border-primary rounded-2xl">
					<h3 class="mb-4 text-3xl font-bold text-secondary">Gig-Letter</h3>
					<p class="mb-2 text-secondary">
						Erfahre als einer der Ersten, <br /> wann und wo Täglich Frisches Obst <br /> als nächstes
						auftritt!
					</p>
					<div class="flex flex-col gap-2">
						<form on:submit|preventDefault={subscribeToMailList} class="flex flex-wrap gap-2">
							<input
								type="email"
								name="email"
								class="input input-bordered"
								title="Email"
								placeholder="deine@email.tld"
							/>
							<button type="submit" class="btn btn-secondary">Abonnieren</button>
						</form>
						<form on:submit|preventDefault={unsubscribeFromMailList} class="flex flex-wrap gap-2">
							<input
								type="email"
								name="email"
								class="input input-bordered"
								title="Email"
								placeholder="deine@email.tld"
							/>
							<button type="submit" class="btn btn-secondary">Deabonnieren</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	</section>
</main>

<div class="relative">
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
				<a href="https://open.spotify.com/artist/1dnEfTWZekuLgNFkASxQqV" target="_blank" class="cursor-pointer transition-opacity hover:opacity-90 iconify-icon"><Icon on:load={() => iconLoaded()} icon="mdi:spotify" color="hsl(var(--s))" width={'50px'} /></a>
				<a href="https://music.amazon.de/artists/B0BBSY4YP1/t%C3%A4glich-frisches-obst?marketplaceId=A1PA6795UKMFR9&musicTerritory=DE&ref=dm_sh_AhKPMyUQ5RtLmXouGyIV6Uqxm" target="_blank" class="cursor-pointer transition-opacity hover:opacity-90 iconify-icon"><Icon on:load={() => iconLoaded()} icon="arcticons:amazon-music" color="hsl(var(--s))" width={'50px'} /></a>
				<a href="https://music.apple.com/us/artist/t%C3%A4glich-frisches-obst/1641480117" target="_blank" class="cursor-pointer transition-opacity hover:opacity-90 iconify-icon"><Icon on:load={() => iconLoaded()} icon="simple-icons:applemusic" color="hsl(var(--s))" width={'45px'} /></a>
				<a href="https://listen.tidal.com/artist/34019184" target="_blank" class="cursor-pointer transition-opacity hover:opacity-90 iconify-icon"><Icon on:load={() => iconLoaded()} icon="simple-icons:tidal" color="hsl(var(--s))" width={'50px'} /></a>
				<a href="https://www.deezer.com/de/artist/180952187?ext_publisher_id=1041161&awc=23454_1670112062_0e4fa0035bb449fff233bea5be9de03c" target="_blank" class="cursor-pointer transition-opacity hover:opacity-90 iconify-icon"><Icon on:load={() => iconLoaded()} icon="fa6-brands:deezer" color="hsl(var(--s))" width={'50px'} /></a>
			</div>
		</div>
	{/if}

	<!-- prettier-ignore -->
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path class="fill-neutral" fill-opacity="1" d="M0,128L60,160C120,192,240,256,360,250.7C480,245,600,171,720,165.3C840,160,960,224,1080,234.7C1200,245,1320,203,1380,181.3L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
</div>

<style lang="postcss">
</style>
