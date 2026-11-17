<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import { reveal } from '#lib/actions/reveal';
	import { ADDRESS, OPENING_HOURS, PHONE, PHONE_HREF } from '#lib/data';
	import MapPin from '@lucide/svelte/icons/map-pin';
	import Phone from '@lucide/svelte/icons/phone';
	import Clock from '@lucide/svelte/icons/clock';
	import Mail from '@lucide/svelte/icons/mail';

	let name = $state('');
	let email = $state('');
	let message = $state('');
	let sent = $state(false);
	let errors = $state<{ name?: string; email?: string; message?: string }>({});

	function submit(e: SubmitEvent) {
		e.preventDefault();
		errors = {};
		if (name.trim().length < 2) errors.name = 'Please enter your name.';
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errors.email = 'Please enter a valid email address.';
		if (message.trim().length < 10) errors.message = 'Please write at least a few words (10 characters).';
		if (Object.keys(errors).length > 0) return;
		// Client-side only: no backend yet. The message is acknowledged locally;
		// a real send needs the Go backend (same pattern as Kumbuild).
		sent = true;
	}
</script>

<Seo
	title="Contacts — Night Club Glasgow"
	description="Contact Night Club Glasgow — 4578 Marmora Road, Glasgow D04 89GR. Call (800) 2345-6789 or send a message."
	path="/contacts/"
	image="/images/footer-crowd.jpg"
/>

