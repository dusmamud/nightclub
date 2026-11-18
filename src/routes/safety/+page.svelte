<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import { reveal } from '#lib/actions/reveal';
	import { PHONE, PHONE_HREF } from '#lib/data';
</script>

<Seo
	title="Safety & welfare · Night Club Glasgow"
	description="Staying safe at Night Club Glasgow — Ask for Angela, welfare staff on the floor every night, a quiet room, and how to report something."
	path="/safety/"
	image="/images/gallery-crowd.jpg"
/>

<section class="mx-auto w-full max-w-[780px] px-4 pt-10 pb-16 md:pt-14">
	<h1 class="reveal font-condensed text-[2.6rem] font-bold tracking-wide uppercase md:text-[3.5rem]" use:reveal>
		Safety &amp; welfare
	</h1>
	<p class="mt-3 max-w-[34rem] text-sm leading-relaxed text-neutral-400">
		Nobody should have to worry about their night out. If something feels wrong — for you or for someone
		else — tell us. Staff will look after you discreetly, without making a scene.
	</p>

	<div class="mt-10 space-y-10">
		<div class="reveal" use:reveal>
			<h2 class="font-condensed text-2xl font-bold tracking-wide uppercase md:text-3xl">Ask for Angela</h2>
			<p class="mt-4 text-sm leading-relaxed text-neutral-300">
				Go to the bar and ask for Angela. That is our code word for help — staff will know you need
				support and will look after you discreetly, whether that means getting you away from someone,
				calling you a taxi, or finding a quiet place to sit.
			</p>
		</div>

		<div class="reveal" use:reveal>
			<h2 class="font-condensed text-2xl font-bold tracking-wide uppercase md:text-3xl">Welfare on the floor</h2>
			<p class="mt-4 text-sm leading-relaxed text-neutral-300">
				Trained welfare staff are on the floor every night, and there is a quiet room if you need a break
				from the music and the crowd. If you feel unwell, ask any member of staff for water and a place to
				sit — do not try to push through it on the dance floor.
			</p>
		</div>

		<div class="reveal" use:reveal>
			<h2 class="font-condensed text-2xl font-bold tracking-wide uppercase md:text-3xl">Report something</h2>
			<ul class="mt-4 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-neutral-300">
				<li>On the night: tell any member of staff, or go to the bar and ask for Angela.</li>
				<li>Afterwards: send a message on the <a href="/contacts/" class="text-pink hover:text-white">contact form</a> with the topic "Safety concern" — tell us the night, what happened, and the best way to reach you.</li>
				<li>Reports are taken seriously and kept private. You will not be asked to repeat the details to more people than necessary.</li>
			</ul>
		</div>

		<div class="reveal" use:reveal>
			<h2 class="font-condensed text-2xl font-bold tracking-wide uppercase md:text-3xl">Consent</h2>
			<p class="mt-4 text-sm leading-relaxed text-neutral-300">
				No means no. Unwanted touching, following someone around the floor, or pressuring someone to drink
				or dance is not welcome here — staff will step in, and anyone who will not stop will be asked to
				leave. Look out for each other: if a friend looks uncomfortable, check in with them.
			</p>
		</div>

		<div class="reveal" use:reveal>
			<h2 class="font-condensed text-2xl font-bold tracking-wide uppercase md:text-3xl">Emergencies</h2>
			<p class="mt-4 text-sm leading-relaxed text-neutral-300">
				If you feel unsafe right now, go to the bar or to any member of staff — do not wait. For anything
				urgent after the night, call us on <a href={PHONE_HREF} class="text-pink hover:text-white">{PHONE}</a>.
			</p>
			<p class="mt-3 text-sm leading-relaxed text-neutral-300">
				Venue details — doors, entry rules, accessibility — are on the
				<a href="/visit/" class="text-pink hover:text-white">venue info page</a>. Entry questions are
				answered on the <a href="/faq/" class="text-pink hover:text-white">FAQ page</a>.
			</p>
		</div>
	</div>
</section>
