<script lang="ts">
	import type { EventItem } from '#lib/data';
	import { ticketTiers } from '#lib/data';
	import Ticket from '@lucide/svelte/icons/ticket';

	let { event }: { event: EventItem } = $props();

	const tiers = $derived(ticketTiers(event));
	let tier = $state('General admission');
	let qty = $state(2);
	let name = $state('');
	let reserved = $state(false);
	let error = $state('');

	const selected = $derived(tiers.find((t) => t.name === tier) ?? tiers[1]);

	function reserve(e: SubmitEvent) {
		e.preventDefault();
		error = '';
		if (name.trim().length < 2) {
			error = 'Please enter your name.';
			return;
		}
		if (qty < 1 || qty > 10) {
			error = 'Please pick 1–10 tickets.';
			return;
		}
		reserved = true;
	}
</script>

<div class="rounded-2xl border border-white/15 bg-panel p-5 md:p-6">
	<h2 class="flex items-center gap-2 font-condensed text-xl font-bold tracking-wide uppercase">
		<Ticket size={22} class="text-pink" aria-hidden="true" /> Tickets
	</h2>
	<p class="mt-2 text-sm leading-relaxed text-neutral-400">
		Reserve tickets for this night. Client-side only for now — no payment is taken here; pay at the door
		or through the ticket platform once Dus confirms it.
	</p>

	{#if reserved}
		<div class="mt-5 rounded-xl border border-pink/50 bg-pink/10 p-5" role="status">
			<p class="font-condensed text-lg font-bold tracking-wide uppercase">Reserved — see you there</p>
			<p class="mt-1 text-sm leading-relaxed text-neutral-300">
				Thanks, {name.trim()} — {qty} × {selected.name} ({selected.price} each) for {event.title} on
				{event.day}
				{event.monthName}
				{event.year}. This is a demo reservation: nothing was booked or charged. Please bring ID — 18+ only.
			</p>
			<button
				type="button"
				class="btn-press mt-4 inline-flex min-h-12 items-center rounded-full border border-white/25 px-6 font-condensed text-sm font-bold tracking-[0.2em] uppercase transition-colors hover:border-pink hover:text-pink"
				onclick={() => {
					reserved = false;
					name = '';
				}}
			>
				Change reservation
			</button>
		</div>
	{:else}
		<form novalidate onsubmit={reserve} class="mt-5 space-y-4" aria-label="Reserve tickets">
			<fieldset>
				<legend class="font-condensed text-sm font-bold tracking-widest uppercase">Ticket tier</legend>
				<div class="mt-2 space-y-2">
					{#each tiers as t (t.name)}
						<label
							class="flex min-h-12 cursor-pointer items-center justify-between gap-3 rounded-lg border px-4 transition-colors {tier ===
							t.name
								? 'border-pink bg-pink/10'
								: 'border-white/15 hover:border-pink/60'}"
						>
							<span class="flex items-center gap-3">
								<input
									type="radio"
									name="tier"
									value={t.name}
									bind:group={tier}
									class="h-5 w-5 accent-[#ff1791]"
								/>
								<span>
									<span class="block text-sm font-semibold text-white">{t.name}</span>
									<span class="block text-xs text-neutral-400">{t.note}</span>
								</span>
							</span>
							<span class="font-condensed text-lg font-bold text-pink">{t.price}</span>
						</label>
					{/each}
				</div>
			</fieldset>
			<div class="grid grid-cols-2 gap-4">
				<div>
					<label for="ticket-qty" class="mb-1 block font-condensed text-sm font-bold tracking-widest uppercase">Tickets</label>
					<input
						id="ticket-qty"
						name="qty"
						type="number"
						min="1"
						max="10"
						bind:value={qty}
						class="min-h-12 w-full rounded-lg border border-white/20 bg-black px-4 text-base text-white focus:border-pink focus:outline-none"
					/>
				</div>
				<div>
					<label for="ticket-name" class="mb-1 block font-condensed text-sm font-bold tracking-widest uppercase">Your name</label>
					<input
						id="ticket-name"
						name="name"
						type="text"
						autocomplete="name"
						bind:value={name}
						aria-invalid={error ? 'true' : undefined}
						placeholder="Your name"
						class="min-h-12 w-full rounded-lg border border-white/20 bg-black px-4 text-base text-white placeholder:text-neutral-500 focus:border-pink focus:outline-none"
					/>
				</div>
			</div>
			{#if error}<p class="text-sm text-pink" role="alert">{error}</p>{/if}
			<button
				type="submit"
				class="btn-press inline-flex min-h-12 items-center rounded-full bg-pink px-7 font-condensed text-sm font-bold tracking-[0.2em] text-white uppercase hover:bg-pink-dark"
			>
				Reserve tickets
			</button>
			<p class="text-xs leading-relaxed text-neutral-500">
				Demo — your reservation is only shown on this page. 18+ only, photo ID at the door.
			</p>
		</form>
	{/if}
</div>
