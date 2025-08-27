<script lang="ts">
	import { videos, fetchGigs, fetchImages } from '$script/data';
	import { subscribeToMailList, unsubscribeFromMailList } from '$script/api.js';

	import { compareDates, isFutureDate, dateOfString } from '$script/utility';
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import {
		sectionMarginTop as nh,
		gigsSectionHeight as gs,
		musicSectionHeight as ms,
		videosSectionHeight as vs,
		gallerySectionHeight as gas,
		infoSectionHeight as is,
		contactSectionHeight as cs
	} from '$store/objectsizes.js';

	import { Toaster, toast } from 'svelte-french-toast';
	import IconLoader from '$component/IconLoader.svelte';
	import Gallery from '$component/Gallery.svelte';
	import Card from '$component/Card.svelte';
	import CookieConsentConfig from '$component/CookieConsentConfig.svelte';
	import HorizontalMarquee from '$component/HorizontalMarquee.svelte';
	import Song from '$component/Song.svelte';
	import Embedded from '$component/Embedded.svelte';

	import type { Gig } from '$script/types';
	import type { LayoutData } from './$types';
	import type { Image } from '$script/types';

	/* svelte-ignore unused-export-let */
	export let data: LayoutData;

	let accordionContent = new Array(3);
	let galleryImages: Image[] = [];
	let lastImageAuthor: string;
	let lastImageSrc: string;
	let totalGigs: Gig[] = [];
	let displayAllGigs = false;

	let gigsSection: HTMLElement;
	let musicSection: HTMLElement;
	let videosSection: HTMLElement;
	let gallerySection: HTMLElement;
	let infoSection: HTMLElement;
	let contactSection: HTMLElement;



	let forceUpdate = 0;

	function scrollToAccordion(accordionElement: HTMLElement) {
		if (!accordionElement) return;
		
		// Small delay to allow accordion to expand first
		setTimeout(() => {
			// Get the actual navigation height from the store and convert rem to px
			const navHeightPx = $nh * 16; // Convert rem to px (1rem = 16px)
			const additionalPadding = 100; // Extra breathing room
			const totalOffset = navHeightPx + additionalPadding;
			
			// Calculate target position manually
			const elementTop = accordionElement.getBoundingClientRect().top + window.scrollY;
			const targetPosition = elementTop - totalOffset;
			
			window.scrollTo({
				top: targetPosition,
				behavior: 'smooth'
			});
		}, 150);
	}

	onMount(async () => {
		totalGigs = await fetchGigs();
		galleryImages = await fetchImages();
		lastImageSrc =
			galleryImages[galleryImages.length - 1]?.webp?.src ??
			galleryImages[galleryImages.length - 1]?.png?.src;
		lastImageAuthor =
			galleryImages[galleryImages.length - 1]?.webp?.copyright ??
			galleryImages[galleryImages.length - 1]?.png?.copyright;

		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			let scrollTimeout: NodeJS.Timeout;
			
			const updatePositions = () => {
				clearTimeout(scrollTimeout);
				scrollTimeout = setTimeout(() => {
					forceUpdate++;
				}, 150);
			};

			window.addEventListener('scroll', updatePositions, { passive: true });
			window.addEventListener('resize', updatePositions);
			window.addEventListener('orientationchange', () => {
				setTimeout(() => forceUpdate++, 300);
			});
		}
	});



	$: allGigs = totalGigs.sort((eventA, eventB) => compareDates(eventA.date, eventB.date));
	$: allGigsReversed = [...allGigs].sort((eventA, eventB) =>
		compareDates(eventB.date, eventA.date)
	);

	$: futureGigs = allGigsReversed.filter((gig) => isFutureDate(gig.date));
	$: pastGigs = allGigs.filter((gig) => !isFutureDate(gig.date));

	$: outerWidth = 0; // for responsiveness, if media query is not enough

	$: {
		forceUpdate;
		
		const isMobile = browser && (
			'ontouchstart' in window || 
			navigator.maxTouchPoints > 0 || 
			/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
			window.innerWidth <= 1024
		);
		
		const mobileOffset = isMobile ? -window.innerHeight * 0.15 : 0;
		
		if (gigsSection) {
			gs.set(gigsSection.getBoundingClientRect().top + window.scrollY + mobileOffset);
		}

		if (musicSection) {
			ms.set(musicSection.getBoundingClientRect().top + window.scrollY + mobileOffset);
		}

		if (videosSection) {
			vs.set(videosSection.getBoundingClientRect().top + window.scrollY + mobileOffset);
		}

		if (gallerySection) {
			gas.set(gallerySection.getBoundingClientRect().top + window.scrollY + mobileOffset);
		}

		if (infoSection) {
			is.set(infoSection.getBoundingClientRect().top + window.scrollY + mobileOffset);
		}

		if (contactSection) {
			cs.set(contactSection.getBoundingClientRect().top + window.scrollY + mobileOffset);
		}
	}

	function copyToClipboard(text: string, location: string | null = null) {
		if (location && browser) {
			const url = new URL(text, window.location.protocol + location);

			if (navigator.clipboard) {
				navigator.clipboard
					.writeText(url.toString())
					.then(() => {
						toast.success('Text erfolgreich in die Zwischenablage kopiert: ' + url);
					})
					.catch(() => {
						toast.error('Fehler beim Kopieren in die Zwischenablage');
					});
			}
		}
	}
