<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import { reveal } from '#lib/actions/reveal';
	import { FAQS, PHONE, PHONE_HREF } from '#lib/data';
	import ChevronDown from '@lucide/svelte/icons/chevron-down';

	let openIndex = $state<number | null>(0);

	function toggle(i: number) {
		openIndex = openIndex === i ? null : i;
	}
</script>

<Seo
	title="FAQ & Entry Policy — Night Club Glasgow"
	description="Entry policy at Night Club Glasgow — age and ID, dress code, door times, refunds and safety. 18+ only."
	path="/faq/"
	image="/images/gallery-crowd.jpg"
/>

<section class="mx-auto w-full max-w-[780px] px-4 pt-10 pb-16 md:pt-14">
	<h1 class="reveal font-condensed text-[2.6rem] font-bold tracking-wide uppercase md:text-[3.5rem]" use:reveal>
		FAQ &amp; entry policy
	</h1>
	<p class="mt-3 max-w-[34rem] text-sm leading-relaxed text-neutral-400">
		Age and ID, dress code, door times, refunds and safety — the answers that stop arguments at the door.
	</p>

	<div class="mt-10 space-y-3">
		{#each FAQS as faq, i (faq.q)}
			<div class="reveal overflow-hidden rounded-xl border border-white/15 bg-panel" use:reveal style="transition-delay: {(i % 3) * 50}ms">
				<h2>
					<button
						type="button"
						aria-expanded={openIndex === i}
						aria-controls="faq-panel-{i}"
						onclick={() => toggle(i)}
						class="flex min-h-12 w-full items-center justify-between gap-4 px-5 py-3 text-left font-condensed text-lg font-semibold tracking-wide text-white uppercase"
					>
						{faq.q}
						<ChevronDown
							size={22}
							aria-hidden="true"
							class="shrink-0 text-pink transition-transform duration-200 {openIndex === i ? 'rotate-180' : ''}"
						/>
					</button>
				</h2>
				{#if openIndex === i}
					<p id="faq-panel-{i}" class="px-5 pb-5 text-sm leading-relaxed text-neutral-300">{faq.a}</p>
				{/if}
			</div>
		{/each}
	</div>

	<!-- Safety / welfare -->
	<section aria-labelledby="safety-heading" class="mt-14 rounded-2xl border border-pink/40 bg-pink/10 p-6">
		<h2 id="safety-heading" class="font-condensed text-2xl font-bold tracking-wide uppercase md:text-3xl">
			Safety &amp; welfare
		</h2>
		<p class="mt-3 text-sm leading-relaxed text-neutral-300">
			Everyone deserves a safe night out. Trained welfare staff are on the floor every night, and there is
			a quiet room if you need a break from the floor.
		</p>
		<ul class="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-neutral-300">
			<li>
				<strong class="text-white">Ask for Angela</strong> — go to the bar and ask for Angela. It is our
				code word for help, and staff will look after you discreetly, no questions asked.
			</li>
			<li>
				<strong class="text-white">Feeling unwell?</strong> Tell any member of staff or security. First
				aiders are on site every night.
			</li>
			<li>
				<strong class="text-white">Getting home:</strong> licensed taxis pick up on Marmora Road. Never
				leave with someone you do not trust, and keep your drink with you.
			</li>
			<li>
				<strong class="text-white">Harassment is not tolerated.</strong> Report it to staff and the
				person will be removed.
			</li>
		</ul>
		<p class="mt-4 text-sm leading-relaxed text-neutral-300">
			Still unsure? Call <a href={PHONE_HREF} class="text-pink hover:text-white">{PHONE}</a> before your
			night, or ask at the door.
		</p>
	</section>

	<p class="mt-10 text-xs leading-relaxed text-neutral-500">
		Placeholder policy wording — the real age, dress-code and refund rules are still to be confirmed by
		the club.
	</p>
</section>
