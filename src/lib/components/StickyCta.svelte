<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { motionDuration } from '#lib/motion';
	import { PHONE_HREF } from '#lib/data';
	import Phone from '@lucide/svelte/icons/phone';
	import CalendarCheck from '@lucide/svelte/icons/calendar-check';

	// Sticky mobile booking CTA — appears after the first scroll, mobile only.
	let visible = $state(false);

	onMount(() => {
		const onScroll = () => {
			visible = window.scrollY > 320;
		};
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});
</script>

{#if visible}
	<div
		class="fixed inset-x-0 bottom-0 z-40 flex gap-2 bg-black/95 px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-md md:hidden"
		transition:fly={{ y: 16, duration: motionDuration(250) }}
	>
		<a
			href="/vip/"
			class="btn-press flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-pink font-condensed text-sm font-bold tracking-[0.2em] text-white uppercase"
		>
			<CalendarCheck size={18} aria-hidden="true" /> Book a table
		</a>
		<a
			href={PHONE_HREF}
			aria-label="Call the club"
			class="btn-press flex min-h-12 min-w-12 items-center justify-center rounded-full border border-white/25 text-white"
		>
			<Phone size={20} aria-hidden="true" />
		</a>
	</div>
{/if}
