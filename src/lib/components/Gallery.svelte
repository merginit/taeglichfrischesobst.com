<script lang="ts">
	import 'photoswipe/style.css';
	import { onMount } from 'svelte';
	import PhotoSwipeLightbox from 'photoswipe/lightbox';
	import type { Image } from '$script/types';
	import GalleryImage from './GalleryImage.svelte';

	export let galleryID: string;
	export let images: Image[];

	onMount(() => {
		let lightbox = new PhotoSwipeLightbox({
			gallery: '#' + galleryID,
			children: 'a',
			pswpModule: () => import('photoswipe')
		});
		/* https://photoswipe.com/caption/ */
		lightbox.on('uiRegister', function () {
			lightbox?.pswp?.ui?.registerElement({
				name: 'custom-caption',
				order: 9,
				isButton: false,
				appendTo: 'root',
				html: 'Caption text',
				onInit: (el: HTMLElement) => {
					lightbox?.pswp?.on('change', () => {
						const currSlideElement = lightbox?.pswp?.currSlide?.data.element;
						let captionHTML = '';
						if (currSlideElement) {
							const alt = currSlideElement?.querySelector('img')?.getAttribute('data-copyright');
							captionHTML = 'Fotograf: ' + ((alt === null || alt === undefined || alt?.trim() === "") ? "unbekannt" : alt);						
						}
						el.innerHTML = captionHTML || '';
						el.classList.add('pswp__custom-caption');
						el.classList.add('capitalize');
					});
				}
			});
		});
		lightbox.init();
	});
</script>

<div class="flex flex-wrap items-center gap-2 pswp-gallery" id={galleryID}>
	{#each images as image}
		<GalleryImage {image}></GalleryImage>
	{/each}
</div>
