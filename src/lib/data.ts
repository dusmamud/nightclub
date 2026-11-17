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
