// Motion helpers — Svelte transitions run on the Web Animations API, so the
// CSS `@media (prefers-reduced-motion)` rule does NOT disable them. Gate every
// svelte/transition use through these helpers instead.
export function motionAllowed(): boolean {
	if (typeof window === 'undefined') return true;
	return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Duration for a transition: full when motion is allowed, 0 when reduced.
export function motionDuration(ms: number): number {
	return motionAllowed() ? ms : 0;
}
