// Pointer tilt for cards: a subtle rotateX/rotateY following a fine pointer.
// Transform only, desktop-only (pointer: fine), and fully off under
// prefers-reduced-motion or on touch. Resets on pointer leave.
export function tilt(node: HTMLElement, maxDeg = 4) {
	if (typeof window === 'undefined') return;
	if (!window.matchMedia('(pointer: fine)').matches) return;
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

	node.style.transformStyle = 'preserve-3d';

	function onMove(e: PointerEvent) {
		const r = node.getBoundingClientRect();
		const x = (e.clientX - r.left) / r.width - 0.5;
		const y = (e.clientY - r.top) / r.height - 0.5;
		node.style.transform = `perspective(700px) rotateY(${(x * maxDeg).toFixed(2)}deg) rotateX(${(-y * maxDeg).toFixed(2)}deg)`;
	}
	function onLeave() {
		node.style.transform = '';
	}

	node.addEventListener('pointermove', onMove);
	node.addEventListener('pointerleave', onLeave);
	return {
		destroy() {
			node.removeEventListener('pointermove', onMove);
			node.removeEventListener('pointerleave', onLeave);
			node.style.transform = '';
		}
	};
}
