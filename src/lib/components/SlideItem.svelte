<script lang="ts">
	export let url: string;
</script>

<div class="slide">
	<a href={url} target="_blank" class="cursor-pointer iconify-icon">
		<slot />
	</a>
</div>
