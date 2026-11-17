import { error } from '@sveltejs/kit';
import { DJS } from '#lib/data';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => DJS.map((d) => ({ slug: d.slug }));

export const load: PageLoad = ({ params }) => {
	const dj = DJS.find((d) => d.slug === params.slug);
	if (!dj) error(404, 'DJ not found');
	return { slug: params.slug };
};
