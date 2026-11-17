// IntersectionObserver reveal action.
// Only arms the hidden state when the user allows motion; otherwise the
// element stays in its final (visible) state. Elements already in view
// reveal immediately; once visible the observer disconnects.
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
		{ threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
	);
	io.observe(node);
	return {
		destroy() {
			io.disconnect();
		}
	};
}
