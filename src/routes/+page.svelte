<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import EventCard from '#lib/components/EventCard.svelte';
	import NewsCard from '#lib/components/NewsCard.svelte';
	import Countdown from '#lib/components/Countdown.svelte';
	import { reveal } from '#lib/actions/reveal';
	import { EVENTS, NEWS } from '#lib/data';

	const heroEvents = EVENTS.slice(0, 3);
	const homeNews = NEWS.slice(0, 4);
</script>

<Seo
	title="Night Club — Glasgow Nightlife, Events & Premier Music"
	description="Night Club Glasgow — plunge into the hottest nightlife and dance until dawn with premier music. Upcoming events, latest news and gallery at 4578 Marmora Road."
	path="/"
	image="/images/hero-crowd.jpg"
/>

<!-- HERO — crowd photo behind the header, three circular events with pink date badges -->
<section class="relative -mt-[4.25rem] overflow-hidden pt-[4.25rem] md:-mt-[6.5rem] md:pt-[6.5rem]">
	<img
		src="/images/hero-crowd.jpg"
		alt="Crowd dancing at Night Club"
		width="1920"
		height="1280"
		fetchpriority="high"
		decoding="async"
		class="absolute inset-0 h-full w-full object-cover grayscale brightness-110"
	/>
	<div class="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/85"></div>

	<div class="relative mx-auto w-full max-w-[780px] px-4 pt-6 pb-12 md:pt-10 md:pb-16">
		<h1 class="sr-only">Night Club — Glasgow nightlife, events and premier music</h1>
		<div class="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
			{#each heroEvents as event, i (event.slug)}
				<div class="reveal" use:reveal style="transition-delay: {i * 120}ms">
					<EventCard {event} />
				</div>
			{/each}
		</div>
		<p class="mt-12 text-center">
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
<section class="relative overflow-hidden">
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
	<div class="relative mx-auto w-full max-w-[780px] px-4 py-14 md:py-20">
		<div class="reveal max-w-[36rem]" use:reveal>
			<h2 class="font-condensed text-[2.5rem] leading-[1.05] font-semibold tracking-wide text-white uppercase md:text-[3.25rem]">
				Plunge into the hottest exciting nightlife and dance until dawn with premier music
			</h2>
			<p class="mt-5 max-w-[26rem] text-sm leading-relaxed text-neutral-300">
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
<section
	class="relative overflow-hidden"
	style="background: radial-gradient(60% 90% at 15% 10%, rgba(255,23,145,0.8), transparent 60%), radial-gradient(55% 80% at 85% 20%, rgba(34,211,238,0.6), transparent 60%), radial-gradient(70% 90% at 50% 110%, rgba(147,51,234,0.65), transparent 65%), #150710;"
>
	<div class="relative mx-auto w-full max-w-[780px] px-4 py-14 md:py-16">
		<h2 class="reveal font-condensed text-[2.4rem] font-semibold tracking-wide text-white uppercase md:text-[3rem]" use:reveal>
			Latest news
		</h2>
		<div class="mt-8 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-x-10 md:gap-y-12">
			{#each homeNews as item, i (item.slug)}
				<div class="reveal" use:reveal style="transition-delay: {(i % 2) * 120}ms">
					<NewsCard {item} />
				</div>
			{/each}
		</div>
		<p class="mt-12">
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
	<div class="mx-auto w-full max-w-[780px] px-4 py-12 md:py-14">
		<h2 class="reveal font-condensed text-[2.4rem] font-semibold tracking-wide text-white uppercase md:text-[3rem]" use:reveal>
			About
		</h2>
		<p class="reveal mt-4 text-sm leading-relaxed text-neutral-400" use:reveal>
			Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
			dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
			ex ea commodo consequat. Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor
			incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
			laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
			velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
			in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet conse ctetur
			adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
			veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
			irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
			sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est.
		</p>
		<p class="mt-6">
			<a
				href="/about/"
				class="font-condensed text-sm font-bold tracking-[0.2em] text-pink uppercase transition-colors hover:text-white"
			>
				More about the club
			</a>
		</p>
	</div>
</section>
