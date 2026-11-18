// Responsive-image variants for the plain <img> stack.
//
// Each entry lists the resized variants that exist on disk for one original
// (generated with sharp, mozjpeg q75, progressive — the same encoder and
// settings as the audit-3 recompression pass). `src` always stays the
// original file: it is both the largest variant and the fallback, so a
// browser without srcset support renders exactly what it rendered before.
// `sizes` is NOT set here — it is per <img> tag, because the same file is
// shown at different display widths in different places (e.g. gallery-vip
// is a 212px circle in EventCard and a 239px grid thumb in Gallery).
//
// Variant widths were chosen from measured display sizes (390/768/1440,
// DPR 1 and 2 — see shot-tools/nightclub/audit-3/responsive-images/):
//   circles 128–212px  -> 450w covers DPR2 (212*2=424); DPR3+ uses the original
//   grid thumbs 229–358px -> 400w (DPR1) / 800w (DPR2); lightbox 768px -> 800w (DPR1)
//   full-width backgrounds -> 400w (DPR1 phone) / 800w (DPR2 phone, DPR1 tablet)
//                             / 1200w (DPR1 801–1200px viewport)
// No WebP/AVIF in this pass: that needs <picture> + fallback verification.

const VARIANTS: Record<string, { full: number; widths: number[] }> = {
	// 800x800 circle images
	'event-1.jpg': { full: 800, widths: [450] },
	'event-2.jpg': { full: 800, widths: [450] },
	'event-3.jpg': { full: 800, widths: [450] },
	'news-dancer.jpg': { full: 800, widths: [450] },
	'news-disco.jpg': { full: 800, widths: [450] },
	'news-dj.jpg': { full: 800, widths: [450] },
	'news-friends.jpg': { full: 800, widths: [450] },
	// 1600x1067 grid images (vip + cocktails also appear as EventCard circles,
	// djbooth + lights also as NewsCard circles — hence the 400/450 widths)
	'gallery-vip.jpg': { full: 1600, widths: [400, 450, 800] },
	'gallery-cocktails.jpg': { full: 1600, widths: [400, 450, 800] },
	'gallery-crowd.jpg': { full: 1600, widths: [400, 800] },
	'gallery-dancefloor.jpg': { full: 1600, widths: [400, 800] },
	'gallery-djbooth.jpg': { full: 1600, widths: [400, 800] },
	'gallery-lights.jpg': { full: 1600, widths: [400, 800] },
	// 1600x1067 full-viewport-width backgrounds
	'hero-crowd.jpg': { full: 1600, widths: [400, 800, 1200] },
	'news-bokeh.jpg': { full: 1600, widths: [400, 800, 1200] },
	'footer-crowd.jpg': { full: 1600, widths: [400, 800, 1200] },
	'plunge-dj.jpg': { full: 1600, widths: [400, 800, 1200] }
};

export function srcsetFor(src: string): string | undefined {
	const name = src.split('/').pop();
	const entry = name ? VARIANTS[name] : undefined;
	if (!entry) return undefined;
	const base = src.replace(/\.jpg$/, '');
	const parts = entry.widths.map((w) => `${base}-${w}.jpg ${w}w`);
	parts.push(`${src} ${entry.full}w`);
	return parts.join(', ');
}
