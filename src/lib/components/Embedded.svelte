<script lang="ts">
	import { allowFunctionality } from '$script/cookiestate';

	import { sectionMarginTop as nh } from '$store/objectsizes.js';

	export let component_type: 'audio' | 'video';
	const provider: string = component_type === 'audio' ? 'Spotify' : 'YouTube';
	const feedback_message = `Einbettungen müssen in den Cookie-Einstellungen erlaubt sein um Elemente von ${provider} anzuzeigen.`;
</script>

{#if $allowFunctionality}
	<slot />
{:else if provider === 'Spotify'}
	{feedback_message}

	<!-- prettier-ignore -->
	<button class="btn btn-primary" type="button" data-cc="show-preferencesModal">Cookie Einstellungen</button>
{:else if provider === 'YouTube'}
	<!-- prettier-ignore -->
	<div class="flex flex-col flex-wrap items-center self-center w-full p-2 mx-4 h-fit bg-neutral rounded-2xl" style="margin-top: {$nh}rem; scroll-margin-top: {$nh}rem;">
		{feedback_message}

		<!-- prettier-ignore -->
		<button class="mt-2 btn btn-primary" type="button" data-cc="show-preferencesModal">Cookie Einstellungen</button>
	</div>
{/if}
