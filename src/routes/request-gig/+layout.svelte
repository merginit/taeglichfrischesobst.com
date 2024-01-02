<script lang="ts">
	import HistoryBack from '$component/HistoryBack.svelte';
</script>

<HistoryBack color="hsl(var(--p))" />

<main class="flex items-center justify-center h-screen mx-5 pt-[calc(50px+0.5rem)]">
	<slot />
</main>
