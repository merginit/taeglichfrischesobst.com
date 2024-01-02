<script lang="ts">
	export let url: string;
</script>

<iframe
	title="spotify audio player"
	class="song"
	style="border-radius: 12px;"
	src={url}
	width="100%"
	height="152"
	frameBorder="0"
	allowfullscreen
	allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
	loading="lazy"
/>
