<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import { reveal } from '#lib/actions/reveal';
	import { OPENING_HOURS } from '#lib/data';
</script>

<Seo
	title="About — Night Club Glasgow"
	description="About Night Club Glasgow — the hottest nightlife and premier music at 4578 Marmora Road. Dance until dawn."
	path="/about/"
	image="/images/plunge-dj.jpg"
/>

<section class="mx-auto w-full max-w-[780px] px-4 pt-10 pb-16 md:pt-14">
	<h1 class="reveal font-condensed text-[2.6rem] font-bold tracking-wide uppercase md:text-[3.5rem]" use:reveal>
		About
	</h1>
	<div class="reveal mt-6 overflow-hidden rounded-2xl" use:reveal>
		<img
			src="/images/plunge-dj.jpg"
			alt="DJ with headphones pointing at the crowd"
			width="1920"
			height="1280"
			loading="lazy"
			decoding="async"
			class="aspect-[16/9] w-full object-cover grayscale"
		/>
	</div>
	<div class="reveal mt-8 space-y-4 text-sm leading-relaxed text-neutral-300" use:reveal>
		<p>
			Night Club is Glasgow's home for the hottest nightlife. Lorem ipsum dolor sit amet conse ctetur
			adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
			veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
		</p>
		<p>
			Every night we plunge into premier music and dance until dawn. Duis aute irure dolor in reprehenderit
			in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
			proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		</p>
		<p>
			You will find us at 4578 Marmora Road, Glasgow D04 89GR. Doors open late, the floor stays open
			until dawn, and the bar pours until the lights come up. 18+ only — please bring ID.
		</p>
	</div>

	<h2 class="mt-12 font-condensed text-2xl font-bold tracking-wide uppercase md:text-3xl">Opening hours</h2>
	<dl class="mt-4 divide-y divide-white/10 border-y border-white/10">
		{#each OPENING_HOURS as row (row.days)}
			<div class="flex min-h-12 items-center justify-between gap-4 py-2">
				<dt class="font-condensed font-semibold tracking-widest text-white uppercase">{row.days}</dt>
				<dd class="text-sm text-neutral-300">{row.hours}</dd>
			</div>
		{/each}
	</dl>
	<p class="mt-8">
		<a
			href="/events/"
			class="inline-flex min-h-12 items-center rounded-full bg-pink px-7 font-condensed text-sm font-bold tracking-[0.2em] text-white uppercase transition-colors hover:bg-pink-dark"
		>
			See upcoming events
		</a>
	</p>
</section>
