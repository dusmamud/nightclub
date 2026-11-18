<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import EventCard from '#lib/components/EventCard.svelte';
	import NewsCard from '#lib/components/NewsCard.svelte';
	import Countdown from '#lib/components/Countdown.svelte';
	import { reveal } from '#lib/actions/reveal';
	import { EVENTS, NEWS } from '#lib/data';

	const heroEvents = EVENTS.slice(0, 3);
	const homeNews = NEWS.slice(0, 4);

	// No JS-gated image fade anywhere on this page (round-3 fix): the hero
	// photo and the circle photos render natively, so a slow first load or
	// no-JS can never leave the hero a black void. The entrance animation is
	// CSS-only with delays capped at 160ms, starting at first paint.
</script>

<Seo
	title="Night Club — Glasgow Nightlife, Events & Premier Music"
	description="Night Club Glasgow — plunge into the hottest nightlife and dance until dawn with premier music. Upcoming events, latest news and gallery at 4578 Marmora Road."
	path="/"
	image="/images/hero-crowd.jpg"
/>

<!-- HERO — crowd photo behind the header, three circular events with pink date badges.
     High-key B&W photo; the overlay is light so the bright photo shows through. -->
<section class="relative -mt-[4.25rem] overflow-hidden bg-[#8a8a8a] pt-[4.25rem] md:-mt-[5.5rem] md:pt-[5.5rem]">
	<img
		src="/images/hero-crowd.jpg"
		alt="Crowd dancing at Night Club"
		width="1920"
		height="1280"
		fetchpriority="high"
		decoding="async"
		class="ken-burns absolute inset-0 h-full w-full bg-[#8a8a8a] object-cover grayscale"
	/>
	<div class="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-black/60"></div>

	<div class="relative mx-auto w-full max-w-[780px] px-4 pt-24 pb-8 md:pt-28 md:pb-10">
		<h1 class="sr-only">Night Club — Glasgow nightlife, events and premier music</h1>
		<div class="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
			{#each heroEvents as event, i (event.slug)}
				<div class="hero-enter" style="--d: {i * 40}ms">
					<EventCard {event} priority />
				</div>
			{/each}
		</div>
		<p class="hero-enter mt-8 text-center" style="--d: 160ms">
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

<!-- PLUNGE -->
<section class="relative overflow-hidden bg-[#141414]">
	<div class="absolute inset-0" use:reveal>
		<img
			src="/images/plunge-dj.jpg"
			alt=""
			width="1920"
			height="1280"
			loading="lazy"
			decoding="async"
			class="h-full w-full object-cover grayscale"
		/>
	</div>
	<div class="absolute inset-0 bg-black/45"></div>
	<div class="relative mx-auto w-full max-w-[780px] px-4 py-6 md:py-8">
		<div class="reveal max-w-[28rem]" use:reveal>
			<h2 class="font-condensed text-[2.25rem] leading-[1.05] font-semibold tracking-wide text-white uppercase md:text-[2.625rem]">
				Plunge into the hottest exciting nightlife and dance until dawn with premier music
			</h2>
			<p class="mt-5 max-w-[40rem] text-sm leading-relaxed text-neutral-300">
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
	<div class="relative mx-auto w-full max-w-[780px] px-4 py-6 md:py-8">
		<h2 class="reveal font-condensed text-[2.4rem] font-semibold tracking-wide text-white uppercase md:text-[2.6rem]" use:reveal>
			Latest news
		</h2>
		<div class="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-8 md:gap-y-8">
			{#each homeNews as item, i (item.slug)}
				<div class="reveal" use:reveal style="transition-delay: {(i % 2) * 60}ms">
					<NewsCard {item} compact />
				</div>
			{/each}
		</div>
		<p class="mt-8">
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
	<div class="mx-auto w-full max-w-[780px] px-4 py-6 md:py-8">
		<h2 class="reveal font-condensed text-[2.4rem] font-semibold tracking-wide text-white uppercase md:text-[2.6rem]" use:reveal>
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
