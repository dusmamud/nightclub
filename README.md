# NIGHTCLUB

A nightclub website — dark, hot-pink, mobile-first. Built from a reference
design with SvelteKit, statically prerendered, hosted on Cloudflare Pages.

## Stack (locked)

- Svelte 5.57.3 + SvelteKit 3.2.0 + Vite 8.3.8 + TypeScript
- Tailwind CSS 4.3.5 (`@tailwindcss/vite`)
- `@sveltejs/adapter-static` 4.0.1 + `prerender=true` (static site, `build/` output)
- Icons: `@lucide/svelte` 1.74.0 · Fonts: `@fontsource/oswald` + `@fontsource/anton`
- Motion: Svelte built-in transitions + an IntersectionObserver reveal action
  (no framer-motion — it is React-only)

## Pages / routes

- `/` — Home: hero, 3 events, countdown to the next event, PLUNGE section,
  Latest News, About band, footer
- `/events/` — 9 events with month filter · `/events/[slug]/` — event detail pages
- `/news/` — 6 news items · `/about/` · `/gallery/` — lightbox
- `/contacts/` — address, phone, hours, contact form (client-side only for now)
- `/sitemap.xml` + `/robots.txt` (prerendered `+server.ts` routes) · custom 404

SEO: per-page `<svelte:head>` title/meta/OG/Twitter via `Seo.svelte`, plus a
NightClub JSON-LD schema in the root layout.

## Develop

```sh
npm install
npm run dev
npm run check   # svelte-check
npm run build   # static output in build/
```

## Deploy

Cloudflare Pages project `nightclub` (→ `nightclub.pages.dev`), via
`.github/workflows/deploy-cloudflare-pages.yml` on every push to `main`.
Required GitHub secrets (repo → Settings → Secrets and variables → Actions):

- `CLOUDFLARE_API_TOKEN` — Pages:Edit + Account:Read
- `CLOUDFLARE_ACCOUNT_ID` — from the Cloudflare dashboard

Note: `SITE_URL` in `src/lib/data.ts` is still the placeholder
`https://nightclub.pages.dev` — replace it if a real domain is chosen.
The contact form is client-side only until a backend exists; the map on
`/contacts/` is a placeholder.
