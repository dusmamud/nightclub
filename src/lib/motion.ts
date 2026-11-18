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

// Motion tokens — single source of truth (Mizu scale, adopted round 3):
// press feedback 100ms, hover/color/exits 160ms, state changes 240ms,
// sheets/dialogs 360ms, reveals 560ms. Exits are shorter than entrances.
export const MOTION = {
	press: 100,
	hover: 160,
	state: 240,
	sheet: 360,
	reveal: 560
} as const;
