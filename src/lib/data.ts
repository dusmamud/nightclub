// Site data — Nightclub, Glasgow.
// Dates: the reference shows 02 FEB / 15 JAN / 14 JAN. The build date is
// 2026-11-17, so the next 02 FEB is 2027-02-02; 15/14 JAN are 2027-01-15/14.
// Extra events/news are dated after the reference ones so the countdown and
// "next event" logic stay consistent. No invented attendance or testimonials.

export const SITE_URL = 'https://nights-club.pages.dev'; // Cloudflare Pages project nights-club
export const SITE_NAME = 'Night Club';
export const ADDRESS = '4578 Marmora Road, Glasgow D04 89GR';
export const PHONE = '(800) 2345-6789';
export const PHONE_HREF = 'tel:+180023456789';

export type EventItem = {
	slug: string;
	title: string;
	day: string;
	month: string;
	monthName: string;
	year: number;
	iso: string; // YYYY-MM-DD
	time: string;
	image: string;
	imageAlt: string;
	excerpt: string;
	description: string;
	price: string;
};

export const EVENTS: EventItem[] = [
	{
		slug: 'lorem-ipsum-dolor-sit-amet-conse',
		title: 'Lorem ipsum dolor sit amet conse',
		day: '02',
		month: 'FEB',
		monthName: 'February',
		year: 2027,
		iso: '2027-02-02',
		time: '22:00',
		image: '/images/event-1.jpg',
		imageAlt: 'Woman in purple shutter shades on the dance floor',
		excerpt:
			'Aliquam dapibus tincidunt metus. Praesent justo dolor, lobortis quis, lobortis dignissim, pulvinar ac, lorem. Lorem ipsum dolor sit amet elit ipsum.',
		description:
			'Our headline February night. Aliquam dapibus tincidunt metus. Praesent justo dolor, lobortis quis, lobortis dignissim, pulvinar ac, lorem. Doors open at 22:00, 18+ only, and the dance floor runs until dawn with premier music all night.',
		price: 'From $25'
	},
	{
		slug: 'excepteur-sint-occaecat-cupidatat',
		title: 'Excepteur sint occaecat cupidatat',
		day: '15',
		month: 'JAN',
		monthName: 'January',
		year: 2027,
		iso: '2027-01-15',
		time: '22:00',
		image: '/images/event-2.jpg',
		imageAlt: 'DJ hands on the mixer and turntable',
		excerpt:
			'Aliquam dapibus tincidunt metus. Praesent justo dolor, lobortis quis, lobortis dignissim, pulvinar ac, lorem. Lorem ipsum dolor sit amet elit ipsum.',
		description:
			'A night built around the decks. Aliquam dapibus tincidunt metus. Praesent justo dolor, lobortis quis, lobortis dignissim, pulvinar ac, lorem. Resident DJs take over the booth from 22:00 until late.',
		price: 'From $20'
	},
	{
		slug: 'sunt-in-culpa-qui-officia',
		title: 'Sunt in culpa qui officia',
		day: '14',
		month: 'JAN',
		monthName: 'January',
		year: 2027,
		iso: '2027-01-14',
		time: '21:00',
		image: '/images/event-3.jpg',
		imageAlt: 'Woman holding a red cocktail at the bar',
		excerpt:
			'Aliquam dapibus tincidunt metus. Praesent justo dolor, lobortis quis, lobortis dignissim, pulvinar ac, lorem. Lorem ipsum dolor sit amet elit ipsum.',
		description:
			'Cocktails and conversation before the floor fills. Aliquam dapibus tincidunt metus. Praesent justo dolor, lobortis quis, lobortis dignissim, pulvinar ac, lorem. Bar opens at 21:00.',
		price: 'From $20'
	},
	{
		slug: 'neon-nights-disco-revival',
		title: 'Neon nights disco revival',
		day: '23',
		month: 'JAN',
		monthName: 'January',
		year: 2027,
		iso: '2027-01-23',
		time: '22:00',
		image: '/images/news-disco.jpg',
		imageAlt: 'Disco ball glowing over the dance floor',
		excerpt:
			'Disco classics under the mirror ball, all night long. Dress code: shine.',
		description:
			'The mirror ball is back. A full night of disco classics, from the first record at 22:00 until the lights come up. 18+ only.',
		price: 'From $20'
	},
	{
		slug: 'dj-takeover-friday',
		title: 'DJ takeover Friday',
		day: '29',
		month: 'JAN',
		monthName: 'January',
		year: 2027,
		iso: '2027-01-29',
		time: '22:00',
		image: '/images/news-dj.jpg',
		imageAlt: 'DJ playing to the crowd from the booth',
		excerpt:
			'Guest DJs take the booth for a Friday takeover. Four hours, no repeats.',
		description:
			'Guest DJs take the booth for a Friday takeover, four hours back to back from 22:00. 18+ only.',
		price: 'From $25'
	},
	{
		slug: 'friends-night-out',
		title: 'Friends night out',
		day: '06',
		month: 'FEB',
		monthName: 'February',
		year: 2027,
		iso: '2027-02-06',
		time: '21:00',
		image: '/images/news-friends.jpg',
		imageAlt: 'Friends laughing together at the bar',
		excerpt:
			'Bring the crew. Group tables, shared plates and the floor to yourselves.',
		description:
			'Bring the crew. Group tables from 21:00, shared plates at the bar, and the dance floor after midnight. 18+ only.',
		price: 'From $15'
	},
	{
		slug: 'dance-until-dawn',
		title: 'Dance until dawn',
		day: '13',
		month: 'FEB',
		monthName: 'February',
		year: 2027,
		iso: '2027-02-13',
		time: '22:00',
		image: '/images/news-dancer.jpg',
		imageAlt: 'Dancer silhouetted in red light on the floor',
		excerpt:
			'The floor stays open until dawn. Last entry 01:00, last dance at sunrise.',
		description:
			'The floor stays open until dawn. Doors 22:00, last entry 01:00, music until the lights come up. 18+ only.',
		price: 'From $25'
	},
	{
		slug: 'vip-lounge-saturday',
		title: 'VIP lounge Saturday',
		day: '20',
		month: 'FEB',
		monthName: 'February',
		year: 2027,
		iso: '2027-02-20',
		time: '21:00',
		image: '/images/gallery-vip.jpg',
		imageAlt: 'VIP lounge seating with low warm light',
		excerpt:
			'Reserved lounge seating, table service and a view over the whole floor.',
		description:
			'Reserved lounge seating with table service and a view over the whole floor, from 21:00. Limited tables — book ahead. 18+ only.',
		price: 'From $60'
	},
	{
		slug: 'cocktail-masterclass',
		title: 'Cocktail masterclass',
		day: '27',
		month: 'FEB',
		monthName: 'February',
		year: 2027,
		iso: '2027-02-27',
		time: '19:00',
		image: '/images/gallery-cocktails.jpg',
		imageAlt: 'Cocktails lined up on the bar',
		excerpt:
			'Learn the house pours from our bartenders, then stay for the night.',
		description:
			'Learn the house pours from our bartenders at 19:00, then stay for the night when the floor opens. 18+ only.',
		price: 'From $35'
	}
];

