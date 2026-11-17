<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import { reveal } from '#lib/actions/reveal';
	import { DJS, eventsForDj } from '#lib/data';
</script>

<Seo
	title="DJs & Lineup — Night Club Glasgow"
	description="The resident DJs of Night Club Glasgow — house, techno and R&B across the week. Bios, genres and upcoming nights."
	path="/djs/"
	image="/images/gallery-djbooth.jpg"
/>

<section class="mx-auto w-full max-w-[780px] px-4 pt-10 pb-16 md:pt-14">
	<h1 class="reveal font-condensed text-[2.6rem] font-bold tracking-wide uppercase md:text-[3.5rem]" use:reveal>
		DJs &amp; lineup
	</h1>
	<p class="mt-3 max-w-[34rem] text-sm leading-relaxed text-neutral-400">
		The residents behind the booth. Pick a DJ to see their nights — house on Fridays, techno on Saturdays,
		R&amp;B midweek.
	</p>

	<div class="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
		{#each DJS as dj, i (dj.slug)}
			<article class="reveal group card-lift" use:reveal style="transition-delay: {i * 50}ms">
				<a href="/djs/{dj.slug}/" class="block" aria-label="{dj.name} — {dj.genre}">
					<span class="block overflow-hidden rounded-2xl bg-[#232323]">
						<img
							src={dj.image}
							alt={dj.imageAlt}
							width="1920"
							height="1280"
							loading="lazy"
							decoding="async"
							class="aspect-[3/2] w-full object-cover transition-transform duration-300 group-hover:scale-105"
						/>
					</span>
					<h2 class="mt-4 font-condensed text-2xl font-bold tracking-wide text-white uppercase transition-colors group-hover:text-pink">
						{dj.name}
					</h2>
					<p class="mt-1 font-condensed text-sm font-semibold tracking-widest text-pink uppercase">{dj.genre}</p>
					<p class="mt-2 text-sm leading-relaxed text-neutral-400">{dj.bio}</p>
					<p class="mt-3 text-sm font-semibold text-neutral-300">
						{eventsForDj(dj.slug).length} upcoming night{eventsForDj(dj.slug).length === 1 ? '' : 's'} →
					</p>
				</a>
			</article>
		{/each}
	</div>

	<p class="mt-10 text-xs leading-relaxed text-neutral-500">
		Placeholder lineup — the real DJ names, genres and nights are still to be confirmed by the club.
	</p>
</section>
