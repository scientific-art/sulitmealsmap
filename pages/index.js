import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import listings from '../data/listings.json';

const MapView = dynamic(() => import('../components/MapView'), { ssr: false });

const BANDS = [50, 100, 150];
const MATI_CENTER = [6.9530, 126.2200];

// TODO: replace this with a real submission form (Google Form embed for v1,
// or a Supabase-backed form once the backend is wired up).
const SUBMIT_FORM_URL = 'https://forms.google.com/REPLACE_WITH_YOUR_FORM_LINK';

export default function Home() {
  const [activeBand, setActiveBand] = useState(null);

  const filtered = useMemo(() => {
    if (!activeBand) return listings;
    return listings.filter((l) => l.priceBand <= activeBand);
  }, [activeBand]);

  return (
    <div>
      <Head>
        <title>SulitMealsMap — Verified cheap eats across the Philippines</title>
        <meta
          name="description"
          content="Crowdsourced, price-checked map of carinderia, kitchenette, street food, turo-turo, and bakery finds under ₱150, anywhere in the Philippines."
        />
      </Head>
      <div className="topbar">
        <div className="wordmark display">SulitMealsMap</div>
        <div className="tagline">Verified cheap eats, sulit na sulit — Philippines</div>
      </div>

      <div className="hero">
        <h1>Find a real meal without blowing your budget.</h1>
        <p>
          Every spot here was submitted and price-checked by someone who actually ate
          there. No chains, no guessing games — just carinderias, street food, turo-turo,
          and bakeries worth the walk.
        </p>
        <div className="filters" role="group" aria-label="Filter by price">
          {BANDS.map((band) => (
            <button
              key={band}
              className="chip"
              aria-pressed={activeBand === band}
              onClick={() => setActiveBand(activeBand === band ? null : band)}
            >
              Under ₱{band}
            </button>
          ))}
          {activeBand && (
            <button className="chip" onClick={() => setActiveBand(null)}>
              Clear filter
            </button>
          )}
        </div>
      </div>

      <div className="layout">
        <div className="map-wrap">
          <MapView listings={filtered} center={MATI_CENTER} />
        </div>
        <div className="list-wrap">
          <h2>{filtered.length} spot{filtered.length !== 1 ? 's' : ''}</h2>
          {filtered.map((spot) => (
            <div className="spot-card" key={spot.id}>
              <div className="row">
                <span className="name">{spot.name}</span>
                <span className="price">₱{spot.price}</span>
              </div>
              <div className="meta">
                {spot.item} · {spot.category} · {spot.area}
              </div>
              <button className="verify">Still accurate? Confirm</button>
            </div>
          ))}
        </div>
      </div>

      <div className="submit-band">
        <h2 className="display">Know a spot that belongs here?</h2>
        <p>
          Submit the name, location, what you ordered, and a photo of the price. We
          check it, the community confirms it, it goes on the map.
        </p>
        <a className="btn-mango" href={SUBMIT_FORM_URL} target="_blank" rel="noreferrer">
          Submit a spot
        </a>
      </div>

      <footer>
        SulitMealsMap is community-run and independently verified. Not affiliated with any
        restaurant chain. Launching in Davao Oriental — expanding city by city across the Philippines.
      </footer>
    </div>
  );
}
