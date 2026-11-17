<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import { reveal } from '#lib/actions/reveal';
	import { PHONE, PHONE_HREF } from '#lib/data';
	import Check from '@lucide/svelte/icons/check';

	let name = $state('');
	let email = $state('');
	let occasion = $state('Birthday');
	let guests = $state(30);
	let date = $state('');
	let sent = $state(false);
	let errors = $state<{ name?: string; email?: string; date?: string }>({});

	function submit(e: SubmitEvent) {
		e.preventDefault();
		errors = {};
		if (name.trim().length < 2) errors.name = 'Please enter your name.';
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errors.email = 'Please enter a valid email address.';
		if (!date) errors.date = 'Please pick a date.';
		if (Object.keys(errors).length > 0) return;
		// Client-side only: no backend yet. The enquiry is acknowledged locally.
		sent = true;
	}
</script>

<Seo
	title="Private Hire — Night Club Glasgow"
	description="Hire Night Club Glasgow for birthdays, corporate nights and full buyouts. From-prices, packages and an enquiry form."
	path="/private-hire/"
	image="/images/gallery-vip.jpg"
/>

<section class="mx-auto w-full max-w-[780px] px-4 pt-10 pb-16 md:pt-14">
	<h1 class="reveal font-condensed text-[2.6rem] font-bold tracking-wide uppercase md:text-[3.5rem]" use:reveal>
		Private hire
	</h1>
	<p class="mt-3 max-w-[34rem] text-sm leading-relaxed text-neutral-400">
		Birthdays, corporate nights and full buyouts. Prices on the page, not "call for a quote" — pick a
		package and send an enquiry.
	</p>

	<div class="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
		{#each [{ name: 'Birthday package', price: 'From $800', desc: 'Reserved area, table and a bottle package for up to 20 guests.' }, { name: 'Corporate night', price: 'From $2,000', desc: 'Private bar area, DJ and AV for up to 100 guests.' }, { name: 'Full buyout', price: 'From $8,500', desc: 'The whole club, your night, your lineup — up to 400 guests.' }] as pkg, i (pkg.name)}
			<article class="reveal flex flex-col rounded-2xl border border-white/15 bg-panel p-5" use:reveal style="transition-delay: {i * 50}ms">
				<h2 class="font-condensed text-xl font-bold tracking-wide uppercase">{pkg.name}</h2>
				<p class="mt-2 font-display text-3xl text-pink">{pkg.price}</p>
				<p class="mt-2 text-sm leading-relaxed text-neutral-300">{pkg.desc}</p>
				<ul class="mt-4 space-y-2 text-sm text-neutral-300">
					<li class="flex items-start gap-2"><Check size={16} class="mt-0.5 shrink-0 text-pink" aria-hidden="true" /> Dedicated host on the night</li>
					<li class="flex items-start gap-2"><Check size={16} class="mt-0.5 shrink-0 text-pink" aria-hidden="true" /> Bar and bottle packages available</li>
					<li class="flex items-start gap-2"><Check size={16} class="mt-0.5 shrink-0 text-pink" aria-hidden="true" /> 18+ only, photo ID at the door</li>
				</ul>
			</article>
		{/each}
	</div>

	<p class="mt-4 text-xs leading-relaxed text-neutral-500">
		Placeholder from-prices — the real hire prices are still to be confirmed by the club.
	</p>

	<div class="reveal mt-12" use:reveal>
		{#if sent}
			<div class="rounded-xl border border-pink/50 bg-pink/10 p-6" role="status">
				<h2 class="font-condensed text-2xl font-bold tracking-wide uppercase">Enquiry received</h2>
				<p class="mt-2 text-sm leading-relaxed text-neutral-300">
					Thanks, {name.trim()} — your {occasion.toLowerCase()} enquiry for {date} ({guests} guests)
					has been noted. This is a demo for now: nothing was sent anywhere, so to confirm please call
					<a href={PHONE_HREF} class="text-pink hover:text-white">{PHONE}</a>.
				</p>
				<button
					type="button"
					class="btn-press mt-5 inline-flex min-h-12 items-center rounded-full border border-white/25 px-6 font-condensed text-sm font-bold tracking-[0.2em] uppercase transition-colors hover:border-pink hover:text-pink"
					onclick={() => {
						sent = false;
						name = '';
						email = '';
						date = '';
					}}
				>
					Send another enquiry
				</button>
			</div>
		{:else}
			<h2 class="font-condensed text-2xl font-bold tracking-wide uppercase md:text-3xl">Enquire about hire</h2>
			<form novalidate onsubmit={submit} class="mt-6 space-y-5" aria-label="Private hire enquiry form">
				<div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
					<div>
						<label for="hire-name" class="mb-1 block font-condensed text-sm font-bold tracking-widest uppercase">Your name</label>
						<input
							id="hire-name"
							name="name"
							type="text"
							autocomplete="name"
							bind:value={name}
							aria-invalid={errors.name ? 'true' : undefined}
							aria-describedby={errors.name ? 'hire-err-name' : undefined}
							class="min-h-12 w-full rounded-lg border border-white/20 bg-panel px-4 text-base text-white placeholder:text-neutral-500 focus:border-pink focus:outline-none"
							placeholder="Your name"
						/>
						{#if errors.name}<p id="hire-err-name" class="mt-1 text-sm text-pink">{errors.name}</p>{/if}
					</div>
					<div>
						<label for="hire-email" class="mb-1 block font-condensed text-sm font-bold tracking-widest uppercase">Email</label>
						<input
							id="hire-email"
							name="email"
							type="email"
							autocomplete="email"
							bind:value={email}
							aria-invalid={errors.email ? 'true' : undefined}
							aria-describedby={errors.email ? 'hire-err-email' : undefined}
							class="min-h-12 w-full rounded-lg border border-white/20 bg-panel px-4 text-base text-white placeholder:text-neutral-500 focus:border-pink focus:outline-none"
							placeholder="you@example.com"
						/>
						{#if errors.email}<p id="hire-err-email" class="mt-1 text-sm text-pink">{errors.email}</p>{/if}
					</div>
					<div>
						<label for="hire-occasion" class="mb-1 block font-condensed text-sm font-bold tracking-widest uppercase">Occasion</label>
						<select
							id="hire-occasion"
							name="occasion"
							bind:value={occasion}
							class="min-h-12 w-full rounded-lg border border-white/20 bg-panel px-4 text-base text-white focus:border-pink focus:outline-none"
						>
							<option>Birthday</option>
							<option>Corporate</option>
							<option>Full buyout</option>
							<option>Other celebration</option>
						</select>
					</div>
					<div>
						<label for="hire-date" class="mb-1 block font-condensed text-sm font-bold tracking-widest uppercase">Date</label>
						<input
							id="hire-date"
							name="date"
							type="date"
							min="2026-11-17"
							bind:value={date}
							aria-invalid={errors.date ? 'true' : undefined}
							aria-describedby={errors.date ? 'hire-err-date' : undefined}
							class="min-h-12 w-full rounded-lg border border-white/20 bg-panel px-4 text-base text-white focus:border-pink focus:outline-none [color-scheme:dark]"
						/>
						{#if errors.date}<p id="hire-err-date" class="mt-1 text-sm text-pink">{errors.date}</p>{/if}
					</div>
					<div>
						<label for="hire-guests" class="mb-1 block font-condensed text-sm font-bold tracking-widest uppercase">Guests</label>
						<input
							id="hire-guests"
							name="guests"
							type="number"
							min="10"
							max="400"
							bind:value={guests}
							class="min-h-12 w-full rounded-lg border border-white/20 bg-panel px-4 text-base text-white focus:border-pink focus:outline-none"
						/>
					</div>
				</div>
				<button
					type="submit"
					class="btn-press inline-flex min-h-12 items-center rounded-full bg-pink px-7 font-condensed text-sm font-bold tracking-[0.2em] text-white uppercase hover:bg-pink-dark"
				>
					Send enquiry
				</button>
				<p class="text-xs leading-relaxed text-neutral-500">
					Demo form — your enquiry is only acknowledged on this page and is not sent anywhere yet.
				</p>
			</form>
		{/if}
	</div>
</section>