</script>

<svelte:head>
	<link rel="canonical" href="https://taeglichfrischesobst.com/home" />
	<title>Täglich frisches Obst | Indie‑Pop Band aus Linz | Offizielle Website</title>
	<meta name="description" content="Offizielle Website von Täglich frisches Obst: Indie‑Pop Band aus Linz. Gigs & Termine, Musik, Videos, Fotos, Newsletter, Booking & Pressekit." />
	<meta name="keywords" content="Täglich frisches Obst, Indie‑Pop, Band, Linz, Konzerte, Gigs, Termine, Musik, Songs, Videos, Fotos, Newsletter, Booking, Presse, Österreich" />
	<meta name="robots" content="index,follow" />

	<meta property="og:type" content="website" />
	<meta property="og:locale" content="de_DE" />
	<meta property="og:url" content="https://taeglichfrischesobst.com/home" />
	<meta property="og:title" content="Täglich frisches Obst | Indie‑Pop Band aus Linz" />
	<meta property="og:description" content="Gigs & Termine, Musik, Videos und Fotos – alle Infos zur Indie‑Pop Band Täglich frisches Obst aus Linz." />
	<meta property="og:image" content="/assets/images/logo.png" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Täglich frisches Obst | Indie‑Pop Band aus Linz" />
	<meta name="twitter:description" content="Offizielle Website: Gigs, Musik, Videos, Fotos, Newsletter, Booking & Presse." />
	<meta name="twitter:image" content="/assets/images/logo.png" />
</svelte:head>

<svelte:window bind:outerWidth />

<Toaster />
<CookieConsentConfig />

