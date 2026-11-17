import { EVENTS, SITE_URL } from '#lib/data';
import type { RequestHandler } from './$types';

export const prerender = true;

const STATIC_ROUTES = ['', '/events/', '/news/', '/about/', '/gallery/', '/contacts/'];

export const GET: RequestHandler = () => {
	const urls = [
		...STATIC_ROUTES,
		...EVENTS.map((e) => `/events/${e.slug}/`)
	];
	const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
		.map((u) => `  <url><loc>${SITE_URL}${u}</loc></url>`)
		.join('\n')}\n</urlset>\n`;
	return new Response(body, {
		headers: { 'Content-Type': 'application/xml; charset=utf-8' }
	});
};
