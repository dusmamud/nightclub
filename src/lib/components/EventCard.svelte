<script lang="ts">
	import { tilt } from '#lib/actions/tilt';
	import type { EventItem } from '#lib/data';

	let { event, priority = false }: { event: EventItem; priority?: boolean } = $props();

	// Images render natively (no JS-gated fade): above-the-fold (hero) images
	// are eager, and the dark placeholder behind them means a slow image
	// never reads as a black hole. The JS-gated fade was the round-3
	// fresh-load regression — without JS the circles stayed invisible.
</script>

<article class="group card-lift flex flex-col items-center text-center">
	<a
		href="/events/{event.slug}/"
		class="tilt relative block"
		use:tilt
		aria-label="{event.title} — {event.day} {event.monthName} {event.year}"
	>
		<span
			class="badge-pop absolute -top-3 left-1 z-10 flex h-[4.25rem] w-[4.25rem] flex-col items-center justify-center rounded-full bg-pink font-condensed leading-none text-white shadow-lg md:h-[4.875rem] md:w-[4.875rem]"
		>
			<span class="text-[1.5rem] font-bold md:text-[1.75rem]">{event.day}</span>
			<span class="text-[0.85rem] font-semibold tracking-wider">{event.month}</span>
		</span>
		<span class="block overflow-hidden rounded-full bg-[#232323]">
			<img
				src={event.image}
				alt={event.imageAlt}
				width="1600"
				height="1600"
				loading={priority ? 'eager' : 'lazy'}
				fetchpriority={priority ? 'high' : undefined}
				decoding="async"
				class="aspect-square w-[13rem] rounded-full bg-[#232323] object-cover transition-transform duration-300 group-hover:scale-105 md:w-[13.25rem]"
			/>
		</span>
	</a>
	<h3 class="mt-5">
		<a
			href="/events/{event.slug}/"
			class="inline-block bg-black/90 px-3 py-1.5 font-condensed text-[0.95rem] leading-tight font-semibold tracking-wide text-white uppercase transition-colors hover:text-pink md:text-base"
		>
			{event.title}
		</a>
	</h3>
	<p class="mt-3 max-w-[22rem] text-[0.78rem] leading-relaxed text-neutral-400">
		{event.excerpt}
	</p>
	<p class="mt-2 font-condensed text-[0.8rem] font-semibold tracking-widest text-neutral-300">
		{event.time} · {event.price} · 18+
	</p>
</article>
