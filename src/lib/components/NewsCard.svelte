<script lang="ts">
	import { tilt } from '#lib/actions/tilt';
	import { srcsetFor } from '#lib/images';
	import type { NewsItem } from '#lib/data';

	// compact: home teaser — excerpt clamped to ~6 lines like the reference
	// (round 2 clamped to 4, which was shorter than the reference's ~6).
	// Dates live on the news list and detail pages, not on home teasers.
	// priority mirrors EventCard: the first card on /news/ is the page's LCP
	// image (news-disco.jpg) and must be eager + fetchpriority high, never lazy.
	let { item, compact = false, priority = false }: { item: NewsItem; compact?: boolean; priority?: boolean } =
		$props();
</script>

<article class="group card-lift flex items-start gap-4 md:gap-4">
	<a href="/news/{item.slug}/" class="tilt shrink-0" use:tilt aria-label={item.title}>
		<img
			src={item.image}
			srcset={srcsetFor(item.image)}
			sizes="(min-width: 768px) 200px, 128px"
			alt={item.imageAlt}
			width="1600"
			height="1600"
			loading={priority ? 'eager' : 'lazy'}
			fetchpriority={priority ? 'high' : undefined}
			decoding="async"
			class="aspect-square w-32 rounded-full bg-[#232323] object-cover transition-transform duration-300 group-hover:scale-105 md:w-[12.5rem]"
		/>
	</a>
	<div class="min-w-0 pt-1">
		<!-- h2, not h3: on /news/ these cards sit directly under the h1, so h3
		     skipped a level (axe heading-order). All styling is explicit
		     Tailwind classes, so the tag change is visually identical. -->
		<h2 class="font-condensed text-base leading-snug font-semibold tracking-wide text-white uppercase md:text-lg">
			<a href="/news/{item.slug}/" class="transition-colors hover:text-pink">{item.title}</a>
		</h2>
		{#if !compact}
			<p class="mt-1 font-condensed text-xs font-semibold tracking-widest text-pink uppercase">{item.date}</p>
		{/if}
		<p class="mt-2 text-[0.82rem] leading-[1.5] text-neutral-300 {compact ? 'line-clamp-6' : ''}">
			{item.excerpt}
		</p>
	</div>
</article>