export const NEXT_EVENT = EVENTS[0]; // 02 FEB 2027

export type NewsItem = {
	slug: string;
	title: string;
	date: string;
	iso: string;
	image: string;
	imageAlt: string;
	excerpt: string;
	body: string;
};

export const NEWS: NewsItem[] = [
	{
		slug: 'excepteur-sint-occaecat-cupi-datat-non',
		title: 'Excepteur sint occaecat cupi datat non',
		date: '12 Nov 2026',
		iso: '2026-11-12',
		image: '/images/news-disco.jpg',
		imageAlt: 'Disco ball glowing over the dance floor',
		excerpt:
			'Aliquam dapibus tincidunt metus. Praesent justo dolor, lobortis quis, lobortis dignissim, pulvinar ac, lorem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vestibulum molestie lacus. Aenean nonummy hendrerit mauris. Phasellus porta.',
		body: 'Aliquam dapibus tincidunt metus. Praesent justo dolor, lobortis quis, lobortis dignissim, pulvinar ac, lorem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vestibulum molestie lacus. Aenean nonummy hendrerit mauris. Phasellus porta.'
	},
	{
		slug: 'sunt-in-culpa-qui-officia-deserunt-mollit',
		title: 'Sunt in culpa qui officia deserunt mollit',
		date: '10 Nov 2026',
		iso: '2026-11-10',
		image: '/images/news-dj.jpg',
		imageAlt: 'DJ playing to the crowd from the booth',
		excerpt:
			'Aliquam dapibus tincidunt metus. Praesent justo dolor, lobortis quis, lobortis dignissim, pulvinar ac, lorem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vestibulum molestie lacus. Aenean nonummy hendrerit mauris. Phasellus porta.',
		body: 'Aliquam dapibus tincidunt metus. Praesent justo dolor, lobortis quis, lobortis dignissim, pulvinar ac, lorem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vestibulum molestie lacus. Aenean nonummy hendrerit mauris. Phasellus porta.'
	},
	{
		slug: 'lorem-ipsum-dolor-sit-amet-conse',
		title: 'Lorem ipsum dolor sit amet conse',
		date: '08 Nov 2026',
		iso: '2026-11-08',
		image: '/images/news-friends.jpg',
		imageAlt: 'Friends laughing together at the bar',
		excerpt:
			'Aliquam dapibus tincidunt metus. Praesent justo dolor, lobortis quis, lobortis dignissim, pulvinar ac, lorem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vestibulum molestie lacus. Aenean nonummy hendrerit mauris. Phasellus porta.',
		body: 'Aliquam dapibus tincidunt metus. Praesent justo dolor, lobortis quis, lobortis dignissim, pulvinar ac, lorem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vestibulum molestie lacus. Aenean nonummy hendrerit mauris. Phasellus porta.'
	},
	{
		slug: 'sint-occaecat-cupidatat-non-proident',
		title: 'Sint occaecat cupidatat non proident',
		date: '05 Nov 2026',
		iso: '2026-11-05',
		image: '/images/news-dancer.jpg',
		imageAlt: 'Dancer silhouetted in red light on the floor',
		excerpt:
			'Aliquam dapibus tincidunt metus. Praesent justo dolor, lobortis quis, lobortis dignissim, pulvinar ac, lorem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vestibulum molestie lacus. Aenean nonummy hendrerit mauris. Phasellus porta.',
		body: 'Aliquam dapibus tincidunt metus. Praesent justo dolor, lobortis quis, lobortis dignissim, pulvinar ac, lorem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vestibulum molestie lacus. Aenean nonummy hendrerit mauris. Phasellus porta.'
	},
	{
		slug: 'new-resident-dj-season',
		title: 'New resident DJ season begins',
		date: '02 Nov 2026',
		iso: '2026-11-02',
		image: '/images/gallery-djbooth.jpg',
		imageAlt: 'DJ booth with decks and mixer',
		excerpt:
			'Our resident DJs open the new season this Friday, with a fresh set built for the floor.',
		body: 'Our resident DJs open the new season this Friday, with a fresh set built for the floor. Doors 22:00, 18+ only.'
	},
	{
		slug: 'lights-upgrade-dancefloor',
		title: 'Dancefloor lights, upgraded',
		date: '28 Oct 2026',
		iso: '2026-10-28',
		image: '/images/gallery-lights.jpg',
		imageAlt: 'Coloured stage lights over the dance floor',
		excerpt:
			'New moving heads and a reworked light rig go live this weekend — same floor, new glow.',
		body: 'New moving heads and a reworked light rig go live this weekend. Same floor, new glow.'
	}
];

