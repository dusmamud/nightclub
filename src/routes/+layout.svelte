<script lang="ts">
	import { fly } from 'svelte/transition';
	import { page } from '$app/state';
	import '../app.css';
	import '@fontsource/anton/400.css';
	import '@fontsource/oswald/400.css';
	import '@fontsource/oswald/500.css';
	import '@fontsource/oswald/600.css';
	import '@fontsource/oswald/700.css';
	import Header from '#lib/components/Header.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import StickyCta from '#lib/components/StickyCta.svelte';
	import { motionDuration } from '#lib/motion';
	import { SITE_URL } from '#lib/data';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	// Route transition key — a fresh fade/slide per navigation, gated on
	// prefers-reduced-motion (Svelte transitions run on WAAPI, CSS can't stop them).
	let key = $derived(page.url.pathname);


	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'NightClub',
		name: 'Night Club',
		address: {
			'@type': 'PostalAddress',
			streetAddress: '4578 Marmora Road',
			addressLocality: 'Glasgow',
			postalCode: 'D04 89GR',
			addressCountry: 'GB'
		},
		telephone: '(800) 2345-6789',
		openingHours: ['Th-Fr 21:00-03:00', 'Sa 21:00-04:00'],
		url: SITE_URL,
		sameAs: ['https://www.facebook.com/', 'https://x.com/']
	};
</script>

<svelte:head>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="theme-color" content="#000000" />
	<!-- JSON-LD: address/telephone/openingHours are the club's own published details. -->
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
</svelte:head>

<a
	href="#main-content"
	class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-pink focus:px-4 focus:py-3 focus:font-condensed focus:text-sm focus:font-bold focus:tracking-widest focus:text-white"
>
	Skip to main content
</a>

<Header />

<main id="main-content">
	{#key key}
		<div in:fly={{ y: 14, duration: motionDuration(360) }}>
			{@render children()}
		</div>
	{/key}
</main>

<Footer />

<!-- Spacer so the sticky mobile CTA never covers the footer. -->
<div class="h-[4.5rem] md:hidden" aria-hidden="true"></div>
<StickyCta />
