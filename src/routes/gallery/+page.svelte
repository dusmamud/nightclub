<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, scale } from 'svelte/transition';
	import { motionDuration } from '#lib/motion';
	import Seo from '#lib/components/Seo.svelte';
	import { reveal } from '#lib/actions/reveal';
	import { srcsetFor, pictureSrcsets } from '#lib/images';
	import { GALLERY } from '#lib/data';
	import ChevronLeft from '@lucide/svelte/icons/chevron-left';
	import ChevronRight from '@lucide/svelte/icons/chevron-right';
	import X from '@lucide/svelte/icons/x';

	let openIndex = $state<number | null>(null);
	let closeBtn: HTMLButtonElement | null = $state(null);
	let lastFocused: HTMLElement | null = null;

	const current = $derived(openIndex === null ? null : GALLERY[openIndex]);

	function open(i: number, trigger: HTMLElement) {
		lastFocused = trigger;
		openIndex = i;
	}
	function close() {
		openIndex = null;
		lastFocused?.focus();
	}
	function prev() {
		if (openIndex !== null) openIndex = (openIndex - 1 + GALLERY.length) % GALLERY.length;
	}
	function next() {
		if (openIndex !== null) openIndex = (openIndex + 1) % GALLERY.length;
	}
	function onKeydown(e: KeyboardEvent) {
		if (openIndex === null) return;
		if (e.key === 'Escape') close();
		else if (e.key === 'ArrowLeft') prev();
		else if (e.key === 'ArrowRight') next();
		else if (e.key === 'Tab') {
			// Light focus trap: keep Tab cycling inside the dialog.
			const dialog = document.getElementById('lightbox-dialog');
			if (!dialog) return;
			const focusables = [...dialog.querySelectorAll<HTMLElement>('button, [href]')].filter(
				(el) => !el.hasAttribute('disabled')
			);
			if (focusables.length === 0) return;
			const first = focusables[0];
			const last = focusables[focusables.length - 1];
			if (e.shiftKey && document.activeElement === first) {
				e.preventDefault();
				last.focus();
			} else if (!e.shiftKey && document.activeElement === last) {
				e.preventDefault();
				first.focus();
			}
		}
	}

	$effect(() => {
		if (openIndex !== null) {
			document.body.style.overflow = 'hidden';
			closeBtn?.focus();
		} else {
			document.body.style.overflow = '';
		}
	});
	onMount(() => {
		window.addEventListener('keydown', onKeydown);
		return () => window.removeEventListener('keydown', onKeydown);
	});
</script>

<Seo
	title="Gallery — Night Club Glasgow"
	description="Inside Night Club Glasgow — the dance floor, DJ booth, cocktails, lights and VIP lounge."
	path="/gallery/"
	image="/images/gallery-dancefloor.jpg"
/>

<section class="mx-auto w-full max-w-[780px] px-4 pt-10 pb-16 md:pt-14">
	<h1 class="reveal font-condensed text-[2.6rem] font-bold tracking-wide uppercase md:text-[3.5rem]" use:reveal>
		Gallery
	</h1>
	<p class="mt-3 max-w-[34rem] text-sm leading-relaxed text-neutral-400">
		Inside the club — the floor, the booth, the bar and the lights. Select any photo to view it large.
		Use the arrow keys to move between photos and Escape to close.
	</p>
	<div class="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
		{#each GALLERY as item, i (item.src)}
			{@const pic = pictureSrcsets(item.src)}
			<button
				type="button"
				class="group card-lift relative block overflow-hidden rounded-xl text-left"
				aria-label="View photo: {item.caption}"
				onclick={(e) => open(i, e.currentTarget)}
			>
				<span class="reveal block" use:reveal style="transition-delay: {(i % 3) * 50}ms">
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
							src={item.src}
							srcset={srcsetFor(item.src)}
							sizes="(min-width: 768px) 239px, (min-width: 640px) calc((100vw - 48px) / 2), calc(100vw - 32px)"
							alt={item.alt}
							width="1920"
							height="1280"
							loading="lazy"
							decoding="async"
							class="clip-img aspect-[3/2] w-full object-cover transition-transform duration-300 group-hover:scale-105"
						/>
					</picture>
					<span
						class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-3 pt-8 pb-3 font-condensed text-sm font-bold tracking-[0.2em] text-white uppercase"
					>
						{item.caption}
					</span>
				</span>
			</button>
		{/each}
	</div>
</section>

{#if current !== null && openIndex !== null}
	{@const lb = pictureSrcsets(current.src)}
	<div
		id="lightbox-dialog"
		role="dialog"
		aria-modal="true"
		tabindex="-1"
		aria-label="Photo viewer: {current.caption}"
		class="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4"
		transition:fade={{ duration: motionDuration(200) }}
		onclick={(e) => {
			if (e.target === e.currentTarget) close();
		}}
		onkeydown={(e) => {
			if (e.key === 'Escape') close();
		}}
	>
		<button
			type="button"
			bind:this={closeBtn}
			class="absolute top-4 right-4 z-10 flex min-h-12 min-w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-pink"
			aria-label="Close photo viewer"
			onclick={close}
		>
			<X size={26} aria-hidden="true" />
		</button>
		<button
			type="button"
			class="absolute left-2 z-10 flex min-h-12 min-w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-pink md:left-6"
			aria-label="Previous photo"
			onclick={prev}
		>
			<ChevronLeft size={28} aria-hidden="true" />
		</button>
		<figure class="max-h-full max-w-3xl" in:scale={{ duration: motionDuration(220), start: 0.96, opacity: 0 }}>
			<picture class="contents">
				<source type="image/avif" srcset={lb?.avif} sizes="(min-width: 800px) 768px, calc(100vw - 32px)" />
				<source type="image/webp" srcset={lb?.webp} sizes="(min-width: 800px) 768px, calc(100vw - 32px)" />
				<img
					src={current.src}
					srcset={srcsetFor(current.src)}
					sizes="(min-width: 800px) 768px, calc(100vw - 32px)"
					alt={current.alt}
					width="1920"
					height="1280"
					decoding="async"
					class="max-h-[78vh] w-auto max-w-full rounded-lg object-contain"
				/>
			</picture>
			<figcaption class="mt-3 text-center font-condensed text-sm font-bold tracking-[0.2em] text-white uppercase">
				{current.caption} · {openIndex + 1} of {GALLERY.length}
			</figcaption>
		</figure>
		<button
			type="button"
			class="absolute right-2 z-10 flex min-h-12 min-w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-pink md:right-6"
			aria-label="Next photo"
			onclick={next}
		>
			<ChevronRight size={28} aria-hidden="true" />
		</button>
	</div>
{/if}
