// Responsive-image variants for the plain <img> stack, plus WebP/AVIF
// variants served through <picture> (see below).
//
// Each entry lists the resized variants that exist on disk for one original
// (JPEG: sharp, mozjpeg q75, progressive — the same encoder and settings as
// the audit-3 recompression pass; WebP: sharp q75, effort 6; AVIF: sharp
// q56, effort 4 — the Malte Ubl mapping for JPEG q75, verified on these
// photos: AVIF mean-abs-diff vs the same-width JPEG is equal or smaller
// than WebP's, at ~34% fewer bytes overall). `src` always stays the
// original file: it is both the largest variant and the fallback, so a
// browser without srcset support renders exactly what it rendered before.
// `sizes` is NOT set here — it is per <img>/<source> tag, because the same
// file is shown at different display widths in different places (e.g.
// gallery-vip is a 212px circle in EventCard and a 239px grid thumb in
// Gallery).
//
// Variant widths were chosen from measured display sizes (390/768/1440,
// DPR 1 and 2 — see shot-tools/nightclub/audit-3/responsive-images/):
//   circles 128–212px  -> 250w covers DPR1 (212px); 450w covers DPR2 (212*2=424);
//                           DPR3+ uses the original
//   grid thumbs 229–358px -> 400w (DPR1) / 800w (DPR2); lightbox 768px -> 800w (DPR1)
//   full-width backgrounds -> 400w (DPR1 phone) / 800w (DPR2 phone, DPR1 tablet)
//                             / 1200w (DPR1 801–1200px viewport)
//
// WebP/AVIF: only the 10 files below have modern-format variants on disk
// (the 4 full-width backgrounds + the 6 gallery images —
// audit-3/webp-avif). Circle thumbnails (event-*/news-*) are JPEG-only by
// design; srcsetFor(..., 'webp' | 'avif') returns undefined for them, so a
// <picture> for a circle must not be built from this helper.

const VARIANTS: Record<string, { full: number; widths: number[] }> = {
	// 800x800 circle images
	'event-1.jpg': { full: 800, widths: [250, 450] },
	'event-2.jpg': { full: 800, widths: [250, 450] },
	'event-3.jpg': { full: 800, widths: [250, 450] },
	'news-dancer.jpg': { full: 800, widths: [250, 450] },
	'news-disco.jpg': { full: 800, widths: [250, 450] },
	'news-dj.jpg': { full: 800, widths: [250, 450] },
	'news-friends.jpg': { full: 800, widths: [250, 450] },
	// 1600x1067 grid images (vip + cocktails also appear as EventCard circles,
	// djbooth + lights also as NewsCard circles — hence the 400/450 widths)
	'gallery-vip.jpg': { full: 1600, widths: [250, 400, 450, 800] },
	'gallery-cocktails.jpg': { full: 1600, widths: [250, 400, 450, 800] },
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

export type ImageFormat = 'jpg' | 'webp' | 'avif';

// The 10 files that have WebP/AVIF variants on disk, mirroring the JPEG
// variant widths exactly (same source, same resize, same widths; the
// full-width variant is <base>.webp / <base>.avif). Every other file in
// VARIANTS is JPEG-only — asking for 'webp'/'avif' for one returns
// undefined, so a <picture> built from this helper can never point at a
// file that does not exist.
const MODERN_FORMATS: Record<string, true> = {
	'hero-crowd.jpg': true,
	'news-bokeh.jpg': true,
	'footer-crowd.jpg': true,
	'plunge-dj.jpg': true,
	'gallery-vip.jpg': true,
	'gallery-cocktails.jpg': true,
	'gallery-crowd.jpg': true,
	'gallery-dancefloor.jpg': true,
	'gallery-djbooth.jpg': true,
	'gallery-lights.jpg': true
};

export function srcsetFor(src: string, format: ImageFormat = 'jpg'): string | undefined {
	const name = src.split('/').pop();
	const entry = name ? VARIANTS[name] : undefined;
	if (!entry) return undefined;
	if (format !== 'jpg' && !(name && MODERN_FORMATS[name])) return undefined;
	const base = src.replace(/\.jpg$/, '');
	const ext = format === 'jpg' ? 'jpg' : format;
	const parts = entry.widths.map((w) => `${base}-${w}.${ext} ${w}w`);
	parts.push(`${base}.${ext} ${entry.full}w`);
	return parts.join(', ');
}

// Both modern-format srcsets for one <picture>: AVIF first (the browser
// takes the first <source> whose type it supports), WebP second, JPEG
// stays on the <img> as the universal fallback. Returns undefined when
// the file has no modern-format variants — the caller must then keep the
// plain <img> (no <picture>).
export function pictureSrcsets(src: string): { avif: string; webp: string } | undefined {
	const avif = srcsetFor(src, 'avif');
	const webp = srcsetFor(src, 'webp');
	if (!avif || !webp) return undefined;
	return { avif, webp };
}
