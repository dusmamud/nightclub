<script lang="ts">
	import { page } from '$app/state';
	import { fly } from 'svelte/transition';
	import Menu from '@lucide/svelte/icons/menu';
	import X from '@lucide/svelte/icons/x';

	const NAV = [
		{ href: '/', label: 'HOME' },
		{ href: '/about/', label: 'ABOUT' },
		{ href: '/gallery/', label: 'GALLERY' },
		{ href: '/news/', label: 'NEWS' },
		{ href: '/contacts/', label: 'CONTACTS' }
	];

	let open = $state(false);
	let path = $derived(page.url.pathname.replace(/\/$/, '') || '/');
	function isActive(href: string) {
		if (href === '/') return path === '/';
		return path === href.replace(/\/$/, '') || path.startsWith(href.replace(/\/$/, '') + '/');
	}
	function close() {
		open = false;
	}
</script>

<header class="sticky top-0 z-50 bg-black/70 backdrop-blur-md">
	<div class="mx-auto flex h-[4.25rem] w-full max-w-[780px] items-center justify-between px-4 md:h-[6.5rem]">
		<a href="/" class="font-display text-[2.4rem] leading-none tracking-wide md:text-[3.4rem]" aria-label="Night Club — home">
			<span class="text-white">NIGHT</span><span class="text-pink">CLUB</span>
		</a>

		<!-- Desktop: socials above nav, like the reference -->
		<div class="hidden flex-col items-end gap-2 md:flex">
			<div class="flex items-center gap-3 pr-1">
				<a
					href="https://www.facebook.com/"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Night Club on Facebook"
					class="flex min-h-11 min-w-11 items-center justify-center text-white transition-colors hover:text-pink"
				>
					<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.6-1.5h1.3V4.9c-.3 0-1.1-.1-2.1-.1-2.1 0-3.6 1.3-3.6 3.7V11H8.3v3h2.4v7h2.8Z" /></svg>
				</a>
				<a
					href="https://x.com/"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Night Club on X"
					class="flex min-h-11 min-w-11 items-center justify-center text-white transition-colors hover:text-pink"
				>
					<svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.8 3h3l-6.7 7.7L22 21h-6.2l-4.8-6.3L5.4 21h-3l7.2-8.2L2.4 3h6.4l4.4 5.8L17.8 3Zm-1.1 16.1h1.7L7.4 4.8H5.6l11.1 14.3Z" /></svg>
				</a>
			</div>
			<nav aria-label="Main">
				<ul class="flex items-center gap-6">
					{#each NAV as item (item.href)}
						<li>
							<a
								href={item.href}
								aria-current={isActive(item.href) ? 'page' : undefined}
								class="font-condensed text-[0.85rem] font-semibold tracking-widest transition-colors {isActive(
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
			transition:fly={{ y: -12, duration: 220 }}
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
						<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.6-1.5h1.3V4.9c-.3 0-1.1-.1-2.1-.1-2.1 0-3.6 1.3-3.6 3.7V11H8.3v3h2.4v7h2.8Z" /></svg>
					</a>
					<a href="https://x.com/" target="_blank" rel="noopener noreferrer" aria-label="Night Club on X" class="flex min-h-11 min-w-11 items-center justify-center text-white">
						<svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.8 3h3l-6.7 7.7L22 21h-6.2l-4.8-6.3L5.4 21h-3l7.2-8.2L2.4 3h6.4l4.4 5.8L17.8 3Zm-1.1 16.1h1.7L7.4 4.8H5.6l11.1 14.3Z" /></svg>
					</a>
				</li>
			</ul>
		</nav>
	{/if}
</header>
