<script lang="ts">
	import { Toaster } from 'svelte-french-toast';
	import HistoryBack from '$component/HistoryBack.svelte';
</script>

<Toaster position="bottom-right" />
<HistoryBack color="hsl(var(--a))"></HistoryBack>

<slot />