<section class="mx-auto w-full max-w-[780px] px-4 pt-10 pb-16 md:pt-14">
	<h1 class="reveal font-condensed text-[2.6rem] font-bold tracking-wide uppercase md:text-[3.5rem]" use:reveal>
		Contacts
	</h1>
	<p class="mt-3 max-w-[34rem] text-sm leading-relaxed text-neutral-400">
		Table bookings, private hire and everything else — call us or send a message.
	</p>

	<div class="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2">
		<div class="reveal space-y-6" use:reveal>
			<div class="flex items-start gap-4">
				<span class="flex min-h-11 min-w-11 items-center justify-center rounded-full bg-pink text-white"><MapPin size={22} aria-hidden="true" /></span>
				<div>
					<h2 class="font-condensed font-bold tracking-widest uppercase">Address</h2>
					<address class="mt-1 text-sm leading-relaxed text-neutral-300 not-italic">{ADDRESS}</address>
				</div>
			</div>
			<div class="flex items-start gap-4">
				<span class="flex min-h-11 min-w-11 items-center justify-center rounded-full bg-pink text-white"><Phone size={22} aria-hidden="true" /></span>
				<div>
					<h2 class="font-condensed font-bold tracking-widest uppercase">Phone</h2>
					<p class="mt-1 text-sm text-neutral-300">
						<a href={PHONE_HREF} class="text-white hover:text-pink">{PHONE}</a>
					</p>
				</div>
			</div>
			<div class="flex items-start gap-4">
				<span class="flex min-h-11 min-w-11 items-center justify-center rounded-full bg-pink text-white"><Clock size={22} aria-hidden="true" /></span>
				<div>
					<h2 class="font-condensed font-bold tracking-widest uppercase">Opening hours</h2>
					<dl class="mt-1 space-y-1 text-sm text-neutral-300">
						{#each OPENING_HOURS as row (row.days)}
							<div class="flex justify-between gap-6"><dt>{row.days}</dt><dd>{row.hours}</dd></div>
						{/each}
					</dl>
				</div>
			</div>
			<div class="flex items-start gap-4">
				<span class="flex min-h-11 min-w-11 items-center justify-center rounded-full bg-pink text-white"><Mail size={22} aria-hidden="true" /></span>
				<div>
					<h2 class="font-condensed font-bold tracking-widest uppercase">Email</h2>
					<p class="mt-1 text-sm text-neutral-300">
						<a href="mailto:hello@nightclub.example" class="text-white hover:text-pink">hello@nightclub.example</a>
					</p>
				</div>
			</div>

			<!-- Map placeholder: no real map embed until a provider/key is chosen -->
			<div
				class="flex min-h-[12rem] items-center justify-center rounded-xl border border-white/15 bg-coal px-4 text-center"
				role="img"
				aria-label="Map placeholder — Night Club, 4578 Marmora Road, Glasgow D04 89GR"
			>
				<p class="text-sm leading-relaxed text-neutral-400">
					Map coming soon<br />
					<span class="text-white">{ADDRESS}</span>
				</p>
			</div>
		</div>

		<div class="reveal" use:reveal>
			{#if sent}
				<div
					class="rounded-xl border border-pink/50 bg-pink/10 p-6"
					role="status"
					tabindex="-1"
				>
					<h2 class="font-condensed text-2xl font-bold tracking-wide uppercase">Message received</h2>
					<p class="mt-2 text-sm leading-relaxed text-neutral-300">
						Thanks, {name.trim()} — your message has been noted. This form is a demo for now: it does
						not send email yet, so for bookings please call us on
						<a href={PHONE_HREF} class="text-pink hover:text-white">{PHONE}</a>.
					</p>
					<button
						type="button"
						class="mt-5 inline-flex min-h-12 items-center rounded-full border border-white/25 px-6 font-condensed text-sm font-bold tracking-[0.2em] uppercase transition-colors hover:border-pink hover:text-pink"
						onclick={() => {
							sent = false;
							name = '';
							email = '';
							message = '';
						}}
					>
						Send another message
					</button>
				</div>
			{:else}
				<form novalidate onsubmit={submit} class="space-y-5" aria-label="Contact form">
					<div>
						<label for="contact-name" class="mb-1 block font-condensed text-sm font-bold tracking-widest uppercase">Your name</label>
						<input
							id="contact-name"
							name="name"
							type="text"
							autocomplete="name"
							bind:value={name}
							aria-invalid={errors.name ? 'true' : undefined}
							aria-describedby={errors.name ? 'err-name' : undefined}
							class="min-h-12 w-full rounded-lg border border-white/20 bg-panel px-4 text-base text-white placeholder:text-neutral-500 focus:border-pink focus:outline-none"
							placeholder="Your name"
						/>
						{#if errors.name}<p id="err-name" class="mt-1 text-sm text-pink">{errors.name}</p>{/if}
					</div>
					<div>
						<label for="contact-email" class="mb-1 block font-condensed text-sm font-bold tracking-widest uppercase">Email</label>
						<input
							id="contact-email"
							name="email"
							type="email"
							autocomplete="email"
							bind:value={email}
							aria-invalid={errors.email ? 'true' : undefined}
							aria-describedby={errors.email ? 'err-email' : undefined}
							class="min-h-12 w-full rounded-lg border border-white/20 bg-panel px-4 text-base text-white placeholder:text-neutral-500 focus:border-pink focus:outline-none"
							placeholder="you@example.com"
						/>
						{#if errors.email}<p id="err-email" class="mt-1 text-sm text-pink">{errors.email}</p>{/if}
					</div>
					<div>
						<label for="contact-message" class="mb-1 block font-condensed text-sm font-bold tracking-widest uppercase">Message</label>
						<textarea
							id="contact-message"
							name="message"
							rows="5"
							bind:value={message}
							aria-invalid={errors.message ? 'true' : undefined}
							aria-describedby={errors.message ? 'err-message' : undefined}
							class="w-full rounded-lg border border-white/20 bg-panel px-4 py-3 text-base text-white placeholder:text-neutral-500 focus:border-pink focus:outline-none"
							placeholder="Table for Friday, private hire, or anything else…"
						></textarea>
						{#if errors.message}<p id="err-message" class="mt-1 text-sm text-pink">{errors.message}</p>{/if}
					</div>
					<button
						type="submit"
						class="inline-flex min-h-12 items-center rounded-full bg-pink px-7 font-condensed text-sm font-bold tracking-[0.2em] text-white uppercase transition-colors hover:bg-pink-dark"
					>
						Send message
					</button>
					<p class="text-xs leading-relaxed text-neutral-500">
						Demo form — your message is only acknowledged on this page and is not emailed anywhere yet.
					</p>
				</form>
			{/if}
		</div>
	</div>
</section>
