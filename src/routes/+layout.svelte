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
	import { SITE_URL, EVENTS, NEWS, DJS } from '#lib/data';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	// Route transition key — a fresh fade/slide per navigation, gated on
	// prefers-reduced-motion (Svelte transitions run on WAAPI, CSS can't stop them).
	let key = $derived(page.url.pathname);

	// NightClub JSON-LD (audit-3 fixes, 2026-11-18): @id added; postalCode,
	// telephone and sameAs dropped (no real values exist — never invent them);
	// openingHours replaced by one OpeningHoursSpecification per opening day
	// (Google's single-spec late-night form); description/image/priceRange
	// derived from visible site content only. geo + email stay OPEN until
	// Dus supplies real data. No visible change — <svelte:head> only.
	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'NightClub',
		'@id': `${SITE_URL}/#nightclub`,
		name: 'Night Club',
		url: `${SITE_URL}/`,
		image: `${SITE_URL}/images/hero-crowd.jpg`,
		description:
			"Night Club is Glasgow's home for the hottest nightlife. Doors open late, the floor stays open until dawn, and the bar pours until the lights come up. 18+ only — please bring ID.",
		priceRange: '$15-60',
		address: {
			'@type': 'PostalAddress',
			streetAddress: '4578 Marmora Road',
			addressLocality: 'Glasgow',
			addressCountry: 'GB'
		},
		openingHoursSpecification: [
			{
				'@type': 'OpeningHoursSpecification',
				dayOfWeek: 'https://schema.org/Thursday',
				opens: '21:00',
				closes: '03:00'
			},
			{
				'@type': 'OpeningHoursSpecification',
				dayOfWeek: 'https://schema.org/Friday',
				opens: '21:00',
				closes: '03:00'
			},
			{
				'@type': 'OpeningHoursSpecification',
				dayOfWeek: 'https://schema.org/Saturday',
				opens: '21:00',
				closes: '04:00'
			}
		]
	};

	// BreadcrumbList, derived from the route (audit-3 item 14, §3).
	// Section names are the section pages' own visible H1s. Dynamic slugs
	// resolve to their real titles from #lib/data; an unresolvable slug falls
	// back to a readable label from the slug — never an invented title.
	// Home gets no block (a single-item trail earns nothing).
	const SECTION_LABELS: Record<string, string> = {
		events: 'Events',
		news: 'Latest news',
		djs: 'DJs & lineup',
		faq: 'FAQ & entry policy',
		about: 'About',
		gallery: 'Gallery',
		contacts: 'Contacts',
		vip: 'VIP & table booking',
		drinks: 'Drinks & bottle menu',
		guestlist: 'Guestlist',
		'private-hire': 'Private hire',
		visit: 'Visit us',
		safety: 'Safety & welfare'
	};

	function slugLabel(slug: string): string {
		return slug
			.split('-')
			.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
			.join(' ');
	}

	const breadcrumb = $derived.by(() => {
		const segments = page.url.pathname.split('/').filter(Boolean);
		if (segments.length === 0) return null; // home — no BreadcrumbList
		const [section, slug] = segments;
		const sectionLabel = SECTION_LABELS[section] ?? slugLabel(section);
		const itemListElement: Record<string, string | number>[] = [
			{ '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` }
		];
		if (segments.length === 1) {
			itemListElement.push({ '@type': 'ListItem', position: 2, name: sectionLabel });
		} else {
			itemListElement.push({
				'@type': 'ListItem',
				position: 2,
				name: sectionLabel,
				item: `${SITE_URL}/${section}/`
			});
			let title: string | undefined;
			if (section === 'events') title = EVENTS.find((e) => e.slug === slug)?.title;
			else if (section === 'news') title = NEWS.find((n) => n.slug === slug)?.title;
			else if (section === 'djs') title = DJS.find((d) => d.slug === slug)?.name;
			itemListElement.push({
				'@type': 'ListItem',
				position: 3,
				name: title ?? slugLabel(slug)
			});
		}
		return {
			'@context': 'https://schema.org',
			'@type': 'BreadcrumbList',
			itemListElement
		};
	});
</script>

<svelte:head>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="theme-color" content="#000000" />
	<!-- JSON-LD: NightClub block + route-derived BreadcrumbList (no block on home). -->
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
	{#if breadcrumb}
		{@html `<script type="application/ld+json">${JSON.stringify(breadcrumb)}</script>`}
	{/if}
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
