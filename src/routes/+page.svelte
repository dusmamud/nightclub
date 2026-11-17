<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import EventCard from '#lib/components/EventCard.svelte';
	import NewsCard from '#lib/components/NewsCard.svelte';
	import Countdown from '#lib/components/Countdown.svelte';
	import Ticker from '#lib/components/Ticker.svelte';
	import Newsletter from '#lib/components/Newsletter.svelte';
	import { reveal } from '#lib/actions/reveal';
	import { EVENTS, NEWS } from '#lib/data';

	const heroEvents = EVENTS.slice(0, 3);
	const homeNews = NEWS.slice(0, 4);

	// Hero background fade-in over a dark base, so a slow first load never
	// shows a black hole behind the circles.
	let heroLoaded = $state(false);
</script>

<Seo
	title="Night Club — Glasgow Nightlife, Events & Premier Music"
	description="Night Club Glasgow — plunge into the hottest nightlife and dance until dawn with premier music. Upcoming events, latest news and gallery at 4578 Marmora Road."
	path="/"
	image="/images/hero-crowd.jpg"
/>

<!-- HERO — crowd photo behind the header, three circular events with pink date badges -->
<section class="relative -mt-[4.25rem] overflow-hidden bg-[#141414] pt-[4.25rem] md:-mt-[5.5rem] md:pt-[5.5rem]">
	<img
		src="/images/hero-crowd.jpg"
		alt="Crowd dancing at Night Club"
		width="1920"
		height="1280"
		fetchpriority="high"
		decoding="async"
		onload={() => (heroLoaded = true)}
		class="img-fade absolute inset-0 h-full w-full bg-[#141414] object-cover grayscale {heroLoaded
			? 'img-loaded'
			: ''}"
	/>
	<div class="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/85"></div>

	<div class="relative mx-auto w-full max-w-[780px] px-4 pt-16 pb-10 md:pt-20 md:pb-14">
		<h1 class="sr-only">Night Club — Glasgow nightlife, events and premier music</h1>
		<div class="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
			{#each heroEvents as event, i (event.slug)}
				<div class="hero-enter" style="--d: {i * 60}ms">
					<EventCard {event} priority />
				</div>
			{/each}
		</div>
		<p class="hero-enter mt-10 text-center" style="--d: 240ms">
			<a
				href="/events/"
				class="font-condensed text-sm font-bold tracking-[0.2em] text-pink uppercase transition-colors hover:text-white"
			>
				See all events
			</a>
		</p>
	</div>
</section>

<Countdown />

<Ticker />

<!-- PLUNGE -->
<section class="relative overflow-hidden bg-[#141414]">
	<img
		src="/images/plunge-dj.jpg"
		alt=""
		width="1920"
		height="1280"
		loading="lazy"
		decoding="async"
		class="absolute inset-0 h-full w-full object-cover grayscale"
	/>
	<div class="absolute inset-0 bg-black/45"></div>
	<div class="relative mx-auto w-full max-w-[780px] px-4 py-10 md:py-14">
		<div class="reveal max-w-[42rem]" use:reveal>
			<h2 class="font-condensed text-[2.5rem] leading-[1.05] font-semibold tracking-wide text-white uppercase md:text-[3.25rem]">
				Plunge into the hottest exciting nightlife and dance until dawn with premier music
			</h2>
			<p class="mt-5 max-w-[34rem] text-sm leading-relaxed text-neutral-300">
				Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
				et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
				aliquip ex ea commodo consequat.
			</p>
			<p class="mt-5">
				<a
					href="/about/"
					class="font-condensed text-sm font-bold tracking-[0.2em] text-pink uppercase transition-colors hover:text-white"
				>
					Read more
				</a>
			</p>
		</div>
	</div>
</section>

<!-- LATEST NEWS -->
<section class="relative overflow-hidden bg-[#150710]">
	<img
		src="/images/news-bokeh.jpg"
		alt=""
		width="1920"
		height="1280"
		loading="lazy"
		decoding="async"
		class="absolute inset-0 h-full w-full object-cover"
	/>
	<div class="absolute inset-0 bg-black/55"></div>
	<div class="relative mx-auto w-full max-w-[780px] px-4 py-10 md:py-12">
		<h2 class="reveal font-condensed text-[2.4rem] font-semibold tracking-wide text-white uppercase md:text-[3rem]" use:reveal>
			Latest news
		</h2>
		<div class="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-10 md:gap-y-10">
			{#each homeNews as item, i (item.slug)}
				<div class="reveal" use:reveal style="transition-delay: {(i % 2) * 60}ms">
					<NewsCard {item} compact />
				</div>
			{/each}
		</div>
		<p class="mt-10">
			<a
				href="/news/"
				class="font-condensed text-sm font-bold tracking-[0.2em] text-pink uppercase transition-colors hover:text-white"
			>
				See all news
			</a>
		</p>
	</div>
</section>

<!-- ABOUT band -->
<section class="bg-[#1a1a1a]">
	<div class="mx-auto w-full max-w-[780px] px-4 py-10 md:py-12">
		<h2 class="reveal font-condensed text-[2.4rem] font-semibold tracking-wide text-white uppercase md:text-[3rem]" use:reveal>
			About
		</h2>
		<p class="reveal mt-4 text-sm leading-relaxed text-neutral-400" use:reveal>
			Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
			dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
			ex ea commodo consequat. Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor
			incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
			laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
			velit esse cillum dolore eu fugiat nulla pariatur.
		</p>
	</div>
</section>

<!-- NEWSLETTER -->
<section class="border-t border-white/10 bg-black">
	<div class="mx-auto w-full max-w-[780px] px-4 py-10 md:py-12">
		<div class="reveal" use:reveal>
			<h2 class="font-condensed text-[2rem] font-semibold tracking-wide text-white uppercase md:text-[2.4rem]">
				Never miss a night
			</h2>
			<p class="mt-2 max-w-[34rem] text-sm leading-relaxed text-neutral-400">
				One email a week with the next nights, guestlist openings and table releases.
			</p>
			<div class="mt-5 max-w-[34rem]">
				<Newsletter />
			</div>
		</div>
	</div>
</section>
