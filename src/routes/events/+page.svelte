<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import EventCard from '#lib/components/EventCard.svelte';
	import { reveal } from '#lib/actions/reveal';
	import { EVENTS } from '#lib/data';

	const months = ['ALL', 'JAN', 'FEB'] as const;
	let filter = $state<(typeof months)[number]>('ALL');
	let shown = $derived(filter === 'ALL' ? EVENTS : EVENTS.filter((e) => e.month === filter));
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

	<div class="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter events by month">
		{#each months as m (m)}
			<button
				type="button"
				aria-pressed={filter === m}
				onclick={() => (filter = m)}
				class="min-h-11 rounded-full border px-5 font-condensed text-sm font-bold tracking-[0.2em] transition-colors {filter ===
				m
					? 'border-pink bg-pink text-white'
					: 'border-white/25 text-white hover:border-pink hover:text-pink'}"
			>
				{m === 'ALL' ? 'ALL EVENTS' : m}
			</button>
		{/each}
	</div>

	<p class="mt-6 text-sm text-neutral-400" aria-live="polite">
		Showing {shown.length} event{shown.length === 1 ? '' : 's'}{filter === 'ALL' ? '' : ` in ${filter}`}
	</p>

	<div class="mt-8 grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3 md:gap-x-6 md:gap-y-14">
		{#each shown as event, i (event.slug)}
			<div class="reveal" use:reveal style="transition-delay: {(i % 3) * 50}ms">
				<EventCard {event} />
			</div>
		{/each}
	</div>
</section>
