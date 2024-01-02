<script lang="ts">
	import IconLoader from '$component/IconLoader.svelte';
</script>

<!-- prettier-ignore -->
<div id="socials" class="fixed top-0 right-0 z-50 flex items-center justify-center gap-2 mt-1 mr-1">
    <IconLoader anchor_href={"https://www.youtube.com/channel/UCM6LtE6jYUv7wEHvgB83_Qw"} anchor_classes={"transition-opacity hover:opacity-90"} icon="mdi:youtube" color="hsl(var(--s))" width={'35px'}>youtube</IconLoader>
    <IconLoader anchor_href={"https://www.instagram.com/taeglichfrischesobst"} anchor_classes={"transition-opacity hover:opacity-90"} icon="ri:instagram-fill" color="hsl(var(--s))" width={'25px'}>instagram</IconLoader>
    <IconLoader anchor_href={"https://www.tiktok.com/@taeglichfrischesobst"} anchor_classes={"transition-opacity hover:opacity-90"} icon="ic:baseline-tiktok" color="hsl(var(--s))" width={'28px'}>tiktok</IconLoader>
    <IconLoader anchor_href={"https://www.facebook.com/taeglichfrischesobst"} anchor_classes={"transition-opacity hover:opacity-90"} icon="ri:facebook-fill" color="hsl(var(--s))" width={'25px'}>facebook</IconLoader>
</div>
