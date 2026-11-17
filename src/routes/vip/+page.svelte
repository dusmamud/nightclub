<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import { reveal } from '#lib/actions/reveal';
	import { TABLE_TIERS, PHONE, PHONE_HREF } from '#lib/data';
	import Check from '@lucide/svelte/icons/check';

	let tier = $state(TABLE_TIERS[1].slug);
	let name = $state('');
	let phone = $state('');
	let date = $state('');
	let party = $state(4);
	let message = $state('');
	let sent = $state(false);
	let errors = $state<{ name?: string; phone?: string; date?: string; party?: string }>({});

	const selected = $derived(TABLE_TIERS.find((t) => t.slug === tier) ?? TABLE_TIERS[1]);

	function submit(e: SubmitEvent) {
		e.preventDefault();
		errors = {};
		if (name.trim().length < 2) errors.name = 'Please enter your name.';
		if (phone.trim().replace(/[^0-9+]/g, '').length < 7) errors.phone = 'Please enter a phone number we can reach you on.';
		if (!date) errors.date = 'Please pick a night.';
		if (party < 1 || party > 12) errors.party = 'Party size is 1–12 guests.';
		if (Object.keys(errors).length > 0) return;
		// Client-side only: no backend yet. The request is acknowledged locally.
		sent = true;
	}
</script>

<Seo
	title="VIP & Table Booking — Night Club Glasgow"
	description="Book a VIP table at Night Club Glasgow — table tiers, minimum spends and deposits. Reserved tables, booths and the premium lounge."
	path="/vip/"
	image="/images/gallery-vip.jpg"
/>

