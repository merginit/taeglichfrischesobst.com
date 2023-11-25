<script lang="ts">
    import { browser } from '$app/environment';
    import IconLoader from '$component/IconLoader.svelte';
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="absolute cursor-pointer left-2 top-2" on:click={() => {if (browser) {window.history.back()}}}>
    <IconLoader icon="mdi:arrow-back-circle" color="hsl(var(--p))" width={"50px"}>zurück</IconLoader>
</div>

<slot />