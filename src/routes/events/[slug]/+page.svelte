<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import EventCard from '#lib/components/EventCard.svelte';
	import TicketBox from '#lib/components/TicketBox.svelte';
	import { EVENTS, SITE_URL, djForEvent } from '#lib/data';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const event = EVENTS.find((e) => e.slug === data.slug)!;
	const others = EVENTS.filter((e) => e.slug !== data.slug).slice(0, 3);
	const dj = djForEvent(event.slug);

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Event',
		name: event.title,
		startDate: `${event.iso}T${event.time}:00`,
		location: {
			'@type': 'NightClub',
			name: 'Night Club',
			address: {
				'@type': 'PostalAddress',
				streetAddress: '4578 Marmora Road',
				addressLocality: 'Glasgow',
				postalCode: 'D04 89GR',
				addressCountry: 'GB'
			}
		},
		image: `${SITE_URL}${event.image}`,
		description: event.description,
		url: `${SITE_URL}/events/${event.slug}/`,
		offers: {
			'@type': 'Offer',
			price: event.price.replace(/[^0-9]/g, ''),
			priceCurrency: 'USD',
			availability: 'https://schema.org/InStock',
			url: `${SITE_URL}/events/${event.slug}/`
		}
	};
</script>

<Seo
	title="{event.title} — {event.day} {event.monthName} {event.year} · Night Club Glasgow"
	description="{event.excerpt} Doors {event.time}, {event.price}, 18+."
	path="/events/{event.slug}/"
	image={event.image}
	type="article"
/>
<svelte:head>
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
</svelte:head>

<article class="mx-auto w-full max-w-[780px] px-4 pt-10 pb-16 md:pt-14">
	<p class="font-condensed text-sm font-bold tracking-[0.25em] text-pink uppercase">
		<a href="/events/" class="hover:text-white">Events</a> / {event.monthName} {event.year}
	</p>
	<h1 class="mt-3 font-condensed text-[2.4rem] leading-[1.05] font-bold tracking-wide uppercase md:text-[3.2rem]">
		{event.title}
	</h1>
	<div class="mt-8 flex flex-col gap-8 md:flex-row">
		<div class="relative shrink-0 self-start">
			<span
				class="absolute -top-3 left-2 z-10 flex h-[5.25rem] w-[5.25rem] flex-col items-center justify-center rounded-full bg-pink font-condensed leading-none text-white"
			>
				<span class="text-[1.9rem] font-bold">{event.day}</span>
				<span class="text-[0.95rem] font-semibold tracking-wider">{event.month}</span>
			</span>
			<img
				src={event.image}
				alt={event.imageAlt}
				width="1600"
				height="1600"
				fetchpriority="high"
				decoding="async"
				class="aspect-square w-full max-w-[22rem] rounded-full bg-[#232323] object-cover"
			/>
		</div>
		<div class="min-w-0">
			<dl class="grid grid-cols-2 gap-4 text-sm">
				<div><dt class="font-condensed font-bold tracking-widest text-neutral-400 uppercase">Date</dt><dd class="mt-1 text-white">{event.day} {event.monthName} {event.year}</dd></div>
				<div><dt class="font-condensed font-bold tracking-widest text-neutral-400 uppercase">Doors</dt><dd class="mt-1 text-white">{event.time}</dd></div>
				<div><dt class="font-condensed font-bold tracking-widest text-neutral-400 uppercase">Tickets</dt><dd class="mt-1 text-white">{event.price}</dd></div>
				<div><dt class="font-condensed font-bold tracking-widest text-neutral-400 uppercase">Age</dt><dd class="mt-1 text-white">18+ only</dd></div>
			</dl>
			<p class="mt-6 text-sm leading-relaxed text-neutral-300">{event.description}</p>
			{#if dj}
				<p class="mt-4 text-sm leading-relaxed text-neutral-400">
					On the decks: <a href="/djs/{dj.slug}/" class="text-pink hover:text-white">{dj.name}</a> — {dj.genre}.
				</p>
			{/if}
			<p class="mt-4 text-sm leading-relaxed text-neutral-400">
				Night Club, 4578 Marmora Road, Glasgow D04 89GR. Call <a href="tel:+180023456789" class="text-pink hover:text-white">(800) 2345-6789</a> for table bookings.
			</p>
			<p class="mt-6 flex flex-wrap gap-3">
				<a
					href="/vip/"
					class="btn-press inline-flex min-h-12 items-center rounded-full bg-pink px-7 font-condensed text-sm font-bold tracking-[0.2em] text-white uppercase transition-colors hover:bg-pink-dark"
				>
					Book a table
				</a>
				<a
					href="/guestlist/"
					class="btn-press inline-flex min-h-12 items-center rounded-full border border-white/25 px-7 font-condensed text-sm font-bold tracking-[0.2em] text-white uppercase transition-colors hover:border-pink hover:text-pink"
				>
					Join the guestlist
				</a>
			</p>
		</div>
	</div>

	<div class="mt-10">
		<TicketBox {event} />
	</div>

	<h2 class="mt-16 font-condensed text-2xl font-bold tracking-wide uppercase md:text-3xl">More events</h2>
	<div class="mt-8 grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3 md:gap-x-6">
		{#each others as other (other.slug)}
			<EventCard event={other} />
		{/each}
	</div>
</article>