export type GalleryItem = {
	src: string;
	alt: string;
	caption: string;
};

export const GALLERY: GalleryItem[] = [
	{ src: '/images/gallery-dancefloor.jpg', alt: 'Crowd dancing on the main dance floor', caption: 'Dance floor' },
	{ src: '/images/gallery-djbooth.jpg', alt: 'DJ booth with decks and mixer', caption: 'DJ booth' },
	{ src: '/images/gallery-cocktails.jpg', alt: 'Cocktails lined up on the bar', caption: 'Cocktails' },
	{ src: '/images/gallery-lights.jpg', alt: 'Coloured stage lights over the dance floor', caption: 'Lights' },
	{ src: '/images/gallery-crowd.jpg', alt: 'Crowd with hands up at the club', caption: 'Crowd' },
	{ src: '/images/gallery-vip.jpg', alt: 'VIP lounge seating with low warm light', caption: 'VIP lounge' }
];

export const OPENING_HOURS: { days: string; hours: string }[] = [
	{ days: 'Thursday – Friday', hours: '21:00 – 03:00' },
	{ days: 'Saturday', hours: '21:00 – 04:00' },
	{ days: 'Sunday – Wednesday', hours: 'Closed' }
];

// --- Round 2 data -----------------------------------------------------------
// PLACEHOLDER DATA — every value below is invented until Dus supplies the real
// venue facts: DJ names/bios, table minimums and deposits, drink and bottle
// prices, dress code, refund policy, accessibility and parking details.
// Do not treat any of it as the club's real information.

// Resident DJs (placeholder names — Dus to supply the real lineup).
export type DjItem = {
	slug: string;
	name: string;
	genre: string;
	image: string;
	imageAlt: string;
	bio: string;
};

