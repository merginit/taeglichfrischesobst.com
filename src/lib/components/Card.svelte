<script lang="ts">
	export let figure_url: string;
	export let figure_img_src: string;
	export let content_title: string;
	export let content_date: string | Date;
	export let content_description: string;
	export let content_url: string;
	export let content_url_label: string;

	let figure_img_alt = figure_img_src
		?.split('/')
		?.pop()
		?.split('.')[0]
		?.replace(/[-_]\w/g, (match) => match.charAt(1).toUpperCase())
		?.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`);
</script>

<div class="w-full shadow-xl lg:w-96 card bg-base-100">
	<figure>
		<!-- prettier-ignore -->
		<a href={figure_url} target="_blank" class="relative">
            <img loading="lazy" src={figure_img_src} alt={figure_img_alt} />
            <slot></slot>
        </a>
	</figure>

	<div class="card-body">
		<h3 class="card-title">
			{content_title}
			<div class="badge badge-secondary">{content_date}</div>
		</h3>
		<p>
			{content_description}
		</p>
		<div class="justify-start card-actions">
			<!-- prettier-ignore -->
			<a href={content_url} target="_blank" class="btn btn-primary">{content_url_label}</a>
		</div>
	</div>
</div>
