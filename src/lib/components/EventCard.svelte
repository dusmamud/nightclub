<script lang="ts">
	import type { EventItem } from '#lib/data';

	let { event, priority = false }: { event: EventItem; priority?: boolean } = $props();

	// Fade-in on load over a dark placeholder, so a slow image never renders
	// as a black hole. Above-the-fold (hero) images are eager.
	let loaded = $state(false);
</script>

<article class="group card-lift flex flex-col items-center text-center">
	<a href="/events/{event.slug}/" class="relative block" aria-label="{event.title} — {event.day} {event.monthName} {event.year}">
		<span
			class="badge-pop absolute -top-3 left-1 z-10 flex h-[4.5rem] w-[4.5rem] flex-col items-center justify-center rounded-full bg-pink font-condensed leading-none text-white shadow-lg md:h-[5.25rem] md:w-[5.25rem]"
		>
			<span class="text-[1.6rem] font-bold md:text-[1.9rem]">{event.day}</span>
			<span class="text-[0.95rem] font-semibold tracking-wider">{event.month}</span>
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
				onload={() => (loaded = true)}
				class="img-fade aspect-square w-[13rem] rounded-full bg-[#232323] object-cover transition-transform duration-300 group-hover:scale-105 md:w-[13.25rem] {loaded
					? 'img-loaded'
					: ''}"
			/>
		</span>
	</a>
	<h3 class="mt-5">
		<a
			href="/events/{event.slug}/"
			class="inline-block bg-black/90 px-3 py-1.5 font-condensed text-lg leading-tight font-semibold tracking-wide text-white uppercase transition-colors hover:text-pink"
		>
			{event.title}
		</a>
	</h3>
	<p class="mt-3 max-w-[21rem] text-[0.82rem] leading-relaxed text-neutral-400">
		{event.excerpt}
	</p>
	<p class="mt-2 font-condensed text-sm font-semibold tracking-widest text-neutral-300">
		{event.time} · {event.price} · 18+
	</p>
</article>