<section class="mx-auto w-full max-w-[780px] px-4 pt-10 pb-16 md:pt-14">
	<h1 class="reveal font-condensed text-[2.6rem] font-bold tracking-wide uppercase md:text-[3.5rem]" use:reveal>
		VIP &amp; table booking
	</h1>
	<p class="mt-3 max-w-[34rem] text-sm leading-relaxed text-neutral-400">
		Reserved tables, booths and the premium lounge — pick a tier, send a request, and we confirm by phone.
		Minimum spends and deposits are shown with each tier.
	</p>

	<div class="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
		{#each TABLE_TIERS as t, i (t.slug)}
			<article
				class="reveal flex flex-col rounded-2xl border p-5 {tier === t.slug
					? 'border-pink bg-pink/10'
					: 'border-white/15 bg-panel'}"
				use:reveal
				style="transition-delay: {i * 50}ms"
			>
				<h2 class="font-condensed text-xl font-bold tracking-wide uppercase">{t.name}</h2>
				<p class="mt-2 font-display text-3xl text-pink">{t.minimum}</p>
				<p class="mt-1 text-sm text-neutral-400">minimum spend · {t.seats}</p>
				<p class="mt-1 text-sm text-neutral-400">{t.deposit} — taken off your spend on the night</p>
				<ul class="mt-4 space-y-2 text-sm text-neutral-300">
					{#each t.perks as perk (perk)}
						<li class="flex items-start gap-2">
							<Check size={16} class="mt-0.5 shrink-0 text-pink" aria-hidden="true" /> {perk}
						</li>
					{/each}
				</ul>
				<button
					type="button"
					aria-pressed={tier === t.slug}
					onclick={() => (tier = t.slug)}
					class="btn-press mt-5 inline-flex min-h-12 items-center justify-center rounded-full font-condensed text-sm font-bold tracking-[0.2em] uppercase {tier ===
					t.slug
						? 'bg-pink text-white'
						: 'border border-white/25 text-white hover:border-pink hover:text-pink'}"
				>
					{tier === t.slug ? 'Selected' : 'Select this tier'}
				</button>
			</article>
		{/each}
	</div>

	<p class="mt-4 text-xs leading-relaxed text-neutral-500">
		Placeholder prices — the real minimums and deposits are still to be confirmed by the club.
	</p>

	<div class="reveal mt-12" use:reveal>
		{#if sent}
			<div class="rounded-xl border border-pink/50 bg-pink/10 p-6" role="status">
				<h2 class="font-condensed text-2xl font-bold tracking-wide uppercase">Request received</h2>
				<p class="mt-2 text-sm leading-relaxed text-neutral-300">
					Thanks, {name.trim()} — your request for the {selected.name} on {date} for {party}
					guest{party === 1 ? '' : 's'} has been noted. This is a demo for now: nothing was sent
					anywhere, so to confirm please call us on
					<a href={PHONE_HREF} class="text-pink hover:text-white">{PHONE}</a>.
				</p>
				<button
					type="button"
					class="btn-press mt-5 inline-flex min-h-12 items-center rounded-full border border-white/25 px-6 font-condensed text-sm font-bold tracking-[0.2em] uppercase transition-colors hover:border-pink hover:text-pink"
					onclick={() => {
						sent = false;
						name = '';
						phone = '';
						date = '';
						message = '';
					}}
				>
					Make another request
				</button>
			</div>
		{:else}
			<h2 class="font-condensed text-2xl font-bold tracking-wide uppercase md:text-3xl">Request a table</h2>
			<form novalidate onsubmit={submit} class="mt-6 space-y-5" aria-label="VIP table booking form">
				<div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
					<div>
						<label for="vip-name" class="mb-1 block font-condensed text-sm font-bold tracking-widest uppercase">Your name</label>
						<input
							id="vip-name"
							name="name"
							type="text"
							autocomplete="name"
							bind:value={name}
							aria-invalid={errors.name ? 'true' : undefined}
							aria-describedby={errors.name ? 'vip-err-name' : undefined}
							class="min-h-12 w-full rounded-lg border border-white/20 bg-panel px-4 text-base text-white placeholder:text-neutral-500 focus:border-pink focus:outline-none"
							placeholder="Your name"
						/>
						{#if errors.name}<p id="vip-err-name" class="mt-1 text-sm text-pink">{errors.name}</p>{/if}
					</div>
					<div>
						<label for="vip-phone" class="mb-1 block font-condensed text-sm font-bold tracking-widest uppercase">Phone</label>
						<input
							id="vip-phone"
							name="phone"
							type="tel"
							autocomplete="tel"
							bind:value={phone}
							aria-invalid={errors.phone ? 'true' : undefined}
							aria-describedby={errors.phone ? 'vip-err-phone' : undefined}
							class="min-h-12 w-full rounded-lg border border-white/20 bg-panel px-4 text-base text-white placeholder:text-neutral-500 focus:border-pink focus:outline-none"
							placeholder="+44 …"
						/>
						{#if errors.phone}<p id="vip-err-phone" class="mt-1 text-sm text-pink">{errors.phone}</p>{/if}
					</div>
					<div>
						<label for="vip-date" class="mb-1 block font-condensed text-sm font-bold tracking-widest uppercase">Night</label>
						<input
							id="vip-date"
							name="date"
							type="date"
							min="2026-11-17"
							bind:value={date}
							aria-invalid={errors.date ? 'true' : undefined}
							aria-describedby={errors.date ? 'vip-err-date' : undefined}
							class="min-h-12 w-full rounded-lg border border-white/20 bg-panel px-4 text-base text-white focus:border-pink focus:outline-none [color-scheme:dark]"
						/>
						{#if errors.date}<p id="vip-err-date" class="mt-1 text-sm text-pink">{errors.date}</p>{/if}
					</div>
					<div>
						<label for="vip-party" class="mb-1 block font-condensed text-sm font-bold tracking-widest uppercase">Party size</label>
						<input
							id="vip-party"
							name="party"
							type="number"
							min="1"
							max="12"
							bind:value={party}
							aria-invalid={errors.party ? 'true' : undefined}
							aria-describedby={errors.party ? 'vip-err-party' : undefined}
							class="min-h-12 w-full rounded-lg border border-white/20 bg-panel px-4 text-base text-white focus:border-pink focus:outline-none"
						/>
						{#if errors.party}<p id="vip-err-party" class="mt-1 text-sm text-pink">{errors.party}</p>{/if}
					</div>
				</div>
				<div>
					<label for="vip-tier" class="mb-1 block font-condensed text-sm font-bold tracking-widest uppercase">Table tier</label>
					<select
						id="vip-tier"
						name="tier"
						bind:value={tier}
						class="min-h-12 w-full rounded-lg border border-white/20 bg-panel px-4 text-base text-white focus:border-pink focus:outline-none"
					>
						{#each TABLE_TIERS as t (t.slug)}
							<option value={t.slug}>{t.name} — {t.minimum} · {t.seats}</option>
						{/each}
					</select>
				</div>
				<div>
					<label for="vip-message" class="mb-1 block font-condensed text-sm font-bold tracking-widest uppercase">Anything else? <span class="font-normal text-neutral-500 normal-case">(optional)</span></label>
					<textarea
						id="vip-message"
						name="message"
						rows="3"
						bind:value={message}
						class="w-full rounded-lg border border-white/20 bg-panel px-4 py-3 text-base text-white placeholder:text-neutral-500 focus:border-pink focus:outline-none"
						placeholder="Birthday, bottle requests, access needs…"
					></textarea>
				</div>
				<button
					type="submit"
					class="btn-press inline-flex min-h-12 items-center rounded-full bg-pink px-7 font-condensed text-sm font-bold tracking-[0.2em] text-white uppercase hover:bg-pink-dark"
				>
					Request this table
				</button>
				<p class="text-xs leading-relaxed text-neutral-500">
					Demo form — your request is only acknowledged on this page and is not sent anywhere yet.
					Deposits are taken off your minimum spend on the night; cancel 48 hours ahead for a refund.
					18+ only, photo ID at the door.
				</p>
			</form>
		{/if}
	</div>

	<p class="mt-10 text-sm leading-relaxed text-neutral-400">
		Prefer to talk? Call <a href={PHONE_HREF} class="text-pink hover:text-white">{PHONE}</a>. See the
		rooms first on the <a href="/about/#rooms" class="text-pink hover:text-white">About page</a>, or check
		the <a href="/drinks/" class="text-pink hover:text-white">drinks &amp; bottle menu</a>.
	</p>
</section>
