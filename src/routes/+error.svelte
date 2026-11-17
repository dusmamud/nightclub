<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>{page.status} — Night Club Glasgow</title>
	<meta name="description" content="This page could not be found at Night Club Glasgow." />
	<meta name="robots" content="noindex" />
</svelte:head>

<section class="mx-auto w-full max-w-[780px] px-4 py-24 text-center md:py-32">
	<p class="font-display text-7xl text-pink md:text-8xl">{page.status}</p>
	<h1 class="mt-4 font-condensed text-3xl font-bold tracking-wide uppercase md:text-4xl">
		{page.status === 404 ? 'Page not found' : 'Something went wrong'}
	</h1>
	<p class="mx-auto mt-4 max-w-[26rem] text-sm leading-relaxed text-neutral-400">
		{page.status === 404
			? 'The page you are looking for is not here — it may have moved, or the address was typed wrong.'
			: 'An error stopped this page from loading. Please try again, or head back home.'}
	</p>
	<p class="mt-8 flex flex-wrap items-center justify-center gap-3">
		<a
			href="/"
			class="inline-flex min-h-12 items-center rounded-full bg-pink px-7 font-condensed text-sm font-bold tracking-[0.2em] text-white uppercase transition-colors hover:bg-pink-dark"
		>
			Back home
		</a>
		<a
			href="/events/"
			class="inline-flex min-h-12 items-center rounded-full border border-white/25 px-7 font-condensed text-sm font-bold tracking-[0.2em] text-white uppercase transition-colors hover:border-pink hover:text-pink"
		>
			See events
		</a>
	</p>
</section>
