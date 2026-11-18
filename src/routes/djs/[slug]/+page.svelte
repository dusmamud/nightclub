<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import EventCard from '#lib/components/EventCard.svelte';
	import { DJS, eventsForDj } from '#lib/data';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const dj = DJS.find((d) => d.slug === data.slug)!;
	const upcoming = eventsForDj(dj.slug);
</script>

<Seo
	title="{dj.name} — {dj.genre} · Night Club Glasgow"
	description="{dj.name}, resident DJ at Night Club Glasgow — {dj.genre}. {dj.bio}"
	path="/djs/{dj.slug}/"
	image={dj.image}
/>

<article class="mx-auto w-full max-w-[780px] px-4 pt-10 pb-16 md:pt-14">
	<p class="font-condensed text-sm font-bold tracking-[0.25em] text-pink uppercase">
		<a href="/djs/" class="hover:text-white">DJs</a> / {dj.genre}
	</p>
	<h1 class="mt-3 font-condensed text-[2.6rem] leading-[1.05] font-bold tracking-wide uppercase md:text-[3.5rem]">
		{dj.name}
	</h1>
	<p class="mt-2 font-condensed text-lg font-semibold tracking-widest text-pink uppercase">{dj.genre}</p>
	<p class="mt-1 font-condensed text-sm font-bold tracking-widest text-neutral-400 uppercase">
		{dj.residentNight} · Night Club Glasgow
	</p>

	<div class="mt-8 overflow-hidden rounded-2xl bg-[#232323]">
		<img
			src={dj.image}
			alt={dj.imageAlt}
			width="1920"
			height="1280"
			fetchpriority="high"
			decoding="async"
			class="aspect-[16/9] w-full object-cover"
		/>
	</div>
	<p class="mt-6 max-w-[34rem] text-sm leading-relaxed text-neutral-300">{dj.bio}</p>

	<h2 class="mt-12 font-condensed text-2xl font-bold tracking-wide uppercase md:text-3xl">Listen &amp; follow</h2>
	<p class="mt-4 max-w-[34rem] text-sm leading-relaxed text-neutral-300">
		Mixes and social links for {dj.name} will be listed here once the DJs publish them — no links are
		shown until they are real. Until then, the nights below are the best place to hear them play.
	</p>

	<h2 class="mt-12 font-condensed text-2xl font-bold tracking-wide uppercase md:text-3xl">Upcoming nights</h2>
	{#if upcoming.length > 0}
		<div class="mt-8 grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3 md:gap-x-6">
			{#each upcoming as event (event.slug)}
				<EventCard {event} />
			{/each}
		</div>
	{:else}
		<p class="mt-4 text-sm text-neutral-400">No nights announced yet — check the events page.</p>
	{/if}

	<p class="mt-12">
		<a
			href="/events/"
			class="btn-press inline-flex min-h-12 items-center rounded-full bg-pink px-7 font-condensed text-sm font-bold tracking-[0.2em] text-white uppercase hover:bg-pink-dark"
		>
			See all events
		</a>
	</p>
</article>
