<script lang="ts">
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import { dev } from '$app/environment';
	import { inject as injectAnalytics } from '@vercel/analytics';
	import '$main/app.css';

	injectSpeedInsights();
	injectAnalytics({ mode: dev ? 'development' : 'production' });
</script>

<slot />
