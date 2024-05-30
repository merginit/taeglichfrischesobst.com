<script lang="ts">
	import { browser } from '$app/environment';
	import type { Image } from '$script/types';
	export let image: Image;

	let webpSrc = image?.webp?.src;
	let webpCopyright = image?.webp?.copyright ?? 'täglichfrischesobst';
	let webpTitle = image?.webp?.title ?? 'täglichfrischesobst';
	let webpAltText = image?.webp?.alt ?? 'täglichfrischesobst';
	let webpSource = image?.webp?.source;
	let pngSrc = image?.png?.src;
	let pngCopyright = image?.png?.copyright ?? 'täglichfrischesobst';
	let pngTitle = image?.png?.title ?? 'täglichfrischesobst';
	let pngAltText = image?.png?.alt ?? 'täglichfrischesobst';
	let pngSource = image?.png?.source;

	// https://stackoverflow.com/questions/5573096/detecting-webp-support
	function browserSupportsWebp() {
		if (browser) {
			const elem = document.createElement('canvas');

			if (elem.getContext && elem.getContext('2d')) {
				return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
			} else {
				return false; // very old browser like IE 8, canvas not supported
			}
		}
	}
</script>

<picture>
	<a
		href={browserSupportsWebp() ? webpSrc : pngSrc}
		data-pswp-width={image.width}
		data-pswp-height={image.height}
		target="_blank"
		rel="noreferrer"
	>
		{#if webpSrc && pngSrc}
			<source
				srcset={webpSrc}
				type="image/webp"
				data-copyright={webpCopyright}
				title={webpTitle}
				data-src={webpSource}
			/>
			<img
				loading="lazy"
				class="max-h-56"
				src={pngSrc}
				alt={webpAltText || pngAltText}
				title={pngTitle}
				data-copyright={pngCopyright}
				data-src={pngSource}
			/>
		{:else if pngSrc}
			<img
				loading="lazy"
				class="max-h-56"
				src={pngSrc}
				data-copyright={pngCopyright}
				title={pngTitle}
				alt={pngAltText}
				data-src={pngSource}
			/>
		{:else if webpSrc}
			<img
				loading="lazy"
				class="max-h-56"
				src={webpSrc}
				data-copyright={webpCopyright}
				title={webpTitle}
				alt={webpAltText}
				data-src={webpSource}
			/>
		{:else}
			no image found
		{/if}
	</a>
</picture>
