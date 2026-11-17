<script lang="ts">
	import type { NewsItem } from '#lib/data';

	let { item }: { item: NewsItem } = $props();
</script>

<article class="group card-lift flex items-start gap-4 md:gap-5">
	<a href="/news/" class="shrink-0" aria-label={item.title}>
		<img
			src={item.image}
			alt={item.imageAlt}
			width="1600"
			height="1600"
			loading="lazy"
			decoding="async"
			class="aspect-square w-32 rounded-full object-cover transition-transform duration-300 group-hover:scale-105 md:w-44"
		/>
	</a>
	<div class="min-w-0 pt-1">
		<h3 class="font-condensed text-lg leading-snug font-semibold tracking-wide text-white uppercase md:text-xl">
			<a href="/news/" class="transition-colors hover:text-pink">{item.title}</a>
		</h3>
		<p class="mt-1 font-condensed text-xs font-semibold tracking-widest text-pink uppercase">{item.date}</p>
		<p class="mt-2 text-[0.82rem] leading-relaxed text-neutral-300">{item.excerpt}</p>
	</div>
</article>
