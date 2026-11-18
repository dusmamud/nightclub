<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import EventCard from '#lib/components/EventCard.svelte';
	import { reveal } from '#lib/actions/reveal';
	import { DJS, WEEKLY_PROGRAM, pastEvents, upcomingEvents } from '#lib/data';

	const upcoming = upcomingEvents();
	const past = pastEvents();

	const months = ['ALL', 'JAN', 'FEB'] as const;
	let filter = $state<(typeof months)[number]>('ALL');
	let shown = $derived(filter === 'ALL' ? upcoming : upcoming.filter((e) => e.month === filter));

	function djName(slug: string) {
		return DJS.find((d) => d.slug === slug)?.name ?? '';
	}
</script>

<Seo
	title="Events — Night Club Glasgow"
	description="All upcoming events at Night Club Glasgow — dates, times and ticket prices. Dance until dawn with premier music at 4578 Marmora Road."
	path="/events/"
	image="/images/event-2.jpg"
/>

<section class="mx-auto w-full max-w-[780px] px-4 pt-10 pb-16 md:pt-14">
	<h1 class="reveal font-condensed text-[2.6rem] font-bold tracking-wide uppercase md:text-[3.5rem]" use:reveal>
		Events
	</h1>
	<p class="mt-3 max-w-[34rem] text-sm leading-relaxed text-neutral-400">
		Every night at Night Club runs until dawn with premier music. Pick a date below — doors, prices and the
		18+ age note are on each event page.
	</p>

	<!-- The regular week: which resident holds which night, every week. -->
	<h2 class="reveal mt-10 font-condensed text-2xl font-bold tracking-wide uppercase md:text-3xl" use:reveal>
		The week at Night Club
	</h2>
	<div class="reveal mt-4 divide-y divide-white/10 border-y border-white/10" use:reveal>
		{#each WEEKLY_PROGRAM as night (night.day)}
			<div class="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
				<p class="text-sm leading-relaxed text-neutral-300">
					<span class="font-condensed text-base font-bold tracking-widest text-white uppercase">{night.day}</span>
					<span class="mx-2 text-neutral-500" aria-hidden="true">·</span>{night.night} — {night.note}
					<a href="/djs/{night.djSlug}/" class="text-pink hover:text-white">{djName(night.djSlug)}</a>
				</p>
				<p class="shrink-0 font-condensed text-sm font-semibold tracking-widest text-neutral-400">
					{night.time} · 18+
				</p>
			</div>
		{/each}
	</div>
	<p class="mt-3 text-xs leading-relaxed text-neutral-500">
		The same residents, the same nights, every week — individual dates and ticket prices are below.
	</p>

	<div class="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter events by month">
		{#each months as m (m)}
			<button
				type="button"
				aria-pressed={filter === m}
				onclick={() => (filter = m)}
				class="btn-press min-h-11 rounded-full border px-5 font-condensed text-sm font-bold tracking-[0.2em] transition-colors {filter ===
				m
					? 'border-pink bg-pink text-white'
					: 'border-white/25 text-white hover:border-pink hover:text-pink'}"
			>
				{m === 'ALL' ? 'ALL EVENTS' : m}
			</button>
		{/each}
	</div>

	<p class="mt-6 text-sm text-neutral-400" aria-live="polite">
		Showing {shown.length} upcoming event{shown.length === 1 ? '' : 's'}{filter === 'ALL' ? '' : ` in ${filter}`}
	</p>

	<div class="mt-8 grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3 md:gap-x-6 md:gap-y-14">
		{#each shown as event, i (event.slug)}
			<div class="reveal" use:reveal style="transition-delay: {(i % 3) * 50}ms">
				<EventCard {event} />
			</div>
		{/each}
	</div>

	<!-- Past nights stay visible as an archive — never shown as upcoming. -->
	{#if past.length > 0}
		<h2 class="mt-16 font-condensed text-2xl font-bold tracking-wide uppercase md:text-3xl">Past nights</h2>
		<p class="mt-3 max-w-[34rem] text-sm leading-relaxed text-neutral-400">
			These nights have passed — tickets are closed, but the pages stay up with their details.
		</p>
		<div class="mt-8 grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3 md:gap-x-6 md:gap-y-14">
			{#each past as event (event.slug)}
				<EventCard {event} />
			{/each}
		</div>
	{/if}
</section>
