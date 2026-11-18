// IntersectionObserver reveal action.
// Only arms the hidden state when the user allows motion; otherwise the
// element stays in its final (visible) state. Elements already in view
// reveal immediately; once visible the observer disconnects.
//
// NOTE: the hidden state lives on the OBSERVED node itself (opacity +
// translate). Never put a clip-path hidden state on the observed node:
// IntersectionObserver counts a fully clip-path-hidden element as never
// intersecting, so it would never reveal (deadlock). For a clip-path sweep,
// put .clip-img on an INNER element — see app.css.
export function reveal(node: HTMLElement) {
	if (typeof window === 'undefined') return;
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
	node.classList.add('reveal-armed');
	const io = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					node.classList.add('is-visible');
					io.disconnect();
				}
			}
		},
		// Low threshold + a trigger zone that starts 120px before the element
		// enters the viewport: fast scrolling (Page Down, End key, anchor
		// jumps) must not skip a reveal and leave a section hidden.
		{ threshold: 0.05, rootMargin: '0px 0px 120px 0px' }
	);
	io.observe(node);
	return {
		destroy() {
			io.disconnect();
		}
	};
}