<main class="min-h-screen">
	<section
		id="gigs"
		bind:this={gigsSection}
		class="flex flex-col"
		style="margin-top: {$nh}rem; scroll-margin-top: {$nh}rem;"
	>
		<div class="p-6 md:p-10 lg:p-16">
			<div class="overflow-auto relative max-h-96 rounded-xl bg-neutral text-secondary">
				<table class="table">
					<thead class="text-lg font-bold text-secondary">
						<tr class="sticky top-0 bg-neutral">
							<th>Datum</th>
							<th>Ort</th>
							<th>Veranstaltung</th>
							<th />
						</tr>
					</thead>
					<tbody class="text-lg">
						{#each futureGigs as gig, index}
							<tr
								style={futureGigs.length - 1 === index
									? 'border-color: hsl(var(--p) / var(--tw-bg-opacity));'
									: ''}
							>
								<td>{gig.date}{gig.time ? ' (' + gig.time + ')' : ''}</td>
								<td>{gig.location}</td>
								<td>{gig.event}</td>
								<td>
									{#if gig.date && new Date() <= dateOfString(gig.date) && gig.tickets}
										<!-- prettier-ignore -->
										<a href={typeof gig.tickets === 'string' ? gig?.tickets ?? "/" : "/"}>
											<button
												class="btn btn-primary"
												type="button"
											>
											Tickets
											</button>
										</a>
									{/if}
								</td>
							</tr>
						{:else}
							<span class="loading loading-ball loading-lg" />
						{/each}
						{#if displayAllGigs}
							{#each pastGigs as gig}
								<tr>
									<td>{gig.date}{gig.time ? ' (' + gig.time + ')' : ''}</td>
									<td>{gig.location}</td>
									<td>{gig.event}</td>
									<td>
										{#if gig.date && new Date() <= dateOfString(gig.date) && gig.tickets}
											<!-- prettier-ignore -->
											<a href={typeof gig.tickets === 'string' ? gig?.tickets ?? "/" : "/"}>
										<button
											class="btn btn-primary"
											type="button"
										>
										Tickets
										</button>
									</a>
										{/if}
									</td>
								</tr>
							{:else}
								<span class="loading loading-ball loading-lg" />
							{/each}
						{/if}
					</tbody>
					<tfoot class="sticky bottom-0 min-w-full bg-neutral">
						<tr>
							<td colspan="5" class="p-0">
								<hr />
								<div class="flex w-[calc(100% - 1rem)] py-2 px-2 sm:justify-center relative">
									<!-- prettier-ignore -->
									<button
										class="sticky top-0 left-2 btn btn-primary"
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
			<div class="flex justify-end px-2">
				<!-- prettier-ignore -->
				<a href="/request-gig" class="underline hover:no-underline">Location vorschlagen</a>
				&nbsp;|&nbsp;
				<button type="button" on:click={() => copyToClipboard('gigs', window.location.host)}>
					Link kopieren
				</button>
			</div>
			<!-- prettier-ignore -->
			<h2 class="relative text-4xl font-bold text-right -z-40 lg:text-5xl xl:text-7xl 2xl:text-9xl bg-image sm:text-left">
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
	<section
		id="music"
		bind:this={musicSection}
		class="flex z-10 flex-col mb-16"
		style="margin-top: {$nh}rem; scroll-margin-top: {$nh}rem;"
	>
		<HorizontalMarquee>
			<svelte:fragment slot="top">
				<!-- prettier-ignore -->
				<h2 class="ml-2 text-4xl font-bold lg:text-5xl xl:text-7xl 2xl:text-9xl slide-content">
					Socials
				</h2>
				<IconLoader
					anchor_href={'https://www.youtube.com/channel/UCM6LtE6jYUv7wEHvgB83_Qw'}
					anchor_classes="slide-content"
					icon="mdi:youtube"
					color="hsl(var(--s))"
					width={outerWidth > 1135 ? '140px' : '70px'}>youtube</IconLoader
				>
				<IconLoader
					anchor_href={'https://www.instagram.com/taeglichfrischesobst'}
					anchor_classes="slide-content"
					icon="ri:instagram-fill"
					color="hsl(var(--s))"
					width={outerWidth > 1135 ? '100px' : '50px'}>instagram</IconLoader
				>
				<IconLoader
					anchor_href={'https://www.tiktok.com/@taeglichfrischesobst'}
					anchor_classes="slide-content"
					icon="ic:baseline-tiktok"
					color="hsl(var(--s))"
					width={outerWidth > 1135 ? '100px' : '50px'}>tiktok</IconLoader
				>
				<IconLoader
					anchor_href={'https://www.facebook.com/taeglichfrischesobst'}
					anchor_classes="slide-content"
					icon="ri:facebook-fill"
					color="hsl(var(--s))"
					width={outerWidth > 1135 ? '100px' : '50px'}>facebook</IconLoader
				>
			</svelte:fragment>
			<svelte:fragment slot="center">
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<!-- prettier-ignore -->
				<div class="overflow-auto overflow-y-hidden p-2 mx-2 rounded-2xl bg-neutral songs"
					on:wheel={(event) => {
						event.preventDefault();
						event.currentTarget.scrollLeft += Math.sign(event.deltaY) * 300;
					}} tabindex="0">
					
					<Embedded component_type="audio">
						<!-- prettier-ignore -->
						<Song url={'https://open.spotify.com/embed/track/6ypAL1XSxjx1sSP2Ibr6pb?utm_source=generator'} />
						<!-- prettier-ignore -->
						<Song url={'https://open.spotify.com/embed/track/667zFxc0RivFgJ989sq6LH?utm_source=generator'} />
						<!-- prettier-ignore -->
						<Song url={'https://open.spotify.com/embed/track/1O3l3joweVnJ7ZsJvioPVh?utm_source=generator'} />        
					</Embedded>
				</div>
			</svelte:fragment>
			<svelte:fragment slot="bottom">
				<!-- prettier-ignore -->
				<h2 class="ml-2 text-4xl font-bold lg:text-5xl xl:text-7xl 2xl:text-9xl slide-content">
					Musik
				</h2>
				<IconLoader
					anchor_href="https://open.spotify.com/artist/1dnEfTWZekuLgNFkASxQqV"
					anchor_classes="slide-content"
					icon="mdi:spotify"
					color="hsl(var(--s))"
					width={outerWidth > 1135 ? '100px' : '50px'}>spotify</IconLoader
				>
				<IconLoader
					anchor_href={'https://music.amazon.de/artists/B0BBSY4YP1/t%C3%A4glich-frisches-obst?marketplaceId=A1PA6795UKMFR9&musicTerritory=DE&ref=dm_sh_AhKPMyUQ5RtLmXouGyIV6Uqxm'}
					anchor_classes="slide-content"
					icon="arcticons:amazon-music"
					color="hsl(var(--s))"
					width={outerWidth > 1135 ? '100px' : '50px'}>amazon music</IconLoader
				>
				<IconLoader
					anchor_href={'https://music.apple.com/us/artist/t%C3%A4glich-frisches-obst/1641480117'}
					anchor_classes="slide-content"
					icon="simple-icons:applemusic"
					color="hsl(var(--s))"
					width={outerWidth > 1135 ? '90px' : '45px'}>apple music</IconLoader
				>
				<IconLoader
					anchor_href={'https://listen.tidal.com/artist/34019184'}
					anchor_classes="slide-content"
					icon="simple-icons:tidal"
					color="hsl(var(--s))"
					width={outerWidth > 1135 ? '100px' : '50px'}>tidal</IconLoader
				>
				<IconLoader
					anchor_href={'https://www.deezer.com/de/artist/180952187?ext_publisher_id=1041161&awc=23454_1670112062_0e4fa0035bb449fff233bea5be9de03c'}
					anchor_classes="slide-content"
					icon="fa6-brands:deezer"
					color="hsl(var(--s))"
					width={outerWidth > 1135 ? '100px' : '50px'}>deezer</IconLoader
				>
			</svelte:fragment>
		</HorizontalMarquee>
	</section>
	<section
		id="videos"
		bind:this={videosSection}
		class="flex z-10 flex-col mt-2 scroll-mt-0 bg-base-200"
	>
		<!-- prettier-ignore -->
		<div class="w-full h-screen carousel">
			<Embedded component_type="video">
				{#each videos as video, index}
				<div id="video-{index}" class="relative w-full h-full carousel-item">
					<iframe src={video.videoUrl}
					title="YouTube video player"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					allowfullscreen
					class="w-full h-full"></iframe>
					<div class="flex absolute right-5 left-5 top-1/2 justify-between transform -translate-y-1/2">
					<a href="#video-{index-1 < 0 ? videos.length-1 : index-1}" class="btn btn-circle">❮</a>
					<a href="#video-{index+1 > videos.length-1 ? 0 : index+1}" class="btn btn-circle">❯</a>
					</div>
				</div>
				{:else}
					<span class="loading loading-ball loading-lg"></span>
				{/each}
			</Embedded>
		</div>

		<!-- prettier-ignore -->
		<h2 class="py-2 text-4xl font-bold text-center lg:text-5xl xl:text-7xl 2xl:text-9xl">
			Videos
		</h2>
	</section>
	<section
		id="gallery"
		bind:this={gallerySection}
		class="flex z-10 flex-col"
		style="margin-top: {$nh}rem; scroll-margin-top: {$nh}rem;"
	>
		<div class="flex mr-2">
			<!-- prettier-ignore -->
			<h2 class="text-4xl font-bold lg:text-5xl xl:text-7xl 2xl:text-9xl"
				style="writing-mode:vertical-lr; transform: rotate(-180deg);">
				Fotos
			</h2>
			<Gallery galleryID="gallery" images={galleryImages} />
		</div>
	</section>
	<section
		id="info"
		bind:this={infoSection}
		class="z-10 p-5"
		style="margin-top: {$nh}rem; scroll-margin-top: {$nh}rem;"
	>
		<h2 class="text-4xl lg:text-5xl xl:text-7xl 2xl:text-9xl">Infos</h2>
		<!-- prettier-ignore -->
		<a class="btn btn-primary" target="_blank" href="https://nextcloud.edv-oellinger.eu/s/JNdizxtLofkoCtF/download" download="tfo-pressekit">
			Pressekit Downloaden
		</a>
		<div class="py-5 max-w-full w-[1200px]">
			<div
				class="my-2 collapse collapse-plus bg-base-200"
				id="accordion-content-1"
				bind:this={accordionContent[0]}
			>
				<input type="radio" name="info-accordion" checked on:click={() => scrollToAccordion(accordionContent[0])} />
				<div class="text-xl font-medium collapse-title">Über uns</div>
				<div class="collapse-content">
					<div class="max-w-full prose">
						<h3 class="text-4xl">Wer ist Täglich frisches Obst?</h3>
						<span class="flex flex-col gap-8 lg:flex-row">
							<p class="flex-shrink text-lg lg:max-w-[50%]">
								Seit ihrer Gründung im Februar 2022 begeistert die Linzer Indie-Pop-Band "<a
									target="_blank"
									href="https://nextcloud.edv-oellinger.eu/s/JNdizxtLofkoCtF"
									>Täglich frisches Obst</a
								>" mit ihrem wiedererkennbaren Stil und einer erfrischenden musikalischen Vielfalt.
								Abseits etablierter Regelwerke kreieren die Musiker einen einzigartigen Klang mit
								Elementen aus Funk, Rock und Jazz, der die Grenzen des Genres herausfordert. Ende
								des Jahres 2022 veröffentlichte die Band ihre ersten beiden Singles, insgesamt drei
								Songs, die auf den verschiedensten Musikplattformen bereits vielfach gestreamt
								wurden und auch das Publikum bei ihren Live-Auftritten mitreißen. Die fünfköpfige
								Band mit sowohl klassischen als auch Jazz- und Pop-Backgrounds, bestehend aus Josef
								Brandner (Gesang), Jakob Lasinger (E-Gitarre), Vincent Louis (E-Gitarre), Jakob
								Brandstetter (E-Bass) und Tobias Fröller (Schlagzeug), hat in kürzester Zeit eine
								begeisterte Fangemeinde aufgebaut und ist bereit, mit ihrem außergewöhnlichen Stil
								die deutschsprachige Musikszene zu erobern.
							</p>
							<img
								class="object-contain overflow-hidden flex-grow self-start"
								src={lastImageSrc}
								alt="Still Musikvideo Auf dem Dach - ©Niko Nopp"
							/>
						</span>
					</div>
				</div>
			</div>
			<div
				class="my-2 collapse collapse-plus bg-base-200"
				id="accordion-content-2"
				bind:this={accordionContent[1]}
			>
				<input type="radio" name="info-accordion" on:click={() => scrollToAccordion(accordionContent[1])} />
				<div class="text-xl font-medium collapse-title">Berichte & Interviews</div>
				<div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 collapse-content">
					<Card
						figure_url={'https://www.w24.at/Sendungen-A-Z/Wienyl/Alle-Folgen?video=31984'}
						figure_img_src={'/assets/images/fernsehen/w24_Wienyl_16_K1_TV.jpg'}
						content_title={'Wienyl - Folge 16 (Auftritt)'}
						content_date={'12.7.2024'}
						content_description={`Wir sind heute zu Gast in Wiens legendärer Location - im Gasometer in Simmering, wo es heute richtig rockig wird. Viel Gitarrensound, Drum'n'Bass, live Atmosphäre vom Feinsten, junge Bands und alte Geschichten, legendäre Musikgeschichte aus Wien von Josef "Muff" Sopper. Den Lautsprecher bitte richtig laut aufdrehen!`}
						content_url={'https://www.w24.at/Sendungen-A-Z/Wienyl/Alle-Folgen?video=31984'}
						content_url_label={'zur Sendung'}
					/>
					<Card
						figure_url={'https://www.fro.at/ann-and-pat-radioshow-nach-dienstag-gibt-es-heringe-am-dach/'}
						figure_img_src={'/assets/images/radio/ann_and_pat-Radioshow-NachDienstagGibtEsHeringeAmDach.png'}
						content_title={'ann and pat Radioshow – Nach Dienstag gibt es Heringe am Dach (Interview)'}
						content_date={'17.7.2024'}
						content_description={`Was sich im letzten Jahr bei Täglich frisches Obst alles getan hat, was Neues auf uns zukommt und natürlich gibt es wieder viel Musik von ihnen und anderen tollen Acts aus dem Indie-Bereich. Einschalten und die musikalischen Vitamine genießen!`}
						content_url={'https://www.fro.at/ann-and-pat-radioshow-nach-dienstag-gibt-es-heringe-am-dach/'}
						content_url_label={'zur Radioshow'}
					/>
					<Card
						figure_url={'https://www.fro.at/ann-and-pat-radioshow-zeit-fuer-vitamine/'}
						figure_img_src={'/assets/images/radio/ann_and_pat-Radioshow–ZeitFuerVitamine.png'}
						content_title={'ann and pat radioshow (Interview)'}
						content_date={'15.3.2023'}
						content_description={`Der Frühling kann kommen, "täglich frisches Obst" sorgen für den musikalischen Vitamin-Boost!`}
						content_url={'https://www.fro.at/ann-and-pat-radioshow-zeit-fuer-vitamine/'}
						content_url_label={'zur Radioshow'}
					/>
					<Card
						figure_url={'https://www.fro.at/ann-and-pat-radioshow-gluehohren/'}
						figure_img_src={'/assets/images/radio/ann_and_pat-Radioshow–Gluehohren.png'}
						content_title={'ann and pat radioshow (Auftritt)'}
						content_date={'21.12.2022'}
						content_description={`06 TÄGLICH FRISCHES OBST - Dolce far niente (min. 18:12)`}
						content_url={'https://www.fro.at/ann-and-pat-radioshow-gluehohren/'}
						content_url_label={'zur Radioshow'}
					/>
				</div>
			</div>
			<div
				class="my-2 collapse collapse-plus bg-base-200"
				id="accordion-content-3"
				bind:this={accordionContent[2]}
			>
				<input type="radio" name="info-accordion" on:click={() => scrollToAccordion(accordionContent[2])} />
				<div class="text-xl font-medium collapse-title">Artikel über Täglich Frisches Obst</div>
				<div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 collapse-content">
					<Card
						figure_url={'https://www.musikmagazin.at/news/neue-single-von-taeglich-frisches-obst-dolce-far-niente/'}
						figure_img_src={lastImageSrc}
						content_title={'„Dolce far Niente“'}
						content_date={'Dezember 2022'}
						content_description={`Neue Single von Täglich frisches Obst: „Dolce far Niente“`}
						content_url={'https://www.musikmagazin.at/news/neue-single-von-taeglich-frisches-obst-dolce-far-niente/'}
						content_url_label={'zum Artikel'}
					>
						<IconLoader
							anchor_href={'https://open.spotify.com/track/6ypAL1XSxjx1sSP2Ibr6pb?si=96c5e096eb9c4686'}
							anchor_classes="absolute top-0 left-0"
							icon="mdi:spotify"
							color="hsl(var(--s))"
							width="40px">spotify</IconLoader
						>
						<a
							href="https://www.instagram.com/taeglichfrischesobst?copyright={lastImageAuthor}"
							target="_blank"
							class="absolute bottom-0 right-1 capitalize">© {lastImageAuthor}</a
						>
					</Card>
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
	<section id="contact" bind:this={contactSection} class="flex overflow-visible relative z-10 flex-col mx-4 min-h-screen h-fit" style="margin-top: {$nh}rem; scroll-margin-top: {$nh}rem;">
		{#if outerWidth >= 750}
			<!-- prettier-ignore -->
			<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2000 2000' class="-z-50 pointer-events-none fill-neutral w-[48rem] max-w-full absolute top-0 left-1/2 transform -translate-x-1/2"><path d='M994 112c-703-2-920.47 400.35-904 905 13.35 409 32.03 946.66 977 861 684-62 792-279 835-777 61.67-714.25-288.33-987.24-908-989Z'></path></svg>
		{/if}

		<div class="relative top-0 left-1/2 z-10 w-full transform -translate-x-1/2 2xl:w-auto">
			<!-- prettier-ignore -->
			<h2 class="px-4 mb-1 text-4xl font-bold text-center bg-base-100 lg:text-5xl xl:text-7xl 2xl:text-9xl text-secondary sm:mb-0">
				Kontakt
			</h2>
			<div class="flex flex-col gap-4 justify-center items-center">
				<div id="gig-letter" class="max-w-full w-[65ch] p-2 border-2 bg-neutral border-primary rounded-2xl">
					<h3 class="mb-4 text-2xl font-bold sm:text-3xl text-secondary">Newsletter</h3>
					<p class="mb-2 text-secondary">
						Erfahre als einer der Ersten, <br>
						wann Täglich Frisches Obst wieder auftritt <br> 
						oder neue Releases anstehen!
					</p>
					<div class="flex flex-col gap-2">
						<form on:submit|preventDefault={subscribeToMailList} class="grid grid-rows-1 sm:grid-cols-[1fr_auto] gap-2">
							<input
								type="email"
								name="email"
								class="input input-bordered"
								title="Email"
								placeholder="deine@email.tld"
							/>
							<button type="submit" class="btn-secondary btn">Abonnieren</button>
						</form>
						<form on:submit|preventDefault={unsubscribeFromMailList} class="grid grid-rows-1 sm:grid-cols-[1fr_auto] gap-2">
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
				<div id="contact-form" class="max-w-full p-2 border-2 bg-neutral border-primary rounded-2xl w-[65ch]">
					<h3 class="mb-4 text-2xl font-bold sm:text-3xl text-secondary">Schreibe uns:</h3>
					<form action="https://formsubmit.co/info@taeglichfrischesobst.com" method="POST" class="flex flex-col gap-2">
						<textarea
							placeholder="Deine Nachricht..."
							value="Hey Täglich Frisches Obst,"
							class="p-2 pt-1 resize-none textarea textarea-bordered textarea-lg"
							title="Nachricht"
							name="message"
						/>
						<div class="grid grid-rows-1 sm:grid-cols-[1fr_auto] gap-2">
							<input
								type="email"
								name="email"
								class="input input-bordered"
								title="Email"
								placeholder="deine@email.tld"
							/>
							<button type="submit" class="btn btn-secondary">Absenden</button
							>
						</div>
					</form>
				</div>
				<div id="booking" class="max-w-full w-[65ch] p-2 border-2 bg-neutral border-primary rounded-2xl">
					<h3 class="mb-4 text-3xl font-bold text-secondary">Booking</h3>
					<p class="mb-2 text-secondary">
						<strong>Kontaktperson</strong>: Clemens Erhart <br>
						<strong>E-Mail</strong>: <a class="hover:underline" href="mailto:booking@skits.agency">booking@skits.agency</a>
					</p>
				</div>
				<div id="presse" class="max-w-full w-[65ch] p-2 border-2 bg-neutral border-primary rounded-2xl">
					<h3 class="mb-4 text-3xl font-bold text-secondary">Presse</h3>
					<p class="mb-2 text-secondary">
						<strong>Kontaktpersonen</strong>: Jakob Lasinger & Vincent Louis <br>
						<strong>E-Mail</strong>: <a class="hover:underline" href="mailto:presse@taeglichfrischesobst.com">presse@taeglichfrischesobst.com</a>
					</p>
				</div>
			</div>
		</div>
	</section>
</main>
