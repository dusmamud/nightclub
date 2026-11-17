<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import { reveal } from '#lib/actions/reveal';
	import { EVENTS } from '#lib/data';

	let night = $state(EVENTS[0].slug);
	let name = $state('');
	let phone = $state('');
	let joined = $state(false);
	let errors = $state<{ name?: string; phone?: string; night?: string }>({});

	const selected = $derived(EVENTS.find((e) => e.slug === night) ?? EVENTS[0]);

	function submit(e: SubmitEvent) {
		e.preventDefault();
		errors = {};
		if (!night) errors.night = 'Please pick a night.';
		if (name.trim().length < 2) errors.name = 'Please enter your name.';
		if (phone.trim().replace(/[^0-9+]/g, '').length < 7) errors.phone = 'Please enter a phone number we can reach you on.';
		if (Object.keys(errors).length > 0) return;
		// Client-side only: no backend yet. The sign-up is acknowledged locally.
		joined = true;
	}
</script>

<Seo
	title="Guestlist — Night Club Glasgow"
	description="Join the guestlist at Night Club Glasgow — pick a night, leave your name and phone, and walk in before 23:00. Free entry, 18+ with ID."
	path="/guestlist/"
	image="/images/gallery-crowd.jpg"
/>

<section class="mx-auto w-full max-w-[780px] px-4 pt-10 pb-16 md:pt-14">
	<h1 class="reveal font-condensed text-[2.6rem] font-bold tracking-wide uppercase md:text-[3.5rem]" use:reveal>
		Guestlist
	</h1>
	<p class="mt-3 max-w-[34rem] text-sm leading-relaxed text-neutral-400">
		Free-list entry for a night of your choice. Pick the night, leave your name and phone, and turn up
		before 23:00 — your name is on the list at the door. No ticket needed, but entry is still 18+ with
		photo ID and subject to capacity.
	</p>

	<div class="reveal mt-10" use:reveal>
		{#if joined}
			<div class="rounded-xl border border-pink/50 bg-pink/10 p-6" role="status">
				<h2 class="font-condensed text-2xl font-bold tracking-wide uppercase">You're on the guestlist</h2>
				<p class="mt-2 text-sm leading-relaxed text-neutral-300">
					Thanks, {name.trim()} — you are on the list for {selected.title} on {selected.day}
					{selected.monthName}
					{selected.year}. Arrive before 23:00 and give your name at the door, with photo ID. This is a
					demo for now: nothing was sent anywhere, so your name is not really on a list yet.
				</p>
				<button
					type="button"
					class="btn-press mt-5 inline-flex min-h-12 items-center rounded-full border border-white/25 px-6 font-condensed text-sm font-bold tracking-[0.2em] uppercase transition-colors hover:border-pink hover:text-pink"
					onclick={() => {
						joined = false;
						name = '';
						phone = '';
					}}
				>
					Join another night
				</button>
			</div>
		{:else}
			<form novalidate onsubmit={submit} class="space-y-5" aria-label="Guestlist sign-up form">
				<div>
					<label for="guest-night" class="mb-1 block font-condensed text-sm font-bold tracking-widest uppercase">Pick a night</label>
					<select
						id="guest-night"
						name="night"
						bind:value={night}
						aria-invalid={errors.night ? 'true' : undefined}
						aria-describedby={errors.night ? 'guest-err-night' : undefined}
						class="min-h-12 w-full rounded-lg border border-white/20 bg-panel px-4 text-base text-white focus:border-pink focus:outline-none"
					>
						{#each EVENTS as ev (ev.slug)}
							<option value={ev.slug}>{ev.day} {ev.monthName} {ev.year} — {ev.title} · {ev.time}</option>
						{/each}
					</select>
					{#if errors.night}<p id="guest-err-night" class="mt-1 text-sm text-pink">{errors.night}</p>{/if}
				</div>
				<div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
					<div>
						<label for="guest-name" class="mb-1 block font-condensed text-sm font-bold tracking-widest uppercase">Your name</label>
						<input
							id="guest-name"
							name="name"
							type="text"
							autocomplete="name"
							bind:value={name}
							aria-invalid={errors.name ? 'true' : undefined}
							aria-describedby={errors.name ? 'guest-err-name' : undefined}
							class="min-h-12 w-full rounded-lg border border-white/20 bg-panel px-4 text-base text-white placeholder:text-neutral-500 focus:border-pink focus:outline-none"
							placeholder="Your name"
						/>
						{#if errors.name}<p id="guest-err-name" class="mt-1 text-sm text-pink">{errors.name}</p>{/if}
					</div>
					<div>
						<label for="guest-phone" class="mb-1 block font-condensed text-sm font-bold tracking-widest uppercase">Phone</label>
						<input
							id="guest-phone"
							name="phone"
							type="tel"
							autocomplete="tel"
							bind:value={phone}
							aria-invalid={errors.phone ? 'true' : undefined}
							aria-describedby={errors.phone ? 'guest-err-phone' : undefined}
							class="min-h-12 w-full rounded-lg border border-white/20 bg-panel px-4 text-base text-white placeholder:text-neutral-500 focus:border-pink focus:outline-none"
							placeholder="+44 …"
						/>
						{#if errors.phone}<p id="guest-err-phone" class="mt-1 text-sm text-pink">{errors.phone}</p>{/if}
					</div>
				</div>
				<button
					type="submit"
					class="btn-press inline-flex min-h-12 items-center rounded-full bg-pink px-7 font-condensed text-sm font-bold tracking-[0.2em] text-white uppercase hover:bg-pink-dark"
				>
					Join the guestlist
				</button>
				<p class="text-xs leading-relaxed text-neutral-500">
					Demo form — your sign-up is only acknowledged on this page and is not sent anywhere yet. We
					use your phone only to confirm the night. 18+ only, photo ID at the door, arrive before
					23:00.
				</p>
			</form>
		{/if}
	</div>

	<p class="mt-10 text-sm leading-relaxed text-neutral-400">
		Want a table instead? See <a href="/vip/" class="text-pink hover:text-white">VIP &amp; table booking</a>.
		Questions about entry? Read the <a href="/faq/" class="text-pink hover:text-white">FAQ &amp; entry policy</a>.
	</p>
</section>
