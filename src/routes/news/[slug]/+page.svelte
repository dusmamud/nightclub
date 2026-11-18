<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import NewsCard from '#lib/components/NewsCard.svelte';
	import { NEWS, SITE_URL } from '#lib/data';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const item = NEWS.find((n) => n.slug === data.slug)!;
	const others = NEWS.filter((n) => n.slug !== data.slug).slice(0, 2);

	// NewsArticle JSON-LD — ONLY the 2 real articles. The 4 lorem-ipsum news
	// items get no markup until real headlines/body exist (audit-3, item 14).
	// dateModified omitted: no edit has happened. Publisher omitted: not in
	// Google's Article property list. Author is the club itself (unbylined).
	const REAL_ARTICLES = new Set(['new-resident-dj-season', 'lights-upgrade-dancefloor']);
	const jsonLd = REAL_ARTICLES.has(item.slug)
		? {
				'@context': 'https://schema.org',
				'@type': 'NewsArticle',
				headline: item.title,
				image: `${SITE_URL}${item.image}`,
				datePublished: `${item.iso}T00:00:00+00:00`,
				author: {
					'@type': 'Organization',
					name: 'Night Club',
					url: `${SITE_URL}/`
				},
				url: `${SITE_URL}/news/${item.slug}/`
			}
		: null;
</script>

<Seo
	title="{item.title} — Night Club Glasgow"
	description={item.excerpt}
	path="/news/{item.slug}/"
	image={item.image}
	type="article"
/>
<svelte:head>
	{#if jsonLd}
		{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
	{/if}
</svelte:head>

<article class="mx-auto w-full max-w-[780px] px-4 pt-10 pb-16 md:pt-14">
	<p class="font-condensed text-sm font-bold tracking-[0.25em] text-pink uppercase">
		<a href="/news/" class="hover:text-white">News</a> / {item.date}
	</p>
	<h1 class="mt-3 font-condensed text-[2.4rem] leading-[1.05] font-bold tracking-wide uppercase md:text-[3.2rem]">
		{item.title}
	</h1>
	<div class="mt-8 flex flex-col gap-8 md:flex-row">
		<div class="shrink-0 self-start">
			<img
				src={item.image}
				alt={item.imageAlt}
				width="1600"
				height="1600"
				fetchpriority="high"
				decoding="async"
				class="aspect-square w-full max-w-[22rem] rounded-full bg-[#232323] object-cover"
			/>
		</div>
		<div class="min-w-0">
			<p class="text-sm leading-relaxed text-neutral-300">{item.body}</p>
			<p class="mt-6 text-sm leading-relaxed text-neutral-400">
				Night Club, 4578 Marmora Road, Glasgow D04 89GR. See what is on next on the
				<a href="/events/" class="text-pink hover:text-white">events page</a>.
			</p>
		</div>
	</div>

	<h2 class="mt-16 font-condensed text-2xl font-bold tracking-wide uppercase md:text-3xl">More news</h2>
	<div class="mt-8 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-x-10">
		{#each others as other (other.slug)}
			<NewsCard item={other} />
		{/each}
	</div>
</article>
