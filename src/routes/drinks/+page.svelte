<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import { reveal } from '#lib/actions/reveal';
	import { COCKTAILS, BOTTLES } from '#lib/data';
</script>

<Seo
	title="Drinks & Bottle Menu — Night Club Glasgow"
	description="Cocktails and bottle service at Night Club Glasgow — house pours, classics and bottles for the table."
	path="/drinks/"
	image="/images/gallery-cocktails.jpg"
/>

<section class="mx-auto w-full max-w-[780px] px-4 pt-10 pb-16 md:pt-14">
	<h1 class="reveal font-condensed text-[2.6rem] font-bold tracking-wide uppercase md:text-[3.5rem]" use:reveal>
		Drinks &amp; bottle menu
	</h1>
	<p class="mt-3 max-w-[34rem] text-sm leading-relaxed text-neutral-400">
		House pours and classics at the bar, and bottle service for the table. Order at the bar or from your
		table — bottle packages pair with the <a href="/vip/" class="text-pink hover:text-white">VIP tables</a>.
	</p>

	<h2 class="reveal mt-12 font-condensed text-2xl font-bold tracking-wide uppercase md:text-3xl" use:reveal>
		Cocktails
	</h2>
	<ul class="mt-6 divide-y divide-white/10 border-y border-white/10">
		{#each COCKTAILS as drink, i (drink.name)}
			<li class="reveal flex min-h-12 items-center justify-between gap-4 py-3" use:reveal style="transition-delay: {(i % 3) * 50}ms">
				<div>
					<p class="font-condensed text-lg font-semibold tracking-wide text-white uppercase">{drink.name}</p>
					<p class="text-sm text-neutral-400">{drink.desc}</p>
				</div>
				<p class="shrink-0 font-display text-2xl text-pink">{drink.price}</p>
			</li>
		{/each}
	</ul>

	<h2 class="reveal mt-12 font-condensed text-2xl font-bold tracking-wide uppercase md:text-3xl" use:reveal>
		Bottle service
	</h2>
	<ul class="mt-6 divide-y divide-white/10 border-y border-white/10">
		{#each BOTTLES as bottle, i (bottle.name)}
			<li class="reveal flex min-h-12 items-center justify-between gap-4 py-3" use:reveal style="transition-delay: {(i % 3) * 50}ms">
				<div>
					<p class="font-condensed text-lg font-semibold tracking-wide text-white uppercase">{bottle.name}</p>
					<p class="text-sm text-neutral-400">{bottle.desc}</p>
				</div>
				<p class="shrink-0 font-display text-2xl text-pink">{bottle.price}</p>
			</li>
		{/each}
	</ul>

	<p class="mt-6 text-xs leading-relaxed text-neutral-500">
		Placeholder prices — the real menu and bottle prices are still to be confirmed by the club.
	</p>
	<p class="mt-8">
		<a
			href="/vip/"
			class="btn-press inline-flex min-h-12 items-center rounded-full bg-pink px-7 font-condensed text-sm font-bold tracking-[0.2em] text-white uppercase hover:bg-pink-dark"
		>
			Book a table with bottles
		</a>
	</p>
</section>
