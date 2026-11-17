<script lang="ts">
	import type { NewsItem } from '#lib/data';

	// compact: home teaser — excerpt clamped to ~4 lines, no date line
	// (dates live on the news list and detail pages).
	let { item, compact = false }: { item: NewsItem; compact?: boolean } = $props();
</script>

<article class="group card-lift flex items-start gap-4 md:gap-5">
	<a href="/news/{item.slug}/" class="shrink-0" aria-label={item.title}>
		<img
			src={item.image}
			alt={item.imageAlt}
			width="1600"
			height="1600"
			loading="lazy"
			decoding="async"
			class="aspect-square w-32 rounded-full bg-[#232323] object-cover transition-transform duration-300 group-hover:scale-105 md:w-[12.5rem]"
		/>
	</a>
	<div class="min-w-0 pt-1">
		<h3 class="font-condensed text-lg leading-snug font-semibold tracking-wide text-white uppercase md:text-xl">
			<a href="/news/{item.slug}/" class="transition-colors hover:text-pink">{item.title}</a>
		</h3>
		{#if !compact}
			<p class="mt-1 font-condensed text-xs font-semibold tracking-widest text-pink uppercase">{item.date}</p>
		{/if}
		<p class="mt-2 text-[0.82rem] leading-relaxed text-neutral-300 {compact ? 'line-clamp-4' : ''}">
			{item.excerpt}
		</p>
	</div>
</article>
