<script lang="ts">
	import { ADDRESS, PHONE, PHONE_HREF } from '#lib/data';
</script>

<footer class="relative overflow-hidden">
	<img
		src="/images/footer-crowd.jpg"
		alt=""
		width="1920"
		height="1280"
		loading="lazy"
		decoding="async"
		class="absolute inset-0 h-full w-full object-cover grayscale"
	/>
	<div class="absolute inset-0 bg-black/75"></div>
	<div class="relative mx-auto w-full max-w-[780px] px-4 py-10 md:py-14">
		<div class="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
			<div>
				<p class="font-display text-[2.4rem] leading-none tracking-wide md:text-[3rem]">
					<span class="text-white">NIGHT</span><span class="text-pink">CLUB</span>
				</p>
				<p class="mt-3 text-xs text-neutral-400">
					Night Club © 2015. <a href="/about/" class="underline hover:text-white">Privacy Policy</a>
				</p>
			</div>
			<div class="md:text-right">
				<p class="font-condensed text-sm font-semibold tracking-widest text-pink uppercase">
					{ADDRESS}
				</p>
				<p class="mt-2 font-condensed text-2xl font-bold tracking-wide text-white md:text-[1.75rem]">
					CALL US: <a href={PHONE_HREF} class="hover:text-pink">{PHONE}</a>
				</p>
				<nav aria-label="Footer" class="mt-4">
					<ul class="flex flex-wrap gap-x-5 gap-y-2 md:justify-end">
						<li><a href="/" class="font-condensed text-sm font-semibold tracking-widest text-neutral-300 hover:text-pink">HOME</a></li>
						<li><a href="/about/" class="font-condensed text-sm font-semibold tracking-widest text-neutral-300 hover:text-pink">ABOUT</a></li>
						<li><a href="/gallery/" class="font-condensed text-sm font-semibold tracking-widest text-neutral-300 hover:text-pink">GALLERY</a></li>
						<li><a href="/news/" class="font-condensed text-sm font-semibold tracking-widest text-neutral-300 hover:text-pink">NEWS</a></li>
						<li><a href="/contacts/" class="font-condensed text-sm font-semibold tracking-widest text-neutral-300 hover:text-pink">CONTACTS</a></li>
					</ul>
				</nav>
			</div>
		</div>
	</div>
</footer>
