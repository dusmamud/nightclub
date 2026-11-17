<script lang="ts">
	import { EVENTS } from '#lib/data';

	// Decorative strip of the next few nights. The list is duplicated so the
	// marquee can loop seamlessly; the copy is aria-hidden.
	const items = EVENTS.slice(0, 5).map(
		(e) => `${e.day} ${e.month} — ${e.title} · ${e.time} · ${e.price}`
	);
</script>

<div class="ticker overflow-hidden border-y border-pink/30 bg-[#14060d] py-2.5" aria-label="Upcoming nights">
	<div class="ticker-track flex w-max items-center gap-8 whitespace-nowrap">
		{#each [0, 1] as copy (copy)}
			<span class="flex items-center gap-8" aria-hidden={copy === 1}>
				{#each items as item, i (i)}
					<span class="flex items-center gap-8">
						<span class="font-condensed text-sm font-semibold tracking-[0.2em] text-white uppercase">{item}</span>
						<span class="text-pink" aria-hidden="true">✦</span>
					</span>
				{/each}
			</span>
		{/each}
	</div>
</div>
