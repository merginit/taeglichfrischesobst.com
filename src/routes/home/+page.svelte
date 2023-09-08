<script lang="ts" context="module" type="module">
</script>

<script lang="ts">
	import Icon from '@iconify/svelte';
	import toast, { Toaster } from 'svelte-french-toast';
	import Gallery from '$component/Gallery.svelte';
	import { gigs } from '$script/data';
	import { videos } from '$script/data';
	import { images } from '$script/data';
	import { compareDates, isFutureDate } from '$script/utility';
	import IconLoader from '$script/icons';
	import Song from '$component/Song.svelte';
	import { onMount } from 'svelte';
	/* import {
		getStoryblokApi,
		useStoryblokBridge,
		StoryblokComponent,
		type ISbStoryData
	} from '@storyblok/svelte'; */
	// import gsap from 'gsap';

	/* svelte-ignore unused-export-let */
	export let data;

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

	/* let story: ISbStoryData<any> | null = null;
	onMount(async () => {
		const storyblokApi = getStoryblokApi();
		const { data } = await storyblokApi.get('cdn/stories/home', {
			version: 'draft'
		});
		story = data.story;

		if (story) {
			useStoryblokBridge(story.id, (newStory) => (story = newStory));
		}
	}); */

	let gigsIncludingFetched: any[] = [];

	onMount(async () => {
		const fetchedGigs = await fetchGigs();
		gigsIncludingFetched = gigs.concat(fetchedGigs);
	});

	async function fetchGigs() {
		const response = await fetch('/storyblok?slug=gigs');
		const data = await response.json();
		const fetchedGigs = data.data;

		fetchedGigs.forEach((gig: any) => {
			// format date
			if (gig.date) {
				const parsedDate = new Date(gig.date);
				const day = parsedDate.getDate().toString().padStart(2, '0');
				const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0');
				const year = parsedDate.getFullYear();

				gig.date = `${day}.${month}.${year}`;
			}

			// format ticket url
			if (gig.tickets) {
				gig.tickets = gig.tickets.url;
			}
		});

		return fetchedGigs;
	}

	$: allGigs = gigsIncludingFetched.sort((eventA, eventB) =>
		compareDates(eventA.date, eventB.date)
	);
	$: futureGigs = allGigs.filter((gig) => isFutureDate(gig.date));

	let displayAllGigs = false;
	$: displayedGigs = displayAllGigs ? allGigs : futureGigs;

	const iconLoaderInstance = IconLoader.getInstance();
	const iconLoaded = iconLoaderInstance.iconLoaded;

	$: outerWidth = 0; // for responsiveness, if media query is not enough
</script>

<svelte:head>
	<meta property="og:url" content="https://taeglichfrischesobst.vercel.app/" />
	<meta property="og:title" content="Home" />
	<meta property="og:description" content="Home" />

	<meta name="description" content="Home" />
	<meta name="keywords" content="home,tfo" />
	<title>Täglich Frisches Obst</title>
</svelte:head>

<svelte:window bind:outerWidth />

