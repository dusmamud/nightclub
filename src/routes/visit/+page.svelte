<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import { reveal } from '#lib/actions/reveal';
	import { ADDRESS, OPENING_HOURS, PHONE, PHONE_HREF } from '#lib/data';
</script>

<Seo
	title="Visit us — venue info · Night Club Glasgow"
	description="Planning a night at Night Club Glasgow — doors, last entry, 18+ ID, dress code, cloakroom, accessibility and lost property. 4578 Marmora Road."
	path="/visit/"
	image="/images/gallery-dancefloor.jpg"
/>

<section class="mx-auto w-full max-w-[780px] px-4 pt-10 pb-16 md:pt-14">
	<h1 class="reveal font-condensed text-[2.6rem] font-bold tracking-wide uppercase md:text-[3.5rem]" use:reveal>
		Visit us
	</h1>
	<p class="mt-3 max-w-[34rem] text-sm leading-relaxed text-neutral-400">
		Everything about the night itself — when the doors open, what to bring, and how the club works once
		you are inside. {ADDRESS}.
	</p>

	<div class="mt-10 space-y-10">
		<div class="reveal" use:reveal>
			<h2 class="font-condensed text-2xl font-bold tracking-wide uppercase md:text-3xl">Your night, step by step</h2>
			<ol class="mt-4 space-y-2 text-sm leading-relaxed text-neutral-300">
				<li><span class="font-condensed font-bold tracking-widest text-pink uppercase">21:00</span> — Doors open. The bar is open from the start.</li>
				<li><span class="font-condensed font-bold tracking-widest text-pink uppercase">22:00</span> — First set. Headline set times are on each <a href="/events/" class="text-pink hover:text-white">event page</a>.</li>
				<li><span class="font-condensed font-bold tracking-widest text-pink uppercase">01:00</span> — Last entry. No entry after this, even with a ticket.</li>
				<li><span class="font-condensed font-bold tracking-widest text-pink uppercase">03:00 / 04:00</span> — Close: 03:00 on Thursday and Friday, 04:00 on Saturday.</li>
			</ol>
			<dl class="mt-4 space-y-1 text-sm text-neutral-300">
				{#each OPENING_HOURS as row (row.days)}
					<div class="flex justify-between gap-6 max-w-[22rem]"><dt>{row.days}</dt><dd>{row.hours}</dd></div>
				{/each}
			</dl>
		</div>

		<div class="reveal" use:reveal>
			<h2 class="font-condensed text-2xl font-bold tracking-wide uppercase md:text-3xl">Entry</h2>
			<ul class="mt-4 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-neutral-300">
				<li>18+ only, every night. Bring a valid photo ID — passport, driving licence or national ID card. No ID, no entry, even with a ticket.</li>
				<li>Smart night-out dress. No sportswear, no trainers, no caps. The door team has the final say.</li>
				<li>Bags may be searched at the door. Prohibited items are not allowed in — ask the door team if you are unsure about something.</li>
				<li>If you leave during the night, speak to the door team before coming back in.</li>
			</ul>
		</div>

		<div class="reveal" use:reveal>
			<h2 class="font-condensed text-2xl font-bold tracking-wide uppercase md:text-3xl">Inside the club</h2>
			<ul class="mt-4 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-neutral-300">
				<li>Cloakroom available on club nights — ask at the door. Reserved tables include free cloakroom (see the <a href="/vip/" class="text-pink hover:text-white">VIP page</a>).</li>
				<li>The bar takes card and cash. Table service is available on reserved tables.</li>
				<li>Seating: the main floor is standing, with reserved tables and booths around it.</li>
				<li>Smoking and vaping outside only — ask staff for the smoking area.</li>
				<li>Photos for personal use are fine. Professional cameras and filming need permission — ask in advance on the <a href="/contacts/" class="text-pink hover:text-white">contact form</a>.</li>
				<li>Wi-Fi is available in the club — ask a member of staff on the night.</li>
			</ul>
		</div>

		<div class="reveal" use:reveal>
			<h2 class="font-condensed text-2xl font-bold tracking-wide uppercase md:text-3xl">Getting here</h2>
			<p class="mt-4 text-sm leading-relaxed text-neutral-300">
				{ADDRESS}. Street parking on Marmora Road and a car park two minutes away. Licensed taxis pick up
				outside the door; the nearest bus stop is on Marmora Road.
			</p>
			<p class="mt-2 text-sm leading-relaxed text-neutral-300">
				Call <a href={PHONE_HREF} class="text-pink hover:text-white">{PHONE}</a> for table bookings.
			</p>
		</div>

		<div class="reveal" use:reveal>
			<h2 class="font-condensed text-2xl font-bold tracking-wide uppercase md:text-3xl">Accessibility</h2>
			<p class="mt-4 text-sm leading-relaxed text-neutral-300">
				The main entrance is step-free and there is an accessible toilet on the ground floor. The VIP
				mezzanine is reached by stairs only — tell us in advance on the contact form and we will reserve a
				ground-floor table.
			</p>
		</div>

		<div class="reveal" use:reveal>
			<h2 class="font-condensed text-2xl font-bold tracking-wide uppercase md:text-3xl">Lost property</h2>
			<p class="mt-4 text-sm leading-relaxed text-neutral-300">
				Lost something? Send a message on the <a href="/contacts/" class="text-pink hover:text-white">contact form</a>
				with the topic "Lost property" — tell us the night, where you were, and what the item looks like.
				Found items are held at the club; collect yours on a club night and bring ID.
			</p>
		</div>

		<p class="reveal text-xs leading-relaxed text-neutral-500" use:reveal>
			House rules are confirmed on the night by the door team — if anything on this page changes, what the
			door team says on the night stands. Safety notes are on the
			<a href="/safety/" class="text-pink hover:text-white">safety page</a>.
		</p>
	</div>
</section>
