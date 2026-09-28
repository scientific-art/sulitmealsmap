# SulitMealsMap — v1

Crowdsourced map of verified cheap eats in Mati &amp; Davao. Built with Next.js,
Leaflet + OpenStreetMap (no API key needed), static seed data for now.

## What's in this v1

- Map + listing cards, filterable by price band (₱50 / ₱100 / ₱150)
- Sample placeholder listings in `data/listings.json` — **replace these with
  your real, personally-verified Mati spots before launch**
- "Submit a spot" button that currently points at a placeholder Google Form
  link — create a real Google Form (name, location, item, price, photo
  upload) and drop its link into `SUBMIT_FORM_URL` in `pages/index.js`
- No backend yet, by design — this is the fast, zero-cost v1 from the plan.
  Submissions collected via the Google Form for now; you manually add
  confirmed ones to `data/listings.json` and redeploy (or move to Supabase
  once you're ready for v2 — the data shape already matches what a Supabase
  table would look like)

## Run it locally

```
npm install
npm run dev
```

Opens at http://localhost:3000

## Deploy to Vercel (free, no domain needed yet)

**Easiest path — Vercel dashboard:**
1. Push this folder to a new GitHub repo
2. Go to vercel.com → New Project → import that repo
3. Leave all settings default (Next.js is auto-detected) → Deploy
4. You'll get a live link like `sulitmealsmap.vercel.app` in about a minute

**Or via CLI:**
```
npm install -g vercel
vercel login
vercel
```
Follow the prompts — it deploys straight from this folder.

## When you're ready to buy the domain

In Vercel: Project → Settings → Domains → add `sulitmealsmap.com` once purchased.
Point the domain's DNS at Vercel per their on-screen instructions. No rebuild
needed — same deployment, new address.

## Next steps (v2, once v1 is live and getting submissions)

- Swap `data/listings.json` for a Supabase table (schema: id, name, lat, lng,
  category, item, price, price_band, area, verified_count, last_verified_at)
- Replace the Google Form with a real in-app submission form + photo upload
- Add the "still accurate" verify button's real logic (currently a static
  placeholder)
- Layer in Claude API for photo price-extraction / natural-language search
  once the core is proven
