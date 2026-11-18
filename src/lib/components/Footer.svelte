<script lang="ts">
	import Newsletter from '#lib/components/Newsletter.svelte';
	import { ADDRESS, PHONE, PHONE_HREF } from '#lib/data';

	// Compact footer (round 3: was 393px, reference ~171px). The newsletter
	// lives here only — one slim inline row beside the logo, no heading, no
	// disclaimer — then logo + address + phone + a single slim nav row.
	const NAV = [
		{ href: '/', label: 'HOME' },
		{ href: '/events/', label: 'EVENTS' },
		{ href: '/vip/', label: 'VIP' },
		{ href: '/djs/', label: 'DJS' },
		{ href: '/drinks/', label: 'DRINKS' },
		{ href: '/about/', label: 'ABOUT' },
		{ href: '/gallery/', label: 'GALLERY' },
		{ href: '/news/', label: 'NEWS' },
		{ href: '/faq/', label: 'FAQ' },
		{ href: '/visit/', label: 'VISIT' },
		{ href: '/safety/', label: 'SAFETY' },
		{ href: '/contacts/', label: 'CONTACTS' }
	];
</script>

<footer class="relative overflow-hidden">
	<img
		src="/images/footer-crowd.jpg"
		srcset="/images/footer-crowd-400.jpg 400w, /images/footer-crowd-800.jpg 800w, /images/footer-crowd-1200.jpg 1200w, /images/footer-crowd.jpg 1600w"
		sizes="100vw"
		alt=""
		width="1920"
		height="1280"
		loading="lazy"
		decoding="async"
		class="absolute inset-0 h-full w-full object-cover grayscale"
	/>
	<div class="absolute inset-0 bg-black/75"></div>
	<div class="relative mx-auto w-full max-w-[780px] px-4 py-5">
		<div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-8">
			<div class="shrink-0">
				<p class="font-display text-[2.2rem] leading-none tracking-wide md:text-[2.4rem]">
					<span class="text-white">NIGHT</span><span class="text-pink">CLUB</span>
				</p>
				<p class="mt-2 text-xs text-neutral-400">
					Night Club © 2015. <a href="/about/" class="underline hover:text-white">Privacy Policy</a>
				</p>
			</div>
			<div class="w-full md:max-w-[22rem]">
				<Newsletter idPrefix="footer-newsletter" compact />
			</div>
		</div>
		<div class="mt-5 flex flex-col gap-1 border-t border-white/10 pt-4 md:flex-row md:items-baseline md:justify-between">
			<p class="font-condensed text-sm font-semibold tracking-widest text-pink uppercase">
				{ADDRESS}
			</p>
			<p class="font-condensed text-xl font-bold tracking-wide text-white md:text-2xl">
				CALL US: <a href={PHONE_HREF} class="hover:text-pink">{PHONE}</a>
			</p>
		</div>
		<nav aria-label="Footer" class="mt-2">
			<ul class="flex flex-wrap gap-x-4 gap-y-1">
				{#each NAV as item (item.href)}
					<li>
						<a href={item.href} class="font-condensed text-xs font-semibold tracking-widest text-neutral-300 hover:text-pink">
							{item.label}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</div>
</footer>
