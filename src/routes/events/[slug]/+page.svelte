<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import EventCard from '#lib/components/EventCard.svelte';
	import TicketBox from '#lib/components/TicketBox.svelte';
	import { EVENTS, SITE_URL, djForEvent, isPastEvent, ticketTiers } from '#lib/data';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const event = EVENTS.find((e) => e.slug === data.slug)!;
	const others = EVENTS.filter((e) => e.slug !== data.slug).slice(0, 3);
	const dj = djForEvent(event.slug);
	// Past nights keep their page live, with tickets closed and the status
	// stated plainly — they never masquerade as upcoming.
	const past = isPastEvent(event);

	// Share: real share URLs + copy-link. No invented ticket platform links.
	const pageUrl = `${SITE_URL}/events/${event.slug}/`;
	const shareText = `${event.title} — ${event.day} ${event.monthName} ${event.year} at Night Club Glasgow`;
	let copied = $state(false);
	let copyFallback = $state(false);
	async function copyLink() {
		try {
			await navigator.clipboard.writeText(pageUrl);
			copied = true;
			setTimeout(() => (copied = false), 2000);
			return;
		} catch {
			// Clipboard API denied (headless / permission) — try the legacy path.
		}
		try {
			const ta = document.createElement('textarea');
			ta.value = pageUrl;
			ta.readOnly = true;
			ta.style.position = 'fixed';
			ta.style.opacity = '0';
			document.body.appendChild(ta);
			ta.select();
			const ok = document.execCommand('copy');
			document.body.removeChild(ta);
			if (ok) {
				copied = true;
				setTimeout(() => (copied = false), 2000);
				return;
			}
		} catch {
			// fall through to the manual fallback below
		}
		copyFallback = true;
	}

	// UK (Europe/London) UTC offset for a YYYY-MM-DD date: BST (+01:00) from the
	// last Sunday of March to the last Sunday of October, GMT (+00:00) otherwise.
	// All 9 current events are Jan–Feb 2027, so +00:00; the rule keeps future
	// summer events correct without hard-coding one offset.
	function ukOffset(iso: string): string {
		const [y, m, d] = iso.split('-').map(Number);
		const lastSunday = (year: number, month: number) => {
			const last = new Date(Date.UTC(year, month, 0));
			return last.getUTCDate() - last.getUTCDay();
		};
		const inDst =
			(m > 3 || (m === 3 && d >= lastSunday(y, 3))) && (m < 10 || (m === 10 && d < lastSunday(y, 10)));
		return inDst ? '+01:00' : '+00:00';
	}

	// endDate from the club's published close times (FAQ / opening hours):
	// Thu/Fri nights close 03:00, Sat nights 04:00, next calendar day.
	// Any other weekday has no published close time — omit, never invent one.
	function eventEndDate(iso: string): string | undefined {
		const start = new Date(`${iso}T12:00:00Z`);
		const day = start.getUTCDay(); // 4 = Thu, 5 = Fri, 6 = Sat
		const close = day === 6 ? '04:00' : day === 4 || day === 5 ? '03:00' : undefined;
		if (!close) return undefined;
		const end = new Date(start);
		end.setUTCDate(end.getUTCDate() + 1);
		const endIso = end.toISOString().slice(0, 10);
		return `${endIso}T${close}:00${ukOffset(endIso)}`;
	}

	// Placeholder lorem-ipsum events: no Event JSON-LD at all (Google quality
	// guidelines — placeholder content must not be marked up as a real event).
	// The site-wide NightClub block (layout) stays. Replace with real events or
	// delete the pages — see audit-3/research-fix/event-fixes.md §9.
	const PLACEHOLDER_EVENT_SLUGS = new Set([
		'lorem-ipsum-dolor-sit-amet-conse',
		'excepteur-sint-occaecat-cupidatat',
		'sunt-in-culpa-qui-officia'
	]);
	const isPlaceholderEvent = PLACEHOLDER_EVENT_SLUGS.has(event.slug);

	const basePrice = parseInt(event.price.replace(/[^0-9]/g, ''), 10);
	const availability = past ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock';
	// Ticket tiers ARE rendered visibly on the page (TicketBox), so each tier
	// gets its own Offer. Past nights show no TicketBox — single Offer only,
	// matching the visible "Tickets: From $X" line.
	// NOTE: tier prices are derived placeholders (data.ts: "Placeholder pricing —
	// Dus to confirm real ticket prices"); the array is correct in shape, but
	// shipping it as fact is blocked on Dus confirming real prices.
	const offers = past
		? {
				'@type': 'Offer',
				price: basePrice,
				priceCurrency: 'USD',
				availability,
				url: pageUrl
			}
		: ticketTiers(event).map((t) => ({
				'@type': 'Offer',
				name: t.name,
				price: parseInt(t.price.replace(/[^0-9]/g, ''), 10),
				priceCurrency: 'USD',
				availability,
				url: pageUrl
			}));

	const jsonLd = isPlaceholderEvent
		? null
		: {
				'@context': 'https://schema.org',
				'@type': 'Event',
				name: event.title,
				startDate: `${event.iso}T${event.time}:00${ukOffset(event.iso)}`,
				endDate: eventEndDate(event.iso),
				eventStatus: 'https://schema.org/EventScheduled',
				location: {
					'@type': 'NightClub',
					'@id': `${SITE_URL}/#nightclub`,
					name: 'Night Club',
					address: {
						'@type': 'PostalAddress',
						streetAddress: '4578 Marmora Road',
						addressLocality: 'Glasgow',
						// No postalCode: the real Glasgow postcode is unknown;
						// the old 'D04 89GR' was a Dublin-style code — never republish it.
						addressCountry: 'GB'
					}
				},
				image: `${SITE_URL}${event.image}`,
				description: event.description,
				url: `${SITE_URL}/events/${event.slug}/`,
				performer: dj
					? {
							'@type': 'Person',
							name: dj.name,
							url: `${SITE_URL}/djs/${dj.slug}/`
						}
					: undefined,
				offers
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
	{#if jsonLd}
		{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
	{/if}
</svelte:head>

<article class="mx-auto w-full max-w-[780px] px-4 pt-10 pb-16 md:pt-14">
	<p class="font-condensed text-sm font-bold tracking-[0.25em] text-pink uppercase">
		<a href="/events/" class="hover:text-white">Events</a> / {event.monthName} {event.year}
	</p>
	<h1 class="mt-3 font-condensed text-[2.4rem] leading-[1.05] font-bold tracking-wide uppercase md:text-[3.2rem]">
		{event.title}
	</h1>
	<p class="mt-4" role="status">
		{#if past}
			<span class="inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2 font-condensed text-sm font-bold tracking-[0.2em] text-neutral-300 uppercase">
				<span class="h-2 w-2 rounded-full bg-neutral-400" aria-hidden="true"></span> Past night — tickets closed
			</span>
		{:else}
			<span class="inline-flex items-center gap-2 rounded-full border border-pink/50 bg-pink/10 px-4 py-2 font-condensed text-sm font-bold tracking-[0.2em] text-pink uppercase">
				<span class="h-2 w-2 rounded-full bg-pink" aria-hidden="true"></span> Tickets on sale
			</span>
		{/if}
	</p>
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
			<div class="mt-6 flex flex-wrap items-center gap-2">
				<span class="font-condensed text-sm font-bold tracking-widest text-neutral-400 uppercase">Share this night</span>
				<a
					href="https://twitter.com/intent/tweet?text={encodeURIComponent(shareText)}&url={encodeURIComponent(pageUrl)}"
					target="_blank"
					rel="noopener noreferrer"
					class="btn-press inline-flex min-h-11 items-center rounded-full border border-white/25 px-4 font-condensed text-sm font-bold tracking-[0.15em] text-white uppercase transition-colors hover:border-pink hover:text-pink"
				>
					X / Twitter
				</a>
				<a
					href="https://www.facebook.com/sharer/sharer.php?u={encodeURIComponent(pageUrl)}"
					target="_blank"
					rel="noopener noreferrer"
					class="btn-press inline-flex min-h-11 items-center rounded-full border border-white/25 px-4 font-condensed text-sm font-bold tracking-[0.15em] text-white uppercase transition-colors hover:border-pink hover:text-pink"
				>
					Facebook
				</a>
				<button
					type="button"
					onclick={copyLink}
					class="btn-press inline-flex min-h-11 items-center rounded-full border border-white/25 px-4 font-condensed text-sm font-bold tracking-[0.15em] text-white uppercase transition-colors hover:border-pink hover:text-pink"
				>
					{copied ? 'Link copied ✓' : 'Copy link'}
				</button>
			</div>
			{#if copyFallback}
				<p class="mt-3 text-sm leading-relaxed text-neutral-300" role="status">
					Copy is blocked in this browser — here is the link to share:
					<input
						type="text"
						readonly
						value={pageUrl}
						aria-label="Event link to copy"
						onfocus={(e) => e.currentTarget.select()}
						class="mt-1 w-full rounded-lg border border-white/20 bg-black px-3 py-2 text-sm text-white"
					/>
				</p>
			{/if}
		</div>
	</div>

	{#if past}
		<div class="mt-10 rounded-2xl border border-white/15 bg-panel p-5 md:p-6" role="status">
			<h2 class="font-condensed text-xl font-bold tracking-wide uppercase">This night has passed</h2>
			<p class="mt-2 text-sm leading-relaxed text-neutral-300">
				Tickets are closed for this date. The page stays up with the night's details — see
				<a href="/events/" class="text-pink hover:text-white">upcoming events</a> for what's next.
			</p>
		</div>
	{:else}
		<div class="mt-10">
			<TicketBox {event} />
		</div>
	{/if}

	<!-- Ticket policy, on the page — not hidden behind several clicks. -->
	<div class="mt-10 rounded-2xl border border-white/15 bg-panel p-5 md:p-6">
		<h2 class="font-condensed text-xl font-bold tracking-wide uppercase">Ticket policy</h2>
		<ul class="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-neutral-300">
			<li>Tickets are non-refundable.</li>
			<li>Tickets can be transferred to another person up to 24 hours before the night.</li>
			<li>If the club cancels a night, every ticket is refunded in full.</li>
			<li>Entry is 18+ only — bring photo ID, even with a ticket.</li>
		</ul>
		<p class="mt-3 text-sm text-neutral-400">
			More entry questions answered on the <a href="/faq/" class="text-pink hover:text-white">FAQ page</a>.
		</p>
	</div>

	<h2 class="mt-16 font-condensed text-2xl font-bold tracking-wide uppercase md:text-3xl">More events</h2>
	<div class="mt-8 grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3 md:gap-x-6">
		{#each others as other (other.slug)}
			<EventCard event={other} />
		{/each}
	</div>
</article>
