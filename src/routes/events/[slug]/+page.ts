import { error } from '@sveltejs/kit';
import { EVENTS } from '#lib/data';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => EVENTS.map((e) => ({ slug: e.slug }));

export const load: PageLoad = ({ params }) => {
	const event = EVENTS.find((e) => e.slug === params.slug);
	if (!event) error(404, 'Event not found');
	return { slug: params.slug };
};
