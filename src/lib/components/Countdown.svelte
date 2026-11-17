<script lang="ts">
	import { onMount } from 'svelte';
	import { NEXT_EVENT } from '#lib/data';

	// Next event: 02 FEB 2027, doors 22:00 local time.
	const target = new Date(`${NEXT_EVENT.iso}T22:00:00`).getTime();

	let remaining = $state({ days: 0, hours: 0, minutes: 0, seconds: 0 });
	let live = $state(false);

	function tick() {
		const diff = Math.max(0, target - Date.now());
		remaining = {
			days: Math.floor(diff / 86_400_000),
			hours: Math.floor(diff / 3_600_000) % 24,
			minutes: Math.floor(diff / 60_000) % 60,
			seconds: Math.floor(diff / 1_000) % 60
		};
	}

	onMount(() => {
		live = true;
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

<section aria-label="Countdown to the next event" class="border-y border-white/10 bg-coal">
	<div class="mx-auto flex w-full max-w-[780px] flex-col items-center gap-4 px-4 py-6 text-center md:flex-row md:justify-between md:text-left">
		<div>
			<p class="font-condensed text-sm font-semibold tracking-[0.25em] text-pink uppercase">Next event</p>
			<p class="mt-1 font-condensed text-2xl font-bold tracking-wide uppercase md:text-3xl">
				{NEXT_EVENT.title}
			</p>
			<p class="mt-1 text-sm text-neutral-400">
				{NEXT_EVENT.day} {NEXT_EVENT.monthName} {NEXT_EVENT.year} · {NEXT_EVENT.time} · {NEXT_EVENT.price} · 18+
			</p>
		</div>
		<div class="flex gap-2 md:gap-3" role="timer" aria-live="off" aria-label="Time until the next event">
			{#each cells as cell (cell.label)}
				<div class="flex min-w-[4.25rem] flex-col items-center rounded-lg border border-white/10 bg-black px-2 py-2">
					<span class="font-display text-2xl text-white tabular-nums md:text-3xl" data-countdown={cell.label}>
						{live ? cell.value : '--'}
					</span>
					<span class="font-condensed text-[0.65rem] font-semibold tracking-[0.2em] text-neutral-400">{cell.label}</span>
				</div>
			{/each}
		</div>
	</div>
</section>
