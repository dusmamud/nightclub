<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import NewsCard from '#lib/components/NewsCard.svelte';
	import { reveal } from '#lib/actions/reveal';
	import { NEWS } from '#lib/data';
</script>

<Seo
	title="News — Night Club Glasgow"
	description="Latest news from Night Club Glasgow — new seasons, light upgrades and nights on the floor."
	path="/news/"
	image="/images/news-disco.jpg"
/>

<section class="mx-auto w-full max-w-[780px] px-4 pt-10 pb-16 md:pt-14">
	<h1 class="reveal font-condensed text-[2.6rem] font-bold tracking-wide uppercase md:text-[3.5rem]" use:reveal>
		Latest news
	</h1>
	<p class="mt-3 max-w-[34rem] text-sm leading-relaxed text-neutral-400">
		What is happening at the club — new seasons, new lights, and nights worth remembering.
	</p>
	<div class="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-x-10 md:gap-y-12">
		{#each NEWS as item, i (item.slug)}
			<div class="reveal" use:reveal style="transition-delay: {(i % 2) * 60}ms">
				<NewsCard {item} />
			</div>
		{/each}
	</div>
</section>
