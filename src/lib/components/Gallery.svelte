<script lang="ts">
	import 'photoswipe/style.css';
	import { onMount } from 'svelte';
	import PhotoSwipeLightbox from 'photoswipe/lightbox';
	import type { Image } from '$script/types';

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
			lightbox.pswp.ui.registerElement({
				name: 'custom-caption',
				order: 9,
				isButton: false,
				appendTo: 'root',
				html: 'Caption text',
				onInit: (el: HTMLElement) => {
					lightbox.pswp.on('change', () => {
						const currSlideElement = lightbox.pswp.currSlide.data.element;
						let captionHTML = '';
						if (currSlideElement) {
							captionHTML =
								'Fotograf: ' + currSlideElement.querySelector('img').getAttribute('alt');
						}
						el.innerHTML = captionHTML || '';
						el.classList.add('pswp__custom-caption');
					});
				}
			});
		});
		lightbox.init();
	});
</script>

<div class="flex flex-wrap items-center gap-2 pswp-gallery" id={galleryID}>
	{#each images as image}
		<a
			href={image.URL}
			data-pswp-width={image.width}
			data-pswp-height={image.height}
			target="_blank"
			rel="noreferrer"
		>
			<img
				loading="lazy"
				class="max-h-56"
				src={image.URL}
				alt={image.URL.split('©')[1].split('.')[0]}
			/>
		</a>
	{/each}
</div>
