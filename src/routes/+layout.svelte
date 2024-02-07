<script lang="ts">
	import { injectSpeedInsights } from "@vercel/speed-insights/sveltekit";
	import '$main/app.css';

	injectSpeedInsights();
</script>

<slot />
