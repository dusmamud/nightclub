<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { fly } from 'svelte/transition';
	import { motionDuration } from '#lib/motion';
	import Menu from '@lucide/svelte/icons/menu';
	import X from '@lucide/svelte/icons/x';

	const NAV = [
		{ href: '/', label: 'HOME' },
		{ href: '/events/', label: 'EVENTS' },
		{ href: '/about/', label: 'ABOUT' },
		{ href: '/gallery/', label: 'GALLERY' },
		{ href: '/news/', label: 'NEWS' },
		{ href: '/vip/', label: 'VIP' },
		{ href: '/contacts/', label: 'CONTACTS' }
	];

	// Classic Twitter bird (reference shows the bird, not the X mark).
	// Lucide has no brand icons, so this is an inline SVG.
	const TWITTER_BIRD =
		'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z';
	const FACEBOOK_F =
		'M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.6-1.5h1.3V4.9c-.3 0-1.1-.1-2.1-.1-2.1 0-3.6 1.3-3.6 3.7V11H8.3v3h2.4v7h2.8Z';

	let open = $state(false);
	let scrolled = $state(false);
	let path = $derived(page.url.pathname.replace(/\/$/, '') || '/');
	function isActive(href: string) {
		if (href === '/') return path === '/';
		return path === href.replace(/\/$/, '') || path.startsWith(href.replace(/\/$/, '') + '/');
	}
	function close() {
		open = false;
	}

	onMount(() => {
		const onScroll = () => {
			scrolled = window.scrollY > 24;
		};
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});
</script>

<!-- Transparent over the hero at the top; solid once scrolled/stuck. -->
<header
	class="sticky top-0 z-50 transition-colors duration-300 {scrolled || open
		? 'bg-black/90 shadow-lg shadow-black/40 backdrop-blur-md'
		: 'bg-transparent'}"
>
	<div class="mx-auto flex h-[4.25rem] w-full max-w-[780px] items-center justify-between px-4 md:h-[5.5rem]">
		<a href="/" class="font-display text-[2.4rem] leading-none tracking-wide md:text-[3.4rem]" aria-label="Night Club — home">
			<span class="text-white">NIGHT</span><span class="text-pink">CLUB</span>
		</a>

		<!-- Desktop: one row — logo left, socials above the nav on the right. -->
		<div class="hidden flex-col items-end gap-1.5 md:flex">
			<div class="flex items-center gap-1 pr-1">
				<a
					href="https://www.facebook.com/"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Night Club on Facebook"
					class="flex min-h-11 min-w-11 items-center justify-center text-white transition-colors hover:text-pink"
				>
					<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={FACEBOOK_F} /></svg>
				</a>
				<a
					href="https://x.com/"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Night Club on Twitter"
					class="flex min-h-11 min-w-11 items-center justify-center text-white transition-colors hover:text-pink"
				>
					<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={TWITTER_BIRD} /></svg>
				</a>
			</div>
			<nav aria-label="Main">
				<ul class="flex items-center gap-5">
					{#each NAV as item (item.href)}
						<li>
							<a
								href={item.href}
								aria-current={isActive(item.href) ? 'page' : undefined}
								class="nav-link font-condensed text-[0.85rem] font-semibold tracking-widest transition-colors {isActive(
									item.href
								)
									? 'text-pink'
									: 'text-white hover:text-pink'}"
							>
								{item.label}
							</a>
						</li>
					{/each}
				</ul>
			</nav>
		</div>

		<!-- Mobile hamburger -->
		<button
			type="button"
			class="flex min-h-11 min-w-11 items-center justify-center text-white md:hidden"
			aria-expanded={open}
			aria-controls="mobile-menu"
			aria-label={open ? 'Close menu' : 'Open menu'}
			onclick={() => (open = !open)}
		>
			{#if open}
				<X size={28} aria-hidden="true" />
			{:else}
				<Menu size={28} aria-hidden="true" />
			{/if}
		</button>
	</div>

	{#if open}
		<nav
			id="mobile-menu"
			aria-label="Mobile"
			class="border-t border-white/10 bg-black/95 md:hidden"
			transition:fly={{ y: -12, duration: motionDuration(220) }}
		>
			<ul class="mx-auto max-w-[780px] px-4 py-2">
				{#each NAV as item (item.href)}
					<li>
						<a
							href={item.href}
							aria-current={isActive(item.href) ? 'page' : undefined}
							onclick={close}
							class="flex min-h-12 items-center font-condensed text-base font-semibold tracking-widest {isActive(
								item.href
							)
								? 'text-pink'
								: 'text-white'}"
						>
							{item.label}
						</a>
					</li>
				{/each}
				<li class="flex items-center gap-4 border-t border-white/10 py-3">
					<a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Night Club on Facebook" class="flex min-h-11 min-w-11 items-center justify-center text-white">
						<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={FACEBOOK_F} /></svg>
					</a>
					<a href="https://x.com/" target="_blank" rel="noopener noreferrer" aria-label="Night Club on Twitter" class="flex min-h-11 min-w-11 items-center justify-center text-white">
						<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={TWITTER_BIRD} /></svg>
					</a>
				</li>
			</ul>
		</nav>
	{/if}
</header>