export const DJS: DjItem[] = [
	{
		slug: 'dj-nova',
		name: 'DJ Nova',
		genre: 'House & disco',
		image: '/images/gallery-djbooth.jpg',
		imageAlt: 'DJ Nova at the booth',
		bio: 'Our Friday resident. House and disco built for the floor — long blends, mirror-ball moments, and a closing set that runs until dawn.'
	},
	{
		slug: 'dj-pulse',
		name: 'DJ Pulse',
		genre: 'Techno & peak-time',
		image: '/images/gallery-lights.jpg',
		imageAlt: 'DJ Pulse under the lights',
		bio: 'Our Saturday resident. Peak-time techno and driving bass — the loudest hours of the week, from midnight until the lights come up.'
	},
	{
		slug: 'dj-luna',
		name: 'DJ Luna',
		genre: 'R&B & hip-hop',
		image: '/images/gallery-crowd.jpg',
		imageAlt: 'DJ Luna playing to the crowd',
		bio: 'Our midweek resident. R&B, hip-hop and party classics — the warm-up that turns into the main event.'
	}
];

// Which resident plays which event (placeholder mapping).
export const EVENT_DJS: Record<string, string> = {
	'lorem-ipsum-dolor-sit-amet-conse': 'dj-nova',
	'excepteur-sint-occaecat-cupidatat': 'dj-pulse',
	'sunt-in-culpa-qui-officia': 'dj-luna',
	'neon-nights-disco-revival': 'dj-nova',
	'dj-takeover-friday': 'dj-pulse',
	'friends-night-out': 'dj-luna',
	'dance-until-dawn': 'dj-nova',
	'vip-lounge-saturday': 'dj-pulse',
	'cocktail-masterclass': 'dj-luna'
};

export function djForEvent(slug: string): DjItem | undefined {
	const djSlug = EVENT_DJS[slug];
	return DJS.find((d) => d.slug === djSlug);
}

export function eventsForDj(djSlug: string): EventItem[] {
	return EVENTS.filter((e) => EVENT_DJS[e.slug] === djSlug);
}

// VIP table tiers (placeholder minimums/deposits — Dus to supply real prices).
export type TableTier = {
	slug: string;
	name: string;
	minimum: string;
	seats: string;
	deposit: string;
	perks: string[];
};

export const TABLE_TIERS: TableTier[] = [
	{
		slug: 'standard-table',
		name: 'Standard table',
		minimum: 'From $150',
		seats: 'Up to 6 guests',
		deposit: '$50 deposit',
		perks: ['Reserved table by the floor', 'Table service all night', 'Free cloakroom']
	},
	{
		slug: 'vip-booth',
		name: 'VIP booth',
		minimum: 'From $300',
		seats: 'Up to 8 guests',
		deposit: '$100 deposit',
		perks: ['Booth with a view over the floor', 'Dedicated host', 'Priority entry lane']
	},
	{
		slug: 'premium-lounge',
		name: 'Premium lounge',
		minimum: 'From $500',
		seats: 'Up to 12 guests',
		deposit: '$150 deposit',
		perks: ['Private lounge area', 'Bottle package included', 'Dedicated host & security']
	}
];

// Drinks & bottle menu (placeholder prices — Dus to supply the real menu).
export type DrinkItem = { name: string; price: string; desc: string };

export const COCKTAILS: DrinkItem[] = [
	{ name: 'House Margarita', price: '$12', desc: 'Tequila, lime, agave — served on the rocks.' },
	{ name: 'Pink Club Spritz', price: '$13', desc: 'Gin, pink grapefruit, prosecco, soda.' },
	{ name: 'Espresso Martini', price: '$14', desc: 'Vodka, espresso, coffee liqueur.' },
	{ name: 'Old Fashioned', price: '$14', desc: 'Bourbon, bitters, orange, demerara.' },
	{ name: 'Mojito', price: '$12', desc: 'White rum, mint, lime, soda.' },
	{ name: 'Negroni', price: '$13', desc: 'Gin, Campari, sweet vermouth.' }
];

export const BOTTLES: DrinkItem[] = [
	{ name: 'House vodka', price: 'From $120', desc: 'Bottle service with mixers for the table.' },
	{ name: 'House gin', price: 'From $130', desc: 'Bottle service with tonic and garnish.' },
	{ name: 'Prosecco', price: 'From $60', desc: 'Chilled bottle, served at the table.' },
	{ name: 'Champagne', price: 'From $180', desc: 'Bottle service for the big nights.' }
];

// FAQ / entry policy (placeholder policy wording — Dus to confirm the real rules).
export type FaqItem = { q: string; a: string };

