<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import { reveal } from '#lib/actions/reveal';
	import { srcsetFor, pictureSrcsets } from '#lib/images';
	import { OPENING_HOURS, ROOMS } from '#lib/data';
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
		<picture class="contents">
			<source
				type="image/avif"
				srcset={srcsetFor('/images/plunge-dj.jpg', 'avif')}
				sizes="(min-width: 768px) 748px, calc(100vw - 32px)"
			/>
			<source
				type="image/webp"
				srcset={srcsetFor('/images/plunge-dj.jpg', 'webp')}
				sizes="(min-width: 768px) 748px, calc(100vw - 32px)"
			/>
			<img
				src="/images/plunge-dj.jpg"
				srcset={srcsetFor('/images/plunge-dj.jpg')}
				sizes="(min-width: 768px) 748px, calc(100vw - 32px)"
				alt="DJ with headphones pointing at the crowd"
				width="1920"
				height="1280"
				loading="lazy"
				decoding="async"
				class="aspect-[16/9] w-full object-cover grayscale"
			/>
		</picture>
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

	<h2 id="rooms" class="mt-12 scroll-mt-28 font-condensed text-2xl font-bold tracking-wide uppercase md:text-3xl">Rooms &amp; areas</h2>
	<div class="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
		{#each ROOMS as room, i (room.name)}
			{@const pic = pictureSrcsets(room.image)}
			<article class="reveal group card-lift" use:reveal style="transition-delay: {i * 50}ms">
				<span class="block overflow-hidden rounded-2xl bg-[#232323]">
					<picture class="contents">
						<source
							type="image/avif"
							srcset={pic?.avif}
							sizes="(min-width: 768px) 239px, (min-width: 640px) calc((100vw - 48px) / 2), calc(100vw - 32px)"
						/>
						<source
							type="image/webp"
							srcset={pic?.webp}
							sizes="(min-width: 768px) 239px, (min-width: 640px) calc((100vw - 48px) / 2), calc(100vw - 32px)"
						/>
						<img
							src={room.image}
							srcset={srcsetFor(room.image)}
							sizes="(min-width: 768px) 239px, (min-width: 640px) calc((100vw - 48px) / 2), calc(100vw - 32px)"
							alt={room.imageAlt}
							width="1920"
							height="1280"
							loading="lazy"
							decoding="async"
							class="aspect-[3/2] w-full object-cover transition-transform duration-300 group-hover:scale-105"
						/>
					</picture>
				</span>
				<h3 class="mt-4 font-condensed text-xl font-bold tracking-wide text-white uppercase">{room.name}</h3>
				<p class="mt-1 text-sm leading-relaxed text-neutral-400">{room.desc}</p>
			</article>
		{/each}
	</div>
	<p class="mt-8">
		<a
			href="/events/"
			class="inline-flex min-h-12 items-center rounded-full bg-pink px-7 font-condensed text-sm font-bold tracking-[0.2em] text-white uppercase transition-colors hover:bg-pink-dark"
		>
			See upcoming events
		</a>
	</p>
</section>
