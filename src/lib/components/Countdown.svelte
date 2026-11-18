<script lang="ts">
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import { motionDuration } from '#lib/motion';
	import { NEXT_EVENT } from '#lib/data';

	// Next event: 02 FEB 2027, doors 22:00 local time.
	const target = new Date(`${NEXT_EVENT.iso}T22:00:00`).getTime();

	function compute() {
		const diff = Math.max(0, target - Date.now());
		return {
			days: Math.floor(diff / 86_400_000),
			hours: Math.floor(diff / 3_600_000) % 24,
			minutes: Math.floor(diff / 60_000) % 60,
			seconds: Math.floor(diff / 1_000) % 60
		};
	}

	// Server-safe initial value: computed at render time (SSR + first client
	// paint), so the boxes never show "--" before hydration.
	let remaining = $state(compute());

	function tick() {
		remaining = compute();
	}

	onMount(() => {
		tick();
		const id = setInterval(tick, 1000);
		return () => clearInterval(id);
	});

	const cells = $derived([
		{ value: String(remaining.days).padStart(2, '0'), label: 'DAYS' },
		{ value: String(remaining.hours).padStart(2, '0'), label: 'HOURS' },
		{ value: String(remaining.minutes).padStart(2, '0'), label: 'MINUTES' },
		{ value: String(remaining.seconds).padStart(2, '0'), label: 'SECONDS' }
	]);
</script>

<!-- Slim strip, visually part of the hero flow (round 3: was a 182px section).
     One line on desktop: the next night + compact digit boxes. -->
<section aria-label="Countdown to the next event" class="border-y border-white/10 bg-coal">
	<div class="mx-auto flex w-full max-w-[780px] flex-col items-center gap-2 px-4 py-3 text-center md:flex-row md:justify-between md:gap-4 md:text-left">
		<p class="font-condensed text-sm font-semibold tracking-[0.15em] text-white uppercase md:text-base">
			<span class="text-pink">Next event</span>
			<span class="mx-2 text-neutral-500" aria-hidden="true">·</span>{NEXT_EVENT.title} — {NEXT_EVENT.day}
			{NEXT_EVENT.monthName}
			{NEXT_EVENT.year} · {NEXT_EVENT.time} · {NEXT_EVENT.price} · 18+
		</p>
		<div class="flex shrink-0 gap-1.5 md:gap-2" role="timer" aria-live="off" aria-label="Time until the next event">
			{#each cells as cell (cell.label)}
				<div class="flex min-w-[3.25rem] flex-col items-center rounded-md border border-white/10 bg-black px-1.5 py-1">
					{#key cell.value}
						<span
							class="font-display inline-block text-xl text-white tabular-nums md:text-2xl"
							data-countdown={cell.label}
							in:scale={{ duration: motionDuration(150), start: 0.85, opacity: 0.4 }}
						>
							{cell.value}
						</span>
					{/key}
					<span class="font-condensed text-[0.6rem] font-semibold tracking-[0.2em] text-neutral-400">{cell.label}</span>
				</div>
			{/each}
		</div>
	</div>
</section>
