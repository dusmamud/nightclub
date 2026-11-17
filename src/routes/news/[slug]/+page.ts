import { error } from '@sveltejs/kit';
import { NEWS } from '#lib/data';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => NEWS.map((n) => ({ slug: n.slug }));

export const load: PageLoad = ({ params }) => {
	const item = NEWS.find((n) => n.slug === params.slug);
	if (!item) error(404, 'News item not found');
	return { slug: params.slug };
};
