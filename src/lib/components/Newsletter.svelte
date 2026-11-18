<script lang="ts">
	// Newsletter signup — client-side only demo (no backend yet, same pattern
	// as the contact form). Validates the email, then shows a success state.
	// `compact` hides the disclaimer line so the form fits one slim footer row.
	let { idPrefix = 'newsletter', compact = false }: { idPrefix?: string; compact?: boolean } = $props();

	let email = $state('');
	let done = $state(false);
	let error = $state('');
	const inputId = $derived(`${idPrefix}-email`);
	const errorId = $derived(`${idPrefix}-error`);

	function submit(e: SubmitEvent) {
		e.preventDefault();
		error = '';
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
			error = 'Please enter a valid email address.';
			return;
		}
		done = true;
	}
</script>

{#if done}
	<div class="rounded-xl border border-pink/50 bg-pink/10 p-5" role="status">
		<p class="font-condensed text-lg font-bold tracking-wide text-white uppercase">You're on the list</p>
		<p class="mt-1 text-sm leading-relaxed text-neutral-300">
			Thanks — we will email {email.trim()} about the next nights. This is a demo for now: nothing is
			sent anywhere yet.
		</p>
	</div>
{:else}
	<form novalidate onsubmit={submit} aria-label="Newsletter signup" class="flex gap-2 {compact ? 'flex-row' : 'flex-col sm:flex-row'}">
		<label for={inputId} class="sr-only">Email address</label>
		<input
			id={inputId}
			name="email"
			type="email"
			autocomplete="email"
			bind:value={email}
			aria-invalid={error ? 'true' : undefined}
			aria-describedby={error ? errorId : undefined}
			class="min-h-12 min-w-0 flex-1 rounded-full border border-white/20 bg-panel px-5 text-base text-white placeholder:text-neutral-500 focus:border-pink focus:outline-none"
			placeholder="Your email address"
		/>
		<button
			type="submit"
			class="btn-press inline-flex min-h-12 shrink-0 items-center justify-center rounded-full bg-pink px-7 font-condensed text-sm font-bold tracking-[0.2em] text-white uppercase hover:bg-pink-dark"
		>
			Subscribe
		</button>
	</form>
	{#if error}<p id={errorId} class="mt-2 text-sm text-pink">{error}</p>{/if}
	{#if !compact}
		<p class="mt-2 text-xs leading-relaxed text-neutral-500">
			One email a week, about the next nights. No spam, unsubscribe anytime. Demo — nothing is sent yet.
		</p>
	{/if}
{/if}
