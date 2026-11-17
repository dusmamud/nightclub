<script lang="ts">
	import { SITE_URL } from '#lib/data';

	let {
		title,
		description,
		path = '/',
		image = '/images/hero-crowd.jpg',
		type = 'website'
	}: {
		title: string;
		description: string;
		path?: string;
		image?: string;
		type?: string;
	} = $props();

	const url = $derived(`${SITE_URL}${path}`);
	const img = $derived(`${SITE_URL}${image}`);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />
	<meta property="og:type" content={type} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={img} />
	<meta property="og:site_name" content="Night Club" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={img} />
</svelte:head>