<!-- {#if story}
	<StoryblokComponent blok={story.content} />
{/if} -->

<Toaster />

<main class="min-h-screen">
	<section id="gigs" class="min-h-screen flex flex-col mt-[20rem] scroll-mt-[20rem]">
		<div class="p-6 md:p-10 lg:p-16">
			<div class="relative overflow-auto max-h-96 bg-neutral rounded-xl text-secondary">
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
						{#each displayedGigs as gig, index}
							<tr>
								<th>{index + 1}</th>
								<td>{gig.date}{gig.time ? ' (' + gig.time + ')' : ''}</td>
								<td>{gig.location}</td>
								<td>{gig.event}</td>
								<td>
									<!-- prettier-ignore -->
									<a href={gig.tickets && typeof gig.tickets === "string" ? gig.tickets : '#'}>
										<button disabled={typeof gig.tickets !== "string" ? true : false}  class="btn {gig.tickets && typeof gig.tickets === "string" && gig.tickets.trim().length > 0 ? 'btn-success' : 'btn-error'}" type="button">
											{typeof gig.tickets !== "string" ? "" : "Tickets"}
										</button>
									</a>
								</td>
							</tr>
						{:else}
							<span class="loading loading-ball loading-lg" />
						{/each}
					</tbody>
					<tfoot class="sticky bottom-0 min-w-full bg-neutral">
						<tr>
							<td colspan="5" class="p-0">
								<hr />
								<div class="flex w-[calc(100% - 1rem)] py-2 px-2 sm:justify-center">
									<!-- prettier-ignore -->
									<button
										class="btn btn-primary"
										type="button"
										on:click={() => (displayAllGigs = !displayAllGigs)}>
										{#if displayAllGigs}
											Weniger
										{:else}
											Mehr
										{/if}
									</button>
								</div>
							</td>
						</tr>
					</tfoot>
				</table>
			</div>
			<!-- prettier-ignore -->
			<h2 class="relative text-2xl font-bold -z-40 sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl 2xl:text-9xl bg-image">
				Gigs
				{#if outerWidth > 1535}
					<!-- prettier-ignore -->
					<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="absolute top-0 left-0 w-40 pointer-events-none wobble -z-50">
						<path fill="hsl(var(--b2))" d="M41.8,-70C55.9,-64.1,70.5,-56.6,79.5,-44.7C88.5,-32.7,91.8,-16.4,91.2,-0.4C90.6,15.6,85.9,31.3,77.6,44.4C69.3,57.5,57.4,68.2,43.9,76.7C30.3,85.3,15.2,91.8,0.5,90.9C-14.2,90.1,-28.3,81.9,-41.1,72.8C-53.8,63.8,-65.1,53.9,-72.5,41.6C-79.9,29.4,-83.4,14.7,-83.8,-0.2C-84.2,-15.1,-81.5,-30.3,-73.5,-41.6C-65.5,-52.9,-52.3,-60.3,-39.2,-66.8C-26.1,-73.3,-13,-78.9,0.4,-79.6C13.8,-80.2,27.6,-75.9,41.8,-70Z" transform="translate(100 100)" />
					</svg>
				{/if}
			</h2>
		</div>
	</section>
	<!-- svelte-ignore a11y-missing-attribute -->
	<section id="music" class="min-h-screen flex flex-col mt-[20rem] scroll-mt-[20rem] z-10">
		<div class="flex flex-wrap justify-center gap-4 px-6 md:px-10 lg:px-16">
			<!-- prettier-ignore -->
			<div class="gap-2 lg:gap-4 slider-reverse">
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
				class="p-2 overflow-auto overflow-y-hidden bg-neutral rounded-2xl songs"
				on:wheel={(event) => {
					event.preventDefault();
					event.currentTarget.scrollLeft += Math.sign(event.deltaY) * 300;
				}}
				tabindex="0"
			>
				<Song
					url={'https://open.spotify.com/embed/track/6ypAL1XSxjx1sSP2Ibr6pb?utm_source=generator'}
				/>
				<Song
					url={'https://open.spotify.com/embed/track/667zFxc0RivFgJ989sq6LH?utm_source=generator'}
				/>
				<Song
					url={'https://open.spotify.com/embed/track/1O3l3joweVnJ7ZsJvioPVh?utm_source=generator'}
				/>
			</div>
			<!-- prettier-ignore -->
			<div class="slider">
				<div class="gap-2 lg:gap-4 slide-track">
					{#each Array.from({ length: 4 }, (_, i) => i + 1) as i}
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
	<section id="videos" class="z-10 flex flex-col min-h-screen scroll-mt-0">
		<!-- prettier-ignore -->
		<div class="w-full h-screen carousel">
			{#each videos as video, index}
			<div id="video-{index}" class="relative w-full h-full carousel-item">
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
	<section id="info" class="min-h-screen mt-[20rem] scroll-mt-[20rem] z-10 p-5">
		<h2 class="text-6xl">Infos</h2>
		<!-- prettier-ignore -->
		<a class="btn btn-primary" href="https://drive.google.com/drive/folders/1YDHLdJCZMhydcBH3kov8vY82XpznrB3_">
			Pressekit Downloaden
		</a>
		<div class="py-5">
			<div class="my-2 collapse collapse-plus bg-base-200">
				<input type="radio" name="info-accordion" checked />
				<div class="text-xl font-medium collapse-title">Über uns</div>
				<div class="collapse-content">
					<div class="max-w-full prose">
						<h3 class="text-4xl">Wer ist Täglich frisches Obst?</h3>
						<p class="text-lg">
							Seit ihrer Gründung im Februar 2022 begeistert die Linzer Indie-Pop-Band "Täglich
							frisches Obst" mit ihrem wiedererkennbaren Stil und einer erfrischenden musikalischen
							Vielfalt. Abseits etablierter Regelwerke kreieren die Musiker einen einzigartigen
							Klang mit Elementen aus Funk, Rock und Jazz, der die Grenzen des Genres herausfordert.
							Ende des Jahres 2022 veröffentlichte die Band ihre ersten beiden Singles, insgesamt
							drei Songs, die auf den verschiedensten Musikplattformen bereits vielfach gestreamt
							wurden und auch das Publikum bei ihren Live-Auftritten mitreißen. Die fünfköpfige Band
							mit sowohl klassischen als auch Jazz- und Pop-Backgrounds, bestehend aus Josef
							Brandner (Gesang), Jakob Lasinger (E-Gitarre), Vincent Louis (E-Gitarre), Jakob
							Brandstetter (E-Bass) und Tobias Fröller (Schlagzeug), hat in kürzester Zeit eine
							begeisterte Fangemeinde aufgebaut und ist bereit, mit ihrem außergewöhnlichen Stil die
							deutschsprachige Musikszene zu erobern.
						</p>
					</div>
				</div>
			</div>
			<div class="my-2 collapse collapse-plus bg-base-200">
				<input type="radio" name="info-accordion" />
				<div class="text-xl font-medium collapse-title">Radiosendungen/Interviews</div>
				<div class="flex flex-wrap gap-2 collapse-content">
					<div class="w-[calc(100% - 2rem)] lg:w-96 shadow-xl card bg-base-100">
						<figure>
							<!-- prettier-ignore -->
							<a href="https://www.fro.at/ann-and-pat-radioshow-zeit-fuer-vitamine/" target="_blank" class="relative">
								<img src="/assets/images/radio/ann_and_pat-Radioshow–ZeitFuerVitamine.png" alt="ann_and_pat-ZeitFuerVitamine" />
							</a>
						</figure>

						<div class="card-body">
							<h3 class="card-title">
								ann and pat radioshow - interview
								<div class="badge badge-secondary">15.3.2023</div>
							</h3>
							<p>
								Der Frühling kann kommen, "täglich frisches Obst" sorgen für den musikalischen
								Vitamin-Boost!
							</p>
							<div class="justify-start card-actions">
								<!-- prettier-ignore -->
								<a href="https://www.fro.at/ann-and-pat-radioshow-zeit-fuer-vitamine/" target="_blank" class="btn btn-primary">zur Radioshow</a>
							</div>
						</div>
					</div>
					<div class="w-[calc(100% - 2rem)] lg:w-96 shadow-xl card bg-base-100">
						<figure>
							<!-- prettier-ignore -->
							<a href="https://www.fro.at/ann-and-pat-radioshow-gluehohren/" target="_blank" class="relative">
								<img src="/assets/images/radio/ann_and_pat-Radioshow–Gluehohren.png" alt="ann_and_pat-ZeitFuerVitamine" />
							</a>
						</figure>

						<div class="card-body">
							<h3 class="card-title">
								ann and pat radioshow - auftritt
								<div class="badge badge-secondary">21.12.2022</div>
							</h3>
							<p>06 TÄGLICH FRISCHES OBST - Dolce far niente (min. 18:12)</p>
							<div class="justify-start card-actions">
								<!-- prettier-ignore -->
								<a href="https://www.fro.at/ann-and-pat-radioshow-gluehohren/" target="_blank" class="btn btn-primary">zur Radiosendung</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="my-2 collapse collapse-plus bg-base-200">
				<input type="radio" name="info-accordion" />
				<div class="text-xl font-medium collapse-title">Artikel über Täglich Frisches Obst</div>
				<div class="flex gap-2 collapse-content">
					<div class="w-[calc(100% - 2rem)] lg:w-96 shadow-xl card bg-base-100">
						<figure>
							<!-- prettier-ignore -->
							<a href="https://www.musikmagazin.at/news/neue-single-von-taeglich-frisches-obst-dolce-far-niente/" target="_blank" class="relative">
								<img src="/assets/images/band/Josef_Jakob_Vinny_Tobi ©Niko Nopp.webp" alt="band" />
								<!-- prettier-ignore -->
								<a href="https://open.spotify.com/track/6ypAL1XSxjx1sSP2Ibr6pb?si=96c5e096eb9c4686" target="_blank" class="absolute top-0 left-0 cursor-pointer iconify-icon"><Icon on:load={() => iconLoaded()} icon="mdi:spotify" color="hsl(var(--s))" height="40px" /></a>
								<a href="https://www.instagram.com/niko_nopp/" target="_blank" class="absolute bottom-0 right-1">© Niko Nopp</a>
							</a>
						</figure>

						<div class="card-body">
							<h3 class="card-title">
								„Dolce far Niente“
								<div class="badge badge-secondary">Dezember 2022</div>
							</h3>
							<p>Neue Single von Täglich frisches Obst: „Dolce far Niente“</p>
							<div class="justify-start card-actions">
								<!-- prettier-ignore -->
								<a href="https://www.musikmagazin.at/news/neue-single-von-taeglich-frisches-obst-dolce-far-niente/" target="_blank" class="btn btn-primary">zum Artikel</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			<a href="/legal/privacy-policy" class="font-extrabold link-secondary link-hover">
				Datenschutz & Cookies
			</a>
			|
			<a href="/legal/imprint" class="font-extrabold link-secondary link-hover">Impressum</a>
		</div>
	</section>
	<!-- prettier-ignore -->
	<section id="contact" class="min-h-screen flex flex-col mt-[15rem] scroll-mt-[15rem] z-10 mx-4 relative">
		{#if outerWidth > 1535}
			<!-- prettier-ignore -->
			<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2000 2000' class="-z-50 pointer-events-none fill-neutral w-[48rem] max-w-full absolute top-0 left-1/2 transform -translate-x-1/2"><path d='M994 112c-703-2-920.47 400.35-904 905 13.35 409 32.03 946.66 977 861 684-62 792-279 835-777 61.67-714.25-288.33-987.24-908-989Z'></path></svg>
		{/if}

		<div class="absolute top-0 z-10 w-full transform -translate-x-1/2 2xl:w-auto left-1/2">
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
						/>
						<div class="flex flex-wrap gap-2">
							<input
								type="email"
								name="email"
								class="input input-bordered"
								title="Email"
								placeholder="deine@email.tld"
							/>
							<button type="submit" class="btn btn-secondary" disabled>Absenden</button
							>
						</div>
					</form>
				</div>
				<div id="gig-letter" class="p-2 border-2 bg-neutral border-primary rounded-2xl">
					<h3 class="mb-4 text-3xl font-bold text-secondary">Newsletter</h3>
					<p class="mb-2 text-secondary">
						Erfahre als einer der Ersten, <br>
						wann wenn Täglich Frisches Obst wieder auftritt <br> 
						oder neue Releases anstehen!
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
							<button type="submit" class="btn btn-secondary" disabled>Abonnieren</button>
						</form>
						<form on:submit|preventDefault={unsubscribeFromMailList} class="flex flex-wrap gap-2">
							<input
								type="email"
								name="email"
								class="input input-bordered"
								title="Email"
								placeholder="deine@email.tld"
							/>
							<button type="submit" class="btn btn-secondary" disabled>Deabonnieren</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	</section>
</main>

<style lang="postcss">
</style>