export const FAQS: FaqItem[] = [
	{
		q: 'How old do I need to be, and what ID do I need?',
		a: '18+ only, every night. Bring a valid photo ID — passport, driving licence or national ID card. No ID, no entry, even with a ticket. Student cards and photos of ID are not accepted.'
	},
	{
		q: 'Is there a dress code?',
		a: 'Smart night-out dress. No sportswear, no trainers, no caps. The door team has the final say — if in doubt, dress up rather than down.'
	},
	{
		q: 'What time do the doors open?',
		a: 'Doors open at 21:00 on Thursday, Friday and Saturday. Last entry is 01:00. The floor runs until 03:00 on Thursday and Friday, and until 04:00 on Saturday.'
	},
	{
		q: 'Can I get a refund on my ticket?',
		a: 'Tickets are non-refundable, but they can be transferred to another person up to 24 hours before the night. If we cancel a night, every ticket is refunded in full.'
	},
	{
		q: 'How does the guestlist work?',
		a: 'Pick a night on the guestlist page, leave your name and phone number, and turn up before 23:00. Your name is on the list at the door — no ticket needed, but entry is still 18+ with ID and subject to capacity.'
	},
	{
		q: 'How do table bookings and deposits work?',
		a: 'Pick a table tier on the VIP page and send a booking request. A deposit holds your table — it comes off your minimum spend on the night. If you cancel more than 48 hours ahead, the deposit is refunded.'
	},
	{
		q: 'What if I feel unsafe or unwell?',
		a: 'Tell any member of staff, or go to the bar and ask for Angela — that is our code word for help, and staff will look after you discreetly. Trained welfare staff are on the floor every night, and there is a quiet room if you need a break.'
	},
	{
		q: 'Is the club accessible?',
		a: 'The main entrance is step-free and there is an accessible toilet on the ground floor. The VIP mezzanine is reached by stairs only. Tell us in advance on the contact form and we will reserve a ground-floor table.'
	}
];

// Rooms / areas (photo + two lines each).
export type RoomItem = { name: string; image: string; imageAlt: string; desc: string };

export const ROOMS: RoomItem[] = [
	{
		name: 'The dance floor',
		image: '/images/gallery-dancefloor.jpg',
		imageAlt: 'Crowd dancing on the main dance floor',
		desc: 'The heart of the club. Mirror ball overhead, lights on the rig, and the floor stays open until dawn.'
	},
	{
		name: 'VIP lounge',
		image: '/images/gallery-vip.jpg',
		imageAlt: 'VIP lounge seating with low warm light',
		desc: 'Reserved booths and lounge seating with table service and a view over the whole floor.'
	},
	{
		name: 'The bar',
		image: '/images/gallery-cocktails.jpg',
		imageAlt: 'Cocktails lined up on the bar',
		desc: 'House pours, classics and bottle service. Order at the bar or from your table.'
	}
];

// Ticket tiers per event, derived from the event's "From $…" price.
// Placeholder pricing — Dus to confirm real ticket prices and the ticket platform.
export type TicketTier = { name: string; price: string; note: string };

export function ticketTiers(event: EventItem): TicketTier[] {
	const base = parseInt(event.price.replace(/[^0-9]/g, ''), 10) || 20;
	return [
		{ name: 'Early bird', price: `$${Math.max(10, base - 10)}`, note: 'Limited — first release, entry before 23:00.' },
		{ name: 'General admission', price: event.price, note: 'Standard entry, any time until last entry 01:00.' },
		{ name: 'VIP entry', price: `$${base * 2 + 10}`, note: 'Priority entry lane and cloakroom included.' }
	];
}

// Live open-now state from the opening-hours table (Thu–Fri 21:00–03:00, Sat 21:00–04:00).
export function getOpenState(now = new Date()): { open: boolean; label: string } {
	const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	const closeHour = (day: number) => (day === 6 ? 4 : 3); // Saturday night closes 04:00
	const windows: { start: Date; end: Date }[] = [];
	for (let d = -1; d <= 8; d++) {
		const date = new Date(now);
		date.setDate(now.getDate() + d);
		const day = date.getDay();
		if (day !== 4 && day !== 5 && day !== 6) continue;
		const start = new Date(date);
		start.setHours(21, 0, 0, 0);
		const end = new Date(date);
		end.setDate(date.getDate() + 1);
		end.setHours(closeHour(day), 0, 0, 0);
		windows.push({ start, end });
	}
	for (const w of windows) {
		if (now >= w.start && now < w.end) {
			return { open: true, label: `Open now · closes ${String(w.end.getHours()).padStart(2, '0')}:00` };
		}
	}
	const next = windows.find((w) => w.start > now);
	if (next) {
		const dayName = dayNames[next.start.getDay()];
		return { open: false, label: `Closed · opens ${dayName} at 21:00` };
	}
	return { open: false, label: 'Closed' };
}
