<script lang="ts">
	import { storyblokEditable, type SbBlokData } from '@storyblok/svelte';
	import type { StoryblokImageAsset } from '$script/types';
	interface ImageBlok
		extends Omit<SbBlokData, '_uid' | 'component'>,
			Omit<StoryblokImageAsset, '_uid' | 'component'> {
		_uid: string;
		component: string;
	}

	export let blok: ImageBlok;
	let webpSrc = blok?.webp?.filename;
	let webpCopyright = blok?.webp?.copyright?.toString() ?? 'täglichfrischesobst';
	let webpTitle = blok?.webp?.title?.toString();
	let webpAltText = blok?.webp?.alt?.toString() ?? webpTitle;
	webpTitle ?? webpAltText;
	let webpSource = blok?.webp?.source?.toString() ?? 'a.storyblok.com/f';
	let pngSrc = blok?.png?.filename;
	let pngCopyright = blok?.png?.copyright?.toString() ?? 'täglichfrischesobst';
	let pngTitle = blok?.png?.title?.toString();
	let pngAltText = blok?.png?.alt?.toString() ?? pngTitle;
	pngTitle ?? pngAltText;
	let pngSource = blok?.png?.source?.toString() ?? 'a.storyblok.com/f';
</script>

<div use:storyblokEditable={blok}>
	{#if blok.component === 'image'}
		<picture>
			<!-- maybe add sourcesets for different image sizes in the future -->
			{#if webpSrc && pngSrc}
				<source
					srcset={webpSrc}
					type="image/webp"
					data-copyright={webpCopyright}
					title={webpTitle}
					data-src={webpSource}
				/>
				<img
					class="w-full"
					src={pngSrc}
					alt={webpAltText || pngAltText}
					title={pngTitle}
					data-copyright={pngCopyright}
					data-src={pngSource}
				/>
			{:else if pngSrc}
				<img
					class="w-full"
					src={pngSrc}
					data-copyright={pngCopyright}
					title={pngTitle}
					alt={pngAltText}
					data-src={pngSource}
				/>
			{:else if webpSrc}
				<img
					class="w-full"
					src={webpSrc}
					data-copyright={webpCopyright}
					title={webpTitle}
					alt={webpAltText}
					data-src={webpSource}
				/>
			{:else}
				no image found
			{/if}
		</picture>
	{:else}
		only images are supported
	{/if}
</div>
